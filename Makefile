SHELL := /bin/bash

.PHONY: install up build web-dev web-build api-build

install:
	@echo "Installing dependencies"
	cd web && yarn install
	cd api && cargo install --locked --path .

up:
	@echo "Starting spin"
	spin up

deploy: build-prod
	@echo "Deploying spin in production"
	spin deploy

build-prod:
	@echo "Building spin for production"
	export NEXT_PUBLIC_API_URL=https://dev-tools-y8pakkgj.fermyon.app/api && spin build

build-local:
	@echo "Building spin for local"
	export NEXT_PUBLIC_API_URL=http://localhost:3000/api && spin build
	spin build

web-dev:
	@echo "Starting web"
	cd web && yarn dev

web-build:
	@echo "Building web microservice"
	cd web && yarn build

api-build:
	@echo "Building api microservice"
	cd api && cargo build --target wasm32-wasi --release