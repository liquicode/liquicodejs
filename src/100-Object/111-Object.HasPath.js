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
	/**
	 * @public
	 * @function HasPath
	 * @returns {boolean}
	 * @param {object} Root
	 * @param {string} Path
	*/
	//-end-jsdoc-----------------------------------------------------------


	function HasPath( Root, Path )
	{
		Root = Liquicode.Types.Coerce( Root ).ToObject();
		Path = Liquicode.Types.Coerce( Path ).ToString();

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
