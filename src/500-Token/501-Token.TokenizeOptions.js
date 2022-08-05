"use strict";


//---------------------------------------------------------------------
let Schema = {
	id: '501',
	name: 'TokenizeOptions',
	type: 'function',
	returns: 'object',
	description: [
		'Returns a set of options for calling Tokenize().',
		'Throws an error if an invalid value for PresetName is given.',
	],
	Parameters: {
		Text: {
			name: 'PresetName',
			type: 'string',
			required: false,
			default: '',
			description: [
				`To retrieve an options preset, use one of: 'csv', or 'cli'`,
				`You can leave this empty or 'default' for the default options.`,
			],
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//---------------------------------------------------------------------
	function TokenizeOptions( PresetName )
	{
		let options = {
			whitespace: ` \t\r\n`,
			symbols: `.;,:<>+-*/^()[]{}=`,
			literal_delimiters: `'"`,
			literal_escape_chars: `\\`,
			self_escape_literal_delimiters: false,
			keywords: [],
			keywords_are_case_sensitive: false,
			discard_whitespace: false,
			resolve_literal_values: false,
			resolve_numeric_values: false,
		};
		if ( !PresetName || PresetName === 'default' )
		{
			/* Do Nothing */
		}
		else if ( PresetName === 'csv' )
		{
			options.symbols = `,`; // Comma seperated values.
			options.literal_delimiters = `"`; // Use double quotes around values.
			options.literal_escape_chars = `\\`; // Allow an escape character.
			options.self_escape_literal_delimiters = true; // Allow self-delimiting double quotes.
			options.resolve_literal_values = true;
		}
		else if ( PresetName === 'cli' )
		{
			options.whitespace = ` \t\r\n`;
			options.symbols = `-:=`;
			options.literal_delimiters = `'"`;
			options.literal_escape_chars = `\\`;
			options.keywords = [];
			options.discard_whitespace = true;
			options.resolve_literal_values = true;
			options.resolve_numeric_values = true;
		}
		else
		{
			throw new Error( `The parameter [PresetName] has an invalid value of [${PresetName}]. Must be one of: 'default', 'csv', or 'cli'.` );
		}
		return options;
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: Schema,
		TokenizeOptions: TokenizeOptions,
	};
};
