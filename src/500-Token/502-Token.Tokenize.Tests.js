"use strict";


const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LQC = require( LIB_PATH.resolve( __dirname, '../liquicode-node.js' ) );


//---------------------------------------------------------------------
describe( `502-Token.Tokenize Tests`, function ()
{

	//---------------------------------------------------------------------
	it( `should tokenize an undefined string`,
		async function ()
		{
			let tokens = LQC.Token.Tokenize();
			LIB_ASSERT.ok( tokens );
			LIB_ASSERT.ok( tokens.length === 0 );
			return;
		} );


	//---------------------------------------------------------------------
	it( `should tokenize an empty string`,
		async function ()
		{
			let tokens = LQC.Token.Tokenize( '' );
			LIB_ASSERT.ok( tokens );
			LIB_ASSERT.ok( tokens.length === 0 );
			return;
		} );


	//---------------------------------------------------------------------
	it( `should tokenize a simple string`,
		async function ()
		{
			let tokens = LQC.Token.Tokenize( 'Abracadabra' );
			LIB_ASSERT.ok( tokens );
			LIB_ASSERT.strictEqual( tokens.length, 1 );
			LIB_ASSERT.strictEqual( tokens[ 0 ].token, "Abracadabra" );
			LIB_ASSERT.strictEqual( tokens[ 0 ].type, 'identifier' );
			LIB_ASSERT.strictEqual( tokens[ 0 ].at, 0 );
			return;
		} );


	//---------------------------------------------------------------------
	it( `should tokenize a more complex string and detect custom keywords`,
		async function ()
		{
			let options = LQC.Token.TokenizeOptions();
			options.keywords.push( 'let' );

			let tokens = LQC.Token.Tokenize( 'let X = 3.14;', options );
			LIB_ASSERT.ok( tokens );

			let expected_tokens =
				[
					{ token: "let", type: 'keyword', at: 0 },
					{ token: " ", type: 'whitespace', at: 3 },
					{ token: "X", type: 'identifier', at: 4 },
					{ token: " ", type: 'whitespace', at: 5 },
					{ token: "=", type: 'symbol', at: 6 },
					{ token: " ", type: 'whitespace', at: 7 },
					{ token: "3.14", type: 'numeric', at: 8 },
					{ token: ";", type: 'symbol', at: 12 },
				];
			LIB_ASSERT.deepStrictEqual( tokens, expected_tokens );
			return;
		} );


	//---------------------------------------------------------------------
	it( `should tokenize a symbol`,
		async function ()
		{
			let tokens = LQC.Token.Tokenize( '=' );
			LIB_ASSERT.ok( tokens );

			let expected_tokens =
				[
					{ token: "=", type: 'symbol', at: 0 },
				];
			LIB_ASSERT.deepStrictEqual( tokens, expected_tokens );
			return;
		} );


	//---------------------------------------------------------------------
	it( `should tokenize whitespace`,
		async function ()
		{
			let tokens = LQC.Token.Tokenize( '\t \n' );
			LIB_ASSERT.ok( tokens );

			let expected_tokens =
				[
					{ token: "\t \n", type: 'whitespace', at: 0 },
				];
			LIB_ASSERT.deepStrictEqual( tokens, expected_tokens );
			return;
		} );


	//---------------------------------------------------------------------
	it( `should tokenize a literal`,
		async function ()
		{
			let tokens = LQC.Token.Tokenize( '"What is the answer?"' );
			LIB_ASSERT.ok( tokens );

			let expected_tokens =
				[
					{ token: `"What is the answer?"`, type: 'literal', at: 0 },
				];
			LIB_ASSERT.deepStrictEqual( tokens, expected_tokens );
			return;
		} );


	//---------------------------------------------------------------------
	it( `should tokenize a literal with an apostrophe`,
		async function ()
		{
			let tokens = LQC.Token.Tokenize( `"What's the answer?"` );
			LIB_ASSERT.ok( tokens );

			let expected_tokens =
				[
					{ token: `"What's the answer?"`, type: 'literal', at: 0 },
				];
			LIB_ASSERT.deepStrictEqual( tokens, expected_tokens );
			return;
		} );


	//---------------------------------------------------------------------
	it( `should tokenize a literal with an escape character`,
		async function ()
		{
			let tokens = LQC.Token.Tokenize( `'What\\'s the answer?'` );
			LIB_ASSERT.ok( tokens );

			let expected_tokens =
				[
					{ token: `'What\\'s the answer?'`, type: 'literal', at: 0 },
				];
			LIB_ASSERT.deepStrictEqual( tokens, expected_tokens );
			return;
		} );


	//---------------------------------------------------------------------
	it( `should tokenize a literal with an alternate escape character`,
		async function ()
		{
			let options = LQC.Token.TokenizeOptions();
			options.literal_escape_chars += '~';

			let tokens = LQC.Token.Tokenize( `'What~'s the answer?'`, options );
			LIB_ASSERT.ok( tokens );

			let expected_tokens =
				[
					{ token: `'What~'s the answer?'`, type: 'literal', at: 0 },
				];
			LIB_ASSERT.deepStrictEqual( tokens, expected_tokens );
			return;
		} );


	//---------------------------------------------------------------------
	it( `should tokenize a literal with a self escaping duplicate character`,
		async function ()
		{
			let options = LQC.Token.TokenizeOptions();
			options.self_escape_literal_delimiters = true;

			let tokens = LQC.Token.Tokenize( `"What's ""the"" answer?"`, options );
			LIB_ASSERT.ok( tokens );

			let expected_tokens =
				[
					{ token: `"What's ""the"" answer?"`, type: 'literal', at: 0 },
				];
			LIB_ASSERT.deepStrictEqual( tokens, expected_tokens );
			return;
		} );


	//---------------------------------------------------------------------
	it( `should discard whitespace`,
		async function ()
		{
			let options = LQC.Token.TokenizeOptions();
			options.keywords.push( 'let' );
			options.discard_whitespace = true;

			let tokens = LQC.Token.Tokenize( `let X = 3.14;`, options );
			LIB_ASSERT.ok( tokens );

			let expected_tokens =
				[
					{ token: "let", type: 'keyword', at: 0 },
					{ token: "X", type: 'identifier', at: 4 },
					{ token: "=", type: 'symbol', at: 6 },
					{ token: "3.14", type: 'numeric', at: 8 },
					{ token: ";", type: 'symbol', at: 12 },
				];
			LIB_ASSERT.deepStrictEqual( tokens, expected_tokens );
			return;
		} );


	//---------------------------------------------------------------------
	it( `should detect keywords, case sensitive`,
		async function ()
		{
			let options = LQC.Token.TokenizeOptions();
			options.discard_whitespace = true;
			options.keywords_are_case_sensitive = true;
			options.keywords.push( 'Let' );

			let tokens = LQC.Token.Tokenize( `let X = 3.14;`, options );
			LIB_ASSERT.ok( tokens );

			let expected_tokens =
				[
					{ token: "let", type: 'identifier', at: 0 },
					{ token: "X", type: 'identifier', at: 4 },
					{ token: "=", type: 'symbol', at: 6 },
					{ token: "3.14", type: 'numeric', at: 8 },
					{ token: ";", type: 'symbol', at: 12 },
				];
			LIB_ASSERT.deepStrictEqual( tokens, expected_tokens );
			return;
		} );


	//---------------------------------------------------------------------
	it( `should detect keywords, case insensitive`,
		async function ()
		{
			let options = LQC.Token.TokenizeOptions();
			options.discard_whitespace = true;
			options.keywords.push( 'Let' );

			let tokens = LQC.Token.Tokenize( `let X = 3.14;`, options );
			LIB_ASSERT.ok( tokens );

			let expected_tokens =
				[
					{ token: "let", type: 'keyword', at: 0 },
					{ token: "X", type: 'identifier', at: 4 },
					{ token: "=", type: 'symbol', at: 6 },
					{ token: "3.14", type: 'numeric', at: 8 },
					{ token: ";", type: 'symbol', at: 12 },
				];
			LIB_ASSERT.deepStrictEqual( tokens, expected_tokens );
			return;
		} );


	//---------------------------------------------------------------------
	return;
} );
