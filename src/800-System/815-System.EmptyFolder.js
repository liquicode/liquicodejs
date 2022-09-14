"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '815',
	member_of: 'System',
	name: 'EmptyFolder',
	type: 'function',
	returns: 'number',
	return_description: 'Number of folders and files removed.',
	description: `
Empties a folder by removing all of its sub-folders and files.

Returns the number of folders and files removed.
`,
	Parameters: {
		Folder: {
			name: 'Folder',
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
	 * @function EmptyFolder
	 * @returns {number}
	 * @description
	 * Empties a folder by removing all of its sub-folders and files.
	 * Returns the number of folders and files deleted.
	 * @param {string} Folder
	*/
	//-end-jsdoc-----------------------------------------------------------


	const LIB_FS = require( 'fs' );
	const LIB_PATH = require( 'path' );


	function _EmptyFolder( Folder, Depth ) 
	{
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
			else if ( LIB_FS.lstatSync( from_path ).isDirectory() )
			{
				count += _EmptyFolder( from_path, ( Depth + 1 ) );
			}
		}
		// Delete this folder.
		if ( Depth > 0 )
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


	function EmptyFolder( Folder ) 
	{
		Folder = Liquicode.Types.Coerce( Folder ).ToString();
		if ( !LIB_FS.existsSync( Folder ) ) { return 0; }
		let count = _EmptyFolder( Folder, 0 );
		return count;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		EmptyFolder: EmptyFolder,
	};
};
