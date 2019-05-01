.PHONY: help

help: ## This help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

build: ## Build the container
	@echo "Building Container"
	@docker-compose build

up: ## Start the container
	@echo "Starting Container"
	@docker-compose up -d --build

down: ## Bring Down the container
	@echo "Stopping Container"
	@docker-compose down

clean: ## Remove the container with volume
	@echo "Removing Container"
	@docker-compose down -v