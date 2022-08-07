"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '201',
	member_of: 'Text',
	name: 'Compare',
	type: 'function',
	returns: 'string',
	description: [
		'Compares two strings.',
		'Returns a `-1` if `StringA` is less than `StringB`.',
		'Returns a `1` if `StringA` is greater than than `StringB`.',
		'Returns a `0` if `StringA` and `StringB` are the same.',
	],
	Parameters: {
		StringA: {
			name: 'StringA',
			type: 'string',
			// required: true,
			default: '',
		},
		StringB: {
			name: 'StringB',
			type: 'string',
			// required: true,
			default: '',
		},
		CaseSensitive: {
			name: 'CaseSensitive',
			type: 'boolean',
			// required: true,
			default: true,
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function Compare
	 * @returns {string}
	 * @description
	 * Compares two strings.
	 * Returns a `-1` if `StringA` is less than `StringB`.
	 * Returns a `1` if `StringA` is greater than than `StringB`.
	 * Returns a `0` if `StringA` and `StringB` are the same.
	 * @param {string} [StringA]
	 * @param {string} [StringB]
	 * @param {boolean} [CaseSensitive=true]
	*/
	//-end-jsdoc-----------------------------------------------------------


	function Compare( StringA, StringB, CaseSensitive )
	{
		StringA = Liquicode.Schema.ValidateValue( StringA, _Schema.Parameters.StringA , { coerce_values: true, throw_errors: true });
		StringB = Liquicode.Schema.ValidateValue( StringB, _Schema.Parameters.StringB , { coerce_values: true, throw_errors: true });
		CaseSensitive = Liquicode.Schema.ValidateValue( CaseSensitive, _Schema.Parameters.CaseSensitive, { coerce_values: true, throw_errors: true } );

		try
		{
			if ( typeof StringA !== 'string' ) { return -1; }
			if ( typeof StringB !== 'string' ) { return 1; }
			if ( !CaseSensitive )
			{
				StringA = StringA.toLowerCase();
				StringB = StringB.toLowerCase();
			}
			return StringA.localeCompare( StringB );
		}
		catch ( error ) 
		{
			console.error( error.message, error );
			return null;
		}
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		Compare: Compare,
	};
};
