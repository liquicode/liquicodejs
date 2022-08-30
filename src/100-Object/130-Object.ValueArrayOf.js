"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '130',
	member_of: 'Object',
	name: 'ValueArrayOf',
	type: 'function',
	returns: 'array',
	description: `
Returns an array of values.
If the Value parameter is missing or null, then an empty array \`[]\` is returned.
If Value is an object, its values are returned in the array.
If Value is already an array, it is returned unmodified.
Otherwise, an array is returned containing Value as its only member.
`,
	Parameters: {
		Value: {
			name: 'Value',
			type: 'any',
			// required: true,
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function ToIni
	 * @returns {object}
	 * @description
	 * 
Parse an Ini string and return an object value.


	 * @param {object} [Value]
	*/
	//-end-jsdoc-----------------------------------------------------------


	function ValueArrayOf( Value )
	{
		if ( Value === undefined ) { return []; }
		if ( Value === null ) { return []; }
		if ( typeof Value === 'object' ) 
		{
			if ( Array.isArray( Value ) ) 
			{
				return Value;
			}
			else
			{
				return Object.values( Value );
			}
		}
		return [ Value ];
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		ValueArrayOf: ValueArrayOf,
	};
};
