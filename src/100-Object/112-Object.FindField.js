"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '112',
	member_of: 'Object',
	name: 'FindField',
	type: 'function',
	returns: 'string',
	description: ``,
	Parameters: {
		Root: {
			name: 'Root',
			type: 'object',
			required: true,
		},
		Name: {
			name: 'Name',
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
	 * @function FindField
	 * @returns {string}
	 * @param {object} Root
	 * @param {string} Name
	*/
	//-end-jsdoc-----------------------------------------------------------


	function FindField( Root, Name )
	{
		Root = Liquicode.Schema.CoerceValue( Root, _Schema.Parameters.Root, true );
		Name = Liquicode.Schema.CoerceValue( Name, _Schema.Parameters.Name, true );

		let result = Liquicode.Object.Traverse( Root,
			function ( info )
			{
				if ( info.name === Name ) { return info.path; }
			} );

		return result;
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		FindField: FindField,
	};
};
