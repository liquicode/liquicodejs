"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '115',
	member_of: 'Object',
	name: 'SetValue',
	type: 'function',
	returns: '*',
	description: ``,
	Parameters: {
		Root: {
			name: 'Root',
			type: 'object',
			required: true,
		},
		Path: {
			name: 'Path',
			type: 'string',
			required: true,
		},
		Value: {
			name: 'Value',
			type: '*',
			required: true,
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	//-end-jsdoc-----------------------------------------------------------


	function SetValue( Root, Path, Value )
	{
		// Root = Root || {};
		Root = Liquicode.Schema.CoerceValue( Root, _Schema.Parameters.Root, true );
		Path = Liquicode.Schema.CoerceValue( Path, _Schema.Parameters.Path, true );
		// Value = Liquicode.Schema.CoerceValue( Value, _Schema.Parameters.Value, true );

		let result = Liquicode.Object.Traverse( Root,
			function ( info )
			{
				if ( info.path === Path ) 
				{
					info.parent[ info.name ] = Value;
					return Value;
				}
			} );

		return result;
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		SetValue: SetValue,
	};
};
