all: build

build:
	node build.mjs

build-demo:
	BASE_URL="/metalsmith-blog-example-demo/" DOMAIN="borisovg.github.io" make build

serve: build
	npx http-server public/