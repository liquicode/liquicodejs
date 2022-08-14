"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '820',
	member_of: 'System',
	name: 'AsyncSleep',
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
	 * @function AsyncSleep
	 * @param {number} [Milliseconds]
	*/
	//-end-jsdoc-----------------------------------------------------------


	function AsyncSleep( Milliseconds ) 
	{
		Milliseconds = Liquicode.Types.Coerce( Milliseconds ).ToNumber();

		return new Promise( resolve => setTimeout( resolve, Milliseconds ) );
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		AsyncSleep: AsyncSleep,
	};
};
