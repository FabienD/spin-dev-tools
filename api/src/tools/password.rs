use std::f32::consts::E;

use anyhow::Result;
use serde::{Deserialize, Serialize};
use passwords::PasswordGenerator;
use spin_sdk::http::{Request, Response};

use super::common::*;

#[derive(Debug, Deserialize)]
struct PasswordRequest {
    length: usize,
    numbers: bool,
    lowercase_letters: bool,
    uppercase_letters: bool,
    symbols: bool,
    spaces: bool,
    exclude_similar_characters: bool,
    strict: bool,
}

#[derive(Debug, Serialize)]
struct PasswordReponse {
    message: String,
    data: Option<String>,
}

pub fn handle_password_request(req: Request) -> Result<Response> {

    let password_request: PasswordRequest = match req.body() {
        Some(body) => match serde_json::from_slice(&body) {
            Ok(request) => request,
            _ => return bad_request(Some("Bad payload format".to_string())),
        },
        _ => return bad_request(None),
    }; 

    let pg: PasswordGenerator = PasswordGenerator {
        length: password_request.length,
        numbers: password_request.numbers,
        lowercase_letters: password_request.lowercase_letters,
        uppercase_letters: password_request.uppercase_letters,
        symbols: password_request.symbols,
        spaces: password_request.spaces,
        exclude_similar_characters: password_request.exclude_similar_characters,
        strict: password_request.strict,
    };

    let password: String = match pg.generate_one() {
        Ok(password) => password,
        Err(e) => return bad_request(Some(e.to_string())),
    };

    let json_message = ApiReponse {
        message: "Password generated".to_string(),
        data: Some(password),
    };

    return return_response(json_message);
}
