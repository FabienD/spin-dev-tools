use anyhow::Result;
use http::StatusCode;
use serde::{Deserialize, Serialize};
use spin_sdk::http::{Request, Response};
use uuid::Uuid;

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

fn baq_request(message: Option<String>) -> Result<Response> {
    let return_message = match message {
        Some(m) => m,
        _ => "Bad request".to_string(),
    };

    let json_message = UuidReponse {
        message: return_message,
        data: None,
    };

    let serialized_response = serde_json::to_string(&json_message).unwrap();

    Ok(http::Response::builder()
        .status(StatusCode::BAD_REQUEST)
        .header("Content-Type", "application/json")
        .body(Some(serialized_response.into()))?)
}

pub fn handle_uuid_request(req: Request) -> Result<Response> {
    let uuid_request: UuidRequest = match req.body() {
        Some(body) => match serde_json::from_slice(&body) {
            Ok(request) => request,
            _ => return baq_request(None),
        },
        _ => return baq_request(None),
    };

    let uuid_callable = match uuid_request.version {
        4 => || vec![uuid::Uuid::new_v4()],
        _ => return baq_request(None),
    };

    let mut uuid_response: Vec<Uuid> = vec![];

    for _i in 0..uuid_request.sample_to_generate {
        uuid_response.append(&mut uuid_callable())
    }

    let serialized_response = serde_json::to_string(&uuid_response).unwrap();

    Ok(http::Response::builder()
        .header("Content-Type", "application/json")
        .status(200)
        .body(Some(serialized_response.into()))?)
}
