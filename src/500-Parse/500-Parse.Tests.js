"use strict";


const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LQC = require( LIB_PATH.resolve( __dirname, '../liquicode-node.js' ) );


//---------------------------------------------------------------------
describe( `500) Parse Tests`, function ()
{

	//---------------------------------------------------------------------
	it( `should load the Parse module`, function ()
	{
		LIB_ASSERT.ok( LQC.Parse );
		return;
	} );

	//---------------------------------------------------------------------
	return;
} );
