"use strict";


const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LQC = require( LIB_PATH.resolve( __dirname, '../liquicode-node.js' ) );


//---------------------------------------------------------------------
describe( `500) Token Tests`, function ()
{

	//---------------------------------------------------------------------
	it( `should load the Token module`, function ()
	{
		LIB_ASSERT.ok( LQC.Token );
		return;
	} );

	//---------------------------------------------------------------------
	return;
} );
