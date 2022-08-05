"use strict";


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{
	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		FieldSchema: require( './001-Core.FieldSchema.js' )( Liquicode ).FieldSchema,
		ValidateField: require( './002-Core.ValidateField.js' )( Liquicode ).ValidateField,
	};
};
