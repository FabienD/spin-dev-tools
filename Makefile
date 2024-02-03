SHELL := /bin/bash

.PHONY: install up build web-dev web-build api-build

install:
	@echo "Installing dependencies"
	cd web && npm install
	cd api && cargo install --locked --path .

up:
	@echo "Starting spin"
	spin up

deploy: build-prod
	@echo "Deploying spin in production"
	spin deploy

build-prod:
	@echo "Building spin for production"
	export RUSTFLAGS="--cfg uuid_unstable" && export NEXT_PUBLIC_API_URL=https://dev-tools.fermyon.app/api && spin build

build-local:
	@echo "Building spin for local"
	export RUSTFLAGS="--cfg uuid_unstable" && export NEXT_PUBLIC_API_URL=http://127.0.0.1:3000/api && spin build

watch-local:
	@echo "Building spin for local"
	export RUSTFLAGS="--cfg uuid_unstable" && export NEXT_PUBLIC_API_URL=http://127.0.0.1:3000/api && spin watch

web-dev:
	@echo "Starting web"
	cd web && export NEXT_PUBLIC_API_URL=http://127.0.0.1:3000/api && npm run dev

web-build:
	@echo "Building web microservice"
	cd web && export NEXT_PUBLIC_API_URL=http://127.0.0.1:3000/api && npm run build

api-build:
	@echo "Building api microservice"
	cd api && cargo build --target wasm32-wasi --release

api-dev:
	@echo "Building api microservice"
	cd api && cargo watch -x run --target wasm32-wasi --release