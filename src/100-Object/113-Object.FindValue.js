"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '113',
	member_of: 'Object',
	name: 'FindValue',
	type: 'function',
	returns: 'string',
	summary: 'Locate a value stored within an object.',
	description: ``,
	Parameters: {
		Root: {
			name: 'Root',
			type: 'object',
			required: true,
		},
		Value: {
			name: 'Value',
			type: '*',
			required: true,
			description: 'The value to search for. This must be primitive data type (boolean, number, or string).'
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	//-end-jsdoc-----------------------------------------------------------


	function FindValue( Root, Value )
	{
		Root = Liquicode.Schema.CoerceValue( Root, _Schema.Parameters.Root, true );
		Value = Liquicode.Schema.CoerceValue( Value, _Schema.Parameters.Value, true );

		let result = Liquicode.Object.Traverse( Root,
			function ( info )
			{
				if ( info.value === Value ) { return info.path; }
			} );

		return result;
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		FindValue: FindValue,
	};
};
