"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '031',
	member_of: 'Schema',
	name: 'ValidateValues',
	type: 'function',
	returns: 'object',
	returns_description: 'An object containing the validation result.',
	summary: 'Validate a set of values against an array of FieldSchema.',
	description: `

Takes an array of Values and an array of FieldSchema to validate a number of fields at once.
This function does not throw validation errors.
Instead, all validation errors are returned to the caller in the return value.
Additionally, the number of fields processed and a set of coerced values is also returned.

**The Return Value**

~~~javascript
ReturnValue = {
	field_count: 0,				// The number of fields processed.
	validation_errors: [],		// All validation errors encountered.
	coerced_values: [],			// An array of coerced values.
}
~~~
`,
	Parameters: {
		Values: {
			name: 'Values',
			type: 'object',
			required: true,
			description: 'The values to validate. This can be an array of values, or an object described by Schemas.',
		},
		Schemas: {
			name: 'Schemas',
			type: 'object',
			required: true,
			description: 'An array of FieldSchemas to validate the Values with. Can also be an object whose top-most fields are instances of FieldSchema.',
		},
	},
	todo: [],
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	//-end-jsdoc-----------------------------------------------------------


	function ValidateValues( Values, Schemas )
	{
		let validation_result = {
			field_count: 0,				// The number of fields processed.
			validation_errors: [],		// All validation errors encountered.
			coerced_values: [],			// An array of coerced values.
		};

		let value_array = null;
		let schema_array = null;

		// Validate the Values.
		if ( !Values ) { throw new Error( `The parameter [Values] is missing. Must be an object or array of values.` ); }
		if ( typeof Values !== 'object' ) { throw new Error( `The parameter [Values] is not an object. Must be an object or array of values.` ); }
		if ( Array.isArray( Values ) )
		{
			value_array = Values;
		}
		else
		{
			value_array = [];
			let keys = Object.keys( Values );
			for ( let index = 0; index < keys.length; index++ )
			{
				value_array.push( Values[ keys[ index ] ] );
			}
		}

		// Validate the Schemas.
		if ( !Schemas ) { throw new Error( `The parameter [Schemas] is missing. Must be an object or array of FieldSchema.` ); }
		if ( typeof Schemas !== 'object' ) { throw new Error( `The parameter [Schemas] is not an object. Must be an object or array of values.` ); }
		if ( Array.isArray( Schemas ) )
		{
			schema_array = Schemas;
		}
		else
		{
			schema_array = [];
			let keys = Object.keys( Schemas );
			for ( let index = 0; index < keys.length; index++ )
			{
				schema_array.push( Schemas[ keys[ index ] ] );
			}
		}

		// Validate the fields
		for ( let index = 0; index < schema_array.length; index++ )
		{
			if ( index < value_array.length )
			{
				let result = Liquicode.Schema.ValidateValue( value_array[ index ], schema_array[ index ], { coerce_values: true, throw_errors: false } );
				if ( Liquicode.Schema.IsErrorValue( result ) )
				{
					validation_result.field_count++;
					validation_result.coerced_values.push( undefined );
					validation_result.validation_errors.push( result.error );
				}
				else
				{
					validation_result.field_count++;
					validation_result.coerced_values.push( result );
				}
			}
			else
			{
				let field_name = schema_array[ index ].name;
				if ( !field_name ) { field_name = '#' + ( index + 1 ); }
				validation_result.field_count++;
				validation_result.coerced_values.push( undefined );
				validation_result.validation_errors.push( `Field [${field_name}] is missing.` );
			}
		}

		return validation_result;
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		ValidateValues: ValidateValues,
	};
};
