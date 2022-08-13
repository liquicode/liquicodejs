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
		Text = Liquicode.Types.Coerce( Text ).ToString();
		SearchCharacters = Liquicode.Types.Coerce( SearchCharacters ).ToString();
		ReplacementText = Liquicode.Types.Coerce( ReplacementText ).ToString();
		MaxTimes = Liquicode.Types.Coerce( MaxTimes ).ToNumber();

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
