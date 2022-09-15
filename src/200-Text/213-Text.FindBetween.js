"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '213',
	member_of: 'Text',
	name: 'FindBetween',
	type: 'function',
	returns: 'string',
	returns_description: 'The text found between StartText and EndText.',
	summary: 'Search a string and return the text found between StartText and EndText.',
	description: `
This function searches a string for StartText and EndText and returns all text found between the two.

If StartText is missing, then the search will return all text up to the found EndText.

If EndText is missing, then the search will return all text found after StartText.

If both StartText and EndText are missing, then the entire Text string will be returned.

If StartText or EndText are not found within Text, then a \`null\` is returned.

`,
	Parameters: {
		Text: {
			name: 'Text',
			type: 'string',
			required: true,
			default: '',
		},
		StartText: {
			name: 'StartText',
			type: 'string',
			required: false,
			default: '',
		},
		EndText: {
			name: 'EndText',
			type: 'string',
			required: false,
			default: '',
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function FindBetween
	 * @returns {string}
	 * The text found between StartText and EndText.
	 * @summary Search a string and return the text found between StartText and EndText.
	 * @description
	 * 
This function searches a string for StartText and EndText and returns all text found between the two.

If StartText is missing, then the search will return all text up to the found EndText.

If EndText is missing, then the search will return all text found after StartText.

If both StartText and EndText are missing, then the entire Text string will be returned.

If StartText or EndText are not found within Text, then a `null` is returned.


	 * @param {string} Text
	 * @param {string} [StartText]
	 * @param {string} [EndText]
	*/
	//-end-jsdoc-----------------------------------------------------------


	function FindBetween( Text, StartText, EndText ) 
	{
		if ( typeof Text !== 'string' ) { throw new Error( `The parameter [Text] is required and must be a string.` ); }
		if ( ( StartText === undefined ) || ( StartText === null ) ) { StartText = ''; }
		if ( ( EndText === undefined ) || ( EndText === null ) ) { EndText = ''; }
		if ( typeof StartText !== 'string' ) { throw new Error( `The parameter [StartText] is optional but must be a string.` ); }
		if ( typeof EndText !== 'string' ) { throw new Error( `The parameter [EndText] is optional but must be a string.` ); }

		// Find StartText
		let start_text_begin = 0;
		if ( StartText.length ) { start_text_begin = Text.indexOf( StartText ); }
		if ( start_text_begin < 0 ) { return null; }

		// Find EndText
		let end_text_begin = Text.length;
		if ( EndText.length ) { end_text_begin = Text.indexOf( EndText, start_text_begin + StartText.length ); }
		if ( end_text_begin < 0 ) { return null; }

		let found_text = Text.substring( start_text_begin + StartText.length, end_text_begin );
		return found_text;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		FindBetween: FindBetween,
	};
};
