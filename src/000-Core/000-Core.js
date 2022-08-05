"use strict";


//---------------------------------------------------------------------
let Schema = {
	id: '000',
	name: 'Core',
	type: 'namespace',
	summary: 'General purpose functions.',
};


//-start-jsdoc---------------------------------------------------------
/**
 * @public
 * @namespace Core
 * @summary General purpose functions.
*/
//-end-jsdoc-----------------------------------------------------------


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{
	return {
		_Schema: Schema,
		FieldSchema: require( './001-Core.FieldSchema.js' )( Liquicode ).FieldSchema,
		ValidateField: require( './002-Core.ValidateField.js' )( Liquicode ).ValidateField,
	};
};
