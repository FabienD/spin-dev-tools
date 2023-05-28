## Dev Tools

A simple test of [Spin Framework](https://developer.fermyon.com/spin/index) on [Fermyon Cloud](https://developer.fermyon.com/cloud/index).

The application is composed of two WASM components running on the server side. The Front End is a static Next.js application served by [WASM file server](https://github.com/fermyon/spin-fileserver) and the Back End is written in Rust and compiled to WASM.

The application in action can be found at [https://dev-tools-y8pakkgj.fermyon.app/](https://dev-tools-y8pakkgj.fermyon.app/)

- uuid generator
- base64 encoder/decoder
- url encoder/decoder
- json prettyfier/minifier
- password generator