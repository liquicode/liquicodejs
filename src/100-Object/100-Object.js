"use strict";


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{
	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		Clone: require( './101-Object.Clone.js' )( Liquicode ).Clone,
		Merge: require( './103-Object.Merge.js' )( Liquicode ).Merge,
		Traverse: require( './110-Object.Traverse.js' )( Liquicode ).Traverse,
	};
};
