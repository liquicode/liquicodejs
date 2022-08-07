"use strict";

const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LQC = require( LIB_PATH.resolve( __dirname, '../liquicode-node.js' ) );


//---------------------------------------------------------------------
describe( `022) Schema.CoerceValue Tests`, function ()
{

	//---------------------------------------------------------------------
	// Coerce To a Boolean
	//---------------------------------------------------------------------


	describe( `Coerce To a Boolean`, function ()
	{
		let schema = LQC.Schema.ValueSchema( true );

		//---------------------------------------------------------------------
		it( `should coerce from undefined to boolean`, function ()
		{
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( undefined, schema ), false );
			return;
		} );

		//---------------------------------------------------------------------
		it( `should coerce from null to boolean`, function ()
		{
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( null, schema ), false );
			return;
		} );

		//---------------------------------------------------------------------
		it( `should coerce from a boolean to boolean`, function ()
		{
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( false, schema ), false );
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( true, schema ), true );
			return;
		} );

		//---------------------------------------------------------------------
		it( `should coerce from a number to boolean`, function ()
		{
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( 0, schema ), false );
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( 1, schema ), true );
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( -1, schema ), true );
			return;
		} );

		//---------------------------------------------------------------------
		it( `should coerce from a string to boolean`, function ()
		{
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( '', schema ), false );
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( 'true', schema ), true );
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( 'false', schema ), true );
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( 'text', schema ), true );
			return;
		} );

		//---------------------------------------------------------------------
		it( `should coerce from an object to boolean`, function ()
		{
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( null, schema ), false );
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( {}, schema ), true );
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( { foor: 'bar' }, schema ), true );
			return;
		} );

		return;
	} );


	//---------------------------------------------------------------------
	// Coerce To an Integer Number
	//---------------------------------------------------------------------


	describe( `Coerce To an Integer Number`, function ()
	{
		let schema = LQC.Schema.ValueSchema( 1 );

		//---------------------------------------------------------------------
		it( `should coerce from undefined to an integer number`, function ()
		{
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( undefined, schema ), 0 );
			return;
		} );

		//---------------------------------------------------------------------
		it( `should coerce from null to an integer number`, function ()
		{
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( null, schema ), 0 );
			return;
		} );

		//---------------------------------------------------------------------
		it( `should coerce from a boolean to an integer number`, function ()
		{
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( false, schema ), 0 );
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( true, schema ), 1 );
			return;
		} );

		//---------------------------------------------------------------------
		it( `should coerce from a number to an integer number`, function ()
		{
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( 0, schema ), 0 );
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( 1, schema ), 1 );
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( -1, schema ), -1 );
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( 3.14, schema ), 3 );
			return;
		} );

		//---------------------------------------------------------------------
		it( `should coerce from a string to an integer number`, function ()
		{
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( '', schema ), 0 );
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( 'blah', schema ), 0 );
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( '0', schema ), 0 );
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( '1', schema ), 1 );
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( '-1', schema ), -1 );
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( '3.14', schema ), 3 );
			return;
		} );

		//---------------------------------------------------------------------
		it( `should throw error on coerce from an object to an integer number`, function ()
		{
			let result = LQC.Schema.CoerceValue( {}, schema );
			LIB_ASSERT.strictEqual( LQC.Schema.IsErrorValue( result ), true );
			return;
		} );

		return;
	} );


	//---------------------------------------------------------------------
	// Coerce To a Float Number
	//---------------------------------------------------------------------


	describe( `Coerce To a Float Number`, function ()
	{
		let schema = LQC.Schema.ValueSchema( 3.14 );

		//---------------------------------------------------------------------
		it( `should coerce from undefined to a float number`, function ()
		{
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( undefined, schema ), 0 );
			return;
		} );

		//---------------------------------------------------------------------
		it( `should coerce from null to a float number`, function ()
		{
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( null, schema ), 0 );
			return;
		} );

		//---------------------------------------------------------------------
		it( `should coerce from a boolean to a float number`, function ()
		{
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( false, schema ), 0 );
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( true, schema ), 1 );
			return;
		} );

		//---------------------------------------------------------------------
		it( `should coerce from a number to a float number`, function ()
		{
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( 0, schema ), 0 );
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( 1, schema ), 1 );
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( -1, schema ), -1 );
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( 3.14, schema ), 3.14 );
			return;
		} );

		//---------------------------------------------------------------------
		it( `should coerce from a string to a float number`, function ()
		{
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( '', schema ), 0 );
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( 'blah', schema ), 0 );
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( '0', schema ), 0 );
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( '1', schema ), 1 );
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( '-1', schema ), -1 );
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( '3.14', schema ), 3.14 );
			return;
		} );

		//---------------------------------------------------------------------
		it( `should throw error on coerce from an object to a float number`, function ()
		{
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( {}, schema ).ok, false );
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( [], schema ).ok, false );
			return;
		} );

		return;
	} );


	//---------------------------------------------------------------------
	// Coerce To a String
	//---------------------------------------------------------------------


	describe( `Coerce To a String`, function ()
	{
		let schema = LQC.Schema.ValueSchema( '' );

		//---------------------------------------------------------------------
		it( `should coerce from undefined to a string`, function ()
		{
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( undefined, schema ), '' );
			return;
		} );

		//---------------------------------------------------------------------
		it( `should coerce from null to a string`, function ()
		{
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( null, schema ), '' );
			return;
		} );

		//---------------------------------------------------------------------
		it( `should coerce from a boolean to a string`, function ()
		{
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( false, schema ), 'false' );
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( true, schema ), 'true' );
			return;
		} );

		//---------------------------------------------------------------------
		it( `should coerce from a number to a string`, function ()
		{
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( 0, schema ), '0' );
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( 1, schema ), '1' );
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( -1, schema ), '-1' );
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( 3.14, schema ), '3.14' );
			return;
		} );

		//---------------------------------------------------------------------
		it( `should coerce from a string to a string`, function ()
		{
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( '', schema ), '' );
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( 'blah', schema ), 'blah' );
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( '0', schema ), '0' );
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( '1', schema ), '1' );
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( '-1', schema ), '-1' );
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( '3.14', schema ), '3.14' );
			return;
		} );

		//---------------------------------------------------------------------
		it( `should coerce from an object to a string`, function ()
		{
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( {}, schema ), '{}' );
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( { foo: 'bar' }, schema ), '{"foo":"bar"}' );
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( [], schema ), '[]' );
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( [ 1, 2, 3 ], schema ), '[1,2,3]' );
			return;
		} );

		return;
	} );


	//---------------------------------------------------------------------
	// Coerce To an Object
	//---------------------------------------------------------------------


	describe( `Coerce To an Object`, function ()
	{
		let schema = LQC.Schema.ValueSchema( {} );

		//---------------------------------------------------------------------
		it( `should coerce from undefined to an object`, function ()
		{
			LIB_ASSERT.deepStrictEqual( LQC.Schema.CoerceValue( undefined, schema ), {} );
			return;
		} );

		//---------------------------------------------------------------------
		it( `should coerce from null to an object`, function ()
		{
			LIB_ASSERT.deepStrictEqual( LQC.Schema.CoerceValue( null, schema ), {} );
			return;
		} );

		//---------------------------------------------------------------------
		it( `should throw an error on coerce from a boolean to an object`, function ()
		{
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( false, schema ).ok, false );
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( true, schema ).ok, false );
			return;
		} );

		//---------------------------------------------------------------------
		it( `should throw an error on coerce from a number to an object`, function ()
		{
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( 0, schema ).ok, false );
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( 1, schema ).ok, false );
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( -1, schema ).ok, false );
			LIB_ASSERT.strictEqual( LQC.Schema.CoerceValue( 3.14, schema ).ok, false );
			return;
		} );

		//---------------------------------------------------------------------
		it( `should coerce from a string to an object`, function ()
		{
			// LIB_ASSERT.deepStrictEqual( LQC.Schema.CoerceValue( '', schema ), {} );
			LIB_ASSERT.deepStrictEqual( LQC.Schema.CoerceValue( '{}', schema ), {} );
			LIB_ASSERT.deepStrictEqual( LQC.Schema.CoerceValue( '{"foo":"bar"}', schema ), { foo: 'bar' } );
			LIB_ASSERT.deepStrictEqual( LQC.Schema.CoerceValue( '[]', schema ), [] );
			LIB_ASSERT.deepStrictEqual( LQC.Schema.CoerceValue( '[1,2,3]', schema ), [ 1, 2, 3 ] );
			return;
		} );

		//---------------------------------------------------------------------
		it( `should coerce from an object to an object`, function ()
		{
			LIB_ASSERT.deepStrictEqual( LQC.Schema.CoerceValue( {}, schema ), {} );
			LIB_ASSERT.deepStrictEqual( LQC.Schema.CoerceValue( { foo: 'bar' }, schema ), { foo: 'bar' } );
			LIB_ASSERT.deepStrictEqual( LQC.Schema.CoerceValue( [], schema ), [] );
			LIB_ASSERT.deepStrictEqual( LQC.Schema.CoerceValue( [ 1, 2, 3 ], schema ), [ 1, 2, 3 ] );
			return;
		} );

		return;
	} );


	//---------------------------------------------------------------------
	return;
} );
