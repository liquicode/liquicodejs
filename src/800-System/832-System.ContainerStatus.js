"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '832',
	member_of: 'System',
	name: 'ContainerStatus',
	type: 'function',
	returns: 'string',
	description: `Gets the status of a running Docker Container.`,
	Parameters: {
		ContainerID: {
			name: 'ContainerID',
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
	 * @function ContainerStatus
	 * @returns {string}
	 * @description
	 * Gets the status of a running Docker Container.
	 * @param {string} ContainerID
	*/
	//-end-jsdoc-----------------------------------------------------------


	function ContainerStatus( ContainerID ) 
	{
		let command_line = `docker inspect ${ContainerID}`;
		let result = Liquicode.System.ExecuteProcess( command_line );
		if ( result.error ) 
		{
			// if ( result.error === `Command failed: docker inspect ${ContainerID}\nError: No such object: ${ContainerID}\n` ) { return null; }
			if ( result.error.indexOf( 'Error: No such object' ) ) { return null; }
			throw new Error( result.error );
		}
		let status = JSON.parse( result.result );
		if ( Array.isArray( status ) && status.length )
		{
			status = status[ 0 ];
		}
		return status;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		ContainerStatus: ContainerStatus,
	};
};
