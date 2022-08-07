"use strict";

const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LQC = require( LIB_PATH.resolve( __dirname, '../liquicode-node.js' ) );


//---------------------------------------------------------------------
describe( `031) Schema.ValidateValues Tests`, function ()
{

	let rainbow_test_object = {
		boolean: true,
		integer: 42,
		float: 3.14,
		string: 'blah',
		object: { foo: 'bar' },
		array: [ 1, 2, 3 ],
	};
	let rainbow_schemas = null;

	//---------------------------------------------------------------------
	it( `should calculate rainbow schemas`, function ()
	{
		// Get the schemas.
		rainbow_schemas = LQC.Schema.ObjectSchema( rainbow_test_object );
		LIB_ASSERT.ok( rainbow_schemas );
		LIB_ASSERT.ok( Array.isArray( rainbow_schemas ) );
		LIB_ASSERT.strictEqual( rainbow_schemas.length, 6 );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should validate rainbow values`, function ()
	{
		// Try to validate an object against its own schema.
		let validation_result = LQC.Schema.ValidateValues( rainbow_test_object, rainbow_schemas );
		LIB_ASSERT.strictEqual( validation_result.field_count, 6 );
		LIB_ASSERT.strictEqual( validation_result.validation_errors.length, 0 );
		LIB_ASSERT.strictEqual( validation_result.coerced_values.length, 6 );
		// - Coerced values should be identical to the original values.
		LIB_ASSERT.deepStrictEqual( validation_result.coerced_values, Object.values( rainbow_test_object ) );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should validate and coerce string values`, function ()
	{
		// Try to coerce from strings.
		let string_values = [
			'true',
			'42',
			'3.14',
			'blah',
			'{ "foo": "bar" }',
			'[ 1, 2, 3 ]',
		];
		let validation_result = LQC.Schema.ValidateValues( string_values, rainbow_schemas );
		LIB_ASSERT.strictEqual( validation_result.field_count, 6 );
		LIB_ASSERT.strictEqual( validation_result.validation_errors.length, 0 );
		LIB_ASSERT.strictEqual( validation_result.coerced_values.length, 6 );
		// - Coerced values should be identical to the original values.
		LIB_ASSERT.deepStrictEqual( validation_result.coerced_values, Object.values( rainbow_test_object ) );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should validate and coerce undefined values`, function ()
	{
		// Try to coerce from undefined values.
		let validation_result = LQC.Schema.ValidateValues( [], rainbow_schemas );
		LIB_ASSERT.strictEqual( validation_result.field_count, 6 );
		LIB_ASSERT.strictEqual( validation_result.validation_errors.length, 6 );
		LIB_ASSERT.strictEqual( validation_result.coerced_values.length, 6 );
		// - Coerced values should be identical to the original values.
		LIB_ASSERT.deepStrictEqual( validation_result.coerced_values,
			[ undefined, undefined, undefined, undefined, undefined, undefined, ] );
		return;
	} );

	//---------------------------------------------------------------------
	return;
} );
