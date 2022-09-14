"use strict";

const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LQC = require( LIB_PATH.resolve( __dirname, '../liquicode-node.js' ) );


//---------------------------------------------------------------------
describe( `211) Text.ReplaceText Tests`, function ()
{

	//---------------------------------------------------------------------
	it( `should return the original text when SearchText is not found`, function ()
	{
		let text = LQC.Text.ReplaceText( 'abracadabra', 'foo', '123' );
		LIB_ASSERT.ok( text === 'abracadabra' );
		return;
	} );


	//---------------------------------------------------------------------
	it( `should replace text in the middle of a string`, function ()
	{
		let text = LQC.Text.ReplaceText( 'abracadabra', 'cad', '123' );
		LIB_ASSERT.ok( text === 'abra123abra' );
		return;
	} );


	//---------------------------------------------------------------------
	it( `should replace text at the beginning of a string`, function ()
	{
		let text = LQC.Text.ReplaceText( 'abracadabra', 'abracad', '123' );
		LIB_ASSERT.ok( text === '123abra' );
		return;
	} );


	//---------------------------------------------------------------------
	it( `should replace text at the end of a string`, function ()
	{
		let text = LQC.Text.ReplaceText( 'abracadabra', 'dabra', '123' );
		LIB_ASSERT.ok( text === 'abraca123' );
		return;
	} );


	//---------------------------------------------------------------------
	it( `should replace only the first instance when MaxTimes is 1`, function ()
	{
		let text = LQC.Text.ReplaceText( 'abracadabra', 'bra', '123', 1 );
		LIB_ASSERT.ok( text === 'a123cadabra' );
		return;
	} );


	//---------------------------------------------------------------------
	it( `should replace all instances when MaxTimes is -1`, function ()
	{
		let text = LQC.Text.ReplaceText( 'abracadabra', 'bra', '123', -1 );
		LIB_ASSERT.ok( text === 'a123cada123' );
		return;
	} );


	//---------------------------------------------------------------------
	return;
} );
