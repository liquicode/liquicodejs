"use strict";

const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LQC = require( LIB_PATH.resolve( __dirname, '../liquicode-node.js' ) );


//---------------------------------------------------------------------
describe( `020) Schema.ValueSchema Tests`, function ()
{

	//---------------------------------------------------------------------
	it( `should create an empty field schema for undefined`, function ()
	{
		let schema = LQC.Schema.ValueSchema();
		LIB_ASSERT.strictEqual( schema.type, '' );
		LIB_ASSERT.strictEqual( schema.format, '' );
		LIB_ASSERT.strictEqual( schema.default, undefined );
		// LIB_ASSERT.strictEqual( schema.name, '' );
		// LIB_ASSERT.strictEqual( schema.required, false );
		// LIB_ASSERT.strictEqual( schema.description, '' );
		// LIB_ASSERT.strictEqual( schema.examples, '' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should create an empty field schema for null`, function ()
	{
		let schema = LQC.Schema.ValueSchema( null );
		LIB_ASSERT.strictEqual( schema.type, '' );
		LIB_ASSERT.strictEqual( schema.format, '' );
		LIB_ASSERT.strictEqual( schema.default, undefined );
		// LIB_ASSERT.strictEqual( schema.name, '' );
		// LIB_ASSERT.strictEqual( schema.required, false );
		// LIB_ASSERT.strictEqual( schema.description, '' );
		// LIB_ASSERT.strictEqual( schema.examples, '' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should create a field schema for a boolean`, function ()
	{
		let schema = LQC.Schema.ValueSchema( false );
		LIB_ASSERT.strictEqual( schema.type, 'boolean' );
		LIB_ASSERT.strictEqual( schema.format, 'boolean' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should create a field schema for an integer number`, function ()
	{
		let schema = LQC.Schema.ValueSchema( 42 );
		LIB_ASSERT.strictEqual( schema.type, 'number' );
		LIB_ASSERT.strictEqual( schema.format, 'integer' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should create a field schema for a float number`, function ()
	{
		let schema = LQC.Schema.ValueSchema( 3.14 );
		LIB_ASSERT.strictEqual( schema.type, 'number' );
		LIB_ASSERT.strictEqual( schema.format, 'float' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should create a field schema for a string`, function ()
	{
		let schema = LQC.Schema.ValueSchema( 'Hello, World!' );
		LIB_ASSERT.strictEqual( schema.type, 'string' );
		LIB_ASSERT.strictEqual( schema.format, 'string' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should create a field schema for an object`, function ()
	{
		let schema = LQC.Schema.ValueSchema( { foo: 'bar' } );
		LIB_ASSERT.strictEqual( schema.type, 'object' );
		LIB_ASSERT.strictEqual( schema.format, 'object' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should create a field schema for an array of booleans`, function ()
	{
		let schema = LQC.Schema.ValueSchema( [ true, false, true ] );
		LIB_ASSERT.strictEqual( schema.type, 'object' );
		LIB_ASSERT.strictEqual( schema.format, 'boolean-array' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should create a field schema for an array of numbers`, function ()
	{
		let schema = LQC.Schema.ValueSchema( [ 1, 2, 3.14 ] );
		LIB_ASSERT.strictEqual( schema.type, 'object' );
		LIB_ASSERT.strictEqual( schema.format, 'number-array' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should create a field schema for an array of strings`, function ()
	{
		let schema = LQC.Schema.ValueSchema( [ 'one', 'two', 'three' ] );
		LIB_ASSERT.strictEqual( schema.type, 'object' );
		LIB_ASSERT.strictEqual( schema.format, 'string-array' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should create a field schema for an array of objects`, function ()
	{
		let schema = LQC.Schema.ValueSchema( [ { foo: 'bar' }, {}, null ] );
		LIB_ASSERT.strictEqual( schema.type, 'object' );
		LIB_ASSERT.strictEqual( schema.format, 'object-array' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should create a field schema for an array of arrays`, function ()
	{
		let schema = LQC.Schema.ValueSchema( [ [ [ 1, 2, 3 ], [], [ 4, 5 ] ] ] );
		LIB_ASSERT.strictEqual( schema.type, 'object' );
		LIB_ASSERT.strictEqual( schema.format, 'array-array' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should create a field schema for a mixed array`, function ()
	{
		let schema = LQC.Schema.ValueSchema( [ 1, 'two', 3.14 ] );
		LIB_ASSERT.strictEqual( schema.type, 'object' );
		LIB_ASSERT.strictEqual( schema.format, 'array' );
		return;
	} );

	//---------------------------------------------------------------------
	return;
} );
