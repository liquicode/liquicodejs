"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '821',
	member_of: 'System',
	name: 'ExecuteProcess',
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
	 * @function ExecuteProcess
	 * @param {string} Command
	 * @param {object} [Environment]
	 * @param {string} [StartFolder]
	*/
	//-end-jsdoc-----------------------------------------------------------


	const LIB_FS = require( 'fs' );
	const LIB_CHILD_PROCESS = require( 'child_process' );


	function ExecuteProcess( Command, Environment, StartFolder ) 
	{
		let options = {
			encoding: 'utf-8',
		};
		if ( Environment && Object.keys( Environment ) ) { options.env = Environment; }
		if ( StartFolder && LIB_FS.existsSync( StartFolder ) ) { options.cwd = StartFolder; }

		let result = {
			result: '',
			error: '',
			stdout: '',
			stderror: '',
		};
		try
		{
			result.result =
				LIB_CHILD_PROCESS.execSync( Command, options,
					( error, stdout, stderror ) =>
					{
						result.error = error;
						result.stdout = stdout;
						result.stderror = stderror;
					}
				);
		}
		catch ( error )
		{
			result.error = error.message;
		}

		return result;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		ExecuteProcess: ExecuteProcess,
	};
};
