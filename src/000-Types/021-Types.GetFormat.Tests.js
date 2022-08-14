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
		LIB_ASSERT.ok( LQC.Types.GetFormat( false ) === 'boolean:boolean' );
		LIB_ASSERT.ok( LQC.Types.GetFormat( true ) === 'boolean:boolean' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should detect number : number`, function ()
	{
		LIB_ASSERT.ok( LQC.Types.GetFormat( 3.14 ) === 'number:number' );
		LIB_ASSERT.ok( LQC.Types.GetFormat( 2.07 ) === 'number:number' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should detect number : integer`, function ()
	{
		LIB_ASSERT.ok( LQC.Types.GetFormat( 0 ) === 'number:integer' );
		LIB_ASSERT.ok( LQC.Types.GetFormat( 1 ) === 'number:integer' );
		LIB_ASSERT.ok( LQC.Types.GetFormat( -1 ) === 'number:integer' );
		LIB_ASSERT.ok( LQC.Types.GetFormat( 100 ) === 'number:integer' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should detect string : string`, function ()
	{
		LIB_ASSERT.ok( LQC.Types.GetFormat( '' ) === 'string:string' );
		LIB_ASSERT.ok( LQC.Types.GetFormat( 'Hello, World!' ) === 'string:string' );
		LIB_ASSERT.ok( LQC.Types.GetFormat( '12345' ) === 'string:string' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should detect string : json`, function ()
	{
		LIB_ASSERT.ok( LQC.Types.GetFormat( JSON.stringify( { foo: 'bar}' } ) ) === 'string:json' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should detect string : datetime`, function ()
	{
		LIB_ASSERT.ok( LQC.Types.GetFormat( '2005-05-01T00:00:00.000Z' ) === 'string:datetime' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should detect string : date`, function ()
	{
		LIB_ASSERT.ok( LQC.Types.GetFormat( '2005-05-01' ) === 'string:date' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should detect string : time`, function ()
	{
		LIB_ASSERT.ok( LQC.Types.GetFormat( '00:00:00' ) === 'string:time' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should detect object : object`, function ()
	{
		LIB_ASSERT.ok( LQC.Types.GetFormat( {} ) === 'object:object' );
		LIB_ASSERT.ok( LQC.Types.GetFormat( { foo: 'bar' } ) === 'object:object' );
		LIB_ASSERT.ok( LQC.Types.GetFormat( { foo: [ 1, 2 ] } ) === 'object:object' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should detect object : datetime`, function ()
	{
		LIB_ASSERT.ok( LQC.Types.GetFormat( new Date() ) === 'object:datetime' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should detect object : array`, function ()
	{
		LIB_ASSERT.ok( LQC.Types.GetFormat( [] ) === 'object:array' );
		LIB_ASSERT.ok( LQC.Types.GetFormat( [ true, 2, 'three' ] ) === 'object:array' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should detect object : boolean-array`, function ()
	{
		LIB_ASSERT.ok( LQC.Types.GetFormat( [ false ] ) === 'object:boolean-array' );
		LIB_ASSERT.ok( LQC.Types.GetFormat( [ true, false, true ] ) === 'object:boolean-array' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should detect object : string-array`, function ()
	{
		LIB_ASSERT.ok( LQC.Types.GetFormat( [ 'a' ] ) === 'object:string-array' );
		LIB_ASSERT.ok( LQC.Types.GetFormat( [ 'a', 'b', 'c' ] ) === 'object:string-array' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should detect object : number-array`, function ()
	{
		LIB_ASSERT.ok( LQC.Types.GetFormat( [ 0 ] ) === 'object:number-array' );
		LIB_ASSERT.ok( LQC.Types.GetFormat( [ 1, 2, 3.14 ] ) === 'object:number-array' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should detect object : object-array`, function ()
	{
		LIB_ASSERT.ok( LQC.Types.GetFormat( [ null ] ) === 'object:object-array' );
		LIB_ASSERT.ok( LQC.Types.GetFormat( [ { foo: 'bar}, [1,2]' } ] ) === 'object:object-array' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should detect object : array-array`, function ()
	{
		LIB_ASSERT.ok( LQC.Types.GetFormat( [ [] ] ) === 'object:array-array' );
		LIB_ASSERT.ok( LQC.Types.GetFormat( [ [ 'a', 'b' ], [ 1, 2 ] ] ) === 'object:array-array' );
		return;
	} );

	//---------------------------------------------------------------------
	return;
} );
