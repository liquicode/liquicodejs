"use strict";




//---------------------------------------------------------------------
let _Schema = {
	id: '900',
	name: 'Net',
	type: 'namespace',
	summary: 'Functions for working with networks. (nodejs only)',
};


//-start-jsdoc---------------------------------------------------------
/**
 * @public
 * @namespace Net
 * @summary Functions for working with networks. (nodejs only)
*/
//-end-jsdoc-----------------------------------------------------------


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{
	return {
		_Schema: _Schema,
		AsyncDownloadFile: require( './910-Net.AsyncDownloadFile.js' )( Liquicode ).AsyncDownloadFile,
		AsyncGetRequest: require( './920-Net.AsyncGetRequest.js' )( Liquicode ).AsyncGetRequest,
	};
};
