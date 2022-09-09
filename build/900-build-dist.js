"use strict";


const LIB_FS = require( 'fs' );
const LIB_PATH = require( 'path' );
const LIB_CHILD_PROCESS = require( 'child_process' );

const BASE_FOLDER = LIB_PATH.resolve( __dirname, '..' );
const SOURCE_FOLDER = LIB_PATH.join( BASE_FOLDER, 'src' );
const DIST_FOLDER = LIB_PATH.join( BASE_FOLDER, 'dist' );
const DOCS_FOLDER = LIB_PATH.join( BASE_FOLDER, 'docs' );
const EXTERNAL_FOLDER = LIB_PATH.join( BASE_FOLDER, 'docs', 'external' );
const SCHEMA_FOLDER = LIB_PATH.join( BASE_FOLDER, 'docs', 'schema' );
const TEMPLATE_FOLDER = LIB_PATH.join( BASE_FOLDER, 'docs', 'templates' );

const WEBPACK_CONFIG = LIB_PATH.resolve( BASE_FOLDER, 'build', 'webpack.config.js' );


//---------------------------------------------------------------------
function execute( Command, Environment )
{
	console.log( `---------------------------------------------------------------------` );
	console.log( `Executing: ${Command}` );
	console.log( `---------------------------------------------------------------------` );
	let result = LIB_CHILD_PROCESS.execSync( Command, {
		// stdio: 'stdio',
		encoding: 'utf-8',
		env: Environment,
	} );
	console.log( result ); // output from stdout
	return;
}


//---------------------------------------------------------------------
let filename = '';
console.log( `Building /docs ...` );

console.log( `Building 100-build-docs ...` );
filename = LIB_PATH.join( __dirname, '100-build-docs.js' );
execute( `node ${filename}` );

console.log( `Building 200-inject-jsdoc-tags ...` );
filename = LIB_PATH.join( __dirname, '200-inject-jsdoc-tags.js' );
execute( `node ${filename}` );

console.log( `Building 300-build-testing-docs ...` );
filename = LIB_PATH.join( __dirname, '300-build-testing-docs.js' );
execute( `node ${filename}` );

console.log( `Building 400-publish-aws-docs ...` );
filename = LIB_PATH.join( __dirname, '400-publish-aws-docs.js' );
execute( `node ${filename}` );


//---------------------------------------------------------------------
console.log( `Building /dist ...` );

console.log( `Building es5 ...` );
execute( `npx webpack-cli --config ${WEBPACK_CONFIG}`, { WEBPACK_ENV: 'es5' } );

console.log( `Building es6 ...` );
execute( `npx webpack-cli --config ${WEBPACK_CONFIG}`, { WEBPACK_ENV: 'es6' } );

console.log( `Building node-min ...` );
execute( `npx webpack-cli --config ${WEBPACK_CONFIG}`, { WEBPACK_ENV: 'node-min' } );

console.log( `Building node ...` );
execute( `npx webpack-cli --config ${WEBPACK_CONFIG}`, { WEBPACK_ENV: 'node' } );


//---------------------------------------------------------------------
console.log( `Copying [LICENSE] ...` );
{
	let from = LIB_PATH.join( BASE_FOLDER, 'LICENSE' );
	let to = LIB_PATH.join( DIST_FOLDER, 'LICENSE' );
	LIB_FS.copyFileSync( from, to );
}

console.log( `Copying [VERSION] ...` );
{
	let from = LIB_PATH.join( BASE_FOLDER, 'VERSION' );
	let to = LIB_PATH.join( DIST_FOLDER, 'VERSION' );
	LIB_FS.copyFileSync( from, to );
}

console.log( `Setting [TIMESTAMP] ...` );
{
	let to = LIB_PATH.join( DIST_FOLDER, 'TIMESTAMP' );
	LIB_FS.writeFileSync( to, ( new Date() ).toISOString() );
}

console.log( `Build complete.` );
