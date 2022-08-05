"use strict";


//---------------------------------------------------------------------
let Schema = {
	id: '101',
	name: 'Clone',
	type: 'function',
	returns: 'string',
	description: [
		'Returns a clone of the given object.',
		'This is equivalent to doing A = JSON.parse( JSON.stringify( B ) ).',
	],
	Parameters: {
		From: {
			name: 'From',
			type: 'object',
			// required: true,
			default: {},
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{

	//---------------------------------------------------------------------
	function Clone( From )
	{
		From = Liquicode.Core.ValidateField( From, Schema.Parameters.From );
		return JSON.parse( JSON.stringify( From ) );
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: Schema,
		Clone: Clone,
	};
};
