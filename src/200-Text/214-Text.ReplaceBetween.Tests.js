"use strict";

const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LQC = require( LIB_PATH.resolve( __dirname, '../liquicode-node.js' ) );


//---------------------------------------------------------------------
describe( `214) Text.ReplaceBetween Tests`, function ()
{

	//---------------------------------------------------------------------
	it( `should replace all text when StartText and EndText are empty strings`, function ()
	{
		let text = LQC.Text.ReplaceBetween( 'abracadabra', '', '', '123456789' );
		LIB_ASSERT.ok( text === '123456789' );
		return;
	} );


	//---------------------------------------------------------------------
	it( `should replace all text from StartText when EndText is empty`, function ()
	{
		let text = LQC.Text.ReplaceBetween( 'abracadabra', 'bra', '', '123' );
		LIB_ASSERT.ok( text === 'abra123' );
		return;
	} );


	//---------------------------------------------------------------------
	it( `should replace all text up to EndText when StartText is empty`, function ()
	{
		let text = LQC.Text.ReplaceBetween( 'abracadabra', '', 'bra', '123' );
		LIB_ASSERT.ok( text === '123bracadabra' );
		return;
	} );


	//---------------------------------------------------------------------
	it( `should replace text between StartText and EndText`, function ()
	{
		let text = LQC.Text.ReplaceBetween( 'abracadabra', 'bra', 'bra', '123' );
		LIB_ASSERT.ok( text === 'abra123bra' );
		return;
	} );


	//---------------------------------------------------------------------
	it( `should not replace any text when StartText or EndText are not found`, function ()
	{
		let text = LQC.Text.ReplaceBetween( 'abracadabra', 'foo', 'bra', '123' );
		LIB_ASSERT.ok( text === 'abracadabra' );
		text = LQC.Text.ReplaceBetween( 'abracadabra', 'bra', 'foo', '123' );
		LIB_ASSERT.ok( text === 'abracadabra' );
		text = LQC.Text.ReplaceBetween( 'abracadabra', 'foo', '', '123' );
		LIB_ASSERT.ok( text === 'abracadabra' );
		text = LQC.Text.ReplaceBetween( 'abracadabra', '', 'foo', '123' );
		LIB_ASSERT.ok( text === 'abracadabra' );
		return;
	} );


	//---------------------------------------------------------------------
	it( `should insert text between StartText and EndText when the found text is empty`, function ()
	{
		let text = LQC.Text.ReplaceBetween( 'abracadabra', 'bra', 'cad', '123' );
		LIB_ASSERT.ok( text === 'abra123cadabra' );
		return;
	} );


	//---------------------------------------------------------------------
	it( `should return the original text when StartText and EndText are not found`, function ()
	{
		let text = LQC.Text.ReplaceBetween( 'abracadabra', 'foo', '', '123' );
		LIB_ASSERT.ok( text === 'abracadabra' );
		text = LQC.Text.ReplaceBetween( 'abracadabra', '', 'foo', '123' );
		LIB_ASSERT.ok( text === 'abracadabra' );
		text = LQC.Text.ReplaceBetween( 'abracadabra', 'foo', 'foo', '123' );
		LIB_ASSERT.ok( text === 'abracadabra' );
		return;
	} );


	//---------------------------------------------------------------------
	return;
} );
