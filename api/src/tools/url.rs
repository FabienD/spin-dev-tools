use anyhow::Result;
use http::StatusCode;
use serde::{Deserialize, Serialize};
use spin_sdk::http::{Request, Response};
use urlencoding;

use super::common::bad_request;

#[derive(Debug, Deserialize)]
struct UrlRequest {
    action: String,
    input: String,
}

#[derive(Debug, Serialize)]
struct UrlReponse {
    message: String,
    data: Option<String>,
}

pub fn handle_url_request(req: Request) -> Result<Response> {
    let url_request: UrlRequest = match req.body() {
        Some(body) => match serde_json::from_slice(&body) {
            Ok(request) => request,
            _ => return bad_request(Some("Bad payload format".to_string())),
        },
        _ => return bad_request(None),
    };

    let process_input: String;

    if url_request.action.as_str() == "encode" {
        process_input = urlencoding::encode(&url_request.input).to_string();
    } else if url_request.action.as_str() == "decode" {
        process_input = match urlencoding::decode(&url_request.input) {
            Ok(decoded) => decoded.into_owned(),
            _ => return bad_request(Some("Bad payload format".to_string())),
        }
    } else {
        return bad_request(Some(format!(
            "Unsupported Url action {0}",
            url_request.action
        )));
    }

    let json_message = UrlReponse {
        message: format!("Url action {0}", url_request.action),
        data: Some(process_input),
    };

    let serialized_response = serde_json::to_string(&json_message).unwrap();

    Ok(http::Response::builder()
        .header("Content-Type", "application/json")
        .status(StatusCode::OK)
        .body(Some(serialized_response.into()))?)
}
