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

let test_2_data = {};

//---------------------------------------------------------------------
describe( `115) Object.SetValue Tests`, function ()
{

	//---------------------------------------------------------------------
	it( `should set the value for 'one'`, function ()
	{
		LIB_ASSERT.strictEqual( LQC.Object.SetValue( test_1_data, '$.one', 10 ), 10 );
		LIB_ASSERT.strictEqual( LQC.Object.GetValue( test_1_data, '$.one' ), 10 );
	} );

	//---------------------------------------------------------------------
	it( `should set the value for 'two'`, function ()
	{
		LIB_ASSERT.strictEqual( LQC.Object.SetValue( test_1_data, '$.two', 20 ), 20 );
		LIB_ASSERT.strictEqual( LQC.Object.GetValue( test_1_data, '$.two' ), 20 );
	} );

	//---------------------------------------------------------------------
	it( `should set the value for 'three[0]'`, function ()
	{
		LIB_ASSERT.deepStrictEqual( LQC.Object.SetValue( test_1_data, '$.three[0]', 31 ), 31 );
		LIB_ASSERT.deepStrictEqual( LQC.Object.GetValue( test_1_data, '$.three[0]' ), 31 );
	} );

	//---------------------------------------------------------------------
	it( `should set the value for 'three[1]'`, function ()
	{
		LIB_ASSERT.deepStrictEqual( LQC.Object.SetValue( test_1_data, '$.three[1]', 32 ), 32 );
		LIB_ASSERT.deepStrictEqual( LQC.Object.GetValue( test_1_data, '$.three[1]' ), 32 );
	} );

	//---------------------------------------------------------------------
	it( `should set the value for 'three[2]'`, function ()
	{
		LIB_ASSERT.deepStrictEqual( LQC.Object.SetValue( test_1_data, '$.three[2]', 33 ), 33 );
		LIB_ASSERT.deepStrictEqual( LQC.Object.GetValue( test_1_data, '$.three[2]' ), 33 );
	} );

	//---------------------------------------------------------------------
	it( `should set the value for 'four_1'`, function ()
	{
		LIB_ASSERT.deepStrictEqual( LQC.Object.SetValue( test_1_data, '$.four.four_1', 41 ), 41 );
		LIB_ASSERT.deepStrictEqual( LQC.Object.GetValue( test_1_data, '$.four.four_1' ), 41 );
	} );

	//---------------------------------------------------------------------
	it( `should set the value for 'four_2'`, function ()
	{
		LIB_ASSERT.deepStrictEqual( LQC.Object.SetValue( test_1_data, '$.four.four_2', 42 ), 42 );
		LIB_ASSERT.deepStrictEqual( LQC.Object.GetValue( test_1_data, '$.four.four_2' ), 42 );
	} );

	//---------------------------------------------------------------------
	it( `should set the value for 'four_3'`, function ()
	{
		LIB_ASSERT.deepStrictEqual( LQC.Object.SetValue( test_1_data, '$.four.four_3', 43 ), 43 );
		LIB_ASSERT.deepStrictEqual( LQC.Object.GetValue( test_1_data, '$.four.four_3' ), 43 );
	} );

	//---------------------------------------------------------------------
	it( `should set the value for 'seven'`, function ()
	{
		LIB_ASSERT.strictEqual( LQC.Object.SetValue( test_1_data, '$.five.six.seven', 70 ), 70 );
		LIB_ASSERT.strictEqual( LQC.Object.GetValue( test_1_data, '$.five.six.seven' ), 70 );
	} );

	//---------------------------------------------------------------------
	it( `should set the value for 'eight'`, function ()
	{
		LIB_ASSERT.strictEqual( LQC.Object.SetValue( test_1_data, '$.five.six.eight', 80 ), 80 );
		LIB_ASSERT.strictEqual( LQC.Object.GetValue( test_1_data, '$.five.six.eight' ), 80 );
	} );

	//---------------------------------------------------------------------
	it( `should set the value for 'nine'`, function ()
	{
		LIB_ASSERT.strictEqual( LQC.Object.SetValue( test_1_data, '$.five.six.nine', 90 ), 90 );
		LIB_ASSERT.strictEqual( LQC.Object.GetValue( test_1_data, '$.five.six.nine' ), 90 );
	} );

	//---------------------------------------------------------------------
	it( `should set the value for 'none'`, function ()
	{
		LIB_ASSERT.strictEqual( LQC.Object.SetValue( test_1_data, '$.none', 0 ), 0 );
		LIB_ASSERT.strictEqual( LQC.Object.GetValue( test_1_data, '$.none' ), 0 );
	} );

	//---------------------------------------------------------------------
	it( `should set the value for 'done'`, function ()
	{
		LIB_ASSERT.strictEqual( LQC.Object.SetValue( test_1_data, '$.done', 'yes' ), 'yes' );
		LIB_ASSERT.strictEqual( LQC.Object.GetValue( test_1_data, '$.done' ), 'yes' );
	} );


	//---------------------------------------------------------------------
	it( `should match the expected values`, function ()
	{
		LIB_ASSERT.deepStrictEqual( test_1_data, {
			one: 10,
			two: 20,
			three: [
				31,
				32,
				33,
			],
			four: {
				four_1: 41,
				four_2: 42,
				four_3: 43,
			},
			five: {
				six: {
					seven: 70,
					eight: 80,
					nine: 90,
				},
			},
			none: 0,
			done: 'yes',
		} );
	} );


	// //---------------------------------------------------------------------
	// it( `should set the value for 'one'`, function ()
	// {
	// 	LIB_ASSERT.strictEqual( LQC.Object.SetValue( test_2_data, '$.one', 1 ), 1 );
	// } );

	// //---------------------------------------------------------------------
	// it( `should set the value for 'two'`, function ()
	// {
	// 	LIB_ASSERT.strictEqual( LQC.Object.SetValue( test_2_data, '$.two', 2 ), 2 );
	// } );

	// //---------------------------------------------------------------------
	// it( `should set the value for 'three'`, function ()
	// {
	// 	LIB_ASSERT.deepStrictEqual( LQC.Object.SetValue( test_2_data, '$.three', [ 'three-1', 'three-2', 'three-3', ] ), [ 'three-1', 'three-2', 'three-3', ] );
	// } );

	// //---------------------------------------------------------------------
	// it( `should set the value for 'four_1'`, function ()
	// {
	// 	LIB_ASSERT.deepStrictEqual( LQC.Object.SetValue( test_2_data, '$.four.four_1', 4.1 ), 4.1 );
	// } );

	// //---------------------------------------------------------------------
	// it( `should set the value for 'four_2'`, function ()
	// {
	// 	LIB_ASSERT.deepStrictEqual( LQC.Object.SetValue( test_2_data, '$.four.four_2', 4.2 ), 4.2 );
	// } );

	// //---------------------------------------------------------------------
	// it( `should set the value for 'four_3'`, function ()
	// {
	// 	LIB_ASSERT.deepStrictEqual( LQC.Object.SetValue( test_2_data, '$.four.four_3', 4.3 ), 4.3 );
	// } );

	// //---------------------------------------------------------------------
	// it( `should set the value for 'seven'`, function ()
	// {
	// 	LIB_ASSERT.strictEqual( LQC.Object.SetValue( test_2_data, '$.five.six.seven', 7 ), 7 );
	// } );

	// //---------------------------------------------------------------------
	// it( `should set the value for 'eight'`, function ()
	// {
	// 	LIB_ASSERT.strictEqual( LQC.Object.SetValue( test_2_data, '$.five.six.eight', 8 ), 8 );
	// } );

	// //---------------------------------------------------------------------
	// it( `should set the value for 'nine'`, function ()
	// {
	// 	LIB_ASSERT.strictEqual( LQC.Object.SetValue( test_2_data, '$.five.six.nine', 9 ), 9 );
	// } );

	// //---------------------------------------------------------------------
	// it( `should set the value for 'none'`, function ()
	// {
	// 	LIB_ASSERT.strictEqual( LQC.Object.SetValue( test_2_data, '$.none', null ), null );
	// } );

	// //---------------------------------------------------------------------
	// it( `should set the value for 'done'`, function ()
	// {
	// 	LIB_ASSERT.strictEqual( LQC.Object.SetValue( test_2_data, '$.done', true ), true );
	// } );

	// //---------------------------------------------------------------------
	// it( `should build the object`, function ()
	// {
	// 	LIB_ASSERT.deepStrictEqual( test_1_data, test_2_data );
	// } );

	//---------------------------------------------------------------------
	return;
} );
