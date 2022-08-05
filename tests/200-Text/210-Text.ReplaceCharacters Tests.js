"use strict";


const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LQC = require( LIB_PATH.resolve( __dirname, '../../src/liquicode-node.js' ) );


//---------------------------------------------------------------------
describe( `210-String.ReplaceCharacters Tests`, function ()
{

	describe( `replace a single character with a single character`, function ()
	{

		//---------------------------------------------------------------------
		it( `should replace a single character with a single character, one instance`, function ()
		{
			let text = 'This is my voice, my weapon of choice.';
			text = LQC.String.ReplaceCharacters( text, 'i', '*', 1 );
			LIB_ASSERT.strictEqual( text, 'Th*s is my voice, my weapon of choice.' );
			return;
		} );


		//---------------------------------------------------------------------
		it( `should replace a single character with a single character, two instances`, function ()
		{
			let text = 'This is my voice, my weapon of choice.';
			text = LQC.String.ReplaceCharacters( text, 'i', '*', 2 );
			LIB_ASSERT.strictEqual( text, 'Th*s *s my voice, my weapon of choice.' );
			return;
		} );


		//---------------------------------------------------------------------
		it( `should replace a single character with a single character, all instances`, function ()
		{
			let text = 'This is my voice, my weapon of choice.';
			text = LQC.String.ReplaceCharacters( text, 'i', '*' );
			LIB_ASSERT.strictEqual( text, 'Th*s *s my vo*ce, my weapon of cho*ce.' );
			return;
		} );

		//---------------------------------------------------------------------
		return;
	} );


	describe( `replace multiple characters with a single character`, function ()
	{

		//---------------------------------------------------------------------
		it( `should replace multiple characters with a single character, one instance`, function ()
		{
			let text = 'This is my voice, my weapon of choice.';
			text = LQC.String.ReplaceCharacters( text, 'aeiou', '*', 1 );
			LIB_ASSERT.strictEqual( text, 'Th*s is my voice, my weapon of choice.' );
			return;
		} );


		//---------------------------------------------------------------------
		it( `should replace multiple characters with a single character, two instances`, function ()
		{
			let text = 'This is my voice, my weapon of choice.';
			text = LQC.String.ReplaceCharacters( text, 'aeiou', '*', 2 );
			LIB_ASSERT.strictEqual( text, 'Th*s *s my voice, my weapon of choice.' );
			return;
		} );


		//---------------------------------------------------------------------
		it( `should replace multiple characters with a single character, all instances`, function ()
		{
			let text = 'This is my voice, my weapon of choice.';
			text = LQC.String.ReplaceCharacters( text, 'aeiou', '*' );
			LIB_ASSERT.strictEqual( text, 'Th*s *s my v**c*, my w**p*n *f ch**c*.' );
			return;
		} );

		//---------------------------------------------------------------------
		return;
	} );


	describe( `replace a single character with a string`, function ()
	{

		//---------------------------------------------------------------------
		it( `should replace a single character with a string, one instance`, function ()
		{
			let text = 'This is my voice, my weapon of choice.';
			text = LQC.String.ReplaceCharacters( text, 'i', '|abc|', 1 );
			LIB_ASSERT.strictEqual( text, 'Th|abc|s is my voice, my weapon of choice.' );
			return;
		} );

		//---------------------------------------------------------------------
		it( `should replace a single character with a string, two instances`, function ()
		{
			let text = 'This is my voice, my weapon of choice.';
			text = LQC.String.ReplaceCharacters( text, 'i', '|abc|', 2 );
			LIB_ASSERT.strictEqual( text, 'Th|abc|s |abc|s my voice, my weapon of choice.' );
			return;
		} );

		//---------------------------------------------------------------------
		it( `should replace a single character with a string, all instances`, function ()
		{
			let text = 'This is my voice, my weapon of choice.';
			text = LQC.String.ReplaceCharacters( text, 'i', '|abc|' );
			LIB_ASSERT.strictEqual( text, 'Th|abc|s |abc|s my vo|abc|ce, my weapon of cho|abc|ce.' );
			return;
		} );

		//---------------------------------------------------------------------
		return;
	} );


	//---------------------------------------------------------------------
	return;
} );
