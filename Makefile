all: build

clean:
	rm -rf node_modules public package-lock.json

build: node_modules
	node build.mjs

build-demo:
	BASE_URL="/metalsmith-blog-example-demo/" DOMAIN="borisovg.github.io" make build

serve: build
	npx http-server public/

node_modules: package.json
	npm update || (rm -rf $@; exit 1)
	touch $@
