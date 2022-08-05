"use strict";


const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LQC = require( LIB_PATH.resolve( __dirname, '../liquicode-node.js' ) );


//---------------------------------------------------------------------
describe( `400) Date Tests`, function ()
{

	//---------------------------------------------------------------------
	it( `should load the Date module`, function ()
	{
		LIB_ASSERT.ok( LQC.Date );
		return;
	} );

	//---------------------------------------------------------------------
	return;
} );
