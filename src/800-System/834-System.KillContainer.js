"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '834',
	member_of: 'System',
	name: 'KillContainer',
	type: 'function',
	returns: 'string',
	description: `Kills a running Docker Container.`,
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
	 * @function KillContainer
	 * @returns {string}
	 * @description
	 * Kills a running Docker Container.
	 * @param {string} ContainerID
	*/
	//-end-jsdoc-----------------------------------------------------------


	function KillContainer( ContainerID ) 
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
		KillContainer: KillContainer,
	};
};
