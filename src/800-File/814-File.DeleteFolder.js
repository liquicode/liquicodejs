"use strict";


//---------------------------------------------------------------------
let Schema = {
	id: '814',
	member_of: 'File',
	name: 'DeleteFolder',
	type: 'function',
	returns: 'number',
	description: [
		'Deletes a folder and all of its sub-folders and files.',
		'Returns the number of folders and files deleted.',
	],
	Parameters: {
		Folder: {
			name: 'Folder',
			type: 'string',
			required: true,
		},
		// FilePattern: {
		// 	name: 'FilePattern',
		// 	type: 'string',
		// 	required: false,
		// 	default: '',
		// },
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
	 * @function DeleteFolder
	 * @returns {number}
	 * @description
	 * Deletes a folder and all of its sub-folders and files.
	 * Returns the number of folders and files deleted.
	 * @param {string} Folder
	 * @param {boolean} [Recurse]
	*/
	//-end-jsdoc-----------------------------------------------------------


	function DeleteFolder( Folder, Recurse ) 
	{
		Folder = Liquicode.Core.ValidateField( Folder, Schema.Parameters.Folder );
		FilePattern = Liquicode.Core.ValidateField( FilePattern, Schema.Parameters.FilePattern );
		Recurse = Liquicode.Core.ValidateField( Recurse, Schema.Parameters.Recurse );

		if ( !LIB_FS.existsSync( Folder ) ) { return 0; }
		let count = 0;
		let elements = LIB_FS.readdirSync( Folder );
		for ( let element_index = 0; element_index < elements.length; element_index++ )
		{
			let element = elements[ element_index ];
			let from_path = LIB_PATH.join( Folder, element );
			if ( LIB_FS.lstatSync( from_path ).isFile() )
			{
				LIB_FS.unlinkSync( from_path );
				count++;
			}
			else if ( Recurse && LIB_FS.lstatSync( from_path ).isDirectory() )
			{
				count += DeleteFolder( from_path, Recurse );
			}
		}
		// Delete this folder.
		if ( Recurse )
		{
			let elements = LIB_FS.readdirSync( Folder );
			if ( !elements.length ) { LIB_FS.rmdirSync( Folder ); }
		}
		return count;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: Schema,
		DeleteFolder: DeleteFolder,
	};
};
