use anyhow::Result;
use http::Method;
use spin_sdk::{
    http::{not_found, Request, Response},
    http_component,
};

mod tools;
use tools::uuid::handle_uuid_request;

#[http_component]
fn handle_dev_tools(req: Request) -> Result<Response> {
    let method = req.method();
    let path = req.uri().path();

    match (method, path) {
        (&Method::GET, "/") => Ok(http::Response::builder()
            .status(200)
            .body(Some("Hello, Fermyon!".into()))?),
        (&Method::POST, "/uuid") => handle_uuid_request(req),
        _ => not_found(),
    }
}
