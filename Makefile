install:
	npm install

publish:
	npm publish --dry-run

lint:
	npx lint .

gendiff:
	src/bin/gendiff.js

test-coverage:
	npm test -- --coverage --coverageProvider=v8
