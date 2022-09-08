"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '001',
	member_of: 'Types',
	name: 'HasValue',
	type: 'function',
	returns: 'boolean',
	returns_description: 'True if Value actually contains a value.',
	summary: 'Determine if a variable contains a value or or not.',
	description: `
Tests the provided Value parameter and returns false if it does not represent a value.
More specifically, if Value is undefined or null, then false is returned.
if Value is a zero length string \`""\` or an empty object \`{}\`, false is also returned.
In all other cases, this function returns true.
`,
	Parameters: {
		Value: {
			name: 'Value',
			type: '*',
			required: true,
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
	 * @function HasValue
	 * @returns {boolean}
	 * True if Value actually contains a value.
	 * @summary Determine if a variable contains a value or or not.
	 * @description
	 * 
Tests the provided Value parameter and returns false if it does not represent a value.
More specifically, if Value is undefined or null, then false is returned.
if Value is a zero length string `""` or an empty object `{}`, false is also returned.
In all other cases, this function returns true.

	 * @param {*} Value
	 * The value to test.
	*/
	//-end-jsdoc-----------------------------------------------------------


	function HasValue( Value )
	{
		if ( Value === undefined ) { return false; }
		if ( Value === null ) { return false; }
		if ( ( typeof Value === 'string' ) && ( Value.length === 0 ) ) { return false; }
		if ( ( typeof Value === 'object' ) && ( Object.keys( Value ).length === 0 ) ) { return false; }
		return true;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		HasValue: HasValue,
	};
};
