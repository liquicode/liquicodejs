"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '831',
	member_of: 'System',
	name: 'StopContainer',
	type: 'function',
	returns: 'string',
	description: `Stops a running Docker Container.`,
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
	 * @function StopContainer
	 * @returns {string}
	 * @description
	 * Stops a running Docker Container.
	 * @param {string} ContainerID
	*/
	//-end-jsdoc-----------------------------------------------------------


	function StopContainer( ContainerID ) 
	{
		let command_line = `docker kill ${ContainerID}`;
		let result = Liquicode.System.ExecuteProcess( command_line );
		if ( result.error ) { throw new Error( result.error ); }
		return;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		StopContainer: StopContainer,
	};
};
