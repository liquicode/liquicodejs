"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '812',
	member_of: 'System',
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
		StartFolder = Liquicode.Types.Coerce( StartFolder ).ToString();
		Recurse = Liquicode.Types.Coerce( Recurse ).ToBoolean();

		let folder_count = 0;
		Liquicode.System.VisitFiles( StartFolder, '', Recurse,
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
