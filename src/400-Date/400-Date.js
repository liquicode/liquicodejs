"use strict";


//---------------------------------------------------------------------
let Schema = {
	id: '400',
	name: 'Date',
	type: 'namespace',
	summary: 'Functions for manipulating dates.',
};


//-start-jsdoc---------------------------------------------------------
/**
 * @public
 * @namespace Date
 * @summary Functions for manipulating dates.
*/
//-end-jsdoc-----------------------------------------------------------


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{
	return {
		_Schema: Schema,
		Parse: require( './401-Date.Parse.js' )( Liquicode ).Parse,
		ZuluTimestamp: require( './410-Date.ZuluTimestamp.js' )( Liquicode ).ZuluTimestamp,
	};
};
