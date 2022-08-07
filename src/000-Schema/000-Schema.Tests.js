"use strict";


const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LQC = require( LIB_PATH.resolve( __dirname, '../liquicode-node.js' ) );


//---------------------------------------------------------------------
describe( `000) Schema Module`, function ()
{

	//---------------------------------------------------------------------
	it( `should load the Schema module`, function ()
	{
		LIB_ASSERT.ok( LQC.Schema );
		return;
	} );

	//---------------------------------------------------------------------
	return;
} );