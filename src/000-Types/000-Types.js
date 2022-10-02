"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '000',
	name: 'Types',
	type: 'namespace',
	summary: 'Data Type Handling',
};


//-start-jsdoc---------------------------------------------------------
/**
 * @public
 * @namespace Types
 * @summary Data Type Handling
*/
//-end-jsdoc-----------------------------------------------------------


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{
	return {
		_Schema: _Schema,

		HasValue: require( './001-Types.HasValue.js' )( Liquicode ).HasValue,

		Coerce: require( './010-Types.Coerce.js' )( Liquicode ).Coerce,

		Formats: require( './020-Types.Formats.js' )( Liquicode ).Formats,
		GetFormat: require( './021-Types.GetFormat.js' )( Liquicode ).GetFormat,
		IsFormat: require( './022-Types.IsFormat.js' )( Liquicode ).IsFormat,

	};
};
