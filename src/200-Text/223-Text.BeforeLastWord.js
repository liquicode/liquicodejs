"use strict";


//---------------------------------------------------------------------
let Schema = {
	id: '223',
	name: 'BeforeLastWord',
	type: 'function',
	returns: 'string',
	description: [
		'Returns the remainder of a text phrase occurring befiore the last word.',
	],
	Parameters: {
		Phrase: {
			name: 'Phrase',
			type: 'string',
			required: false,
			default: '',
			description: 'A text phrase containing words separated by delimiters.',
		},
		Delimiters: {
			name: 'Delimiters',
			type: 'string',
			required: false,
			default: ' ',
			description: 'A string of characters that break the phrase into words.',
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{

	//---------------------------------------------------------------------
	function BeforeLastWord( Phrase, Delimiters )
	{
		Phrase = Liquicode.Core.ValidateField( Phrase, Schema.Parameters.Phrase );
		Delimiters = Liquicode.Core.ValidateField( Delimiters, Schema.Parameters.Delimiters );

		for ( let index = Phrase.length - 1; index >= 0; index-- )
		{
			let ch = Phrase.substr( index, 1 );
			if ( Delimiters.indexOf( ch ) >= 0 )
			{
				return Phrase.substr( 0, index );
			}
		}
		return '';
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: Schema,
		BeforeLastWord: BeforeLastWord,
	};
};
