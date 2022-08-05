"use strict";


const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LQC = require( LIB_PATH.resolve( __dirname, '../../src/liquicode-node.js' ) );


//---------------------------------------------------------------------
describe( `000) Core Module`, function ()
{

	//---------------------------------------------------------------------
	it( `should load the Core module`, function ()
	{
		LIB_ASSERT.ok( LQC.Core );
		return;
	} );

	//---------------------------------------------------------------------
	return;
} );
