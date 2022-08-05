"use strict";


//---------------------------------------------------------------------
let Schema = {
	id: '410',
	member_of: 'Date',
	name: 'ZuluTimestamp',
	type: 'function',
	returns: 'string',
	description: [
		'Returns the current date and time as a string.',
	],
	Parameters: {},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function ZuluTimestamp
	 * @returns {string}
	 * @description
	 * Returns the current date and time as a string.
	*/
	//-end-jsdoc-----------------------------------------------------------


	function ZuluTimestamp()
	{
		return ( new Date() ).toISOString();
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: Schema,
		ZuluTimestamp: ZuluTimestamp,
	};
};
