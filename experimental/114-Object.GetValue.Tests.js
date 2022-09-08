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
describe( `114) Object.GetValue Tests`, function ()
{

	//---------------------------------------------------------------------
	it( `should get the value for 'one'`, function ()
	{
		LIB_ASSERT.strictEqual( LQC.Object.GetValue( test_1_data, '$.one' ), 1 );
	} );

	//---------------------------------------------------------------------
	it( `should get the value for 'two'`, function ()
	{
		LIB_ASSERT.strictEqual( LQC.Object.GetValue( test_1_data, '$.two' ), 2 );
	} );

	//---------------------------------------------------------------------
	it( `should get the value for 'three'`, function ()
	{
		LIB_ASSERT.deepStrictEqual( LQC.Object.GetValue( test_1_data, '$.three' ), [
			'three-1',
			'three-2',
			'three-3',
		] );
	} );

	//---------------------------------------------------------------------
	it( `should get the value for 'four'`, function ()
	{
		LIB_ASSERT.deepStrictEqual( LQC.Object.GetValue( test_1_data, '$.four' ), {
			four_1: 4.1,
			four_2: 4.2,
			four_3: 4.3,
		} );
	} );

	//---------------------------------------------------------------------
	it( `should get the value for 'five'`, function ()
	{
		LIB_ASSERT.deepStrictEqual( LQC.Object.GetValue( test_1_data, '$.five' ), {
			six: {
				seven: 7,
				eight: 8,
				nine: 9,
			}
		} );
	} );

	//---------------------------------------------------------------------
	it( `should get the value for 'six'`, function ()
	{
		LIB_ASSERT.deepStrictEqual( LQC.Object.GetValue( test_1_data, '$.five.six' ), {
			seven: 7,
			eight: 8,
			nine: 9,
		} );
	} );

	//---------------------------------------------------------------------
	it( `should get the value for 'seven'`, function ()
	{
		LIB_ASSERT.strictEqual( LQC.Object.GetValue( test_1_data, '$.five.six.seven' ), 7 );
	} );

	//---------------------------------------------------------------------
	it( `should get the value for 'eight'`, function ()
	{
		LIB_ASSERT.strictEqual( LQC.Object.GetValue( test_1_data, '$.five.six.eight' ), 8 );
	} );

	//---------------------------------------------------------------------
	it( `should get the value for 'nine'`, function ()
	{
		LIB_ASSERT.strictEqual( LQC.Object.GetValue( test_1_data, '$.five.six.nine' ), 9 );
	} );

	//---------------------------------------------------------------------
	it( `should return false for a missing path`, function ()
	{
		LIB_ASSERT.strictEqual( LQC.Object.GetValue( test_1_data, '$.???' ), undefined );
	} );

	//---------------------------------------------------------------------
	return;
} );
