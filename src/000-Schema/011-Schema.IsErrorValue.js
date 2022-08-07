"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '011',
	member_of: 'Schema',
	name: 'IsErrorValue',
	type: 'function',
	returns: 'boolean',
	returns_description: 'True if Value is an ErrorValue object, otherwise false.',
	summary: 'Tests if a Value is an ErrorValue object.',
	description: ``,
	Parameters: {
		Value: {
			name: 'Value',
			type: 'object',
			required: false,
			description: 'The value to test.',
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
	 * @function IsErrorValue
	 * @returns {boolean}
	 * True if Value is an ErrorValue object, otherwise false.
	 * @summary Tests if a Value is an ErrorValue object.
	 * @param {object} [Value]
	 * The value to test.
	*/
	//-end-jsdoc-----------------------------------------------------------


	function IsErrorValue( Value )
	{
		if ( Value !== undefined )
		{
			if ( ( Value.ok == false )
				&& ( typeof Value.error === 'string' ) )
			{
				return true;
			}
		}
		return false;
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		IsErrorValue: IsErrorValue,
	};
};
