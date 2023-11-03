use anyhow::Result;
use serde::Deserialize;
use serde_json::Value;
use spin_sdk::http::{Request, Response};

use super::common::*;

#[derive(Debug, Deserialize)]
struct JsonRequest {
    action: String,
    input: String,
}

pub fn handle_json_request(req: Request) -> Result<Response> {
    let body = req.body();
    let json_request: JsonRequest = match serde_json::from_slice(&body) {
        Ok(request) => request,
        _ => return bad_request(Some("Bad payload format".to_string())),
    };

    let process_input: String;

    let v: Value = match serde_json::from_str(json_request.input.as_str()) {
        Ok(v) => v,
        _ => return bad_request(Some("Bad payload format".to_string())),
    };

    if json_request.action.as_str() == "prettify" {
        process_input = serde_json::to_string_pretty(&v)?;
        
    } else if json_request.action.as_str() == "minify" {
        process_input = serde_json::to_string(&v)?;
    } else {
        return bad_request(Some(format!(
            "Unsupported Json action {0}",
            json_request.action
        )));
    }

    let json_message = ApiReponse {
        message: format!("Json action {0}", json_request.action),
        data: Some(process_input),
    };

    return return_response(json_message);
}
