"use strict";


const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LQC = require( LIB_PATH.resolve( __dirname, '../../src/liquicode-node.js' ) );


//---------------------------------------------------------------------
describe( `000) Json Module`, function ()
{

	//---------------------------------------------------------------------
	it( `should load the Json module`, function ()
	{
		LIB_ASSERT.ok( LQC.Json );
		return;
	} );

	//---------------------------------------------------------------------
	return;
} );