"use strict";


const LIB_FS = require( 'fs' );
const LIB_PATH = require( 'path' );


const SOURCE_FOLDER = LIB_PATH.resolve( __dirname, '..', 'src' );
const LQC = require( LIB_PATH.join( SOURCE_FOLDER, 'liquicode-node.js' ) );


//---------------------------------------------------------------------
let schema_doc = { schema: [] };
let count_total_files = 0;
let count_files_with_errors = 0;
let count_files_processed = 0;
LQC.File.Visit( SOURCE_FOLDER, '*.js', true,
	function ( Folder, Filename )
	{
		if ( !Filename ) { return; }
		if ( Filename.endsWith( '.Tests.js' ) ) { return; }
		let file_path = LIB_PATH.join( Folder, Filename );
		try
		{
			// Load the schema.
			let source = require( file_path );
			if ( typeof source !== 'function' ) { throw new Error( `File is not a Liquicode module [${file_path}].` ); }
			let schema = source( LQC )._Schema;
			if ( !schema ) { throw new Error( `File has no schema [${file_path}].` ); }
			count_total_files++;

			// Process the schema
			schema.source_filename = file_path.substring( SOURCE_FOLDER.length + 1 );
			schema_doc.schema.push( schema );
			count_files_processed++;
			console.log( file_path + ' ... OK' );
		}
		catch ( error )
		{
			console.log( file_path + ' ... ERROR' );
			console.error( error.message );
			count_files_with_errors++;
		}
		return;
	} );


console.log( `Total Files        : ${count_total_files}` );
console.log( `Files with Errors  : ${count_files_with_errors}` );
console.log( `Files Processed    : ${count_files_processed}` );

// Update the schema document.
{
	let filename = LIB_PATH.resolve( __dirname, '..', 'docs' );
	filename = LIB_PATH.join( filename, 'liquicodejs.schema.json' );
	LIB_FS.writeFileSync( filename, JSON.stringify( schema_doc, null, '    ' ) );
	console.log( `Updated schema file [${filename}].` );
}
