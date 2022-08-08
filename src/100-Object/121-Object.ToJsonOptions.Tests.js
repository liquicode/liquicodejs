"use strict";


const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LQC = require( LIB_PATH.resolve( __dirname, '../liquicode-node.js' ) );


//---------------------------------------------------------------------
describe( `121) Object.ToJsonOptions Tests`, function ()
{

	//---------------------------------------------------------------------
	it( `should load the default options`, function ()
	{
		let options = LQC.Object.ToJsonOptions();
		LIB_ASSERT.ok( options );
		return;
	} );

	//---------------------------------------------------------------------
	return;
} );
