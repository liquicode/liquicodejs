"use strict";


const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LQC = require( LIB_PATH.resolve( __dirname, '../../src/liquicode-node.js' ) );


//---------------------------------------------------------------------
describe( `100) Object Module`, function ()
{

	//---------------------------------------------------------------------
	it( `should load the Object module`, function ()
	{
		LIB_ASSERT.ok( LQC.Object );
		return;
	} );

	//---------------------------------------------------------------------
	return;
} );
