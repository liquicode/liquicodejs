"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '020',
	member_of: 'Types',
	name: 'GetFormat',
	type: 'function',
	returns: 'string',
	returns_description: 'An extended type description.',
	summary: 'Determine the format of a value.',
	description: `
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
	//-end-jsdoc-----------------------------------------------------------


	function GetFormat( Value )
	{
		let formats = Liquicode.Types.Formats();
		for ( let index = ( formats.length - 1 ); index >= 0; index-- )
		{
			let format = formats[ index ];
			if ( format.IsFormat( Value ) )
			{
				return format.format;
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
