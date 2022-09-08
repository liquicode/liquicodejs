"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '822',
	member_of: 'System',
	name: 'AsyncExecuteProcess',
	type: 'function',
	// returns: 'number',
	description: ``,
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
	 * @function AsyncExecuteProcess
	 * @param {string} Command
	 * @param {object} [Environment]
	 * @param {string} [StartFolder]
	*/
	//-end-jsdoc-----------------------------------------------------------


	const LIB_CHILD_PROCESS = require( 'child_process' );


	function AsyncExecuteProcess( Command, Environment, StartFolder ) 
	{
		return new Promise(
			( resolve, reject ) =>
			{
				resolve( Liquicode.System.ExecuteProcess( Command, Environment, StartFolder ) );
			} );
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		AsyncExecuteProcess: AsyncExecuteProcess,
	};
};
