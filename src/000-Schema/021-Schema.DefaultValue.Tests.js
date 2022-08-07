"use strict";

const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LQC = require( LIB_PATH.resolve( __dirname, '../liquicode-node.js' ) );


//---------------------------------------------------------------------
describe( `021) Schema.DefaultValue Tests`, function ()
{

	//---------------------------------------------------------------------
	it( `should throw an error when Schema is undefined`, function ()
	{
		let result = LQC.Schema.DefaultValue();
		LIB_ASSERT.strictEqual( LQC.Schema.IsErrorValue( result ), true );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should throw an error when Schema is null`, function ()
	{
		let schema = null;
		let result = LQC.Schema.DefaultValue( schema );
		LIB_ASSERT.strictEqual( LQC.Schema.IsErrorValue( result ), true );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should return the default value of a boolean`, function ()
	{
		let schema = LQC.Schema.ValueSchema( true );
		LIB_ASSERT.strictEqual( LQC.Schema.DefaultValue( schema ), false );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should return the default value of a number`, function ()
	{
		let schema = LQC.Schema.ValueSchema( 1 );
		LIB_ASSERT.strictEqual( LQC.Schema.DefaultValue( schema ), 0 );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should return the default value of a string`, function ()
	{
		let schema = LQC.Schema.ValueSchema( 'blah' );
		LIB_ASSERT.strictEqual( LQC.Schema.DefaultValue( schema ), '' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should return the default value of an object`, function ()
	{
		let schema = LQC.Schema.ValueSchema( {} );
		LIB_ASSERT.deepStrictEqual( LQC.Schema.DefaultValue( schema ), {} );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should return the default value of an array`, function ()
	{
		let schema = LQC.Schema.ValueSchema( [] );
		LIB_ASSERT.deepStrictEqual( LQC.Schema.DefaultValue( schema ), [] );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should return a custom default value`, function ()
	{
		let schema = LQC.Schema.ValueSchema( 1 );
		schema.default = 'woo-hoo!';
		LIB_ASSERT.strictEqual( LQC.Schema.DefaultValue( schema ), 'woo-hoo!' );
		return;
	} );

	//---------------------------------------------------------------------
	return;
} );
