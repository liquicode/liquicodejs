"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '114',
	member_of: 'Object',
	name: 'GetValue',
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
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function GetValue
	 * @returns {*}
	 * @param {object} Root
	 * @param {string} Path
	*/
	//-end-jsdoc-----------------------------------------------------------


	function GetValue( Root, Path )
	{
		Root = Liquicode.Schema.CoerceValue( Root, _Schema.Parameters.Root, true );
		Path = Liquicode.Schema.CoerceValue( Path, _Schema.Parameters.Path, true );

		let result = Liquicode.Object.Traverse( Root,
			function ( info )
			{
				if ( info.path === Path ) { return info.value; }
			} );

		return result;
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		GetValue: GetValue,
	};
};
