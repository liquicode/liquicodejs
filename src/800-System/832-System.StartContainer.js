"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '832',
	member_of: 'System',
	name: 'StartContainer',
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
	 * @function StartContainer
	 * @returns {string}
	 * @description
	 * Stops a running Docker Container.
	 * @param {string} ContainerID
	*/
	//-end-jsdoc-----------------------------------------------------------


	function StartContainer( ContainerID ) 
	{
		let command_line = `docker start ${ContainerID}`;
		let result = Liquicode.System.ExecuteProcess( command_line );
		if ( result.error ) { throw new Error( result.error ); }
		return;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		StartContainer: StartContainer,
	};
};
