"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '821',
	member_of: 'System',
	name: 'AsyncExecute',
	type: 'function',
	// returns: 'number',
	description: ``,
	Parameters: {
		Milliseconds: {
			name: 'Milliseconds',
			type: 'number',
			format: 'integer',
			// required: true,
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function AsyncExecute
	 * @param {number} [Milliseconds]
	*/
	//-end-jsdoc-----------------------------------------------------------


	function AsyncExecute( Command, Environment, StartFolder ) 
	{
		// Milliseconds = Liquicode.Types.Coerce( Milliseconds, _Schema.Parameters.Milliseconds, true );


		//---------------------------------------------------------------------
		function execute( Command, Environment )
		{
			console.log( `Executing: ${Command}` );
			LIB_CHILD_PROCESS.execSync( Command, {
				env: Environment,
			},
				( error, stdout, stderror ) =>
				{
					// if any error while executing
					if ( error )
					{
						console.error( "Error: ", error );
						return;
					}

					console.log( stdout ); // output from stdout
					console.error( stderror ); // std errors
				}
			);
			return;
		}


		// return new Promise( resolve => setTimeout( resolve, Milliseconds ) );
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		AsyncExecute: AsyncExecute,
	};
};
