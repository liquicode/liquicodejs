"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '010',
	member_of: 'Schema',
	name: 'ErrorValue',
	type: 'function',
	returns: 'object',
	returns_description: 'An ErrorValue object.',
	summary: 'Returns an ErrorValue object containing error information.',
	description: [
		``,
	],
	Parameters: {
		Message: {
			name: 'Message',
			type: 'string',
			required: false,
			default: 'error',
			description: 'The error message.',
		},
		Context: {
			name: 'Context',
			type: 'string',
			required: false,
			default: undefined,
			description: 'Context for the error (e.g. a function name).',
		},
	},
	todo: [],
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function ErrorValue
	 * @returns {object}
	 * An ErrorValue object.
	 * @summary Returns an ErrorValue object containing error information.
	 * @description
	 * 
	 * @param {string} [Message="error"]
	 * The error message.
	 * @param {string} [Context]
	 * Context for the error (e.g. a function name).
	*/
	//-end-jsdoc-----------------------------------------------------------


	function ErrorValue( Message, Context )
	{
		return {
			ok: false,
			error: Message || 'error',
			context: Context,
		};
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		ErrorValue: ErrorValue,
	};
};
