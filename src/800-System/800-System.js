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
		AsyncVisitFiles: require( './810-System.AsyncVisitFiles.js' )( Liquicode ).AsyncVisitFiles,
		VisitFiles: require( './810-System.VisitFiles.js' )( Liquicode ).VisitFiles,
		CountFiles: require( './811-System.CountFiles.js' )( Liquicode ).CountFiles,
		CountFolders: require( './812-System.CountFolders.js' )( Liquicode ).CountFolders,
		CopyFolder: require( './813-System.CopyFolder.js' )( Liquicode ).CopyFolder,
		DeleteFolder: require( './814-System.DeleteFolder.js' )( Liquicode ).DeleteFolder,
		EmptyFolder: require( './815-System.EmptyFolder.js' )( Liquicode ).EmptyFolder,
		WithFileText: require( './816-System.WithFileText.js' )( Liquicode ).WithFileText,

		// Process
		AsyncSleep: require( './820-System.AsyncSleep.js' )( Liquicode ).AsyncSleep,
		ExecuteProcess: require( './821-System.ExecuteProcess.js' )( Liquicode ).ExecuteProcess,
		AsyncExecuteProcess: require( './822-System.AsyncExecuteProcess.js' )( Liquicode ).AsyncExecuteProcess,
		StartProcess: require( './823-System.StartProcess.js' )( Liquicode ).StartProcess,
		StopProcess: require( './824-System.StopProcess.js' )( Liquicode ).StopProcess,

		// Docker
		ContainerStatus: require( './830-System.ContainerStatus.js' )( Liquicode ).ContainerStatus,
		RunContainer: require( './831-System.RunContainer.js' )( Liquicode ).RunContainer,
		StartContainer: require( './832-System.StartContainer.js' )( Liquicode ).StartContainer,
		StopContainer: require( './833-System.StopContainer.js' )( Liquicode ).StopContainer,
		KillContainer: require( './834-System.KillContainer.js' )( Liquicode ).KillContainer,

	};
};

