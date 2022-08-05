"use strict";


//---------------------------------------------------------------------
let Schema = {
	id: '203',
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

	//---------------------------------------------------------------------
	function Matches( Text, Pattern ) 
	{
		// Validate Parameters
		Text = Liquicode.Core.ValidateField( Text, Schema.Parameters.Text );
		Pattern = Liquicode.Core.ValidateField( Pattern, Schema.Parameters.Pattern );

		//FROM: https://stackoverflow.com/a/57527468
		let wildcard_exp = Pattern.replace( /[.+^${}()|[\]\\]/g, '\\$&' ); // regexp escape 
		let reg_exp = new RegExp( `^${wildcard_exp.replace( /\*/g, '.*' ).replace( /\?/g, '.' )}$`, 'i' );
		return reg_exp.test( Text ); // remove last 'i' above to have case sensitive
	}

	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: Schema,
		Matches: Matches,
	};
};