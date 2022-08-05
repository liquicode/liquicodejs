"use strict";


//---------------------------------------------------------------------
let Schema = {
	id: '502',
	name: 'Tokenize',
	type: 'function',
	returns: 'object',
	description: [
		'Returns the parsed tokens.',
	],
	Parameters: {
		Text: {
			name: 'PresetName',
			type: 'string',
			required: false,
			default: '',
			description: [
				`To retrieve an options preset, use one of: 'csv', or 'cli'`,
				`You can leave this empty for the default options.`,
			],
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//---------------------------------------------------------------------
	const TokenTypes =
	{
		whitespace: 'whitespace',
		symbol: 'symbol',
		delimiter: 'delimiter',
		literal: 'literal',
		identifier: 'identifier',
		numeric: 'numeric',
		keyword: 'keyword',
	};


	//---------------------------------------------------------------------
	/**
	 * Tokenizes a text string.
	 * Returns an array of tokens.
	 * @param {string} Text - The text to tokenize.
	 * @param {object} Options - Options to apply while tokenizing. See: Token.TokenizeOptions().
	 * @returns {array} An array of tokens.
	 */
	function Tokenize( Text, Options )
	{
		// Get the options.
		let tokenize_options = Liquicode.Token.TokenizeOptions();
		tokenize_options = Liquicode.Object.Merge( tokenize_options, Options );

		// Tokenize the text.
		let tokens = [];
		if ( !Text ) { return tokens; }

		let ichar = 0;
		let len = Text.length;
		while ( true )
		{
			// Exit loop when reached end of text string.
			if ( ichar === len ) { break; }

			// Parse the next token.
			let token = read_whitespace( tokenize_options, Text, ichar );
			if ( !token ) { token = read_symbol( tokenize_options, Text, ichar ); }
			if ( !token ) { token = read_literal( tokenize_options, Text, ichar ); }
			if ( !token ) { token = read_numeric( tokenize_options, Text, ichar ); }
			if ( !token ) { token = read_identifier( tokenize_options, Text, ichar ); }
			if ( !token ) { throw new Error( `Unable to continue parsing at location ${ichar}.` ); }
			ichar += token.token.length;

			// Collect tokens.
			if (
				token
				&& ( token.type === TokenTypes.whitespace )
				&& tokenize_options.discard_whitespace
			) { continue; }
			tokens.push( token );
		}

		// Do required value conversions.
		convert_values( tokenize_options, tokens );

		// Return the tokens.
		return tokens;
	};


	//---------------------------------------------------------------------
	function read_whitespace( Options, Text, StartAt )
	{
		let ichar = StartAt;
		let len = Text.length;
		while ( Options.whitespace.includes( Text.charAt( ichar ) ) ) 
		{
			ichar++;
			if ( ichar === len ) { break; }
		}
		if ( ichar === StartAt ) { return null; }
		let token = {
			type: TokenTypes.whitespace,
			token: Text.substring( StartAt, ichar ),
			at: StartAt
		};
		return token;
	}


	//---------------------------------------------------------------------
	function read_symbol( Options, Text, StartAt )
	{
		if ( !Options.symbols.includes( Text.charAt( StartAt ) ) ) { return null; }
		let token = {
			type: TokenTypes.symbol,
			token: Text.charAt( StartAt ),
			at: StartAt
		};
		return token;
	}


	//---------------------------------------------------------------------
	function read_numeric( Options, Text, StartAt )
	{
		let ichar = StartAt;
		let len = Text.length;
		while ( true ) 
		{
			let ch = Text.charAt( ichar );
			if (
				( ( ch >= '0' ) && ( ch <= '9' ) )
				|| ( ch === '.' ) )
			{ ichar++; }
			else
			{ break; }
			if ( ichar === len ) { break; }
		}
		if ( ichar === StartAt ) { return null; }
		let token = {
			type: TokenTypes.numeric,
			token: Text.substring( StartAt, ichar ),
			at: StartAt
		};
		return token;
	}


	//---------------------------------------------------------------------
	function read_literal( Options, Text, StartAt )
	{
		if ( !Options.literal_delimiters.includes( Text.charAt( StartAt ) ) ) { return null; }
		let start_char = Text.charAt( StartAt );
		let ichar = StartAt + 1;
		let len = Text.length;
		while ( true ) 
		{
			if ( ichar >= len ) { break; }
			let ch = Text.charAt( ichar );
			// Check for self escaping delimiters (e.g. "Hello ""World""!").
			if ( Options.self_escape_literal_delimiters
				&& Options.literal_delimiters.includes( ch )
				&& ( ( ichar + 1 ) < len )
				&& ( ch === Text.charAt( ichar + 1 ) )
			) 
			{
				ichar++; // Take the first instance of the character.
				ichar++; // Take the second instance of the character.
				continue;
			}
			// Check for an escape character.
			if ( Options.literal_escape_chars.includes( ch ) )
			{
				ichar++; // Take the escape character.
				ichar++; // Take the escaped character.
				continue;
			}
			// Check if we found the closing delimiter for this literal.
			if ( ch === start_char )
			{
				// Found the end of the literal.
				ichar++; // Take the closing delimiter.
				break;
			}
			// Check for the end of the given string.
			ichar++;
			if ( ichar >= len ) { break; }
		}
		if ( ichar === StartAt ) { return null; }
		let token = {
			type: TokenTypes.literal,
			token: Text.substring( StartAt, ichar ),
			at: StartAt
		};
		return token;
	}


	//---------------------------------------------------------------------
	function read_identifier( Options, Text, StartAt )
	{
		let ichar = StartAt;
		let len = Text.length;
		while ( true )
		{
			let ch = Text.charAt( ichar );
			if ( Options.whitespace.includes( ch ) ) { break; }
			if ( Options.symbols.includes( ch ) ) { break; }
			if ( Options.literal_delimiters.includes( ch ) ) { break; }
			ichar++;
			if ( ichar === len ) { break; }
		}
		if ( ichar === StartAt ) { return null; }
		let token = {
			type: TokenTypes.identifier,
			token: Text.substring( StartAt, ichar ),
			at: StartAt
		};

		// Detect keywords.
		let is_keyword = false;
		if ( Options.keywords_are_case_sensitive )
		{
			is_keyword = Options.keywords.find(
				keyword => ( keyword === token.token )
			);
		}
		else
		{
			is_keyword = Options.keywords.find(
				keyword => ( keyword.toLowerCase() === token.token.toLowerCase() )
			);
		}
		if ( is_keyword )
		{
			token.type = TokenTypes.keyword;
		}

		// Return the token.
		return token;
	}


	//---------------------------------------------------------------------
	function convert_values( Options, Tokens )
	{
		Tokens.forEach(
			( token ) =>
			{
				if ( token.type === TokenTypes.numeric )
				{
					if ( Options.resolve_numeric_values )
					{
						if ( token.token.indexOf( '.' ) >= 0 )
						{
							// Convert to float value.
							token.token = parseFloat( token.token );
						}
						else
						{
							// Convert to integer value.
							token.token = parseInt( token.token );
						}
					}
				}
				else if ( token.type === TokenTypes.literal )
				{
					if ( Options.resolve_literal_values )
					{
						// Remove the surrounding quote characters.
						token.token = token.token.substr( 1, token.token.length - 2 );
					}
				}
				return;
			} );
		return;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: Schema,
		Tokenize: Tokenize,
	};
};
