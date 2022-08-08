"use strict";


const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LQC = require( LIB_PATH.resolve( __dirname, '../liquicode-node.js' ) );


//---------------------------------------------------------------------
describe( `120) Object.FromJson Tests`, function ()
{

	describe( `Equivalence with Javascript's JSON.parse()`, function ()
	{

		//---------------------------------------------------------------------
		it( `should parse boolean value: true`, function ()
		{
			let result0 = LQC.Object.FromJson( 'true' );
			let result1 = JSON.parse( 'true' );
			LIB_ASSERT.strictEqual( result0, true );
			LIB_ASSERT.deepStrictEqual( result0, result1 );
		} );

		//---------------------------------------------------------------------
		it( `should parse number value: 3.14`, function ()
		{
			let result0 = LQC.Object.FromJson( '3.14' );
			let result1 = JSON.parse( '3.14' );
			LIB_ASSERT.strictEqual( result0, 3.14 );
			LIB_ASSERT.deepStrictEqual( result0, result1 );
		} );

		//---------------------------------------------------------------------
		it( `should parse string value: "text"`, function ()
		{
			let result0 = LQC.Object.FromJson( '"text"' );
			let result1 = JSON.parse( '"text"' );
			LIB_ASSERT.strictEqual( result0, 'text' );
			LIB_ASSERT.deepStrictEqual( result0, result1 );
		} );

		//---------------------------------------------------------------------
		it( `should parse empty array: []`, function ()
		{
			let result0 = LQC.Object.FromJson( '[]' );
			let result1 = JSON.parse( '[]' );
			LIB_ASSERT.ok( Array.isArray( result0 ) );
			LIB_ASSERT.ok( Array.isArray( result1 ) );
			LIB_ASSERT.deepStrictEqual( result0, result1 );
		} );

		//---------------------------------------------------------------------
		it( `should parse empty object: {}`, function ()
		{
			let result1 = JSON.parse( '{}' );
			let result0 = LQC.Object.FromJson( '{}' );
			LIB_ASSERT.deepStrictEqual( result0, result1 );
		} );

		//---------------------------------------------------------------------
		return;
	} );

	describe( `Parsing features`, function ()
	{

		//---------------------------------------------------------------------
		it( `should not require quoted identifiers`, function ()
		{
			let value = { foo: 'bar', pi: 3.14, list: [ 1, 2, 3 ] };
			let json = `{ foo: 'bar', pi: 3.14, list: [ 1, 2, 3 ] }`;
			let result0 = LQC.Object.FromJson( json );
			LIB_ASSERT.deepStrictEqual( result0, value );
		} );

		//---------------------------------------------------------------------
		it( `should allow trailing commas`, function ()
		{
			let value = { foo: 'bar', pi: 3.14, list: [ 1, 2, 3, ], };
			let json = `{ foo: 'bar', pi: 3.14, list: [ 1, 2, 3, ], }`;
			let result0 = LQC.Object.FromJson( json );
			LIB_ASSERT.deepStrictEqual( result0, value );
		} );

		//---------------------------------------------------------------------
		it( `should stop parsing after closing brace or bracket`, function ()
		{
			let value = { foo: 'bar' };
			let json = `{ foo: 'bar' } this is some extra stuff we don't want parsed`;
			let result0 = LQC.Object.FromJson( json );
			LIB_ASSERT.deepStrictEqual( result0, value );
		} );

		//---------------------------------------------------------------------
		it( `should ignore everything after closing brace or bracket`, function ()
		{
			let value = { foo: 'bar' };
			let json = `{ foo: 'bar' } { a: 1 } even if there is valid json afterwords`;
			let result0 = LQC.Object.FromJson( json );
			LIB_ASSERT.deepStrictEqual( result0, value );
		} );

		//---------------------------------------------------------------------
		return;
	} );

	//---------------------------------------------------------------------
	return;
} );
