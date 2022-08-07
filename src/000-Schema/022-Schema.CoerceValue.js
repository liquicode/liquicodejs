"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '022',
	member_of: 'Schema',
	name: 'CoerceValue',
	type: 'function',
	returns: '*',
	returns_description: 'The coerced value or an error object.',
	summary: `Attempt to coerce the Value parameter to match the Schema's type.`,
	description: `

This function uses the Schema to coerce the Value to a particular data type.

If Value is "undefined" or "null", then the default value for "FieldSchema.type" will be returned.
This is done by calling "Schema.DefaultValue()" for the FieldSchema.


	`,
	Parameters: {
		Value: {
			name: 'Value',
			type: '*',
			required: true,
			description: [
				'The value to coerce.',
			],
		},
		Schema: {
			name: 'Schema',
			type: 'object',
			required: true,
			description: 'The schema to use when coercing Value.',
		},
		ThrowErrors: {
			name: 'ThrowErrors',
			type: 'boolean',
			required: false,
			default: false,
			description: 'Errors are thrown if true, otherwise an ErrorValue object is returned.',
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function CoerceValue
	 * @returns {*}
	 * The coerced value or an error object.
	 * @summary Attempt to coerce the Value parameter to match the Schema's type.
	 * @description
	 * 
This function uses the "FieldSchema.type", "FieldSchema.format", "FieldSchema.required", and "FieldSchema.default" fields to coerce Value to a particular data type.

If Value is "undefined" or "null", then the default value for "FieldSchema.type" will be returned.
This is done by calling "Schema.DefaultValue()" for the FieldSchema.

***Coercion Table***

|    **From**   | **to boolean** |    **to number**    |      **to string**      |    **to object**    |
|:-------------:|:--------------:|:-------------------:|:-----------------------:|:-------------------:|
| **undefined** |  DefaultValue  |     DefaultValue    |       DefaultValue      |     DefaultValue    |
|    **null**   |  DefaultValue  |     DefaultValue    |       DefaultValue      |     DefaultValue    |
|  **boolean**  |      Value     |         0, 1        |      Value.toString     |        Error        |
|   **number**  |   true, false  |        Value        |      Value.toString     |        Error        |
|   **string**  |   true, false  | parseFloat( Value ) |          Value          | JSON.parse( Value ) |
|   **object**  |   true, false  |        Error        | JSON.stringify( Value ) |        Value        |

- **DefaultValue** is calculated by calling Schema.DefaultValue( Schema ).
- **Error** is an "ErrorValue": { ok: false, error: '...', context: 'CoerceValue' }

	
	 * @param {*} Value
	 * The value to coerce.
	 * @param {object} Schema
	 * The schema to use when coercing Value.
	 * @param {boolean} [ThrowErrors]
	 * Errors are thrown if true, otherwise an ErrorValue object is returned.
	*/
	//-end-jsdoc-----------------------------------------------------------


	function CoerceValue( Value, Schema, ThrowErrors )
	{
		function send_error( Message )
		{
			if ( ThrowErrors ) { throw new Error( Message ); }
			return Liquicode.Schema.ErrorValue( Message, 'CoerceValue' );
		}

		if ( !Schema ) { return send_error( `The parameter [Schema] is missing.` ); }
		if ( !Schema.type ) { return send_error( `The parameter [Schema.type] is missing.` ); }
		let schema_format = Schema.format ? Schema.format : Schema.type;

		// If Value is undefined, return the default.
		if ( Value === undefined ) { return Liquicode.Schema.DefaultValue( Schema ); }

		// If Value is null, return the default.
		if ( Value === null ) { return Liquicode.Schema.DefaultValue( Schema ); }

		// Get the value schema.
		let value_schema = Liquicode.Schema.ValueSchema( Value );

		switch ( Schema.type )
		{
			case 'boolean':
				switch ( value_schema.type )
				{
					case 'boolean':			// Convert boolean to number.
					case 'number':			// Convert number to number.
					case 'string':			// Convert string to number.
					case 'object':			// Convert object to number.
						return Boolean( Value );

					default:				// Error: Unknown value type.
						return send_error( `Value has an unknown type [${value_schema.type}].` );
				}

			case 'number':
				switch ( value_schema.type )
				{
					case 'boolean':			// Convert boolean to number.
					case 'number':			// Convert number to number.
					case 'string':			// Convert string to number.
						let number_value = Number( Value );
						if ( isNaN( number_value ) )
						{
							number_value = 0;
						}
						else if ( schema_format === 'integer' )
						{
							number_value = parseInt( number_value.toString() );
						}
						return number_value;

					case 'object':			// Convert object to number.
						return send_error( `Unable to coerce a value from object to number.` );

					default:				// Error: Unknown value type.
						return send_error( `Value has an unknown type [${value_schema.type}].` );
				}

			case 'string':
				switch ( value_schema.type )
				{
					case 'boolean':			// Convert boolean to string.
					case 'number':			// Convert number to string.
					case 'string':			// Convert string to string.
						return Value.toString();

					case 'object':			// Convert object to string.
						return JSON.stringify( Value );

					default:				// Error: Unknown value type.
						return send_error( `Value has an unknown type [${value_schema.type}].` );
				}

			case 'object':
				switch ( value_schema.type )
				{
					case 'boolean':			// Convert boolean to object.
						return send_error( `Unable to coerce a value from boolean to object.` );

					case 'number':			// Convert number to object.
						return send_error( `Unable to coerce a value from number to object.` );

					case 'string':			// Convert string to object.
						let json_value = Value.trim();
						if ( json_value.startsWith( '{' ) ) { return JSON.parse( json_value ); }
						if ( json_value.startsWith( '[' ) ) { return JSON.parse( json_value ); }
						return send_error( `Unable to coerce a (non-json) value from string to object.` );

					case 'object':			// Convert object to object.
						return JSON.parse( JSON.stringify( Value ) );

					default:				// Error: Unknown value type.
						return send_error( `Value has an unknown type [${value_schema.type}].` );
				}

			default:
				return send_error( `[Schema.type] has an invalid value [${Schema.type}].` );
		}
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		CoerceValue: CoerceValue,
	};
};
