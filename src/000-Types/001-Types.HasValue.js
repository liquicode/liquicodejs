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
	 * @function IsFormat
	 * @returns {boolean}
	 * True if the value matches the format.
	 * @summary Determine if a value is of a particular format.
	 * @description
	 * 
Looks up the specified format in `Types.Formats` and calls the `Format.IsFormat()` function.

The `Format` parameter must specify both type and format to be tested for.

**Examples**

~~~javascript
Liquicode.Types.IsFormat( 'Hello', 'string:string' )            // = true
Liquicode.Types.IsFormat( 'Hello', 'string:json' )              // = false
Liquicode.Types.IsFormat( [ 1, 2, 3 ], 'object:array' )         // = true
Liquicode.Types.IsFormat( [ 1, 2, 3 ], 'object:number-array' )  // = true
Liquicode.Types.IsFormat( [ 1, 2, 3 ], 'object:string-array' )  // = false
~~~

	 * @param {*} Value
	 * The value to test.
	 * @param {string} Format
	 * The type and format to test for as: `"type:format"`.
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
