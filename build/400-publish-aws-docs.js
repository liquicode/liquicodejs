"use strict";

const LIB_FS = require( 'fs' );
const LIB_PATH = require( 'path' );
const LIB_CHILD_PROCESS = require( 'child_process' );

const LIB_MARKED = require( 'marked' );
const LIB_PUG = require( 'pug' );

const BASE_FOLDER = LIB_PATH.resolve( __dirname, '..' );
const SOURCE_FOLDER = LIB_PATH.join( BASE_FOLDER, 'src' );
const DOCS_FOLDER = LIB_PATH.join( BASE_FOLDER, 'docs' );
const EXTERNAL_FOLDER = LIB_PATH.join( BASE_FOLDER, 'docs', 'external' );
const SCHEMA_FOLDER = LIB_PATH.join( BASE_FOLDER, 'docs', 'schema' );
const TEMPLATE_FOLDER = LIB_PATH.join( BASE_FOLDER, 'docs', 'templates' );

const LQC = require( LIB_PATH.join( SOURCE_FOLDER, 'liquicode-node.js' ) );

const AWS_BUCKET = 'liquicodejs.liquicode.com';


//---------------------------------------------------------------------
function execute( Command, Environment )
{
	console.log( `---------------------------------------------------------------------` );
	console.log( `Executing: ${Command}` );
	console.log( `---------------------------------------------------------------------` );
	let result = LIB_CHILD_PROCESS.execSync( Command, {
		encoding: 'utf-8',
		env: Environment,
	} );
	console.log( result ); // output from stdout
	return;
}



//=====================================================================
// - Runs tests and store output in docs/external/testing-output.md:
//		`npx mocha -u bdd tests/*.js --timeout 0 --slow 10`
//=====================================================================
{
	let result = execute( `aws s3 sync ${DOCS_FOLDER} s3://${AWS_BUCKET}`, { AWS_PROFILE: 'admin' } );
}

