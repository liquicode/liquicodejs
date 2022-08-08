"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '111',
	member_of: 'Object',
	name: 'HasPath',
	type: 'function',
	returns: 'boolean',
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
	//-end-jsdoc-----------------------------------------------------------


	function HasPath( Root, Path )
	{
		Root = Liquicode.Schema.CoerceValue( Root, _Schema.Parameters.Root, true );
		Path = Liquicode.Schema.CoerceValue( Path, _Schema.Parameters.Path, true );

		let result = Liquicode.Object.Traverse( Root,
			function ( info )
			{
				if ( info.path === Path ) { return true; }
			} );

		return ( result === true );
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		HasPath: HasPath,
	};
};
