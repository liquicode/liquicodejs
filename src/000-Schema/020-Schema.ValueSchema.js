"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '020',
	member_of: 'Schema',
	name: 'ValueSchema',
	type: 'function',
	returns: 'object',
	returns_description: 'A FieldSchema object.',
	summary: 'Returns a FieldSchema based upon a specific value.',
	description: [
		`
This function is used to obtain extended type information about a value.
While it does return an entire FieldSchema object, only the "FieldSchema.type" and "FieldSchema.format" fields are set.
`,
	],
	Parameters: {
		Value: {
			name: 'Value',
			type: '*',
			required: false,
			description: 'The value to infer a schema from.',
		},
	},
	todo: [],
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function ValueSchema
	 * @returns {object}
	 * A FieldSchema object.
	 * @summary Returns a FieldSchema based upon a specific value.
	 * @description
	 * 
This function is used to obtain extended type information about a value.
While it does return an entire FieldSchema object, only the "FieldSchema.type" and "FieldSchema.format" fields are set.

	 * @param {*} [Value]
	 * The value to infer a schema from.
	*/
	//-end-jsdoc-----------------------------------------------------------


	function ValueSchema( Value )
	{
		let schema = {
			type: '',
			format: '',
			default: undefined,
			// name: '',
			// required: false,
			// description: '',
			// examples: '',
		};
		if ( Value === undefined )
		{
			/* Do Nothing */
		}
		else if ( Value === null )
		{
			/* Do Nothing */
		}
		else 
		{
			schema.type = typeof Value;
			switch ( schema.type )
			{
				case 'boolean':
					schema.format = 'boolean';
					break;

				case 'number':
					let float_value = Number.parseFloat( Value );
					let integer_value = Number.parseInt( Value );
					if ( integer_value === float_value )
					{
						schema.format = 'integer';
					}
					else
					{
						schema.format = 'float';
					}
					break;

				case 'string':
					schema.format = 'string';
					break;

				case 'object':
					schema.format = 'object';
					if ( Array.isArray( Value ) )
					{
						let has_boolean = false;
						let has_number = false;
						let has_string = false;
						let has_object = false;
						let has_array = false;
						for ( let index = 0; index < Value.length; index++ )
						{
							let type = typeof Value[ index ];
							if ( type === 'boolean' ) { has_boolean = true; }
							if ( type === 'number' ) { has_number = true; }
							if ( type === 'string' ) { has_string = true; }
							if ( type === 'object' ) 
							{
								if ( Array.isArray( Value[ index ] ) ) { has_array = true; }
								else { has_object = true; }
							}
						}
						if ( has_boolean && !has_number && !has_string && !has_object && !has_array ) { schema.format = 'boolean-array'; }
						else if ( !has_boolean && has_number && !has_string && !has_object && !has_array ) { schema.format = 'number-array'; }
						else if ( !has_boolean && !has_number && has_string && !has_object && !has_array ) { schema.format = 'string-array'; }
						else if ( !has_boolean && !has_number && !has_string && has_object && !has_array ) { schema.format = 'object-array'; }
						else if ( !has_boolean && !has_number && !has_string && !has_object && has_array ) { schema.format = 'array-array'; }
						else { schema.format = 'array'; }
					}
					break;

			}
		}
		return schema;
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		ValueSchema: ValueSchema,
	};
};
