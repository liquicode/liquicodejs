"use strict";


const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LQC = require( LIB_PATH.resolve( __dirname, '../../src/liquicode-node.js' ) );


//---------------------------------------------------------------------
describe( `200) String Module`, function ()
{

	//---------------------------------------------------------------------
	it( `should load the String module`, function ()
	{
		LIB_ASSERT.ok( LQC.String );
		return;
	} );

	//---------------------------------------------------------------------
	return;
} );
