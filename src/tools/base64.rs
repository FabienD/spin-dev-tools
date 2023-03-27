use anyhow::Result;
use base64::{engine::general_purpose, Engine as _};
use http::StatusCode;
use serde::{Deserialize, Serialize};
use spin_sdk::http::{Request, Response};
use std::str;

use super::common::bad_request;

#[derive(Debug, Deserialize)]
struct Base64Request {
    action: String,
    input: String,
}

#[derive(Debug, Serialize)]
struct Base64Reponse {
    message: String,
    data: Option<String>,
}

pub fn handle_base64_request(req: Request) -> Result<Response> {
    let base64_request: Base64Request = match req.body() {
        Some(body) => match serde_json::from_slice(&body) {
            Ok(request) => request,
            _ => return bad_request(Some("Bad payload format".to_string())),
        },
        _ => return bad_request(None),
    };

    let process_input: String;

    if base64_request.action.as_str() == "encode" {
        process_input = general_purpose::STANDARD.encode(base64_request.input.as_bytes());
    } else if base64_request.action.as_str() == "decode" {
        process_input = match general_purpose::STANDARD.decode(base64_request.input.as_bytes()) {
            Ok(decoded) => str::from_utf8(&decoded).unwrap().to_string(),
            _ => return bad_request(Some("Bad payload format".to_string())),
        }
    } else {
        return bad_request(Some(format!(
            "Unsupported Base64 action {0}",
            base64_request.action
        )));
    }

    let json_message = Base64Reponse {
        message: format!("Base64 action {0}", base64_request.action),
        data: Some(process_input),
    };

    let serialized_response = serde_json::to_string(&json_message).unwrap();

    Ok(http::Response::builder()
        .header("Content-Type", "application/json")
        .status(StatusCode::OK)
        .body(Some(serialized_response.into()))?)
}
