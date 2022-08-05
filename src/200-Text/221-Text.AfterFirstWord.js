"use strict";


//---------------------------------------------------------------------
let Schema = {
	id: '221',
	name: 'AfterFirstWord',
	type: 'function',
	returns: 'string',
	description: [
		'Returns the remainder of a text phrase occurring after the first word.',
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
	function AfterFirstWord( Phrase, Delimiters )
	{
		Phrase = Liquicode.Core.ValidateField( Phrase, Schema.Parameters.Phrase );
		Delimiters = Liquicode.Core.ValidateField( Delimiters, Schema.Parameters.Delimiters );

		for ( let index = 0; index < Phrase.length; index++ )
		{
			let ch = Phrase.substr( index, 1 );
			if ( Delimiters.indexOf( ch ) >= 0 )
			{
				while ( Delimiters.indexOf( ch ) >= 0 )
				{
					index++;
					if ( index >= Phrase.length ) { break; }
					ch = Phrase.substr( index, 1 );
				}
				return Phrase.substr( index );
			}
		}
		return '';
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: Schema,
		AfterFirstWord: AfterFirstWord,
	};
};
