"use strict";


const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LQC = require( LIB_PATH.resolve( __dirname, '../liquicode-node.js' ) );


//---------------------------------------------------------------------
describe( `200) Text Module`, function ()
{

	//---------------------------------------------------------------------
	it( `should load the Text module`, function ()
	{
		LIB_ASSERT.ok( LQC.Text );
		return;
	} );

	//---------------------------------------------------------------------
	return;
} );
