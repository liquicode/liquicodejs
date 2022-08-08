"use strict";


const LIB_FS = require( 'fs' );
const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LQC = require( LIB_PATH.resolve( __dirname, '../liquicode-node.js' ) );

const TEST_FOLDER = LIB_PATH.resolve( __dirname, '../../tests/_test-data' );

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


//---------------------------------------------------------------------
describe( `110) Object.Traverse Tests`, function ()
{

	//---------------------------------------------------------------------
	it( `should return the value of 'one'`, function ()
	{
		let result = LQC.Object.Traverse( test_1_data,
			function ( info )
			{
				if ( info.name === 'one' ) 
				{
					return info.value;
				}
			} );
		LIB_ASSERT.strictEqual( result, 1 );
	} );

	//---------------------------------------------------------------------
	it( `should return the value of 'two'`, function ()
	{
		let result = LQC.Object.Traverse( test_1_data,
			function ( info )
			{
				if ( info.name === 'two' ) 
				{
					return info.value;
				}
			} );
		LIB_ASSERT.strictEqual( result, 2 );
	} );

	//---------------------------------------------------------------------
	it( `should return the value of 'three'`, function ()
	{
		let result = LQC.Object.Traverse( test_1_data,
			function ( info )
			{
				if ( info.name === 'three' ) 
				{
					return info.value;
				}
			} );
		LIB_ASSERT.deepStrictEqual( result, [
			'three-1',
			'three-2',
			'three-3',
		] );
	} );

	//---------------------------------------------------------------------
	it( `should return the value of 'four'`, function ()
	{
		let result = LQC.Object.Traverse( test_1_data,
			function ( info )
			{
				if ( info.name === 'four' ) 
				{
					return info.value;
				}
			} );
		LIB_ASSERT.deepStrictEqual( result, {
			four_1: 4.1,
			four_2: 4.2,
			four_3: 4.3,
		} );
	} );

	//---------------------------------------------------------------------
	it( `should return the value of 'five'`, function ()
	{
		let result = LQC.Object.Traverse( test_1_data,
			function ( info )
			{
				if ( info.name === 'five' ) 
				{
					return info.value;
				}
			} );
		LIB_ASSERT.deepStrictEqual( result, {
			six: {
				seven: 7,
				eight: 8,
				nine: 9,
			},
		} );
	} );

	//---------------------------------------------------------------------
	it( `should return the value of 'six'`, function ()
	{
		let result = LQC.Object.Traverse( test_1_data,
			function ( info )
			{
				if ( info.name === 'six' ) 
				{
					return info.value;
				}
			} );
		LIB_ASSERT.deepStrictEqual( result, {
			seven: 7,
			eight: 8,
			nine: 9,
		} );
	} );

	//---------------------------------------------------------------------
	it( `should return the value of 'seven'`, function ()
	{
		let result = LQC.Object.Traverse( test_1_data,
			function ( info )
			{
				if ( info.name === 'seven' ) 
				{
					return info.value;
				}
			} );
		LIB_ASSERT.strictEqual( result, 7 );
	} );

	//---------------------------------------------------------------------
	it( `should return the value of 'eight'`, function ()
	{
		let result = LQC.Object.Traverse( test_1_data,
			function ( info )
			{
				if ( info.name === 'eight' ) 
				{
					return info.value;
				}
			} );
		LIB_ASSERT.strictEqual( result, 8 );
	} );

	//---------------------------------------------------------------------
	it( `should return the value of 'nine'`, function ()
	{
		let result = LQC.Object.Traverse( test_1_data,
			function ( info )
			{
				if ( info.name === 'nine' ) 
				{
					return info.value;
				}
			} );
		LIB_ASSERT.strictEqual( result, 9 );
	} );

	//---------------------------------------------------------------------
	it( `should return the value of 'none'`, function ()
	{
		let result = LQC.Object.Traverse( test_1_data,
			function ( info )
			{
				if ( info.name === 'none' ) 
				{
					return info.value;
				}
			} );
		LIB_ASSERT.strictEqual( result, null );
	} );

	//---------------------------------------------------------------------
	it( `should return the value of 'done'`, function ()
	{
		let result = LQC.Object.Traverse( test_1_data,
			function ( info )
			{
				if ( info.name === 'done' ) 
				{
					return info.value;
				}
			} );
		LIB_ASSERT.strictEqual( result, true );
	} );

	//---------------------------------------------------------------------
	it( `should return undefined when field is not found`, function ()
	{
		let result = LQC.Object.Traverse( test_1_data,
			function ( info )
			{
				if ( info.name === '???' ) 
				{
					return info.value;
				}
			} );
		LIB_ASSERT.strictEqual( result, undefined );
	} );

	//---------------------------------------------------------------------
	return;
} );
