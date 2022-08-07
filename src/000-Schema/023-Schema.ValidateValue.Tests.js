"use strict";

const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LQC = require( LIB_PATH.resolve( __dirname, '../liquicode-node.js' ) );


//---------------------------------------------------------------------
describe( `023) Schema.ValidateValue Tests`, function ()
{

	//---------------------------------------------------------------------
	it( `should validate boolean values`, function ()
	{
		let schema = LQC.Schema.ValueSchema( true );
		let result = null;

		// Validate proper booleans.
		result = LQC.Schema.ValidateValue( false, schema );
		LIB_ASSERT.strictEqual( result, false );
		result = LQC.Schema.ValidateValue( true, schema );
		LIB_ASSERT.strictEqual( result, true );

		// Validate improper booleans, without coercion.
		result = LQC.Schema.ValidateValue( 0, schema );
		LIB_ASSERT.strictEqual( LQC.Schema.IsErrorValue( result ), true );
		result = LQC.Schema.ValidateValue( 'blah', schema );
		LIB_ASSERT.strictEqual( LQC.Schema.IsErrorValue( result ), true );
		result = LQC.Schema.ValidateValue( { foo: 'bar' }, schema );
		LIB_ASSERT.strictEqual( LQC.Schema.IsErrorValue( result ), true );

		// Validate improper booleans, with coercion.
		result = LQC.Schema.ValidateValue( 0, schema, { coerce_values: true } );
		LIB_ASSERT.strictEqual( result, false );
		result = LQC.Schema.ValidateValue( '', schema, { coerce_values: true } );
		LIB_ASSERT.strictEqual( result, false );
		result = LQC.Schema.ValidateValue( 'blah', schema, { coerce_values: true } );
		LIB_ASSERT.strictEqual( result, true );
		result = LQC.Schema.ValidateValue( { foo: 'bar' }, schema, { coerce_values: true } );
		LIB_ASSERT.strictEqual( result, true );

		return;
	} );

	//---------------------------------------------------------------------
	it( `should validate number values`, function ()
	{
		let schema = LQC.Schema.ValueSchema( 3.14 );
		let result = null;

		// Validate proper numbers.
		result = LQC.Schema.ValidateValue( 0, schema );
		LIB_ASSERT.strictEqual( result, 0 );
		result = LQC.Schema.ValidateValue( 1, schema );
		LIB_ASSERT.strictEqual( result, 1 );
		result = LQC.Schema.ValidateValue( 3.14, schema );
		LIB_ASSERT.strictEqual( result, 3.14 );

		// Validate improper numbers, without coercion.
		result = LQC.Schema.ValidateValue( '', schema );
		LIB_ASSERT.strictEqual( LQC.Schema.IsErrorValue( result ), true );
		result = LQC.Schema.ValidateValue( '1', schema );
		LIB_ASSERT.strictEqual( LQC.Schema.IsErrorValue( result ), true );
		result = LQC.Schema.ValidateValue( '3.14', schema );
		LIB_ASSERT.strictEqual( LQC.Schema.IsErrorValue( result ), true );

		// Validate improper numbers, with coercion.
		result = LQC.Schema.ValidateValue( '', schema, { coerce_values: true } );
		LIB_ASSERT.strictEqual( result, 0 );
		result = LQC.Schema.ValidateValue( '1', schema, { coerce_values: true } );
		LIB_ASSERT.strictEqual( result, 1 );
		result = LQC.Schema.ValidateValue( '3.14', schema, { coerce_values: true } );
		LIB_ASSERT.strictEqual( result, 3.14 );

		return;
	} );

	//---------------------------------------------------------------------
	it( `should validate a JSON string value`, function ()
	{
		let schema = LQC.Schema.ValueSchema( {} );
		let result = null;

		// Attempt to validate without coercion.
		result = LQC.Schema.ValidateValue( '{"foo":"bar"}', schema );
		LIB_ASSERT.strictEqual( LQC.Schema.IsErrorValue( result ), true );

		// Attempt to validate with coercion.
		result = LQC.Schema.ValidateValue( '{"foo":"bar"}', schema, { coerce_values: true } );
		LIB_ASSERT.deepStrictEqual( result, { foo: 'bar' } );

		return;
	} );

	//---------------------------------------------------------------------
	return;
} );
