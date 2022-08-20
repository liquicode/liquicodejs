"use strict";


const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LQC = require( LIB_PATH.resolve( __dirname, '../liquicode-node.js' ) );


//---------------------------------------------------------------------
describe( `300) Shapes Module`, function ()
{

	//---------------------------------------------------------------------
	it( `should load the Shapes module`, function ()
	{
		LIB_ASSERT.ok( LQC.Shapes );
		return;
	} );

	//---------------------------------------------------------------------
	return;
} );
