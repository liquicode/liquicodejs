"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '812',
	member_of: 'File',
	name: 'CountFolders',
	type: 'function',
	returns: 'number',
	description: [
		'Scans a folder and calls the Visitor callback function for each folder/file encountered.',
		'Returns the number of folders/files visited.',
	],
	Parameters: {
		StartFolder: {
			name: 'StartFolder',
			type: 'string',
			required: true,
		},
		Recurse: {
			name: 'Recurse',
			type: 'boolean',
			required: false,
			default: false,
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function CountFolders
	 * @returns {number}
	 * @description
	 * Scans a folder and calls the Visitor callback function for each folder/file encountered.
	 * Returns the number of folders/files visited.
	 * @param {string} StartFolder
	 * @param {boolean} [Recurse]
	*/
	//-end-jsdoc-----------------------------------------------------------


	function CountFolders( StartFolder, Recurse ) 
	{
		StartFolder = Liquicode.Schema.ValidateValue( StartFolder, _Schema.Parameters.StartFolder, { coerce_values: true, throw_errors: true } );
		Recurse = Liquicode.Schema.ValidateValue( Recurse, _Schema.Parameters.Recurse , { coerce_values: true, throw_errors: true });

		let folder_count = 0;
		Liquicode.File.Visit( StartFolder, '', Recurse,
			function ( Folder, Filename )
			{
				if ( Folder && !Filename )
				{
					folder_count++;
				}
			} );
		return folder_count;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		CountFolders: CountFolders,
	};
};
