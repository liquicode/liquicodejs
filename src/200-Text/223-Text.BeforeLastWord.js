"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '223',
	member_of: 'Text',
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


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function BeforeLastWord
	 * @returns {string}
	 * @description
	 * Returns the remainder of a text phrase occurring befiore the last word.
	 * @param {string} [Phrase]
	 * A text phrase containing words separated by delimiters.
	 * @param {string} [Delimiters=" "]
	 * A string of characters that break the phrase into words.
	*/
	//-end-jsdoc-----------------------------------------------------------


	function BeforeLastWord( Phrase, Delimiters )
	{
		Phrase = Liquicode.Schema.ValidateValue( Phrase, _Schema.Parameters.Phrase , { coerce_values: true, throw_errors: true });
		Delimiters = Liquicode.Schema.ValidateValue( Delimiters, _Schema.Parameters.Delimiters , { coerce_values: true, throw_errors: true });

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
		_Schema: _Schema,
		BeforeLastWord: BeforeLastWord,
	};
};
