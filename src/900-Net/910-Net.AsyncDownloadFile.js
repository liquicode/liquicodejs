"use strict";


//---------------------------------------------------------------------
let Schema = {
	id: '910',
	member_of: 'Net',
	name: 'AsyncDownloadFile',
	type: 'function',
	returns: 'string',
	description: `Download a file from an url.`,
	Parameters: {},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function AsyncDownloadFile
	 * @returns {string}
	 * @description
	 * Download a file from an url.
	*/
	//-end-jsdoc-----------------------------------------------------------


	const LIB_HTTP = require( 'http' );
	const LIB_HTTPS = require( 'https' );


	function AsyncDownloadFile( Url, Filename )
	{
		let http_engine = null;
		if ( Url.toLowerCase().startsWith( 'http:' ) ) { http_engine = LIB_HTTP; }
		else if ( Url.toLowerCase().startsWith( 'https:' ) ) { http_engine = LIB_HTTPS; }
		else { throw new Error( `Unsupported protocol. Must be either http or https.` ); }

		return new Promise(
			( resolve, reject ) =>
			{
				try
				{
					http_engine.get(
						Url,
						function ( response ) 
						{
							const file_stream = LIB_FS.createWriteStream( Filename );
							response.pipe( file_stream );
							file_stream.on(
								'finish',
								function ()
								{
									file_stream.close();
									resolve( true );
								} );
						} );
				}
				catch ( error )
				{
					reject( error );
				}
			} );
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: Schema,
		AsyncDownloadFile: AsyncDownloadFile,
	};
};
