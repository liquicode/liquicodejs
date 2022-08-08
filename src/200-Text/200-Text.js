"use strict";


//---------------------------------------------------------------------
let Schema = {
	id: '200',
	name: 'Text',
	type: 'namespace',
	summary: 'Functions for text parsing and manipulation.',
};


//-start-jsdoc---------------------------------------------------------
/**
 * @public
 * @namespace Text
 * @summary Functions for text parsing and manipulation.
*/
//-end-jsdoc-----------------------------------------------------------


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{
	return {
		_Schema: Schema,
		// TextBuffer: require( './201-Text.TextBuffer.js' )( Liquicode ).TextBuffer,
		Compare: require( './202-Text.Compare.js' )( Liquicode ).Compare,
		Matches: require( './203-Text.Matches.js' )( Liquicode ).Matches,
		ReplaceCharacters: require( './210-Text.ReplaceCharacters.js' )( Liquicode ).ReplaceCharacters,
		FirstWord: require( './220-Text.FirstWord.js' )( Liquicode ).FirstWord,
		AfterFirstWord: require( './221-Text.AfterFirstWord.js' )( Liquicode ).AfterFirstWord,
		LastWord: require( './222-Text.LastWord.js' )( Liquicode ).LastWord,
		BeforeLastWord: require( './223-Text.BeforeLastWord.js' )( Liquicode ).BeforeLastWord,
	};
};

