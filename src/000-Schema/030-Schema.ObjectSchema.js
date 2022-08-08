"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '030',
	member_of: 'Schema',
	name: 'ObjectSchema',
	type: 'function',
	returns: 'object',
	returns_description: 'An array of FieldSchema.',
	summary: 'Returns an array of FieldSchema describing the top-most members of "FromObject".',
	description: ``,
	Parameters: {
		FromObject: {
			name: 'FromObject',
			type: 'object',
			required: true,
			description: 'An object to retrieve the schema for.',
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
	 * @function ObjectSchema
	 * @returns {object}
	 * An array of FieldSchema.
	 * @summary Returns an array of FieldSchema describing the top-most members of "FromObject".
	 * @param {object} FromObject
	 * An object to retrieve the schema for.
	*/
	//-end-jsdoc-----------------------------------------------------------


	function ObjectSchema( FromObject )
	{
		FromObject = Liquicode.Schema.ValidateValue( FromObject, _Schema.Parameters.FromObject, { coerce_values: true, throw_errors: true } );

		let schema_array = [];
		let object_keys = Object.keys( FromObject );
		for ( let key_index = 0; key_index < object_keys.length; key_index++ )
		{
			let object_key = object_keys[ key_index ];
			let schema = Liquicode.Schema.ValueSchema( FromObject[ object_key ] );
			schema.name = object_key;
			schema_array.push( schema );
		}
		return schema_array;
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		ObjectSchema: ObjectSchema,
	};
};
