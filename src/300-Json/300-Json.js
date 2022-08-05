"use strict";


//---------------------------------------------------------------------
let Schema = {
	id: '300',
	name: 'Json',
	type: 'namespace',
	summary: 'Functions for manipulating Json.',
};


//-start-jsdoc---------------------------------------------------------
/**
 * @public
 * @namespace Json
 * @summary Functions for manipulating Json.
*/
//-end-jsdoc-----------------------------------------------------------


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{
	return {
		_Schema: Schema,
	};
};
