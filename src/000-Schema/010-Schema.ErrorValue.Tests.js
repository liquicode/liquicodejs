"use strict";

const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LQC = require( LIB_PATH.resolve( __dirname, '../liquicode-node.js' ) );


//---------------------------------------------------------------------
describe( `010) Schema.ErrorValue Tests`, function ()
{

	//---------------------------------------------------------------------
	it( `should create an ErrorValue when called with no parameters`, function ()
	{
		let value = LQC.Schema.ErrorValue();
		LIB_ASSERT.strictEqual( value.ok, false );
		LIB_ASSERT.strictEqual( value.error, 'error' );
		LIB_ASSERT.strictEqual( value.context, undefined );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should create an ErrorValue when called with only a message`, function ()
	{
		let value = LQC.Schema.ErrorValue( 'My Error' );
		LIB_ASSERT.strictEqual( value.ok, false );
		LIB_ASSERT.strictEqual( value.error, 'My Error' );
		LIB_ASSERT.strictEqual( value.context, undefined );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should create an ErrorValue when called without a message`, function ()
	{
		let value = LQC.Schema.ErrorValue( '', 'Some Context' );
		LIB_ASSERT.strictEqual( value.ok, false );
		LIB_ASSERT.strictEqual( value.error, 'error' );
		LIB_ASSERT.strictEqual( value.context, 'Some Context' );
		return;
	} );

	//---------------------------------------------------------------------
	return;
} );
