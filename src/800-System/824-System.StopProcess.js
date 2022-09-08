"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '824',
	member_of: 'System',
	name: 'StopProcess',
	type: 'function',
	returns: 'string',
	description: `Stops a running process by its ProcessID.`,
	Parameters: {
		ProcessID: {
			name: 'ProcessID',
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
	 * @function StopProcess
	 * @returns {string}
	 * @description
	 * Stops a running process by its ProcessID.
	 * @param {string} ProcessID
	*/
	//-end-jsdoc-----------------------------------------------------------


	function StopProcess( ProcessID ) 
	{
		process.kill( ProcessID, 'SIGINT' );
		return;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		StopProcess: StopProcess,
	};
};
