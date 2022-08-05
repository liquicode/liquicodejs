"use strict";


//---------------------------------------------------------------------
let Schema = {
	id: '800',
	name: 'File',
	type: 'namespace',
	summary: 'Functions for manipulating files. (nodejs only)',
};


//-start-jsdoc---------------------------------------------------------
/**
 * @public
 * @namespace File
 * @summary Functions for manipulating files. (nodejs only)
*/
//-end-jsdoc-----------------------------------------------------------


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{
	return {
		_Schema: Schema,
		Visit: require( './810-File.Visit.js' )( Liquicode ).Visit,
		CountFiles: require( './811-File.CountFiles.js' )( Liquicode ).CountFiles,
		CountFolders: require( './812-File.CountFolders.js' )( Liquicode ).CountFolders,
		CopyFolder: require( './813-File.CopyFolder.js' )( Liquicode ).CopyFolder,
		DeleteFolder: require( './814-File.DeleteFolder.js' )( Liquicode ).DeleteFolder,
	};
};
