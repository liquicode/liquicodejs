"use strict";

const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LQC = require( LIB_PATH.resolve( __dirname, '../../src/liquicode-node.js' ) );


//---------------------------------------------------------------------
describe( `220-String.FirstWord Tests`, function ()
{

	//---------------------------------------------------------------------
	it( `should get an empty word from empty text`, function ()
	{
		let text = '';
		let delimiters = ' ,.!?;:';
		let word = LQC.String.FirstWord( text, delimiters );
		LIB_ASSERT.strictEqual( word, '' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should get an empty word from null text`, function ()
	{
		let text = null;
		let delimiters = ' ,.!?;:';
		let word = LQC.String.FirstWord( text, delimiters );
		LIB_ASSERT.strictEqual( word, '' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should get the first word`, function ()
	{
		let text = 'This is my voice, my weapon of choice.';
		let delimiters = ' ,.!?;:';
		let word = LQC.String.FirstWord( text, delimiters );
		LIB_ASSERT.strictEqual( word, 'This' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should get the first word of a phrase with only a single word`, function ()
	{
		let text = 'This';
		let delimiters = ' ,.!?;:';
		let word = LQC.String.FirstWord( text, delimiters );
		LIB_ASSERT.strictEqual( word, 'This' );
		return;
	} );

	//---------------------------------------------------------------------
	return;
} );
