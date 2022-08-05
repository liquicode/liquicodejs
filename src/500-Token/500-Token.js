"use strict";


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{
	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		TokenizeOptions: require( './501-Token.TokenizeOptions.js' )( Liquicode ).TokenizeOptions,
		Tokenize: require( './502-Token.Tokenize.js' )( Liquicode ).Tokenize,
	};
};

