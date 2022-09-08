"use strict";


const LIB_FS = require( 'fs' );
const LIB_PATH = require( 'path' );
const LIB_CHILD_PROCESS = require( 'child_process' );

const BASE_PATH = LIB_PATH.resolve( __dirname, '..' );
const WEBPACK_CONFIG = LIB_PATH.resolve( BASE_PATH, 'build', 'webpack.config.js' );


//---------------------------------------------------------------------
function execute( Command, Environment )
{
	console.log( `Executing: ${Command}` );
	LIB_CHILD_PROCESS.execSync( Command, {
		env: Environment,
	},
		( error, stdout, stderror ) =>
		{
			// if any error while executing
			if ( error )
			{
				console.error( "Error: ", error );
				return;
			}

			console.log( stdout ); // output from stdout
			console.error( stderror ); // std errors
		}
	);
	return;
}


//---------------------------------------------------------------------
let filename = '';
console.log( `Building /docs ...` );

console.log( `Building 100-build-schema-docs ...` );
filename = LIB_PATH.join( __dirname, '100-build-schema-docs.js' );
execute( `node ${filename}` );

console.log( `Building 110-compile-html-docs ...` );
filename = LIB_PATH.join( __dirname, '110-compile-html-docs.js' );
execute( `node ${filename}` );

console.log( `Building 200-inject-jsdoc-tags ...` );
filename = LIB_PATH.join( __dirname, '200-inject-jsdoc-tags.js' );
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

console.log( `Copying [LICENSE] ...` );
{
	let from = LIB_PATH.join( BASE_PATH, 'LICENSE' );
	let to = LIB_PATH.join( BASE_PATH, 'dist', 'LICENSE' );
	LIB_FS.copyFileSync( from, to );
}

console.log( `Copying [VERSION] ...` );
{
	let from = LIB_PATH.join( BASE_PATH, 'VERSION' );
	let to = LIB_PATH.join( BASE_PATH, 'dist', 'VERSION' );
	LIB_FS.copyFileSync( from, to );
}

console.log( `Setting [TIMESTAMP] ...` );
{
	let to = LIB_PATH.join( BASE_PATH, 'dist', 'TIMESTAMP' );
	LIB_FS.writeFileSync( to, ( new Date() ).toISOString() );
}

console.log( `Build complete.` );
