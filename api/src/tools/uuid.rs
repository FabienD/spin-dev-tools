use anyhow::Result;
use http::StatusCode;
use serde::{Deserialize, Serialize};
use spin_sdk::http::{Request, Response};
use uuid::Uuid;
use uuid::Builder;

use super::common::bad_request;

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
    let uuid_request: UuidRequest = match req.body() {
        Some(body) => match serde_json::from_slice(&body) {
            Ok(request) => request,
            _ => return bad_request(Some("Bad payload format".to_string())),
        },
        _ => return bad_request(None),
    };

    let uuid_callable = match uuid_request.version {
        4 => || vec![uuid::Uuid::new_v4()],
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

    Ok(http::Response::builder()
        .header("Content-Type", "application/json")
        .status(StatusCode::OK)
        .body(Some(serialized_response.into()))?)
}
