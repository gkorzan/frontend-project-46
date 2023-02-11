.PHONY: install publish lint link
install: 
	npm ci

publish:
	npm publish --dry-run

link:
	npm link

lint:
	npx eslint .