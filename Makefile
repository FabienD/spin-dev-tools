SHELL := /bin/bash

.PHONY: install up build web-dev web-build api-build

install:
	@echo "Installing dependencies"
	cd web && yarn install
	cd api && cargo install --locked --path .

up:
	@echo "Starting spin"
	spin up

build:
	@echo "Building spin"
	spin build

web-dev:
	@echo "Starting web"
	cd web && yarn dev

web-build:
	@echo "Building web"
	cd web && yarn build

api-build:
	@echo "Building web"
	cd api && cargo build --target wasm32-wasi --release