.PHONY: help install build stub fmt lint typecheck test check clean ci

.DEFAULT_GOAL := help

# build, lint, typecheck, test, and check run through Turborepo. A task whose
# inputs did not change since the last run is replayed from .turbo/cache.

help: ## Show the available commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-12s\033[0m %s\n", $$1, $$2}'

install: ## Install the dependencies
	pnpm install

build: ## Build to .dist with unbuild
	pnpm turbo run build

stub: ## Make a stub build for local development
	pnpm stub

fmt: ## Format the source with oxfmt
	pnpm fmt

lint: ## Run oxlint and check the format
	pnpm turbo run lint fmt:check

typecheck: ## Run the type check
	pnpm turbo run typecheck

test: ## Run the test suite
	pnpm turbo run test

check: ## Run lint, format check, typecheck, test, and build
	pnpm check

clean: ## Remove the build output and caches
	rm -rf .dist .coverage .turbo node_modules/.cache

ci: clean install check ## Run clean, install, and check
