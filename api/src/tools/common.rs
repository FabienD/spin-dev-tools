use anyhow::Result;
use http::StatusCode;
use serde::Serialize;
use spin_sdk::http::Response;

#[derive(Debug, Serialize)]
struct ErrorResponse {
    message: String,
}

#[derive(Debug, Serialize)]
pub struct ApiReponse {
    pub message: String,
    pub data: Option<String>,
}

pub fn bad_request(message: Option<String>) -> Result<Response> {
    let return_message = match message {
        Some(m) => m,
        _ => "Bad request".to_string(),
    };

    let json_message = ErrorResponse {
        message: return_message,
    };

    let serialized_response = serde_json::to_string(&json_message).unwrap();

    Ok(http::Response::builder()
        .status(StatusCode::BAD_REQUEST)
        .header("Content-Type", "application/json")
        .body(Some(serialized_response.into()))?)
}

pub fn return_response(json_message: ApiReponse) -> Result<Response> {
    let serialized_response = serde_json::to_string(&json_message).unwrap();

    Ok(http::Response::builder()
        .status(StatusCode::OK)
        .header("Content-Type", "application/json")
        .body(Some(serialized_response.into()))?)
}
