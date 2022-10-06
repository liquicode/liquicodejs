"use strict";


const LIB_FS = require( 'fs' );
const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LQC = require( LIB_PATH.resolve( __dirname, '../liquicode-node.js' ) );
const TEST_DATA_FOLDER = LIB_PATH.resolve( __dirname, '../../tests/_test-data/folders' );


//---------------------------------------------------------------------
describe( `910) Network.AsyncDownloadFile Tests`, function ()
{

	//---------------------------------------------------------------------
	it( `should download a single file`, async function ()
	{
		let url = 'https://www.w3schools.com/w3css/4/w3.css';
		let filename = LIB_PATH.join( __dirname, '910-testfile' );
		if ( LIB_FS.existsSync( filename ) ) { LIB_FS.unlinkSync( filename ); }
		let result = await LQC.Network.AsyncDownloadFile( url, filename );
		LIB_ASSERT.ok( result );
		LIB_ASSERT.ok( LIB_FS.existsSync( filename ) );
		LIB_FS.unlinkSync( filename );
		return;
	} );

	//---------------------------------------------------------------------
	return;
} );
