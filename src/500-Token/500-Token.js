"use strict";


//---------------------------------------------------------------------
let Schema = {
	id: '500',
	name: 'Token',
	type: 'namespace',
	summary: 'Functions for tokenizing text strings.',
};


//-start-jsdoc---------------------------------------------------------
/**
 * @public
 * @namespace Token
 * @summary Functions for tokenizing text strings.
*/
//-end-jsdoc-----------------------------------------------------------


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{
	return {
		_Schema: Schema,
		TokenizeOptions: require( './501-Token.TokenizeOptions.js' )( Liquicode ).TokenizeOptions,
		Tokenize: require( './502-Token.Tokenize.js' )( Liquicode ).Tokenize,
	};
};

