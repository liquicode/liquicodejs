"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '203',
	member_of: 'Text',
	name: 'Matches',
	type: 'function',
	returns: 'string',
	description: [
		'Matches the text against a wildcard-lik pattern.',
		'Returns true If the match succeeds, otherwise false.',
	],
	Parameters: {
		Text: {
			name: 'Text',
			type: 'string',
			required: true,
			default: '',
		},
		Pattern: {
			name: 'Pattern',
			type: 'string',
			required: true,
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
	 * @function Matches
	 * @returns {string}
	 * @description
	 * Matches the text against a wildcard-lik pattern.
	 * Returns true If the match succeeds, otherwise false.
	 * @param {string} Text
	 * @param {string} Pattern
	*/
	//-end-jsdoc-----------------------------------------------------------


	function Matches( Text, Pattern ) 
	{
		// Validate Parameters
		Text = Liquicode.Types.Coerce( Text ).ToString();
		Pattern = Liquicode.Types.Coerce( Pattern ).ToString();

		//FROM: https://stackoverflow.com/a/57527468
		let wildcard_exp = Pattern.replace( /[.+^${}()|[\]\\]/g, '\\$&' ); // regexp escape 
		let reg_exp = new RegExp( `^${wildcard_exp.replace( /\*/g, '.*' ).replace( /\?/g, '.' )}$`, 'i' );
		return reg_exp.test( Text ); // remove last 'i' above to have case sensitive
	}

	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		Matches: Matches,
	};
};
