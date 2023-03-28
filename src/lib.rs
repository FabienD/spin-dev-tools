use anyhow::Result;
use http::Method;
use spin_sdk::{
    http::{not_found, Request, Response},
    http_component,
};

mod tools;
use tools::base64::handle_base64_request;
use tools::url::handle_url_request;
use tools::uuid::handle_uuid_request;
use tools::json::handle_json_request;
use tools::password::handle_password_request;

#[http_component]
fn handle_dev_tools(req: Request) -> Result<Response> {
    let method = req.method();
    let path = req.uri().path();

    match (method, path) {
        (&Method::GET, "/") => Ok(http::Response::builder()
            .status(200)
            .body(Some("Hello from Fermyon Cloud!".into()))?),
        (&Method::POST, "/base64") => handle_base64_request(req),
        (&Method::POST, "/json") => handle_json_request(req),
        (&Method::POST, "/password") => handle_password_request(req),
        (&Method::POST, "/url") => handle_url_request(req),
        (&Method::POST, "/uuid") => handle_uuid_request(req),
        _ => not_found(),
    }
}
