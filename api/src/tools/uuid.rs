use std::time::SystemTime;
use anyhow::Result;
use http::StatusCode;
use rand::RngCore;
use serde::{Deserialize, Serialize};
use spin_sdk::http::{Request, Response, ResponseBuilder};
use uuid::{Uuid, Builder};

use super::common::*;

#[derive(Debug, Deserialize)]
struct UuidRequest {
    version: u8,
    sample_to_generate: u8,
}

#[derive(Debug, Serialize)]
struct UuidReponse {
    message: String,
    data: Option<Vec<Uuid>>,
}

pub fn handle_uuid_request(req: Request) -> Result<Response> {
    let body = req.body();
    let uuid_request: UuidRequest = match serde_json::from_slice(&body) {
        Ok(request) => request,
        _ => return bad_request(Some("Bad payload format".to_string())),
    };

    let uuid_callable = match uuid_request.version {
        4 => || vec![uuid::Uuid::new_v4()],
        5 => || {
            let mut random_bytes = [0u8; 32];
            rand::rngs::OsRng.fill_bytes(&mut random_bytes);
            let uuid = uuid::Uuid::new_v5(
                &uuid::Uuid::NAMESPACE_DNS,
                &random_bytes,
            );
            
            return vec![uuid];
        },
        7 => || {
            let ts = SystemTime::now().duration_since(SystemTime::UNIX_EPOCH).unwrap();
            let mut random_bytes = [0u8; 10];
            rand::rngs::OsRng.fill_bytes(&mut random_bytes);
            let uuid = Builder::from_unix_timestamp_millis(ts.as_millis().try_into().unwrap(), &random_bytes).into_uuid();   
            
            return vec![uuid];
        },
        _ => {
            return bad_request(Some(format!(
                "Unsupported Uuid version {0}",
                uuid_request.version
            )))
        }
    };

    let mut uuid_response: Vec<Uuid> = vec![];

    for _i in 0..uuid_request.sample_to_generate {
        uuid_response.append(&mut uuid_callable())
    }

    let json_message = UuidReponse {
        message: format!("Uuid version {0}", uuid_request.version),
        data: Some(uuid_response),
    };

    let serialized_response = serde_json::to_string(&json_message).unwrap();

    Ok(ResponseBuilder::new(StatusCode::OK.as_u16())
        .header("Content-Type", "application/json")
        .body(serialized_response)
        .build()
    )
}
