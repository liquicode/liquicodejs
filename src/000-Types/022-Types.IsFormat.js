"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '022',
	member_of: 'Types',
	name: 'IsFormat',
	type: 'function',
	returns: 'boolean',
	returns_description: 'True if the value matches the format.',
	summary: 'Determine if a value is of a particular format.',
	description: `
Looks up the specified format in \`Types.Formats\` and calls the \`Format.IsFormat()\` function.

The \`Format\` parameter must specify both type and format to be tested for.

**Examples**

~~~javascript
Liquicode.Types.IsFormat( 'Hello', 'string:string' )            // = true
Liquicode.Types.IsFormat( 'Hello', 'string:json' )              // = false
Liquicode.Types.IsFormat( [ 1, 2, 3 ], 'object:array' )         // = true
Liquicode.Types.IsFormat( [ 1, 2, 3 ], 'object:number-array' )  // = true
Liquicode.Types.IsFormat( [ 1, 2, 3 ], 'object:string-array' )  // = false
~~~
`,
	Parameters: {
		Value: {
			name: 'Value',
			type: '*',
			required: true,
			description: 'The value to test.',
		},
		Format: {
			name: 'Format',
			type: 'string',
			required: true,
			description: 'The type and format to test for as: \`"type:format"\`.',
			examples:[
				'string:string',
				'string:json',
				'object:datetime',
			],
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


	function IsFormat( Value, Format )
	{
		let formats = Liquicode.Types.Formats();
		for ( let index = 0; index < formats.length; index++ )
		{
			let format = formats[ index ];
			if ( Format === `${format.type}:${format.format}` )
			{
				return format.IsFormat( Value );
			}
		}
		throw new Error( `Unknown type and format [${Format}]. Should be of the form [type:format].` );
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		IsFormat: IsFormat,
	};
};
