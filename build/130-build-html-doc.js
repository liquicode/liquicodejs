"use strict";


const LIB_FS = require( 'fs' );
const LIB_PATH = require( 'path' );
const LIB_CHILD_PROCESS = require( 'child_process' );

const BASE_FOLDER = LIB_PATH.resolve( __dirname, '..' );
const SOURCE_FOLDER = LIB_PATH.join( BASE_FOLDER, 'src' );


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
console.log( `Building liquicodejs.html ...` );

execute( `npx pug-cli docs\\liquicodejs.pug --pretty --obj docs\\liquicodejs.schema.json`, {} );

console.log( `Build complete.` );
