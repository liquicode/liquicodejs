"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '221',
	member_of: 'Text',
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


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function AfterFirstWord
	 * @returns {string}
	 * @description
	 * Returns the remainder of a text phrase occurring after the first word.
	 * @param {string} [Phrase]
	 * A text phrase containing words separated by delimiters.
	 * @param {string} [Delimiters=" "]
	 * A string of characters that break the phrase into words.
	*/
	//-end-jsdoc-----------------------------------------------------------


	function AfterFirstWord( Phrase, Delimiters )
	{
		Phrase = Liquicode.Schema.ValidateValue( Phrase, _Schema.Parameters.Phrase , { coerce_values: true, throw_errors: true });
		Delimiters = Liquicode.Schema.ValidateValue( Delimiters, _Schema.Parameters.Delimiters , { coerce_values: true, throw_errors: true });

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
		_Schema: _Schema,
		AfterFirstWord: AfterFirstWord,
	};
};
