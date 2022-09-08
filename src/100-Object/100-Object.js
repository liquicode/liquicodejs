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
		
		// Traverse: require( './110-Object.Traverse.js' )( Liquicode ).Traverse,
		// HasPath: require( './111-Object.HasPath.js' )( Liquicode ).HasPath,
		// FindField: require( './112-Object.FindField.js' )( Liquicode ).FindField,
		// FindValue: require( './113-Object.FindValue.js' )( Liquicode ).FindValue,
		// GetValue: require( './114-Object.GetValue.js' )( Liquicode ).GetValue,
		// SetValue: require( './115-Object.SetValue.js' )( Liquicode ).SetValue,

		FromJson: require( './120-Object.FromJson.js' )( Liquicode ).FromJson,
		ToJsonOptions: require( './121-Object.ToJsonOptions.js' )( Liquicode ).ToJsonOptions,
		ToJson: require( './122-Object.ToJson.js' )( Liquicode ).ToJson,

		FromIni: require( './125-Object.FromIni.js' )( Liquicode ).FromIni,
		ToIni: require( './126-Object.ToIni.js' )( Liquicode ).ToIni,

		// ValueArrayOf: require( './130-Object.ValueArrayOf.js' )( Liquicode ).ValueArrayOf,

	};
};
