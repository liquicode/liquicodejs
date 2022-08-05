"use strict";


//---------------------------------------------------------------------
let Schema = {
	id: '001',
	member_of: 'Core',
	name: 'FieldSchema',
	type: 'function',
	returns: 'object',
	returns_description: 'A Schema object.',
	description: [
		'Infers a schema from the given value.',
		'All it really does is set the `Schema.type` to the `typeof` of the value.',
		'It does return a full schema object.',
	],
	Parameters: {
		Value: {
			name: 'Value',
			type: '*',
			required: false,
			description: [
				'The value to infer a schema from.',
			],
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
	 * @function FieldSchema
	 * @returns {object}
	 * A Schema object.
	 * @description
	 * Infers a schema from the given value.
	 * All it really does is set the `Schema.type` to the `typeof` of the value.
	 * It does return a full schema object.
	 * @param {*} [Value]
	 * The value to infer a schema from.
	*/
	//-end-jsdoc-----------------------------------------------------------


	function FieldSchema( Value )
	{
		let schema = {
			name: '',
			type: '',
			format: '',
			required: false,
			default: undefined,
			description: '',
			examples: '',
		};
		if ( Value === undefined )
		{
			/* Do Nothing */
		}
		else if ( Value === null )
		{
			schema.type = 'object';
		}
		else 
		{
			schema.type = typeof Value;
		}
		return schema;
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: Schema,
		FieldSchema: FieldSchema,
	};
};
