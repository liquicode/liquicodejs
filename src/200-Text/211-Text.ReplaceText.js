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
		// MaxTimes: {
		// 	name: 'MaxTimes',
		// 	type: 'number',
		// 	// format: 'positive-integer',
		// 	required: false,
		// 	default: 1,
		// },
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function Matches
	 * @returns {string}
	 * @description
	 * Matches the text against a wildcard-lik pattern.
	 * Returns true If the match succeeds, otherwise false.
	 * @param {string} Text
	 * @param {string} Pattern
	*/
	//-end-jsdoc-----------------------------------------------------------


	function ReplaceText( Text, SearchText, ReplacementText ) 
	{
		// Validate Parameters
		Text = Liquicode.Types.Coerce( Text ).ToString();
		SearchText = Liquicode.Types.Coerce( SearchText ).ToString();
		ReplacementText = Liquicode.Types.Coerce( ReplacementText ).ToString();

		return Text.split( SearchText ).join( ReplacementText );
	}

	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		ReplaceText: ReplaceText,
	};
};
