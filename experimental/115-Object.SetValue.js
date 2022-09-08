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
	/**
	 * @public
	 * @function SetValue
	 * @returns {*}
	 * @param {object} Root
	 * @param {string} Path
	 * @param {*} Value
	*/
	//-end-jsdoc-----------------------------------------------------------


	function SetValue( Root, Path, Value )
	{
		Root = Liquicode.Types.Coerce( Root ).ToObject();
		Path = Liquicode.Types.Coerce( Path ).ToString();
		// Value = Liquicode.Types.Coerce( Value, _Schema.Parameters.Value, true );

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
