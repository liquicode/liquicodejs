"use strict";


//---------------------------------------------------------------------
let Schema = {
	id: '300',
	name: 'Shapes',
	type: 'namespace',
	summary: 'Functions for manipulating data in different shapes.',
};


//-start-jsdoc---------------------------------------------------------
/**
 * @public
 * @namespace Shapes
 * @summary Functions for manipulating data in different shapes.
*/
//-end-jsdoc-----------------------------------------------------------


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{
	return {
		_Schema: Schema,

		Matrix: require( './310-Shapes.Matrix.js' )( Liquicode ).Matrix,

	};
};

