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
describe( `111) Object.HasPath Tests`, function ()
{

	//---------------------------------------------------------------------
	it( `should find the path for 'one'`, function ()
	{
		LIB_ASSERT.ok( LQC.Object.HasPath( test_1_data, '$.one' ) );
	} );

	//---------------------------------------------------------------------
	it( `should find the path for 'two'`, function ()
	{
		LIB_ASSERT.ok( LQC.Object.HasPath( test_1_data, '$.two' ) );
	} );

	//---------------------------------------------------------------------
	it( `should find the path for 'three'`, function ()
	{
		LIB_ASSERT.ok( LQC.Object.HasPath( test_1_data, '$.three' ) );
	} );

	//---------------------------------------------------------------------
	it( `should find the path for 'four'`, function ()
	{
		LIB_ASSERT.ok( LQC.Object.HasPath( test_1_data, '$.four' ) );
	} );

	//---------------------------------------------------------------------
	it( `should find the path for 'five'`, function ()
	{
		LIB_ASSERT.ok( LQC.Object.HasPath( test_1_data, '$.five' ) );
	} );

	//---------------------------------------------------------------------
	it( `should find the path for 'six'`, function ()
	{
		LIB_ASSERT.ok( LQC.Object.HasPath( test_1_data, '$.five.six' ) );
	} );

	//---------------------------------------------------------------------
	it( `should find the path for 'seven'`, function ()
	{
		LIB_ASSERT.ok( LQC.Object.HasPath( test_1_data, '$.five.six.seven' ) );
	} );

	//---------------------------------------------------------------------
	it( `should find the path for 'eight'`, function ()
	{
		LIB_ASSERT.ok( LQC.Object.HasPath( test_1_data, '$.five.six.eight' ) );
	} );

	//---------------------------------------------------------------------
	it( `should find the path for 'nine'`, function ()
	{
		LIB_ASSERT.ok( LQC.Object.HasPath( test_1_data, '$.five.six.nine' ) );
	} );

	//---------------------------------------------------------------------
	it( `should return false for a missing path`, function ()
	{
		LIB_ASSERT.ok( !LQC.Object.HasPath( test_1_data, '$.???' ) );
	} );

	//---------------------------------------------------------------------
	return;
} );
