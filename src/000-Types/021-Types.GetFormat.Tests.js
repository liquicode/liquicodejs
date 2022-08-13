"use strict";


const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LQC = require( LIB_PATH.resolve( __dirname, '../liquicode-node.js' ) );


//---------------------------------------------------------------------
describe( `021) Types.GetFormat Tests`, function ()
{

	//---------------------------------------------------------------------
	it( `should return null for undefined`, function ()
	{
		LIB_ASSERT.ok( LQC.Types.GetFormat() === null );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should return null for null`, function ()
	{
		LIB_ASSERT.ok( LQC.Types.GetFormat( null ) === null );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should detect boolean : boolean`, function ()
	{
		LIB_ASSERT.ok( LQC.Types.GetFormat( false ) === 'boolean' );
		LIB_ASSERT.ok( LQC.Types.GetFormat( true ) === 'boolean' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should detect number : number`, function ()
	{
		LIB_ASSERT.ok( LQC.Types.GetFormat( 3.14 ) === 'number' );
		LIB_ASSERT.ok( LQC.Types.GetFormat( 2.07 ) === 'number' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should detect number : integer`, function ()
	{
		LIB_ASSERT.ok( LQC.Types.GetFormat( 0 ) === 'integer' );
		LIB_ASSERT.ok( LQC.Types.GetFormat( 1 ) === 'integer' );
		LIB_ASSERT.ok( LQC.Types.GetFormat( -1 ) === 'integer' );
		LIB_ASSERT.ok( LQC.Types.GetFormat( 100 ) === 'integer' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should detect string : string`, function ()
	{
		LIB_ASSERT.ok( LQC.Types.GetFormat( '' ) === 'string' );
		LIB_ASSERT.ok( LQC.Types.GetFormat( 'Hello, World!' ) === 'string' );
		LIB_ASSERT.ok( LQC.Types.GetFormat( '12345' ) === 'string' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should detect string : json`, function ()
	{
		LIB_ASSERT.ok( LQC.Types.GetFormat( JSON.stringify( { foo: 'bar}' } ) ) === 'json' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should detect string : datetime`, function ()
	{
		LIB_ASSERT.ok( LQC.Types.GetFormat( '2005-05-01T00:00:00.000Z' ) === 'datetime' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should detect string : date`, function ()
	{
		LIB_ASSERT.ok( LQC.Types.GetFormat( '2005-05-01' ) === 'date' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should detect string : time`, function ()
	{
		LIB_ASSERT.ok( LQC.Types.GetFormat( '00:00:00' ) === 'time' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should detect object : object`, function ()
	{
		LIB_ASSERT.ok( LQC.Types.GetFormat( {} ) === 'object' );
		LIB_ASSERT.ok( LQC.Types.GetFormat( { foo: 'bar' } ) === 'object' );
		LIB_ASSERT.ok( LQC.Types.GetFormat( { foo: [ 1, 2 ] } ) === 'object' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should detect object : datetime`, function ()
	{
		LIB_ASSERT.ok( LQC.Types.GetFormat( new Date() ) === 'datetime' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should detect object : array`, function ()
	{
		LIB_ASSERT.ok( LQC.Types.GetFormat( [] ) === 'array' );
		LIB_ASSERT.ok( LQC.Types.GetFormat( [ true, 2, 'three' ] ) === 'array' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should detect object : boolean-array`, function ()
	{
		LIB_ASSERT.ok( LQC.Types.GetFormat( [ false ] ) === 'boolean-array' );
		LIB_ASSERT.ok( LQC.Types.GetFormat( [ true, false, true ] ) === 'boolean-array' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should detect object : string-array`, function ()
	{
		LIB_ASSERT.ok( LQC.Types.GetFormat( [ 'a' ] ) === 'string-array' );
		LIB_ASSERT.ok( LQC.Types.GetFormat( [ 'a', 'b', 'c' ] ) === 'string-array' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should detect object : number-array`, function ()
	{
		LIB_ASSERT.ok( LQC.Types.GetFormat( [ 0 ] ) === 'number-array' );
		LIB_ASSERT.ok( LQC.Types.GetFormat( [ 1, 2, 3.14 ] ) === 'number-array' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should detect object : object-array`, function ()
	{
		LIB_ASSERT.ok( LQC.Types.GetFormat( [ null ] ) === 'object-array' );
		LIB_ASSERT.ok( LQC.Types.GetFormat( [ { foo: 'bar}, [1,2]' } ] ) === 'object-array' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should detect object : array-array`, function ()
	{
		LIB_ASSERT.ok( LQC.Types.GetFormat( [ [] ] ) === 'array-array' );
		LIB_ASSERT.ok( LQC.Types.GetFormat( [ [ 'a', 'b' ], [ 1, 2 ] ] ) === 'array-array' );
		return;
	} );

	//---------------------------------------------------------------------
	return;
} );
