"use strict";


//---------------------------------------------------------------------
let Schema = {
	id: '500',
	name: 'Parse',
	type: 'namespace',
	summary: 'Functions for tokenizing text strings.',
};


//-start-jsdoc---------------------------------------------------------
/**
 * @public
 * @namespace Parse
 * @summary Functions for tokenizing text strings.
*/
//-end-jsdoc-----------------------------------------------------------


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{
	return {
		_Schema: Schema,
		TokenizeOptions: require( './501-Parse.TokenizeOptions.js' )( Liquicode ).TokenizeOptions,
		Tokenize: require( './502-Parse.Tokenize.js' )( Liquicode ).Tokenize,
		DateParse: require( './510-Parse.DateParse.js' )( Liquicode ).DateParse,
	};
};

