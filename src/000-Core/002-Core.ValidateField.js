"use strict";


//---------------------------------------------------------------------
let Schema = {
	id: '002',
	member_of: 'Core',
	name: 'ValidateField',
	type: 'function',
	returns: '*',
	returns_description: '',
	description: [
		'Validate values according to a given schema.',
		'Return the value if validation succeeds.',
		'Otherwise, this function throws an error.',
		'See the "GetSchema()" function for a more detailed explanation of schemas.',
	],
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
			description: [
				'The schema to validate against.',
				'This is an object which describes the expected Value.',
				'Schema is required to have at least a "name" and a "type".',
				'You can also supply a "required" flag and a "default" value.',
			],
			examples: [
				`{ name: 'Name', type: 'string' }`,
				`{ name: 'options', type: 'object', default: { hoist: true, swab: 'decks' } }`,
				`{ name: 'max_tries', type: 'number', format: 'integer', required: true, default: 3 }`,
			]
		},
		Context: {
			name: 'Context',
			type: 'string',
			required: false,
			default: '',
			description: [
				'A context name (e.g. function name) to include in any error messages.',
			],
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function ValidateField
	 * @returns {*}
	 * @description
	 * Validate values according to a given schema.
	 * Return the value if validation succeeds.
	 * Otherwise, this function throws an error.
	 * See the "GetSchema()" function for a more detailed explanation of schemas.
	 * @param {*} Value
	 * The value to validate.
	 * @param {object} Schema
	 * The schema to validate against.
	 * This is an object which describes the expected Value.
	 * Schema is required to have at least a "name" and a "type".
	 * You can also supply a "required" flag and a "default" value.
	 * @param {string} [Context]
	 * A context name (e.g. function name) to include in any error messages.
	*/
	//-end-jsdoc-----------------------------------------------------------


	function ValidateField( Value, Schema, Context )
	{
		if ( !Schema ) { throw new Error( `The parameter [Schema] is missing. In [ValidateField].` ); }
		if ( Value === undefined )
		{
			if ( Schema.default === undefined )
			{
				let message = `No value was given for [${Schema.name}] and no default exists.`;
				if ( Context ) { message += ` In [${Context}].`; }
				throw new Error( message );
			}
			Value = Schema.default;
		}
		else if ( Value === null )
		{
			if ( Schema.default === undefined )
			{
				let message = `The value of Null was given for [${Schema.name}] and no default exists.`;
				if ( Context ) { message += ` In [${Context}].`; }
				throw new Error( message );
			}
			Value = Schema.default;
		}
		else 
		{
			let type_is = typeof Value;
			if ( type_is !== Schema.type )
			{
				if ( Schema.type === '*' )
				{
					/* Do Nothing */
				}
				else if ( Schema.type === 'string' )
				{
					Value = Value.toString();
				}
				else
				{
					let message = `The value for [${Schema.name}] should be [${Schema.type}] but was [${type_is}] instead.`;
					if ( Context ) { message += ` In [${Context}].`; }
					throw new Error( message );
				}
			}
		}
		return Value;
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: Schema,
		ValidateField: ValidateField,
	};
};
