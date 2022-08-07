"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '021',
	member_of: 'Schema',
	name: 'DefaultValue',
	type: 'function',
	returns: '*',
	returns_description: 'The default value.',
	summary: 'Returns the default value for the FieldSchema.',
	description: `
If the FieldSchema specifies a default value, then that value will be returned.
Otherwise, a default value is calculated based upon the type and format of the FieldSchema.

| Type    | Format        | Default
|---------|---------------|-----------
| boolean | -             | false
| number  | integer       | 0
| number  | float         | 0
| string  | -             | ''
| object  | -             | {}
| object  | array         | []
| object  | boolean-array | []
| object  | number-array  | []
| object  | string-array  | []
| object  | object-array  | []
`,
	Parameters: {
		Schema: {
			name: 'Schema',
			type: 'object',
			required: true,
			description: 'The schema to use when calculating a default value.',
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
	 * @function DefaultValue
	 * @returns {*}
	 * The default value.
	 * @summary Returns the default value for the FieldSchema.
	 * @description
	 * 
If the FieldSchema specifies a default value, then that value will be returned.
Otherwise, a default value is calculated based upon the type and format of the FieldSchema.

| Type    | Format        | Default
|---------|---------------|-----------
| boolean | -             | false
| number  | integer       | 0
| number  | float         | 0
| string  | -             | ''
| object  | -             | {}
| object  | array         | []
| object  | boolean-array | []
| object  | number-array  | []
| object  | string-array  | []
| object  | object-array  | []

	 * @param {object} Schema
	 * The schema to use when calculating a default value.
	 * @param {boolean} [ThrowErrors]
	 * Errors are thrown if true, otherwise an ErrorValue object is returned.
	*/
	//-end-jsdoc-----------------------------------------------------------


	function DefaultValue( Schema, ThrowErrors )
	{
		function send_error( Message )
		{
			if ( ThrowErrors ) { throw new Error( Message ); }
			return Liquicode.Schema.ErrorValue( Message, 'DefaultValue' );
		}

		if ( !Schema ) { return send_error( `The parameter [Schema] is missing.` ); }
		if ( !Schema.type ) { return send_error( `The parameter [Schema.type] is missing.` ); }
		let schema_format = Schema.format ? Schema.format : Schema.type;

		// If a default exists, return it.
		if ( Schema.default !== undefined ) { return Schema.default; }

		// Calculate a default.
		switch ( Schema.type )
		{
			case 'boolean': return false;

			case 'number': return 0;

			case 'string': return '';

			case 'object':
				if ( [ '', 'object' ].includes( schema_format ) ) { return {}; }
				else if ( schema_format.endsWith( 'array' ) ) { return []; }
				return send_error( `[schema_format] has an invalid value [${schema_format}] for type [object].` );

			default:
				return send_error( `[Schema.type] has an invalid value [${Schema.type}].` );
		}
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		DefaultValue: DefaultValue,
	};
};
