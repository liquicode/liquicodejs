"use strict";


//---------------------------------------------------------------------
let Schema = {
	id: '220',
	name: 'FirstWord',
	type: 'function',
	returns: 'string',
	description: [
		'Returns the first word of a text phrase.',
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
			description: 'A string of whitespace and punctuation characters that break the phrase into words.',
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{

	//---------------------------------------------------------------------
	function FirstWord( Phrase, Delimiters )
	{
		Phrase = Liquicode.Core.ValidateField( Phrase, Schema.Parameters.Phrase );
		Delimiters = Liquicode.Core.ValidateField( Delimiters, Schema.Parameters.Delimiters );

		let word_start = -1;
		for ( let index = 0; index < Phrase.length; index++ )
		{
			let ch = Phrase.substr( index, 1 );
			if ( Delimiters.indexOf( ch ) >= 0 )
			{
				if ( word_start >= 0 )
				{
					return Phrase.substr( word_start, ( index - word_start ) );
				}
			}
			else
			{
				if ( word_start < 0 )
				{
					word_start = index;
				}
			}
		}
		if ( word_start < 0 ) { return ''; }
		return Phrase.substr( word_start );
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: Schema,
		FirstWord: FirstWord,
	};
};
