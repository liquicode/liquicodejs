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
describe( `113) Object.FindValue Tests`, function ()
{

	//---------------------------------------------------------------------
	it( `should find the value for field 'one'`, function ()
	{
		LIB_ASSERT.strictEqual( LQC.Object.FindValue( test_1_data, 1 ), '$.one' );
	} );

	//---------------------------------------------------------------------
	it( `should find the value for field 'two'`, function ()
	{
		LIB_ASSERT.strictEqual( LQC.Object.FindValue( test_1_data, 2 ), '$.two' );
	} );

	//---------------------------------------------------------------------
	it( `should not find the value for field 'three'`, function ()
	{
		LIB_ASSERT.strictEqual( LQC.Object.FindValue( test_1_data, [ 'three-1', 'three-2', 'three-3', ] ), undefined );
	} );

	//---------------------------------------------------------------------
	it( `should not find the value for field 'four'`, function ()
	{
		let reult = LQC.Object.FindValue( test_1_data, { four_1: 4.1, four_2: 4.2, four_3: 4.3, } );
		LIB_ASSERT.strictEqual( LQC.Object.FindValue( test_1_data, { four_1: 4.1, four_2: 4.2, four_3: 4.3, } ), undefined );
	} );

	//---------------------------------------------------------------------
	it( `should find the value for field 'four_1'`, function ()
	{
		LIB_ASSERT.strictEqual( LQC.Object.FindValue( test_1_data, 4.1 ), '$.four.four_1' );
	} );

	//---------------------------------------------------------------------
	it( `should find the value for field 'four_2'`, function ()
	{
		LIB_ASSERT.strictEqual( LQC.Object.FindValue( test_1_data, 4.2 ), '$.four.four_2' );
	} );

	//---------------------------------------------------------------------
	it( `should find the value for field 'four_3'`, function ()
	{
		LIB_ASSERT.strictEqual( LQC.Object.FindValue( test_1_data, 4.3 ), '$.four.four_3' );
	} );

	//---------------------------------------------------------------------
	it( `should find the value for field 'seven'`, function ()
	{
		LIB_ASSERT.strictEqual( LQC.Object.FindValue( test_1_data, 7 ), '$.five.six.seven' );
	} );

	//---------------------------------------------------------------------
	it( `should find the value for field 'eight'`, function ()
	{
		LIB_ASSERT.strictEqual( LQC.Object.FindValue( test_1_data, 8 ), '$.five.six.eight' );
	} );

	//---------------------------------------------------------------------
	it( `should find the value for field 'nine'`, function ()
	{
		LIB_ASSERT.strictEqual( LQC.Object.FindValue( test_1_data, 9 ), '$.five.six.nine' );
	} );

	//---------------------------------------------------------------------
	it( `should return undefined for a missing name`, function ()
	{
		LIB_ASSERT.strictEqual( LQC.Object.FindValue( test_1_data, '???' ), undefined );
	} );

	//---------------------------------------------------------------------
	return;
} );
