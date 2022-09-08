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
describe( `112) Object.FindField Tests`, function ()
{

	//---------------------------------------------------------------------
	it( `should find the field named 'one'`, function ()
	{
		LIB_ASSERT.strictEqual( LQC.Object.FindField( test_1_data, 'one' ), '$.one' );
	} );

	//---------------------------------------------------------------------
	it( `should find the field named 'two'`, function ()
	{
		LIB_ASSERT.strictEqual( LQC.Object.FindField( test_1_data, 'two' ), '$.two' );
	} );

	//---------------------------------------------------------------------
	it( `should find the field named 'three'`, function ()
	{
		LIB_ASSERT.strictEqual( LQC.Object.FindField( test_1_data, 'three' ), '$.three' );
	} );

	//---------------------------------------------------------------------
	it( `should find the field named 'four'`, function ()
	{
		LIB_ASSERT.strictEqual( LQC.Object.FindField( test_1_data, 'four' ), '$.four' );
	} );

	//---------------------------------------------------------------------
	it( `should find the field named 'five'`, function ()
	{
		LIB_ASSERT.strictEqual( LQC.Object.FindField( test_1_data, 'five' ), '$.five' );
	} );

	//---------------------------------------------------------------------
	it( `should find the field named 'six'`, function ()
	{
		LIB_ASSERT.strictEqual( LQC.Object.FindField( test_1_data, 'six' ), '$.five.six' );
	} );

	//---------------------------------------------------------------------
	it( `should find the field named 'seven'`, function ()
	{
		LIB_ASSERT.strictEqual( LQC.Object.FindField( test_1_data, 'seven' ), '$.five.six.seven' );
	} );

	//---------------------------------------------------------------------
	it( `should find the field named 'eight'`, function ()
	{
		LIB_ASSERT.strictEqual( LQC.Object.FindField( test_1_data, 'eight' ), '$.five.six.eight' );
	} );

	//---------------------------------------------------------------------
	it( `should find the field named 'nine'`, function ()
	{
		LIB_ASSERT.strictEqual( LQC.Object.FindField( test_1_data, 'nine' ), '$.five.six.nine' );
	} );

	//---------------------------------------------------------------------
	it( `should return undefined for a missing name`, function ()
	{
		LIB_ASSERT.strictEqual( LQC.Object.FindField( test_1_data, '???' ), undefined );
	} );

	//---------------------------------------------------------------------
	return;
} );
