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
		Root = Liquicode.Types.Coerce( Root ).ToObject();
		Path = Liquicode.Types.Coerce( Path ).ToString();

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
