"use strict";

const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LQC = require( LIB_PATH.resolve( __dirname, '../liquicode-node.js' ) );


//---------------------------------------------------------------------
describe( `203) Text.Matches Tests`, function ()
{

	//---------------------------------------------------------------------
	it( `should match an empty string and an empty pattern`, function ()
	{
		let matches = LQC.Text.Matches( '', '' );
		LIB_ASSERT.ok( matches );
		return;
	} );

	//---------------------------------------------------------------------
	it( `an empty pattern should not match anything except an empty string`, function ()
	{
		let pattern = '';
		LIB_ASSERT.ok( LQC.Text.Matches( '', pattern ) );
		LIB_ASSERT.ok( !LQC.Text.Matches( 'a', pattern ) );
		LIB_ASSERT.ok( !LQC.Text.Matches( 'abc', pattern ) );
		LIB_ASSERT.ok( !LQC.Text.Matches( '*', pattern ) );
		return;
	} );

	//---------------------------------------------------------------------
	it( `the pattern '*' should match any text including an empty string`, function ()
	{
		let pattern = '*';
		LIB_ASSERT.ok( LQC.Text.Matches( '', pattern ) );
		LIB_ASSERT.ok( LQC.Text.Matches( 'a', pattern ) );
		LIB_ASSERT.ok( LQC.Text.Matches( 'abc', pattern ) );
		LIB_ASSERT.ok( LQC.Text.Matches( '*', pattern ) );
		return;
	} );

	//---------------------------------------------------------------------
	it( `the pattern '?' should match a single character`, function ()
	{
		let pattern = '?';
		LIB_ASSERT.ok( !LQC.Text.Matches( '', pattern ) );
		LIB_ASSERT.ok( LQC.Text.Matches( 'a', pattern ) );
		LIB_ASSERT.ok( !LQC.Text.Matches( 'abc', pattern ) );
		LIB_ASSERT.ok( LQC.Text.Matches( '*', pattern ) );
		return;
	} );

	//---------------------------------------------------------------------
	it( `the pattern '??' should match exactly two characters`, function ()
	{
		let pattern = '??';
		LIB_ASSERT.ok( !LQC.Text.Matches( '', pattern ) );
		LIB_ASSERT.ok( !LQC.Text.Matches( 'a', pattern ) );
		LIB_ASSERT.ok( !LQC.Text.Matches( '123', pattern ) );
		LIB_ASSERT.ok( LQC.Text.Matches( 'ab', pattern ) );
		LIB_ASSERT.ok( LQC.Text.Matches( '12', pattern ) );
		LIB_ASSERT.ok( LQC.Text.Matches( '  ', pattern ) );
		return;
	} );

	//---------------------------------------------------------------------
	it( `the pattern '??*' should match at least two characters`, function ()
	{
		let pattern = '??*';
		LIB_ASSERT.ok( !LQC.Text.Matches( '', pattern ) );
		LIB_ASSERT.ok( !LQC.Text.Matches( '1', pattern ) );
		LIB_ASSERT.ok( LQC.Text.Matches( '12', pattern ) );
		LIB_ASSERT.ok( LQC.Text.Matches( '123', pattern ) );
		return;
	} );

	//---------------------------------------------------------------------
	it( `the pattern '?*?' should match at least two characters`, function ()
	{
		let pattern = '?*?';
		LIB_ASSERT.ok( !LQC.Text.Matches( '', pattern ) );
		LIB_ASSERT.ok( !LQC.Text.Matches( '1', pattern ) );
		LIB_ASSERT.ok( LQC.Text.Matches( '12', pattern ) );
		LIB_ASSERT.ok( LQC.Text.Matches( '123', pattern ) );
		return;
	} );

	//---------------------------------------------------------------------
	it( `the pattern '*??' should match at least two characters`, function ()
	{
		let pattern = '*??';
		LIB_ASSERT.ok( !LQC.Text.Matches( '', pattern ) );
		LIB_ASSERT.ok( !LQC.Text.Matches( '1', pattern ) );
		LIB_ASSERT.ok( LQC.Text.Matches( '12', pattern ) );
		LIB_ASSERT.ok( LQC.Text.Matches( '123', pattern ) );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should match the pattern '1?3'`, function ()
	{
		let pattern = '1?3';
		LIB_ASSERT.ok( !LQC.Text.Matches( '', pattern ) );
		LIB_ASSERT.ok( !LQC.Text.Matches( '1', pattern ) );
		LIB_ASSERT.ok( !LQC.Text.Matches( '12', pattern ) );
		LIB_ASSERT.ok( LQC.Text.Matches( '123', pattern ) );
		LIB_ASSERT.ok( !LQC.Text.Matches( '1234', pattern ) );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should match the pattern '1*3'`, function ()
	{
		let pattern = '1*3';
		LIB_ASSERT.ok( !LQC.Text.Matches( '', pattern ) );
		LIB_ASSERT.ok( !LQC.Text.Matches( '1', pattern ) );
		LIB_ASSERT.ok( !LQC.Text.Matches( '12', pattern ) );
		LIB_ASSERT.ok( LQC.Text.Matches( '123', pattern ) );
		LIB_ASSERT.ok( LQC.Text.Matches( '13', pattern ) );
		LIB_ASSERT.ok( !LQC.Text.Matches( '1234', pattern ) );
		return;
	} );

	//---------------------------------------------------------------------
	return;
} );
