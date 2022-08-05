"use strict";


const LQC = require( LIB_PATH.resolve( __dirname, '../../src/liquicode-node.js' ) );


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
