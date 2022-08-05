"use strict";


//---------------------------------------------------------------------
let Schema = {
	id: '201',
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

	//---------------------------------------------------------------------
	function Compare( StringA, StringB, CaseSensitive )
	{
		StringA = Liquicode.Core.ValidateField( StringA, Schema.Parameters.StringA );
		StringB = Liquicode.Core.ValidateField( StringB, Schema.Parameters.StringB );
		CaseSensitive = Liquicode.Core.ValidateField( CaseSensitive, Schema.Parameters.CaseSensitive );

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
		_Schema: Schema,
		Compare: Compare,
	};
};
