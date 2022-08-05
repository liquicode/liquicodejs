"use strict";


//---------------------------------------------------------------------
let Schema = {
	id: '210',
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

	//---------------------------------------------------------------------
	function ReplaceCharacters( Text, SearchCharacters, ReplacementText, MaxTimes )
	{
		// Validate Parameters
		Text = Liquicode.Core.ValidateField( Text, Schema.Parameters.Text );
		SearchCharacters = Liquicode.Core.ValidateField( SearchCharacters, Schema.Parameters.SearchCharacters );
		ReplacementText = Liquicode.Core.ValidateField( ReplacementText, Schema.Parameters.ReplacementText );
		MaxTimes = Liquicode.Core.ValidateField( MaxTimes, Schema.Parameters.MaxTimes );

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
		_Schema: Schema,
		ReplaceCharacters: ReplaceCharacters,
	};
};