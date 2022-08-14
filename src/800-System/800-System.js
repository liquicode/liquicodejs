"use strict";


//---------------------------------------------------------------------
let Schema = {
	id: '800',
	name: 'System',
	type: 'namespace',
	summary: 'File system and process functions. (nodejs only)',
};


//-start-jsdoc---------------------------------------------------------
/**
 * @public
 * @namespace System
 * @summary File system and process functions. (nodejs only)
*/
//-end-jsdoc-----------------------------------------------------------


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{
	return {
		_Schema: Schema,

		// File System
		VisitFiles: require( './810-System.VisitFiles.js' )( Liquicode ).VisitFiles,
		CountFiles: require( './811-System.CountFiles.js' )( Liquicode ).CountFiles,
		CountFolders: require( './812-System.CountFolders.js' )( Liquicode ).CountFolders,
		CopyFolder: require( './813-System.CopyFolder.js' )( Liquicode ).CopyFolder,
		DeleteFolder: require( './814-System.DeleteFolder.js' )( Liquicode ).DeleteFolder,

		// Process
		AsyncSleep: require( './820-System.AsyncSleep.js' )( Liquicode ).AsyncSleep,
		AsyncExecute: require( './821-System.AsyncExecute.js' )( Liquicode ).AsyncExecute,

	};
};
