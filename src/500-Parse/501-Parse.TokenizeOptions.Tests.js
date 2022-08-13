"use strict";


const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LQC = require( LIB_PATH.resolve( __dirname, '../liquicode-node.js' ) );


//---------------------------------------------------------------------
describe( `501) Parse.TokenizeOptions Tests`, function ()
{


	const default_options = LQC.Parse.TokenizeOptions();


	//---------------------------------------------------------------------
	it( `should get default options when PresetName is undefined`, function ()
	{
		let options = LQC.Parse.TokenizeOptions();
		LIB_ASSERT.deepStrictEqual( options, default_options );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should get default options when PresetName is null`, function ()
	{
		let options = LQC.Parse.TokenizeOptions( null );
		LIB_ASSERT.deepStrictEqual( options, default_options );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should get default options when PresetName is empty`, function ()
	{
		let options = LQC.Parse.TokenizeOptions( '' );
		LIB_ASSERT.deepStrictEqual( options, default_options );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should get default options when PresetName is 'default'`, function ()
	{
		let options = LQC.Parse.TokenizeOptions( 'default' );
		LIB_ASSERT.deepStrictEqual( options, default_options );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should get options when PresetName is 'csv'`, function ()
	{
		let options = LQC.Parse.TokenizeOptions( 'csv' );
		LIB_ASSERT.ok( options );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should get options when PresetName is 'cli'`, function ()
	{
		let options = LQC.Parse.TokenizeOptions( 'cli' );
		LIB_ASSERT.ok( options );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should throw an error when PresetName is 'blah'`, function ()
	{
		LIB_ASSERT.throws( () => LQC.Parse.TokenizeOptions( 'blah' ), Error );
		return;
	} );

	//---------------------------------------------------------------------
	return;
} );
