"use strict";

const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LQC = require( LIB_PATH.resolve( __dirname, '../liquicode-node.js' ) );


//---------------------------------------------------------------------
describe( `221) Text.AfterFirstWord Tests`, function ()
{

	//---------------------------------------------------------------------
	it( `should get no words from empty text`, function ()
	{
		let text = '';
		let delimiters = ' ,.!?;:';
		let words = LQC.Text.AfterFirstWord( text, delimiters );
		LIB_ASSERT.strictEqual( words, '' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should get no words from null text`, function ()
	{
		let text = null;
		let delimiters = ' ,.!?;:';
		let words = LQC.Text.AfterFirstWord( text, delimiters );
		LIB_ASSERT.strictEqual( words, '' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should get words after the first word`, function ()
	{
		let text = 'This is my voice, my weapon of choice.';
		let delimiters = ' ,.!?;:';
		let words = LQC.Text.AfterFirstWord( text, delimiters );
		LIB_ASSERT.strictEqual( words, 'is my voice, my weapon of choice.' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should get no words after a phrase with only a single word`, function ()
	{
		let text = 'This';
		let delimiters = ' ,.!?;:';
		let words = LQC.Text.AfterFirstWord( text, delimiters );
		LIB_ASSERT.strictEqual( words, '' );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should get the first word and after the first word`, function ()
	{
		let text = 'This is my voice, my weapon of choice.';
		let words = [ 'This', 'is', 'my', 'voice', 'my', 'weapon', 'of', 'choice' ];
		let delimiters = ' ,.!?;:';
		let word = '';
		for ( let index = 0; index < words.length; index++ )
		{
			word = LQC.Text.FirstWord( text, delimiters );
			LIB_ASSERT.strictEqual( word, words[ index ] );
			text = LQC.Text.AfterFirstWord( text, delimiters );
		}
		word = LQC.Text.FirstWord( text, delimiters );
		LIB_ASSERT.strictEqual( word, '' );
		return;
	} );

	//---------------------------------------------------------------------
	return;
} );
