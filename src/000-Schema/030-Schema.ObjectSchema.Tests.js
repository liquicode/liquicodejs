"use strict";

const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LQC = require( LIB_PATH.resolve( __dirname, '../liquicode-node.js' ) );


//---------------------------------------------------------------------
describe( `030) Schema.ObjectSchema Tests`, function ()
{

	//---------------------------------------------------------------------
	it( `should get an empty FieldSchema array when passing undefined`, function ()
	{
		let schemas = LQC.Schema.ObjectSchema();
		LIB_ASSERT.ok( schemas );
		LIB_ASSERT.ok( Array.isArray( schemas ) );
		LIB_ASSERT.strictEqual( schemas.length, 0 );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should get an empty FieldSchema array when passing null`, function ()
	{
		let schemas = LQC.Schema.ObjectSchema();
		LIB_ASSERT.ok( schemas );
		LIB_ASSERT.ok( Array.isArray( schemas ) );
		LIB_ASSERT.strictEqual( schemas.length, 0 );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should get FieldSchema for object fields`, function ()
	{
		let test_object = {
			boolean: true,
			integer: 42,
			float: 3.14,
			string: 'blah',
			object: { foo: 'bar' },
			array: [ 1, 2, 3 ],
		};

		let schemas = LQC.Schema.ObjectSchema( test_object );
		LIB_ASSERT.ok( schemas );
		LIB_ASSERT.ok( Array.isArray( schemas ) );
		LIB_ASSERT.strictEqual( schemas.length, 6 );
		LIB_ASSERT.deepStrictEqual( schemas, [
			{
				name: 'boolean',
				type: 'boolean',
				format: 'boolean',
				default: undefined,
			},
			{
				name: 'integer',
				type: 'number',
				format: 'integer',
				default: undefined,
			},
			{
				name: 'float',
				type: 'number',
				format: 'float',
				default: undefined,
			},
			{
				name: 'string',
				type: 'string',
				format: 'string',
				default: undefined,
			},
			{
				name: 'object',
				type: 'object',
				format: 'object',
				default: undefined,
			},
			{
				name: 'array',
				type: 'object',
				format: 'number-array',
				default: undefined,
			},
		] );
		return;
	} );

	//---------------------------------------------------------------------
	return;
} );
