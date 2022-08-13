"use strict";


const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LQC = require( LIB_PATH.resolve( __dirname, '../liquicode-node.js' ) );


//---------------------------------------------------------------------
describe( `000) Types Module`, function ()
{

	//---------------------------------------------------------------------
	it( `should load the Types module`, function ()
	{
		LIB_ASSERT.ok( LQC.Types );
		return;
	} );

	//---------------------------------------------------------------------
	return;
} );
