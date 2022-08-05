"use strict";


//---------------------------------------------------------------------
let Schema = {
	id: '222',
	member_of: 'Text',
	name: 'LastWord',
	type: 'function',
	returns: 'string',
	description: [
		'Returns the last word of a text phrase.',
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


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function LastWord
	 * @returns {string}
	 * @description
	 * Returns the last word of a text phrase.
	 * @param {string} [Phrase]
	 * A text phrase containing words separated by delimiters.
	 * @param {string} [Delimiters=" "]
	 * A string of characters that break the phrase into words.
	*/
	//-end-jsdoc-----------------------------------------------------------


	function LastWord( Phrase, Delimiters )
	{
		Phrase = Liquicode.Core.ValidateField( Phrase, Schema.Parameters.Phrase );
		Delimiters = Liquicode.Core.ValidateField( Delimiters, Schema.Parameters.Delimiters );

		let word_end = -1;
		for ( let index = Phrase.length - 1; index >= 0; index-- )
		{
			let ch = Phrase.substr( index, 1 );
			if ( Delimiters.indexOf( ch ) >= 0 )
			{
				if ( word_end > 0 )
				{
					return Phrase.substr( index + 1, ( word_end - index ) );
				}
			}
			else
			{
				if ( word_end < 0 )
				{
					word_end = index;
				}
			}
		}
		if ( word_end < 0 ) { return ''; }
		return Phrase.substr( 0, ( word_end - index ) );
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: Schema,
		LastWord: LastWord,
	};
};
