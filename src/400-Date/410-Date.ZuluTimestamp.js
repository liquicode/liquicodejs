"use strict";


//---------------------------------------------------------------------
let Schema = {
	id: '410',
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

	//---------------------------------------------------------------------
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
