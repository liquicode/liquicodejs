"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '023',
	member_of: 'Schema',
	name: 'ValidateValue',
	type: 'function',
	returns: '*',
	returns_description: 'The validated/coerced Value or an ErrorValue object.',
	summary: 'Validates a field value according to a schema and optionally coerces the value to match.',
	description: `

This function uses "Schema.type", "Schema.format", "Schema.required', and "Schema.default" to validate the given Value.

If "Options.coerce = true", then an attempt will be made to coerce the given value to match the type and format specified in the FieldSchema.
(See: "Schema.CoerceValue()")

	`,
	// [
	// 	'Validate values according to a given schema.',
	// 	'Return the value if validation succeeds.',
	// 	'Otherwise, this function throws an error.',
	// 	'See the "GetSchema()" function for a more detailed explanation of schemas.',
	// ],
	Parameters: {
		Value: {
			name: 'Value',
			type: '*',
			required: true,
			description: [
				'The value to validate.',
			],
		},
		Schema: {
			name: 'Schema',
			type: 'object',
			required: true,
			description: 'The FieldSchema object to validate against.',
			examples: [
				`{ name: 'Name', type: 'string' }`,
				`{ name: 'options', type: 'object', default: { hoist: true, swab: 'decks' } }`,
				`{ name: 'max_tries', type: 'number', format: 'integer', required: true, default: 3 }`,
			]
		},
		Options: {
			name: 'Options',
			type: 'object',
			required: false,
			default: "{ coerce: false, throw_errors: false, context: null }",
			description: `An options object to control validation:
~~~javascript
Options = {
	coerce_values: false,	// Attempt to coerce the provided value to match the schema's type.
	throw_errors: false,	// When true, throw an error validation errors are encountered.
	context: null,			// A context name (function name) to include in any error messages.
}
~~~`,
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function ValidateValue
	 * @returns {*}
	 * The validated/coerced Value or an ErrorValue object.
	 * @summary Validates a field value according to a schema and optionally coerces the value to match.
	 * @description
	 * 

This function uses "Schema.type", "Schema.format", "Schema.required', and "Schema.default" to validate the given Value.

If "Options.coerce = true", then an attempt will be made to coerce the given value to match the type and format specified in the FieldSchema.
(See: "Schema.CoerceValue()")

	
	 * @param {*} Value
	 * The value to validate.
	 * @param {object} Schema
	 * The FieldSchema object to validate against.
	 * @param {object} [Options="{ coerce: false, throw_errors: false, context: null }"]
	 * An options object to control validation:
~~~javascript
Options = {
	coerce_values: false,	// Attempt to coerce the provided value to match the schema's type.
	throw_errors: false,	// When true, throw an error validation errors are encountered.
	context: null,			// A context name (function name) to include in any error messages.
}
~~~
	*/
	//-end-jsdoc-----------------------------------------------------------


	function ValidateValue( Value, Schema, Options )
	{
		function send_error( Message )
		{
			if ( Options.throw_errors ) { throw new Error( Message ); }
			return Liquicode.Schema.ErrorValue( Message, 'ValidateValue' );
		}

		// Validate the parameters.
		if ( Options === undefined ) { Options = {}; }
		Options.coerce_values = ( Options.coerce_values === true );
		Options.throw_errors = ( Options.throw_errors === true );
		Options.context = Options.context || '';
		if ( !Schema ) { return send_error( `The parameter [Schema] is missing.` ); }
		if ( !Schema.type ) { return send_error( `The parameter [Schema.type] is missing.` ); }
		let schema_format = Schema.format ? Schema.format : Schema.type;

		// Get the value schema.
		let value_schema = Liquicode.Schema.ValueSchema( Value );

		// Compare the schemas.
		if ( Schema.type === value_schema.type )
		{
			if ( schema_format === value_schema.format )
			{
				return Value;
			}
		}
		else if ( !Options.coerce_values )
		{
			let message = `The value of type [${value_schema.type}|${value_schema.format}]`;
			message += ` does not match the expected type of [${Schema.type}|${schema_format}].`;
			return send_error( message );
		}

		// Coerce the value.
		let coerced_value = Liquicode.Schema.CoerceValue( Value, Schema, Options.throw_errors );
		if ( Liquicode.Schema.IsErrorValue( coerced_value ) ) { return coerced_value; }

		return coerced_value;
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		ValidateValue: ValidateValue,
	};
};
