"use strict";




//---------------------------------------------------------------------
let Schema = {
	id: '900',
	name: 'Net',
	type: 'namespace',
	summary: 'Functions for working with networks',
};


//-start-jsdoc---------------------------------------------------------
/**
 * @public
 * @namespace Net
 * @summary Functions for working with networks
*/
//-end-jsdoc-----------------------------------------------------------


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{
	return {
		_Schema: Schema,
		// AsyncDownloadFile: AsyncDownloadFile,
	};
};
