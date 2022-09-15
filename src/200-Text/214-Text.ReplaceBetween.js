"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '214',
	member_of: 'Text',
	name: 'ReplaceBetween',
	type: 'function',
	returns: 'integer',
	returns_description: 'The new string with replacements performed.',
	summary: 'Search a string for StartText and EndText and replace the text found between the two.',
	description: `
This function searches a string for StartText and EndText and replaces all text found between the two.

If StartText is missing, then all text found up to EndText will be replaced.

If EndText is missing, then all text found after StartText will be replaced.

If both StartText and EndText are missing, then the entire Text string will be replaced.

If StartText or EndText are not found within Text, then this function returns \`0\` to indicate that no replacements were performed.

The MaxTimes parameter specifies the maximum number of replacements to perform.
If MaxTimes is \`-1\`, then all possible replacements will be made throughout Text.
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
	*/
	//-end-jsdoc-----------------------------------------------------------


	function ReplaceBetween( Text, StartText, EndText, ReplacementText, MaxTimes ) 
	{
		if ( typeof Text !== 'string' ) { throw new Error( `The parameter [Text] is required and must be a string.` ); }
		if ( ( StartText === undefined ) || ( StartText === null ) ) { StartText = ''; }
		if ( ( EndText === undefined ) || ( EndText === null ) ) { EndText = ''; }
		if ( typeof StartText !== 'string' ) { throw new Error( `The parameter [StartText] is optional but must be a string.` ); }
		if ( typeof EndText !== 'string' ) { throw new Error( `The parameter [EndText] is optional but must be a string.` ); }
		if ( typeof ReplacementText !== 'string' ) { throw new Error( `The parameter [ReplacementText] is required and must be a string.` ); }
		if ( MaxTimes === undefined ) { MaxTimes = 1; }
		if ( typeof MaxTimes !== 'number' ) { throw new Error( `The parameter [MaxTimes] is optional but must be a number.` ); }

		let text = Text;
		let replacement_count = 0;
		while ( true )
		{
			if ( ( MaxTimes >= 0 ) && ( replacement_count >= MaxTimes ) ) { break; }
			let found_text = Liquicode.Text.FindBetween( text, StartText, EndText );
			if ( found_text === null ) { break; }
			text = Liquicode.Text.ReplaceText( text, `${StartText}${found_text}${EndText}`, `${StartText}${ReplacementText}${EndText}`, 1 );
			replacement_count++;
		}

		return text;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		ReplaceBetween: ReplaceBetween,
	};
};
