"use strict";


//---------------------------------------------------------------------
let Schema = {
	id: '920',
	member_of: 'Network',
	name: 'AsyncGetRequest',
	type: 'function',
	returns: 'string',
	description: `Make an http get request for a an url.`,
	Parameters: {
		Url: {
			name: 'Url',
			type: 'string',
			required: true,
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function AsyncGetRequest
	 * @returns {string}
	 * @description
	 * Make an http get request for a an url.
	 * @param {string} Url
	*/
	//-end-jsdoc-----------------------------------------------------------


	const LIB_HTTP = require( 'http' );
	const LIB_HTTPS = require( 'https' );


	async function AsyncGetRequest( Url )
	{
		let http_engine = null;
		if ( Url.toLowerCase().startsWith( 'http:' ) ) { http_engine = LIB_HTTP; }
		else if ( Url.toLowerCase().startsWith( 'https:' ) ) { http_engine = LIB_HTTPS; }
		else { throw new Error( `Unsupported protocol. Must be http or https.` ); }

		let result = await new Promise(
			( resolve, reject ) =>
			{
				try
				{
					http_engine.get(
						Url,
						function ( response ) 
						{
							response.on( 'data', data =>
							{
								resolve( data );
							} );
						} );
				}
				catch ( error )
				{
					reject( error );
				}
			} );

		if ( result )
		{
			result = result.toString();
		}
		return result;
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: Schema,
		AsyncGetRequest: AsyncGetRequest,
	};
};
