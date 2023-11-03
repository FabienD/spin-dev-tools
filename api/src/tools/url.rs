use anyhow::Result;
use serde::Deserialize;
use spin_sdk::http::{Request, Response};
use urlencoding;

use super::common::*;

#[derive(Debug, Deserialize)]
struct UrlRequest {
    action: String,
    input: String,
}

pub fn handle_url_request(req: Request) -> Result<Response> {
    let body = req.body();
    let url_request: UrlRequest = match serde_json::from_slice(&body) {
        Ok(request) => request,
        _ => return bad_request(Some("Bad payload format".to_string())),
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

    let json_message = ApiReponse {
        message: format!("Url action {0}", url_request.action),
        data: Some(process_input),
    };

    return return_response(json_message);
}
