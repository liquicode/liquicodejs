"use strict";

const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LQC = require( LIB_PATH.resolve( __dirname, '../liquicode-node.js' ) );


//---------------------------------------------------------------------
describe( `011) Schema.IsErrorValue Tests`, function ()
{

	//---------------------------------------------------------------------
	it( `should detect an empty ErrorValue`, function ()
	{
		let value = { ok: false, error: '' };
		LIB_ASSERT.strictEqual( LQC.Schema.IsErrorValue( value ), true );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should detect a default ErrorValue`, function ()
	{
		let value = LQC.Schema.ErrorValue();
		LIB_ASSERT.strictEqual( LQC.Schema.IsErrorValue( value ), true );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should detect a custom ErrorValue`, function ()
	{
		let value = LQC.Schema.ErrorValue( 'My Error' );
		LIB_ASSERT.strictEqual( LQC.Schema.IsErrorValue( value ), true );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should detect a custom ErrorValue with a Context`, function ()
	{
		let value = LQC.Schema.ErrorValue( 'My Error', 'My Context' );
		LIB_ASSERT.strictEqual( LQC.Schema.IsErrorValue( value ), true );
		return;
	} );

	//---------------------------------------------------------------------
	return;
} );
