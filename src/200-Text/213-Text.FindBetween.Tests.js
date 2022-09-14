"use strict";

const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LQC = require( LIB_PATH.resolve( __dirname, '../liquicode-node.js' ) );


//---------------------------------------------------------------------
describe( `213) Text.FindBetween Tests`, function ()
{

	//---------------------------------------------------------------------
	it( `should find all text when StartText and EndText are missing`, function ()
	{
		let text = LQC.Text.FindBetween( 'abracadabra' );
		LIB_ASSERT.ok( text === 'abracadabra' );
		return;
	} );


	//---------------------------------------------------------------------
	it( `should find all text when StartText and EndText are empty strings`, function ()
	{
		let text = LQC.Text.FindBetween( 'abracadabra', '', '' );
		LIB_ASSERT.ok( text === 'abracadabra' );
		return;
	} );


	//---------------------------------------------------------------------
	it( `should find all text from StartText when EndText is empty`, function ()
	{
		let text = LQC.Text.FindBetween( 'abracadabra', 'bra' );
		LIB_ASSERT.ok( text === 'cadabra' );
		return;
	} );


	//---------------------------------------------------------------------
	it( `should find all text up to EndText when StartText is empty`, function ()
	{
		let text = LQC.Text.FindBetween( 'abracadabra', '', 'bra' );
		LIB_ASSERT.ok( text === 'a' );
		return;
	} );


	//---------------------------------------------------------------------
	it( `should find text between StartText and EndText`, function ()
	{
		let text = LQC.Text.FindBetween( 'abracadabra', 'bra', 'bra' );
		LIB_ASSERT.ok( text === 'cada' );
		return;
	} );


	//---------------------------------------------------------------------
	it( `should find text between StartText and EndText when the found text is empty`, function ()
	{
		let text = LQC.Text.FindBetween( 'abracadabra', 'bra', 'cad' );
		LIB_ASSERT.ok( text === '' );
		return;
	} );


	//---------------------------------------------------------------------
	it( `should return null when StartText or EndText is not found`, function ()
	{
		let text = LQC.Text.FindBetween( 'abracadabra', 'foo', '' );
		LIB_ASSERT.ok( text === null );
		text = LQC.Text.FindBetween( 'abracadabra', '', 'foo' );
		LIB_ASSERT.ok( text === null );
		text = LQC.Text.FindBetween( 'abracadabra', 'foo', 'foo' );
		LIB_ASSERT.ok( text === null );
		return;
	} );


	//---------------------------------------------------------------------
	return;
} );
