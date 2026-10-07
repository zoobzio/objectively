.PHONY: help install build stub fmt lint typecheck test check clean ci

.DEFAULT_GOAL := help

help: ## Show the available commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-12s\033[0m %s\n", $$1, $$2}'

install: ## Install the dependencies
	pnpm install

build: ## Build to .dist with unbuild
	pnpm build

stub: ## Make a stub build for local development
	pnpm stub

fmt: ## Format the source with oxfmt
	pnpm fmt

lint: ## Run oxlint and check the format
	pnpm lint
	pnpm fmt:check

typecheck: ## Run the type check
	pnpm typecheck

test: ## Run the test suite
	pnpm test

check: lint typecheck test ## Run lint, typecheck, and test

clean: ## Remove the build output and caches
	rm -rf .dist .coverage node_modules/.cache

ci: clean install check build ## Run clean, install, check, and build
