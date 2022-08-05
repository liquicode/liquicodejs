"use strict";

const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LQC = require( LIB_PATH.resolve( __dirname, '../liquicode-node.js' ) );


//---------------------------------------------------------------------
describe( `001-Core.FieldSchema Tests`, function ()
{

	//---------------------------------------------------------------------
	it( `should create a field schema for a boolean`, function ()
	{
		let schema = LQC.Core.FieldSchema( false );
		LIB_ASSERT.strictEqual( schema.name, '' );
		LIB_ASSERT.strictEqual( schema.type, 'boolean' );
		LIB_ASSERT.strictEqual( schema.format, '' );
		LIB_ASSERT.strictEqual( schema.required, false );
		LIB_ASSERT.strictEqual( schema.default, undefined );
		LIB_ASSERT.strictEqual( schema.description, '' );
		LIB_ASSERT.strictEqual( schema.examples, '' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should create a field schema for a number`, function ()
	{
		let schema = LQC.Core.FieldSchema( 3.14 );
		LIB_ASSERT.strictEqual( schema.name, '' );
		LIB_ASSERT.strictEqual( schema.type, 'number' );
		LIB_ASSERT.strictEqual( schema.format, '' );
		LIB_ASSERT.strictEqual( schema.required, false );
		LIB_ASSERT.strictEqual( schema.default, undefined );
		LIB_ASSERT.strictEqual( schema.description, '' );
		LIB_ASSERT.strictEqual( schema.examples, '' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should create a field schema for a string`, function ()
	{
		let schema = LQC.Core.FieldSchema( 'Hello, World!' );
		LIB_ASSERT.strictEqual( schema.name, '' );
		LIB_ASSERT.strictEqual( schema.type, 'string' );
		LIB_ASSERT.strictEqual( schema.format, '' );
		LIB_ASSERT.strictEqual( schema.required, false );
		LIB_ASSERT.strictEqual( schema.default, undefined );
		LIB_ASSERT.strictEqual( schema.description, '' );
		LIB_ASSERT.strictEqual( schema.examples, '' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should create a field schema for an array`, function ()
	{
		let schema = LQC.Core.FieldSchema( [ 1, 2, 3 ] );
		LIB_ASSERT.strictEqual( schema.name, '' );
		LIB_ASSERT.strictEqual( schema.type, 'object' );
		LIB_ASSERT.strictEqual( schema.format, '' );
		LIB_ASSERT.strictEqual( schema.required, false );
		LIB_ASSERT.strictEqual( schema.default, undefined );
		LIB_ASSERT.strictEqual( schema.description, '' );
		LIB_ASSERT.strictEqual( schema.examples, '' );
		return;
	} );

	//---------------------------------------------------------------------
	return;
} );
