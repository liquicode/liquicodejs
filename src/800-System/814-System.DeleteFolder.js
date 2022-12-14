"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '814',
	member_of: 'System',
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


	const LIB_FS = require( 'fs' );
	const LIB_PATH = require( 'path' );


	function DeleteFolder( Folder, Recurse ) 
	{
		Folder = Liquicode.Types.Coerce( Folder ).ToString();
		Recurse = Liquicode.Types.Coerce( Recurse ).ToBoolean();

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
			if ( !elements.length ) 
			{
				LIB_FS.rmdirSync( Folder );
				count++;
			}
		}
		return count;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		DeleteFolder: DeleteFolder,
	};
};
