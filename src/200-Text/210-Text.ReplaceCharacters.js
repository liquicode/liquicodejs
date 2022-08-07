"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '210',
	member_of: 'Text',
	name: 'ReplaceCharacters',
	type: 'function',
	returns: 'string',
	description: [
		'Replaces characters within a string.',
		'Returns the modified string.',
	],
	Parameters: {
		Text: {
			name: 'Text',
			type: 'string',
			required: true,
			default: '',
		},
		SearchCharacters: {
			name: 'SearchCharacters',
			type: 'string',
			required: true,
			default: '',
		},
		ReplacementText: {
			name: 'ReplacementText',
			type: 'string',
			required: true,
			default: '',
		},
		MaxTimes: {
			name: 'MaxTimes',
			type: 'number',
			format: 'integer',
			required: false,
			default: -1,
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function ReplaceCharacters
	 * @returns {string}
	 * @description
	 * Replaces characters within a string.
	 * Returns the modified string.
	 * @param {string} Text
	 * @param {string} SearchCharacters
	 * @param {string} ReplacementText
	 * @param {number} [MaxTimes=-1]
	*/
	//-end-jsdoc-----------------------------------------------------------


	function ReplaceCharacters( Text, SearchCharacters, ReplacementText, MaxTimes )
	{
		// Validate Parameters
		Text = Liquicode.Schema.ValidateValue( Text, _Schema.Parameters.Text , { coerce_values: true, throw_errors: true });
		SearchCharacters = Liquicode.Schema.ValidateValue( SearchCharacters, _Schema.Parameters.SearchCharacters, { coerce_values: true, throw_errors: true } );
		ReplacementText = Liquicode.Schema.ValidateValue( ReplacementText, _Schema.Parameters.ReplacementText , { coerce_values: true, throw_errors: true });
		MaxTimes = Liquicode.Schema.ValidateValue( MaxTimes, _Schema.Parameters.MaxTimes , { coerce_values: true, throw_errors: true });

		let new_text = '';
		let count = 0;
		for ( let index = 0; index < Text.length; index++ )
		{
			if ( ( MaxTimes > 0 ) && ( count >= MaxTimes ) ) 
			{
				new_text += Text.slice( index );
				break;
			}
			let char = Text[ index ];
			if ( SearchCharacters.indexOf( char ) >= 0 )
			{
				char = ReplacementText;
				count++;
			}
			new_text += char;
		}
		return new_text;
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		ReplaceCharacters: ReplaceCharacters,
	};
};
