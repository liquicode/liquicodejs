
# LiquicodeJS Build


- `100-build-docs.js`
	- Compiles the schema from the source code and writes it to a number of files:
		- `/docs/schema/liquicode.schema.json`
		- `/docs/schema/liquicode.schema.js`
		- `/docs/schema/liquicode.schema.md`
		- `/docs/schema/liquicode.schema.html`
	- Compile the pug templates found in `/docs/templates` with the schema.
		- Generates: `/docs/liquicode.html`
	- Copies external files:
		- `/docs/external/LICENSE`
		- `/docs/external/VERSION`
	- Writes the build timestamp to `/docs/external/TIMESTAMP`


- `200-inject-jsdoc-tags.js`
	- Compiles the schema found in the source code and updates the JSDoc comments for each function.


- `300-build-test-docs.js`
	- Runs all mocha tests and saves output to `/docs/external/testing-output.md`


- `900-build-dist.js`
	- Executes:
		- `100-build-docs.js`
		- `200-inject-jsdoc-tags.js`
		- `300-build-test-docs.js`
	- Builds webpack for
		- `/dist/es5`
		- `/dist/es6`
		- `/dist/node`
		- `/dist/node-min`
	- Copies external files:
		- `/dist/LICENSE`
		- `/dist/VERSION`
	- Writes the build timestamp to `/dist/TIMESTAMP`


- `910-release-version.js`

