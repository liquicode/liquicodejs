"use strict";




//---------------------------------------------------------------------
let _Schema = {
	id: '900',
	name: 'Network',
	type: 'namespace',
	summary: 'Functions for working with networks. (nodejs only)',
};


//-start-jsdoc---------------------------------------------------------
/**
 * @public
 * @namespace Network
 * @summary Functions for working with networks. (nodejs only)
*/
//-end-jsdoc-----------------------------------------------------------


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{
	return {
		_Schema: _Schema,
		AsyncDownloadFile: require( './910-Network.AsyncDownloadFile.js' )( Liquicode ).AsyncDownloadFile,
		AsyncGetRequest: require( './920-Network.AsyncGetRequest.js' )( Liquicode ).AsyncGetRequest,
	};
};
