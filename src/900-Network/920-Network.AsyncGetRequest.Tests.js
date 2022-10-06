"use strict";


const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LQC = require( LIB_PATH.resolve( __dirname, '../liquicode-node.js' ) );
const TEST_DATA_FOLDER = LIB_PATH.resolve( __dirname, '../../tests/_test-data/folders' );


//---------------------------------------------------------------------
describe( `920) Network.AsyncGetRequest Tests`, function ()
{

	//---------------------------------------------------------------------
	it( `should make a simple request`, async function ()
	{
		let result = await LQC.Network.AsyncGetRequest( 'http://google.com' );
		LIB_ASSERT.ok( result );
		LIB_ASSERT.ok( result.startsWith( '<HTML><HEAD>' ) );
		return;
	} );

	//---------------------------------------------------------------------
	return;
} );
