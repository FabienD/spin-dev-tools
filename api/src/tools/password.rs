use anyhow::Result;
use serde::{Deserialize, Serialize};
use spin_sdk::http::{Request, Response};

use super::common::bad_request;

#[derive(Debug, Deserialize)]
struct PasswordRequest {
    action: String,
    input: String,
}

#[derive(Debug, Serialize)]
struct PasswordReponse {
    message: String,
    data: Option<String>,
}

pub fn handle_password_request(req: Request) -> Result<Response> {
    bad_request(Some("Not implemented yet".to_string()))
}