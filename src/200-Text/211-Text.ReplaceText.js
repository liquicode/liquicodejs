"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '211',
	member_of: 'Text',
	name: 'ReplaceText',
	type: 'function',
	returns: 'string',
	description: ``,
	Parameters: {
		Text: {
			name: 'Text',
			type: 'string',
			required: true,
			default: '',
		},
		SearchText: {
			name: 'SearchText',
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
			required: false,
			default: 1,
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function ReplaceText
	 * @returns {string}
	 * @param {string} Text
	 * @param {string} SearchText
	 * @param {string} ReplacementText
	 * @param {number} [MaxTimes=1]
	*/
	//-end-jsdoc-----------------------------------------------------------


	function ReplaceText( Text, SearchText, ReplacementText, MaxTimes ) 
	{
		// // Validate Parameters
		// Text = Liquicode.Types.Coerce( Text ).ToString();
		// SearchText = Liquicode.Types.Coerce( SearchText ).ToString();
		// ReplacementText = Liquicode.Types.Coerce( ReplacementText ).ToString();
		// return Text.split( SearchText ).join( ReplacementText );

		if ( typeof Text !== 'string' ) { throw new Error( `The parameter [Text] is required and must be a string.` ); }
		if ( typeof SearchText !== 'string' ) { throw new Error( `The parameter [SearchText] is required and must be a string.` ); }
		if ( typeof ReplacementText !== 'string' ) { throw new Error( `The parameter [ReplacementText] is required and must be a string.` ); }
		if ( MaxTimes === undefined ) { MaxTimes = 1; }
		if ( typeof MaxTimes !== 'number' ) { throw new Error( `The parameter [MaxTimes] is optional but must be a number.` ); }

		let text = Text;
		let replacement_count = 0;
		while ( true )
		{
			if ( ( MaxTimes >= 0 ) && ( replacement_count >= MaxTimes ) ) { break; }
			let found_index = text.indexOf( SearchText );
			if ( found_index < 0 ) { break; }
			text = `${text.substring( 0, found_index )}${ReplacementText}${text.substring( found_index + SearchText.length )}`;
			replacement_count++;
		}

		return text;
	}

	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		ReplaceText: ReplaceText,
	};
};
