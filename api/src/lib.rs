use anyhow::Result;
use spin_sdk::{
    http::{Request, Response, responses, Method},
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
    let path = req.path();

    match (method, path) {
        (&Method::Get, "/api") => Ok(Response::new(200, "Hello from Fermyon")),
        (&Method::Post, "/api/base64") => handle_base64_request(req),
        (&Method::Post, "/api/json") => handle_json_request(req),
        (&Method::Post, "/api/password") => handle_password_request(req),
        (&Method::Post, "/api/url") => handle_url_request(req),
        (&Method::Post, "/api/uuid") => handle_uuid_request(req),
        _ => Ok(responses::not_found()),
    }
}
