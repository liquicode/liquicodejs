"use strict";


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	const LIB_FS = require( 'fs' );
	const LIB_PATH = require( 'path' );


	//---------------------------------------------------------------------
	function CountFiles( Folder, Recurse ) 
	{
		if ( !LIB_FS.existsSync( Folder ) ) { return 0; }
		let count = 0;
		let elements = LIB_FS.readdirSync( Folder );
		for ( let element_index = 0; element_index < elements.length; element_index++ )
		{
			let element = elements[ element_index ];
			let from_path = LIB_PATH.join( Folder, element );
			if ( LIB_FS.lstatSync( from_path ).isFile() )
			{
				count++;
			}
			else if ( Recurse && LIB_FS.lstatSync( from_path ).isDirectory() )
			{
				count += CountFiles( from_path, Recurse );
			}
		}
		return count;
	}


	//---------------------------------------------------------------------
	function CountFolders( Folder, Recurse ) 
	{
		if ( !LIB_FS.existsSync( Folder ) ) { return 0; }
		let count = 0;
		let elements = LIB_FS.readdirSync( Folder );
		for ( let element_index = 0; element_index < elements.length; element_index++ )
		{
			let element = elements[ element_index ];
			let from_path = LIB_PATH.join( Folder, element );
			if ( LIB_FS.lstatSync( from_path ).isDirectory() )
			{
				count++;
				if ( Recurse )
				{
					count += CountFolders( from_path, Recurse );
				}
			}
		}
		return count;
	}


	//---------------------------------------------------------------------
	function CopyFolder( FromFolder, ToFolder, Overwrite, Recurse ) 
	{
		if ( !LIB_FS.existsSync( FromFolder ) ) { return 0; }
		LIB_FS.mkdirSync( ToFolder, { recursive: true } );
		let count = 0;
		let elements = LIB_FS.readdirSync( FromFolder );
		for ( let element_index = 0; element_index < elements.length; element_index++ )
		{
			let element = elements[ element_index ];
			let from_path = LIB_PATH.join( FromFolder, element );
			let to_path = LIB_PATH.join( ToFolder, element );
			if ( LIB_FS.lstatSync( from_path ).isFile() )
			{
				if ( !LIB_FS.existsSync( to_path ) || Overwrite ) 
				{
					LIB_FS.copyFileSync( from_path, to_path );
					count++;
				}
			}
			else if ( Recurse && LIB_FS.lstatSync( from_path ).isDirectory() )
			{
				count += CopyFolder( from_path, to_path, Overwrite, Recurse );
			}
		}
		return count;
	}


	//---------------------------------------------------------------------
	function DeleteFolder( Folder, Recurse ) 
	{
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
		Visit: require( './810-File.Visit.js' )( Liquicode ).Visit,
		CountFiles: require( './811-File.CountFiles.js' )( Liquicode ).CountFiles,
		CountFolders: require( './812-File.CountFolders.js' )( Liquicode ).CountFolders,
		CopyFolder: require( './813-File.CopyFolder.js' )( Liquicode ).CopyFolder,
		DeleteFolder: require( './814-File.DeleteFolder.js' )( Liquicode ).DeleteFolder,
	};
};
