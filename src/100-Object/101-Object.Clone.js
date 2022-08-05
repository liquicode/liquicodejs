"use strict";


//---------------------------------------------------------------------
let Schema = {
	id: '101',
	member_of: 'Object',
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


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function Clone
	 * @returns {string}
	 * @description
	 * Returns a clone of the given object.
	 * This is equivalent to doing A = JSON.parse( JSON.stringify( B ) ).
	 * @param {object} [From={}]
	*/
	//-end-jsdoc-----------------------------------------------------------


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
