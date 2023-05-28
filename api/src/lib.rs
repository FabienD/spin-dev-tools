use anyhow::Result;
use http::Method;
use spin_sdk::{
    http::{not_found, Request, Response},
    http_component,
};

mod tools;
use tools::base64::handle_base64_request;
use tools::json::handle_json_request;
use tools::password::handle_password_request;
use tools::url::handle_url_request;
use tools::uuid::handle_uuid_request;

#[http_component]
fn handle_dev_tools(req: Request) -> Result<Response> {
    let method = req.method();
    let path = req.uri().path();

    match (method, path) {
        (&Method::GET, "/") => Ok(http::Response::builder()
            .status(200)
            .body(Some("Hello from Fermyon Cloud!".into()))?),
        (&Method::POST, "/api/base64") => handle_base64_request(req),
        (&Method::POST, "/api/json") => handle_json_request(req),
        (&Method::POST, "/api/password") => handle_password_request(req),
        (&Method::POST, "/api/url") => handle_url_request(req),
        (&Method::POST, "/api/uuid") => handle_uuid_request(req),
        _ => not_found(),
    }
}
