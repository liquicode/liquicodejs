"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '823',
	member_of: 'System',
	name: 'StartProcess',
	type: 'function',
	returns: 'string',
	description: `Starts a new process and returns the ProcessID.`,
	Parameters: {
		Command: {
			name: 'Command',
			type: 'string',
			required: true,
		},
		Environment: {
			name: 'Environment',
			type: 'object',
			required: false,
		},
		StartFolder: {
			name: 'StartFolder',
			type: 'string',
			required: false,
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function StartProcess
	 * @returns {string}
	 * @description
	 * Starts a new process and returns the ProcessID.
	 * @param {string} Command
	 * @param {object} [Environment]
	 * @param {string} [StartFolder]
	*/
	//-end-jsdoc-----------------------------------------------------------


	const LIB_FS = require( 'fs' );
	const LIB_CHILD_PROCESS = require( 'child_process' );


	function StartProcess( Command, Environment, StartFolder ) 
	{
		let options = {};
		if ( Environment && Object.keys( Environment ) ) { options.env = Environment; }
		if ( StartFolder && LIB_FS.existsSync( StartFolder ) ) { options.cwd = StartFolder; }
		let child_process = LIB_CHILD_PROCESS.exec( Command, options );
		return child_process.pid;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		StartProcess: StartProcess,
	};
};
