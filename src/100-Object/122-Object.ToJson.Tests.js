"use strict";


const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LQC = require( LIB_PATH.resolve( __dirname, '../liquicode-node.js' ) );


//---------------------------------------------------------------------
describe( `122) Object.ToJson Tests`, function ()
{

	//---------------------------------------------------------------------
	describe( `Stringify Primitives`, function ()
	{
		it( `should stringify null [null]`, function ()
		{
			let result = LQC.Object.ToJson( null );
			LIB_ASSERT.strictEqual( result, 'null' );
		} );
		it( `should stringify empty string [""]`, function ()
		{
			let result = LQC.Object.ToJson( "" );
			LIB_ASSERT.strictEqual( result, '""' );
		} );
		it( `should stringify empty array [[]]`, function ()
		{
			let result = LQC.Object.ToJson( [] );
			LIB_ASSERT.strictEqual( result, '[]' );
		} );
		it( `should stringify empty object [{}]`, function ()
		{
			let result = LQC.Object.ToJson( {} );
			LIB_ASSERT.strictEqual( result, '{}' );
		} );
		it( `should stringify [true]`, function ()
		{
			let result = LQC.Object.ToJson( true );
			LIB_ASSERT.strictEqual( result, 'true' );
		} );
		it( `should stringify [3.14]`, function ()
		{
			let result = LQC.Object.ToJson( 3.14 );
			LIB_ASSERT.strictEqual( result, '3.14' );
		} );
		it( `should stringify ["Hello World!"]`, function ()
		{
			// let result = JSON.stringify( "Hello World!" );
			let result = LQC.Object.ToJson( "Hello World!" );
			LIB_ASSERT.strictEqual( result, `"Hello World!"` );
		} );
	} );


	//---------------------------------------------------------------------
	describe( `Equivalence with Javascript's JSON.stringify()`, function ()
	{
		it( `should stringify null [null] the same way`, function ()
		{
			LIB_ASSERT.strictEqual(
				LQC.Object.ToJson( null ),
				JSON.stringify( null )
			);
		} );
		it( `should stringify empty string [""] the same way`, function ()
		{
			LIB_ASSERT.strictEqual(
				LQC.Object.ToJson( "" ),
				JSON.stringify( "" )
			);
		} );
		it( `should stringify empty array [[]] the same way`, function ()
		{
			LIB_ASSERT.strictEqual(
				LQC.Object.ToJson( [] ),
				JSON.stringify( [] )
			);
		} );
		it( `should stringify empty object [{}] the same way`, function ()
		{
			LIB_ASSERT.strictEqual(
				LQC.Object.ToJson( {} ),
				JSON.stringify( {} )
			);
		} );
		it( `should stringify [true] the same way`, function ()
		{
			LIB_ASSERT.strictEqual(
				LQC.Object.ToJson( true ),
				JSON.stringify( true )
			);
		} );
		it( `should stringify [3.14] the same way`, function ()
		{
			LIB_ASSERT.strictEqual(
				LQC.Object.ToJson( 3.14 ),
				JSON.stringify( 3.14 )
			);
		} );
		it( `should stringify ["Hello World!"] the same way`, function ()
		{
			LIB_ASSERT.strictEqual(
				LQC.Object.ToJson( "Hello World!" ),
				JSON.stringify( "Hello World!" )
			);
		} );
		it( `should stringify test_1.json the same way`, function ()
		{
			let test_1_data = {
				one: 1,
				two: 2,
				three: [
					'three-1',
					'three-2',
					'three-3',
				],
				four: {
					four_1: 4.1,
					four_2: 4.2,
					four_3: 4.3,
				},
				five: {
					six: {
						seven: 7,
						eight: 8,
						nine: 9,
					},
				},
				none: null,
				done: true,
			};
			let v1 = LQC.Object.ToJson( test_1_data );
			let v2 = JSON.stringify( test_1_data );
			LIB_ASSERT.strictEqual( v1, v2 );
		} );
	} );


	/*
		//---------------------------------------------------------------------
		describe( `Speed tests`, function ()
		{
	
			it( `should stringify faster than Node's JSON`, function ()
			{
				let t0 = new Date();
				let json = LQC.Object.ToJson( test_small_data );
				let duration1 = ( ( new Date() ) - t0 );
	
				t0 = new Date();
				json = JSON.stringify( test_small_data );
				let duration2 = ( ( new Date() ) - t0 );
	
				LIB_ASSERT.strictEqual( duration1 < duration2, true, `lib-json: [${ duration1 } ms], node json: [${ duration2 } ms]` );
			} );
	
			it( `should parse faster than Node's JSON`, function ()
			{
				let t0 = new Date();
				let data = LIB_JSON.parse( test_small_json );
				let duration1 = ( ( new Date() ) - t0 );
	
				t0 = new Date();
				data = JSON.parse( test_small_json );
				let duration2 = ( ( new Date() ) - t0 );
	
				LIB_ASSERT.strictEqual( duration1 < duration2, true, `lib-json: [${ duration1 } ms], node json: [${ duration2 } ms]` );
			} );
	
		} );
	*/


	//---------------------------------------------------------------------
	return;
} );
