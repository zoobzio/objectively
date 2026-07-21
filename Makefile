.PHONY: help install build stub lint typecheck test check clean ci

.DEFAULT_GOAL := help

help: ## Show available commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-12s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies
	pnpm install

build: ## Build to .dist via unbuild
	pnpm build

stub: ## Stub the build for local dev (unbuild --stub)
	pnpm stub

lint: ## Run ESLint
	pnpm lint

typecheck: ## Run type checking (tsc --noEmit)
	pnpm typecheck

test: ## Run the test suite
	pnpm test

check: lint typecheck test ## Run lint, typecheck, and tests

clean: ## Remove build output and caches
	rm -rf .dist .coverage node_modules/.cache

ci: clean install check build ## Full CI simulation
