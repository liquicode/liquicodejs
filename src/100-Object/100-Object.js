"use strict";


//---------------------------------------------------------------------
let Schema = {
	id: '100',
	name: 'Object',
	type: 'namespace',
	summary: 'Functions for manipulating Javascript objects.',
};


//-start-jsdoc---------------------------------------------------------
/**
 * @public
 * @namespace Object
 * @summary Functions for manipulating Javascript objects.
*/
//-end-jsdoc-----------------------------------------------------------


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{
	return {
		_Schema: Schema,
		Clone: require( './101-Object.Clone.js' )( Liquicode ).Clone,
		Merge: require( './103-Object.Merge.js' )( Liquicode ).Merge,
		Traverse: require( './110-Object.Traverse.js' )( Liquicode ).Traverse,
	};
};
