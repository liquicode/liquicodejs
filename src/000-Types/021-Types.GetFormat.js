"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '021',
	member_of: 'Types',
	name: 'GetFormat',
	type: 'function',
	returns: 'string',
	returns_description: 'An extended type description.',
	summary: 'Determine the type and format of a value.',
	description: `
Iterates through \`Types.Formats\` in reverse order and calls each \`Format.IsFormat()\` function.
When one of the formats returns \`true\`, then it's type and format are returned separated by \`:\`.

**Examples**

~~~javascript
Liquicode.Types.GetFormat( '42' )         // = 'number:integer'
Liquicode.Types.GetFormat( 'Hello' )      // = 'string:string'
Liquicode.Types.GetFormat( new Date() )   // = 'object:datetime'
Liquicode.Types.GetFormat( [ 1, 2, 3 ] )  // = 'object:number-array'
~~~
`,
	Parameters: {
		Value: {
			name: 'Value',
			type: '*',
			required: true,
			description: 'The value to get the format for.',
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
	 * @function GetFormat
	 * @returns {string}
	 * An extended type description.
	 * @summary Determine the type and format of a value.
	 * @description
	 * 
Iterates through `Types.Formats` in reverse order and calls each `Format.IsFormat()` function.
When one of the formats returns `true`, then it's type and format are returned separated by `:`.

**Examples**

~~~javascript
Liquicode.Types.GetFormat( '42' )         // = 'number:integer'
Liquicode.Types.GetFormat( 'Hello' )      // = 'string:string'
Liquicode.Types.GetFormat( new Date() )   // = 'object:datetime'
Liquicode.Types.GetFormat( [ 1, 2, 3 ] )  // = 'object:number-array'
~~~

	 * @param {*} Value
	 * The value to get the format for.
	*/
	//-end-jsdoc-----------------------------------------------------------


	function GetFormat( Value )
	{
		let formats = Liquicode.Types.Formats();
		for ( let index = ( formats.length - 1 ); index >= 0; index-- )
		{
			let format = formats[ index ];
			if ( format.IsFormat( Value ) )
			{
				return `${format.type}:${format.format}`;
			}
		}
		return null;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		GetFormat: GetFormat,
	};
};
