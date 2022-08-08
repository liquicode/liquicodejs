/*! Copyright (c) 2010-2022 Andre' G. Bowlin (http://liquicode.com) */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/000-Schema/000-Schema.js":
/*!**************************************!*\
  !*** ./src/000-Schema/000-Schema.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '000',
	name: 'Schema',
	type: 'namespace',
	summary: 'Data value and type handling',
	description: `

**The FieldSchema Object**

~~~javascript
FieldSchema = {
	type: '',				// Javascript data type (boolean, number, string, object).
	format: '',				// A data type specific designation.
	default: undefined,		// A default value used for missing fields.
	name: '',				// Name of the field.
}
~~~

LiquicodeJS can classify and identify value types beyond the primitive data types supported by Javascript.
When obtaining FieldSchema objects from "Schema.ValueSchema()" or "Schema.ObjectSchema()",
"FieldSchema.type" will contain the Javascript data type and "FieldSchema.format" will have a more specific type description.

Possible values for "FieldSchema.type" and "FieldSchema.format" are as follows:

| Type    | Format        | Default Value | Examples                          |
|---------|---------------|---------------|-----------------------------------|
| boolean | boolean       | false         | true, or false                    |
| number  | integer       | 0             | 1, 2, or 3.0                      |
| number  | float         | 0             | 1.1, 2.071, or 3.14               |
| string  | string        | ""            | Hello', or ''                     |
| object  | object        | {}            | { foo: 'bar' }                    |
| object  | array         | []            | [ 1, 'two', 3.14, null ]          |
| object  | boolean-array | []            | [ true, false, true ]             |
| object  | number-array  | []            | [ 1, 2, 3.14 ]                    |
| object  | string-array  | []            | [ 'one', 'two', 'three' ]         |
| object  | object-array  | []            | [ { foo: 'bar' }, [1,2,3], null ] |
| object  | array-array   | []            | [ [1,2,3], [], [4,5] ]            |


**The ErrorValue Object**

~~~javascript
ErrorValue = {
	ok: false,		// Always set to "false".
	error: '',		// Error message.
	context: '',	// Context for the error (e.g. a function name).
}
~~~

LiquicodeJS introduces an "ErrorValue" object that it can use to indicate errors.
Some functions will optionally return an "ErrorValue" object instead of throwing a Javascript Error.
In some cases, this can make code more efficient and legible when certain errors are tolerable
and you want to avoid the expensive cost of a Javascript Error that includes a call stack.

Use the "Schema.ErrorValue()" function to create ErrorValue objects and "Schema.IsErrorValue()" to test for errors.
An ErrorValue will always have "ErrorValue.ok = false" and "ErrorValue.error" equal to a string.


**Value Coercion**

The functions "Schema.CoerceValue()", "Schema.ValidateValue()", and "Schema.ValidateObject()" can optionally coerce values
from their given type to the types specified in Schema.

This tables describes how values are converted from one data type to another during coercion:

| From Type | To Boolean     | To Number      | To String        | To Object      |
|-----------|----------------|----------------|------------------|----------------|
| undefined | DefaultValue() | DefaultValue() | DefaultValue()   | DefaultValue() |
| null      | DefaultValue() | DefaultValue() | DefaultValue()   | DefaultValue() |
| Boolean   | Value          | Number()       | toString()       | ErrorValue     |
| Number    | Boolean()      | Value          | toString()       | ErrorValue     |
| String    | Boolean()      | Number()       | Value            | JSON.parse()   |
| Object    | Boolean()      | Number()       | JSON.stringify() | Value          |


**Object Schema and Validation**

All of this is very interesting, I am sure.

The functions "Schema.ObjectSchema()" and "Schema.ValidateObject()" take these concepts to the next level and
provides schemas functionality on an object level rather than an individual value level.


**Additional References***

- [You Don't Know JS: Types & Grammar - Chapter 4. Coercion](https://www.oreilly.com/library/view/you-dont-know/9781491905159/ch04.html)

`,
	examples: [
		`Schema = { name: 'PersonName', type: 'string' }`,
		`Schema = { name: 'options', type: 'object', default: { hoist: true, swab: 'decks' } }`,
		`Schema = { name: 'max_tries', type: 'number', format: 'integer', required: true, default: 3 }`,
	],
	todo: [
		'Support extended number formats: positive-integer, negative-integer, positive-float, negative-float',
		'Support type: function',
		'Support format plugin-ins. Must implement: get_default(), is_type_of(value), can_coerce(type), coerce(value)',
	],

};


//-start-jsdoc---------------------------------------------------------
/**
 * @public
 * @namespace Schema
 * @summary Data value and type handling
 * @description
 * 

**The FieldSchema Object**

~~~javascript
FieldSchema = {
	type: '',				// Javascript data type (boolean, number, string, object).
	format: '',				// A data type specific designation.
	default: undefined,		// A default value used for missing fields.
	name: '',				// Name of the field.
}
~~~

LiquicodeJS can classify and identify value types beyond the primitive data types supported by Javascript.
When obtaining FieldSchema objects from "Schema.ValueSchema()" or "Schema.ObjectSchema()",
"FieldSchema.type" will contain the Javascript data type and "FieldSchema.format" will have a more specific type description.

Possible values for "FieldSchema.type" and "FieldSchema.format" are as follows:

| Type    | Format        | Default Value | Examples                          |
|---------|---------------|---------------|-----------------------------------|
| boolean | boolean       | false         | true, or false                    |
| number  | integer       | 0             | 1, 2, or 3.0                      |
| number  | float         | 0             | 1.1, 2.071, or 3.14               |
| string  | string        | ""            | Hello', or ''                     |
| object  | object        | {}            | { foo: 'bar' }                    |
| object  | array         | []            | [ 1, 'two', 3.14, null ]          |
| object  | boolean-array | []            | [ true, false, true ]             |
| object  | number-array  | []            | [ 1, 2, 3.14 ]                    |
| object  | string-array  | []            | [ 'one', 'two', 'three' ]         |
| object  | object-array  | []            | [ { foo: 'bar' }, [1,2,3], null ] |
| object  | array-array   | []            | [ [1,2,3], [], [4,5] ]            |


**The ErrorValue Object**

~~~javascript
ErrorValue = {
	ok: false,		// Always set to "false".
	error: '',		// Error message.
	context: '',	// Context for the error (e.g. a function name).
}
~~~

LiquicodeJS introduces an "ErrorValue" object that it can use to indicate errors.
Some functions will optionally return an "ErrorValue" object instead of throwing a Javascript Error.
In some cases, this can make code more efficient and legible when certain errors are tolerable
and you want to avoid the expensive cost of a Javascript Error that includes a call stack.

Use the "Schema.ErrorValue()" function to create ErrorValue objects and "Schema.IsErrorValue()" to test for errors.
An ErrorValue will always have "ErrorValue.ok = false" and "ErrorValue.error" equal to a string.


**Value Coercion**

The functions "Schema.CoerceValue()", "Schema.ValidateValue()", and "Schema.ValidateObject()" can optionally coerce values
from their given type to the types specified in Schema.

This tables describes how values are converted from one data type to another during coercion:

| From Type | To Boolean     | To Number      | To String        | To Object      |
|-----------|----------------|----------------|------------------|----------------|
| undefined | DefaultValue() | DefaultValue() | DefaultValue()   | DefaultValue() |
| null      | DefaultValue() | DefaultValue() | DefaultValue()   | DefaultValue() |
| Boolean   | Value          | Number()       | toString()       | ErrorValue     |
| Number    | Boolean()      | Value          | toString()       | ErrorValue     |
| String    | Boolean()      | Number()       | Value            | JSON.parse()   |
| Object    | Boolean()      | Number()       | JSON.stringify() | Value          |


**Object Schema and Validation**

All of this is very interesting, I am sure.

The functions "Schema.ObjectSchema()" and "Schema.ValidateObject()" take these concepts to the next level and
provides schemas functionality on an object level rather than an individual value level.


**Additional References***

- [You Don't Know JS: Types & Grammar - Chapter 4. Coercion](https://www.oreilly.com/library/view/you-dont-know/9781491905159/ch04.html)


 * @todo Support extended number formats: positive-integer, negative-integer, positive-float, negative-float
 * @todo Support type: function
 * @todo Support format plugin-ins. Must implement: get_default(), is_type_of(value), can_coerce(type), coerce(value)
*/
//-end-jsdoc-----------------------------------------------------------


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{
	return {
		_Schema: _Schema,
		ErrorValue: __webpack_require__( /*! ./010-Schema.ErrorValue.js */ "./src/000-Schema/010-Schema.ErrorValue.js" )( Liquicode ).ErrorValue,
		IsErrorValue: __webpack_require__( /*! ./011-Schema.IsErrorValue.js */ "./src/000-Schema/011-Schema.IsErrorValue.js" )( Liquicode ).IsErrorValue,
		ValueSchema: __webpack_require__( /*! ./020-Schema.ValueSchema.js */ "./src/000-Schema/020-Schema.ValueSchema.js" )( Liquicode ).ValueSchema,
		DefaultValue: __webpack_require__( /*! ./021-Schema.DefaultValue.js */ "./src/000-Schema/021-Schema.DefaultValue.js" )( Liquicode ).DefaultValue,
		CoerceValue: __webpack_require__( /*! ./022-Schema.CoerceValue.js */ "./src/000-Schema/022-Schema.CoerceValue.js" )( Liquicode ).CoerceValue,
		ValidateValue: __webpack_require__( /*! ./023-Schema.ValidateValue.js */ "./src/000-Schema/023-Schema.ValidateValue.js" )( Liquicode ).ValidateValue,
		ObjectSchema: __webpack_require__( /*! ./030-Schema.ObjectSchema.js */ "./src/000-Schema/030-Schema.ObjectSchema.js" )( Liquicode ).ObjectSchema,
		ValidateValues: __webpack_require__( /*! ./031-Schema.ValidateValues.js */ "./src/000-Schema/031-Schema.ValidateValues.js" )( Liquicode ).ValidateValues,
	};
};


/***/ }),

/***/ "./src/000-Schema/010-Schema.ErrorValue.js":
/*!*************************************************!*\
  !*** ./src/000-Schema/010-Schema.ErrorValue.js ***!
  \*************************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '010',
	member_of: 'Schema',
	name: 'ErrorValue',
	type: 'function',
	returns: 'object',
	returns_description: 'An ErrorValue object.',
	summary: 'Returns an ErrorValue object containing error information.',
	description: [
		``,
	],
	Parameters: {
		Message: {
			name: 'Message',
			type: 'string',
			required: false,
			default: 'error',
			description: 'The error message.',
		},
		Context: {
			name: 'Context',
			type: 'string',
			required: false,
			default: undefined,
			description: 'Context for the error (e.g. a function name).',
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
	 * @function ErrorValue
	 * @returns {object}
	 * An ErrorValue object.
	 * @summary Returns an ErrorValue object containing error information.
	 * @description
	 * 
	 * @param {string} [Message="error"]
	 * The error message.
	 * @param {string} [Context]
	 * Context for the error (e.g. a function name).
	*/
	//-end-jsdoc-----------------------------------------------------------


	function ErrorValue( Message, Context )
	{
		return {
			ok: false,
			error: Message || 'error',
			context: Context,
		};
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		ErrorValue: ErrorValue,
	};
};


/***/ }),

/***/ "./src/000-Schema/011-Schema.IsErrorValue.js":
/*!***************************************************!*\
  !*** ./src/000-Schema/011-Schema.IsErrorValue.js ***!
  \***************************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '011',
	member_of: 'Schema',
	name: 'IsErrorValue',
	type: 'function',
	returns: 'boolean',
	returns_description: 'True if Value is an ErrorValue object, otherwise false.',
	summary: 'Tests if a Value is an ErrorValue object.',
	description: ``,
	Parameters: {
		Value: {
			name: 'Value',
			type: 'object',
			required: false,
			description: 'The value to test.',
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
	 * @function IsErrorValue
	 * @returns {boolean}
	 * True if Value is an ErrorValue object, otherwise false.
	 * @summary Tests if a Value is an ErrorValue object.
	 * @param {object} [Value]
	 * The value to test.
	*/
	//-end-jsdoc-----------------------------------------------------------


	function IsErrorValue( Value )
	{
		if ( Value !== undefined )
		{
			if ( ( Value.ok == false )
				&& ( typeof Value.error === 'string' ) )
			{
				return true;
			}
		}
		return false;
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		IsErrorValue: IsErrorValue,
	};
};


/***/ }),

/***/ "./src/000-Schema/020-Schema.ValueSchema.js":
/*!**************************************************!*\
  !*** ./src/000-Schema/020-Schema.ValueSchema.js ***!
  \**************************************************/
/***/ ((module) => {




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


/***/ }),

/***/ "./src/000-Schema/021-Schema.DefaultValue.js":
/*!***************************************************!*\
  !*** ./src/000-Schema/021-Schema.DefaultValue.js ***!
  \***************************************************/
/***/ ((module) => {




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


/***/ }),

/***/ "./src/000-Schema/022-Schema.CoerceValue.js":
/*!**************************************************!*\
  !*** ./src/000-Schema/022-Schema.CoerceValue.js ***!
  \**************************************************/
/***/ ((module) => {




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

If the "Schema.type" === "*", then no validation or coercion is performed and the Value is returned.
If the "Schema.type" === "function", then no validation or coercion is performed and the Value is returned.

If Value is "undefined" or "null", then the default value for "FieldSchema.type" will be returned.
This is done by calling "Schema.DefaultValue()" for the FieldSchema.

"Schema.ValueSchema()" is called the get the schema for Value, which is then compared against the expected Schema.

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

This function uses the Schema to coerce the Value to a particular data type.

If the "Schema.type" === "*", then no validation or coercion is performed and the Value is returned.
If the "Schema.type" === "function", then no validation or coercion is performed and the Value is returned.

If Value is "undefined" or "null", then the default value for "FieldSchema.type" will be returned.
This is done by calling "Schema.DefaultValue()" for the FieldSchema.

"Schema.ValueSchema()" is called the get the schema for Value, which is then compared against the expected Schema.

	
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

		// If the schema allows any type, simply return the Value.
		if ( Schema.type === '*' ) { return Value; }

		// If the schema type is 'function', simply return the Value.
		if ( Schema.type === 'function' ) { return Value; }

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
						// return JSON.parse( JSON.stringify( Value ) );
						return Value;

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


/***/ }),

/***/ "./src/000-Schema/023-Schema.ValidateValue.js":
/*!****************************************************!*\
  !*** ./src/000-Schema/023-Schema.ValidateValue.js ***!
  \****************************************************/
/***/ ((module) => {




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


/***/ }),

/***/ "./src/000-Schema/030-Schema.ObjectSchema.js":
/*!***************************************************!*\
  !*** ./src/000-Schema/030-Schema.ObjectSchema.js ***!
  \***************************************************/
/***/ ((module) => {




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


/***/ }),

/***/ "./src/000-Schema/031-Schema.ValidateValues.js":
/*!*****************************************************!*\
  !*** ./src/000-Schema/031-Schema.ValidateValues.js ***!
  \*****************************************************/
/***/ ((module) => {




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
	/**
	 * @public
	 * @function ValidateValues
	 * @returns {object}
	 * An object containing the validation result.
	 * @summary Validate a set of values against an array of FieldSchema.
	 * @description
	 * 

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

	 * @param {object} Values
	 * The values to validate. This can be an array of values, or an object described by Schemas.
	 * @param {object} Schemas
	 * An array of FieldSchemas to validate the Values with. Can also be an object whose top-most fields are instances of FieldSchema.
	*/
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


/***/ }),

/***/ "./src/100-Object/100-Object.js":
/*!**************************************!*\
  !*** ./src/100-Object/100-Object.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {




//---------------------------------------------------------------------
let Schema = {
	id: '100',
	name: 'Object',
	type: 'namespace',
	summary: 'Functions for manipulating Javascript objects.',
};


//-start-jsdoc---------------------------------------------------------
/**
 * @public
 * @namespace Object
 * @summary Functions for manipulating Javascript objects.
*/
//-end-jsdoc-----------------------------------------------------------


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{
	return {
		_Schema: Schema,

		Clone: __webpack_require__( /*! ./101-Object.Clone.js */ "./src/100-Object/101-Object.Clone.js" )( Liquicode ).Clone,
		Merge: __webpack_require__( /*! ./103-Object.Merge.js */ "./src/100-Object/103-Object.Merge.js" )( Liquicode ).Merge,
		
		Traverse: __webpack_require__( /*! ./110-Object.Traverse.js */ "./src/100-Object/110-Object.Traverse.js" )( Liquicode ).Traverse,
		HasPath: __webpack_require__( /*! ./111-Object.HasPath.js */ "./src/100-Object/111-Object.HasPath.js" )( Liquicode ).HasPath,
		FindField: __webpack_require__( /*! ./112-Object.FindField.js */ "./src/100-Object/112-Object.FindField.js" )( Liquicode ).FindField,
		FindValue: __webpack_require__( /*! ./113-Object.FindValue.js */ "./src/100-Object/113-Object.FindValue.js" )( Liquicode ).FindValue,
		GetValue: __webpack_require__( /*! ./114-Object.GetValue.js */ "./src/100-Object/114-Object.GetValue.js" )( Liquicode ).GetValue,
		SetValue: __webpack_require__( /*! ./115-Object.SetValue.js */ "./src/100-Object/115-Object.SetValue.js" )( Liquicode ).SetValue,

		FromJson: __webpack_require__( /*! ./120-Object.FromJson.js */ "./src/100-Object/120-Object.FromJson.js" )( Liquicode ).FromJson,
		ToJsonOptions: __webpack_require__( /*! ./121-Object.ToJsonOptions.js */ "./src/100-Object/121-Object.ToJsonOptions.js" )( Liquicode ).ToJsonOptions,
		ToJson: __webpack_require__( /*! ./122-Object.ToJson.js */ "./src/100-Object/122-Object.ToJson.js" )( Liquicode ).ToJson,

		FromIni: __webpack_require__( /*! ./125-Object.FromIni.js */ "./src/100-Object/125-Object.FromIni.js" )( Liquicode ).FromIni,
		ToIni: __webpack_require__( /*! ./126-Object.ToIni.js */ "./src/100-Object/126-Object.ToIni.js" )( Liquicode ).ToIni,

	};
};


/***/ }),

/***/ "./src/100-Object/101-Object.Clone.js":
/*!********************************************!*\
  !*** ./src/100-Object/101-Object.Clone.js ***!
  \********************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '101',
	member_of: 'Object',
	name: 'Clone',
	type: 'function',
	returns: 'string',
	description: [
		'Returns a clone of the given object.',
		'This is equivalent to doing A = JSON.parse( JSON.stringify( B ) ).',
	],
	Parameters: {
		From: {
			name: 'From',
			type: 'object',
			// required: true,
			default: {},
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function Clone
	 * @returns {string}
	 * @description
	 * Returns a clone of the given object.
	 * This is equivalent to doing A = JSON.parse( JSON.stringify( B ) ).
	 * @param {object} [From={}]
	*/
	//-end-jsdoc-----------------------------------------------------------


	function Clone( From )
	{
		From = Liquicode.Schema.ValidateValue( From, _Schema.Parameters.From, { coerce_values: true, throw_errors: true } );
		return JSON.parse( JSON.stringify( From ) );
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		Clone: Clone,
	};
};


/***/ }),

/***/ "./src/100-Object/103-Object.Merge.js":
/*!********************************************!*\
  !*** ./src/100-Object/103-Object.Merge.js ***!
  \********************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '103',
	member_of: 'Object',
	name: 'Merge',
	type: 'function',
	returns: 'object',
	description: ``,
	Parameters: {
		Original: {
			name: 'Original',
			type: 'object',
			required: true,
		},
		Updates: {
			name: 'Updates',
			type: 'object',
			required: false,
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function Merge
	 * @returns {object}
	 * @param {object} Original
	 * @param {object} [Updates]
	*/
	//-end-jsdoc-----------------------------------------------------------


	function Merge( Original, Updates )
	{
		Original = Liquicode.Schema.ValidateValue( Original, _Schema.Parameters.Original, { coerce_values: true, throw_errors: true } );
		Updates = Liquicode.Schema.ValidateValue( Updates, _Schema.Parameters.Updates, { coerce_values: true, throw_errors: true } );

		let new_object = JSON.parse( JSON.stringify( Original ) );

		function update_children( ParentA, ParentB )
		{
			Object.keys( ParentB ).forEach(
				key =>
				{
					let value = ParentB[ key ];
					if ( ParentA[ key ] === undefined )
					{
						ParentA[ key ] = JSON.parse( JSON.stringify( value ) );
					}
					else
					{
						if ( typeof value === 'object' )
						{
							// Merge objects.
							if ( ( ParentA[ key ] === null ) && ( value === null ) )
							{
								// Do nothing.
							}
							else if ( ( ParentA[ key ] !== null ) && ( value === null ) )
							{
								ParentA[ key ] = null;
							}
							else if ( ( ParentA[ key ] === null ) && ( value !== null ) )
							{
								ParentA[ key ] = {};
								update_children( ParentA[ key ], value );
							}
							else if ( ( ParentA[ key ] !== null ) && ( value !== null ) )
							{
								update_children( ParentA[ key ], value );
							}
						}
						else
						{
							// Overwrite values.
							ParentA[ key ] = JSON.parse( JSON.stringify( value ) );
						}
					}
				} );
		}

		update_children( new_object, Updates );
		return new_object;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		Merge: Merge,
	};
};


/***/ }),

/***/ "./src/100-Object/110-Object.Traverse.js":
/*!***********************************************!*\
  !*** ./src/100-Object/110-Object.Traverse.js ***!
  \***********************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '110',
	member_of: 'Object',
	name: 'Traverse',
	type: 'function',
	returns: 'string',
	description: `

Traverses and calls a visitor callback function for each field in an object.
This functions recurses through sub-objects and traverses the entire object.

`,
	Parameters: {
		Root: {
			name: 'Root',
			type: 'object',
			required: true,
		},
		Visitor: {
			name: 'Visitor',
			type: 'function',
			required: true,
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function Traverse
	 * @returns {string}
	 * @description
	 * 

Traverses and calls a visitor callback function for each field in an object.
This functions recurses through sub-objects and traverses the entire object.


	 * @param {object} Root
	 * @param {function} Visitor
	*/
	//-end-jsdoc-----------------------------------------------------------


	function Traverse( Root, Visitor )
	{
		// Root = Root || {};
		Root = Liquicode.Schema.CoerceValue( Root, _Schema.Parameters.Root, true );
		// Visitor = Liquicode.Schema.CoerceValue( Visitor, _Schema.Parameters.Visitor, true );

		//---------------------------------------------------------------------
		function traverse_recurse( Visitor, Parent, Name, Value, Path, Depth )
		{
			let info =
			{
				parent: Parent,
				name: Name,
				value: Value,
				path: Path,
				depth: Depth,
			};
			let result = Visitor( info );
			if ( typeof result !== 'undefined' ) { return result; }

			if ( typeof Value === 'object' )
			{
				if ( Value === null ) { return; }
				if ( Array.isArray( Value ) )
				{
					for ( let index = 0; index < Value.length; index++ )
					{
						result = traverse_recurse( Visitor, Value, index, Value[ index ], Path + `[${index}]`, Depth + 1 );
						if ( typeof result !== 'undefined' ) { return result; }
					}
				}
				else
				{
					let keys = Object.keys( Value );
					for ( let index = 0; index < keys.length; index++ )
					{
						let key = keys[ index ];
						result = traverse_recurse( Visitor, Value, key, Value[ key ], Path + `.${key}`, Depth + 1 );
						if ( typeof result !== 'undefined' ) { return result; }
					}
				}
			}

			return;
		}

		//---------------------------------------------------------------------
		return traverse_recurse( Visitor, null, '$', Root, '$', 0 );
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		Traverse: Traverse,
	};
};


/***/ }),

/***/ "./src/100-Object/111-Object.HasPath.js":
/*!**********************************************!*\
  !*** ./src/100-Object/111-Object.HasPath.js ***!
  \**********************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '111',
	member_of: 'Object',
	name: 'HasPath',
	type: 'function',
	returns: 'boolean',
	description: ``,
	Parameters: {
		Root: {
			name: 'Root',
			type: 'object',
			required: true,
		},
		Path: {
			name: 'Path',
			type: 'string',
			required: true,
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function HasPath
	 * @returns {boolean}
	 * @param {object} Root
	 * @param {string} Path
	*/
	//-end-jsdoc-----------------------------------------------------------


	function HasPath( Root, Path )
	{
		Root = Liquicode.Schema.CoerceValue( Root, _Schema.Parameters.Root, true );
		Path = Liquicode.Schema.CoerceValue( Path, _Schema.Parameters.Path, true );

		let result = Liquicode.Object.Traverse( Root,
			function ( info )
			{
				if ( info.path === Path ) { return true; }
			} );

		return ( result === true );
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		HasPath: HasPath,
	};
};


/***/ }),

/***/ "./src/100-Object/112-Object.FindField.js":
/*!************************************************!*\
  !*** ./src/100-Object/112-Object.FindField.js ***!
  \************************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '112',
	member_of: 'Object',
	name: 'FindField',
	type: 'function',
	returns: 'string',
	description: ``,
	Parameters: {
		Root: {
			name: 'Root',
			type: 'object',
			required: true,
		},
		Name: {
			name: 'Name',
			type: 'string',
			required: true,
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function FindField
	 * @returns {string}
	 * @param {object} Root
	 * @param {string} Name
	*/
	//-end-jsdoc-----------------------------------------------------------


	function FindField( Root, Name )
	{
		Root = Liquicode.Schema.CoerceValue( Root, _Schema.Parameters.Root, true );
		Name = Liquicode.Schema.CoerceValue( Name, _Schema.Parameters.Name, true );

		let result = Liquicode.Object.Traverse( Root,
			function ( info )
			{
				if ( info.name === Name ) { return info.path; }
			} );

		return result;
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		FindField: FindField,
	};
};


/***/ }),

/***/ "./src/100-Object/113-Object.FindValue.js":
/*!************************************************!*\
  !*** ./src/100-Object/113-Object.FindValue.js ***!
  \************************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '113',
	member_of: 'Object',
	name: 'FindValue',
	type: 'function',
	returns: 'string',
	summary: 'Locate a value stored within an object.',
	description: ``,
	Parameters: {
		Root: {
			name: 'Root',
			type: 'object',
			required: true,
		},
		Value: {
			name: 'Value',
			type: '*',
			required: true,
			description: 'The value to search for. This must be primitive data type (boolean, number, or string).'
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function FindValue
	 * @returns {string}
	 * @summary Locate a value stored within an object.
	 * @param {object} Root
	 * @param {*} Value
	 * The value to search for. This must be primitive data type (boolean, number, or string).
	*/
	//-end-jsdoc-----------------------------------------------------------


	function FindValue( Root, Value )
	{
		Root = Liquicode.Schema.CoerceValue( Root, _Schema.Parameters.Root, true );
		Value = Liquicode.Schema.CoerceValue( Value, _Schema.Parameters.Value, true );

		let result = Liquicode.Object.Traverse( Root,
			function ( info )
			{
				if ( info.value === Value ) { return info.path; }
			} );

		return result;
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		FindValue: FindValue,
	};
};


/***/ }),

/***/ "./src/100-Object/114-Object.GetValue.js":
/*!***********************************************!*\
  !*** ./src/100-Object/114-Object.GetValue.js ***!
  \***********************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '114',
	member_of: 'Object',
	name: 'GetValue',
	type: 'function',
	returns: '*',
	description: ``,
	Parameters: {
		Root: {
			name: 'Root',
			type: 'object',
			required: true,
		},
		Path: {
			name: 'Path',
			type: 'string',
			required: true,
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function GetValue
	 * @returns {*}
	 * @param {object} Root
	 * @param {string} Path
	*/
	//-end-jsdoc-----------------------------------------------------------


	function GetValue( Root, Path )
	{
		Root = Liquicode.Schema.CoerceValue( Root, _Schema.Parameters.Root, true );
		Path = Liquicode.Schema.CoerceValue( Path, _Schema.Parameters.Path, true );

		let result = Liquicode.Object.Traverse( Root,
			function ( info )
			{
				if ( info.path === Path ) { return info.value; }
			} );

		return result;
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		GetValue: GetValue,
	};
};


/***/ }),

/***/ "./src/100-Object/115-Object.SetValue.js":
/*!***********************************************!*\
  !*** ./src/100-Object/115-Object.SetValue.js ***!
  \***********************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '115',
	member_of: 'Object',
	name: 'SetValue',
	type: 'function',
	returns: '*',
	description: ``,
	Parameters: {
		Root: {
			name: 'Root',
			type: 'object',
			required: true,
		},
		Path: {
			name: 'Path',
			type: 'string',
			required: true,
		},
		Value: {
			name: 'Value',
			type: '*',
			required: true,
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function SetValue
	 * @returns {*}
	 * @param {object} Root
	 * @param {string} Path
	 * @param {*} Value
	*/
	//-end-jsdoc-----------------------------------------------------------


	function SetValue( Root, Path, Value )
	{
		// Root = Root || {};
		Root = Liquicode.Schema.CoerceValue( Root, _Schema.Parameters.Root, true );
		Path = Liquicode.Schema.CoerceValue( Path, _Schema.Parameters.Path, true );
		// Value = Liquicode.Schema.CoerceValue( Value, _Schema.Parameters.Value, true );

		let result = Liquicode.Object.Traverse( Root,
			function ( info )
			{
				if ( info.path === Path ) 
				{
					info.parent[ info.name ] = Value;
					return Value;
				}
			} );

		return result;
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		SetValue: SetValue,
	};
};


/***/ }),

/***/ "./src/100-Object/120-Object.FromJson.js":
/*!***********************************************!*\
  !*** ./src/100-Object/120-Object.FromJson.js ***!
  \***********************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '120',
	member_of: 'Object',
	name: 'FromJson',
	type: 'function',
	returns: 'object',
	description: `
Parse a Json string and return an object value.
This is identical Javascript's "JSON.parse()" function.

There are some significant differences from Javascript's version.
The parser is a bit more relaxed and allows:
- Identifiers are not required to have quotes.
- A comma can appear after the last element of an array or object.
- String literals can use either single or double quotes.
- Parsing automatically stops when the closing brace or bracket is found in the json string.

`,
	Parameters: {
		JsonString: {
			name: 'JsonString',
			type: 'string',
			// required: true,
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function FromJson
	 * @returns {object}
	 * @description
	 * 
Parse a Json string and return an object value.
This is identical Javascript's "JSON.parse()" function.

There are some significant differences from Javascript's version.
The parser is a bit more relaxed and allows:
- Identifiers are not required to have quotes.
- A comma can appear after the last element of an array or object.
- String literals can use either single or double quotes.
- Parsing automatically stops when the closing brace or bracket is found in the json string.


	 * @param {string} [JsonString]
	*/
	//-end-jsdoc-----------------------------------------------------------


	function FromJson( JsonString )
	{
		JsonString = Liquicode.Schema.CoerceValue( JsonString, _Schema.Parameters.JsonString, true );

		let tokens = Tokenize( JsonString );
		return BuildObject( tokens );
	};


	//---------------------------------------------------------------------
	function Tokenize( Json )
	{
		let tokens = [];

		// Json = Json.replace( '\t', ' ' );
		// Json = Json.replace( '\n', ' ' );
		// while ( Json.includes( '  ' ) ) { Json = Json.replace( '  ', ' ' ); }

		let whitespace = ' \t\n';
		let delimiters = '[]{}:,';
		let quotes = `'"`;

		let ichar = 0;
		while ( ichar < Json.length )
		{
			let ch = Json.charAt( ichar );
			if ( whitespace.includes( ch ) )
			{
				ichar++;
			}
			else if ( delimiters.includes( ch ) )
			{
				tokens.push( {
					token: ch,
					type: 'delimiter',
					at: ichar,
				} );
				ichar++;
			}
			else if ( quotes.includes( ch ) )
			{
				let iat = ichar;
				ichar++;
				let s = '';
				while ( ichar < Json.length )
				{
					let ch2 = Json.charAt( ichar );
					if ( ch2 === ch )
					{
						ichar++;
						break;
					}
					if ( ch2 === '\\' )
					{
						ichar++;
						if ( ichar < Json.length )
						{
							ch2 = Json.charAt( ichar );
						}
						else
						{
							ch2 = '';
						}
					}
					s += ch2;
					ichar++;
				}
				tokens.push( {
					token: s,
					type: 'string',
					at: iat,
				} );
			}
			else
			{
				let iat = ichar;
				ichar++;
				let s = ch;
				while ( ichar < Json.length )
				{
					let ch2 = Json.charAt( ichar );
					if (
						whitespace.includes( ch2 )
						|| delimiters.includes( ch2 )
						|| quotes.includes( ch2 )
					)
					{
						break;
					}
					s += ch2;
					ichar++;
				}
				tokens.push( {
					token: s,
					type: 'literal',
					at: iat,
				} );
			}
		}

		return tokens;
	}


	//---------------------------------------------------------------------
	function BuildObject( Tokens )
	{
		while ( Tokens.length )
		{
			if ( Tokens[ 0 ].token === '[' )
			{
				Tokens.shift();
				let value = [];
				while ( Tokens[ 0 ].token !== ']' )
				{
					value.push( BuildObject( Tokens ) );
				}
				Tokens.shift();
				consume_comma( Tokens );
				return value;
			}
			else if ( Tokens[ 0 ].token === '{' )
			{
				Tokens.shift();
				let value = {};
				while ( Tokens[ 0 ].token !== '}' )
				{
					let key = Tokens.shift();
					let colon = Tokens.shift();
					if ( ( key.type !== 'literal' ) && ( key.type !== 'string' ) )
					{
						throw new Error( `At position [${key.at}]: Expected literal, found ${key.type} '${key.token}' instead.`, key );
					}
					if ( colon.token !== ':' )
					{
						throw new Error( `At position [${colon.at}]: Expected ':', found '${colon.token}' instead.`, colon );
					}
					value[ key.token ] = BuildObject( Tokens );
				}
				Tokens.shift();
				consume_comma( Tokens );
				return value;
			}
			else
			{
				let value = Tokens[ 0 ].token;
				if ( Tokens[ 0 ].type === 'literal' )
				{
					if ( value.toLowerCase() === 'null' )
					{
						value = null;
					}
					else if ( value.toLowerCase() === 'true' )
					{
						value = true;
					}
					else if ( value.toLowerCase() === 'false' )
					{
						value = false;
					}
					if ( !isNaN( parseFloat( value ) ) && isFinite( value ) )
					{
						value = parseFloat( value );
					}
				}
				Tokens.shift();
				consume_comma( Tokens );
				return value;
			}
		}
	}


	//---------------------------------------------------------------------
	function consume_comma( Tokens )
	{
		if ( !Tokens.length ) { return; }
		if ( Tokens[ 0 ].token === ',' ) 
		{
			Tokens.shift();
		}
		return;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		FromJson: FromJson,
	};
};


/***/ }),

/***/ "./src/100-Object/121-Object.ToJsonOptions.js":
/*!****************************************************!*\
  !*** ./src/100-Object/121-Object.ToJsonOptions.js ***!
  \****************************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '121',
	member_of: 'Object',
	name: 'ToJsonOptions',
	type: 'function',
	returns: 'object',
	description: `
`,
	Parameters: {
		PresetName: {
			name: 'PresetName',
			type: 'string',
			// required: true,
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function ToJsonOptions
	 * @returns {object}
	 * @description
	 * 

	 * @param {string} [PresetName]
	*/
	//-end-jsdoc-----------------------------------------------------------


	function ToJsonOptions( PresetName )
	{
		PresetName = Liquicode.Schema.CoerceValue( PresetName, _Schema.Parameters.PresetName, true );

		let options = {
			identifier_quote: `"`,
			literal_quote: `"`,
			always_quote_identifiers: true,	// Implemented?
			eol_char: '',
			tab_char: '',
			space_char: '',
			liberal_commas: false,
			align_values: false,
			//TODO: The following options have not been implemented:
			// extroverted_arrays: true,
			// extroverted_brackets: true,
			// extroverted_braces: true,
		};
		if ( !PresetName || PresetName === 'default' )
		{
			/* Do Nothing */
		}
		else if ( PresetName === 'pretty' )
		{
			options.identifier_quote = `"`;
			options.literal_quote = `"`;
			options.always_quote_identifiers = true;
			options.eol_char = '\n';
			options.tab_char = '    ';
			options.space_char = ' ';
		}
		else if ( PresetName === 'pretty-2' )
		{
			options.identifier_quote = `'`;
			options.literal_quote = `"`;
			options.always_quote_identifiers = false;
			options.eol_char = '\n';
			options.tab_char = '    ';
			options.space_char = ' ';
			options.liberal_commas = true;
			options.align_values = true;
			// options.extroverted_arrays = true;
			// options.extroverted_brackets = true;
			// options.extroverted_braces = true;
		}
		else
		{
			throw new Error( `The parameter [PresetName] has an invalid value of [${PresetName}]. Must be one of: 'default', 'pretty', or 'pretty-2'.` );
		}
		return options;
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		ToJsonOptions: ToJsonOptions,
	};
};


/***/ }),

/***/ "./src/100-Object/122-Object.ToJson.js":
/*!*********************************************!*\
  !*** ./src/100-Object/122-Object.ToJson.js ***!
  \*********************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '122',
	member_of: 'Object',
	name: 'ToJson',
	type: 'function',
	returns: 'object',
	description: `
`,
	Parameters: {
		Value: {
			name: 'Value',
			type: '*',
			description: `The value to convert to a json string.`,
		},
		JsonOptions: {
			name: 'JsonOptions',
			type: 'object|string',
			description: `Can be an options object or the name of an options preset ("default", "pretty", or "pretty-2")`,
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function ToJson
	 * @returns {object}
	 * @description
	 * 

	 * @param {*} [Value]
	 * The value to convert to a json string.
	 * @param {object|string} [JsonOptions]
	 * Can be an options object or the name of an options preset ("default", "pretty", or "pretty-2")
	*/
	//-end-jsdoc-----------------------------------------------------------


	function ToJson( Value, JsonOptions )
	{
		let options = Liquicode.Object.ToJsonOptions();
		if ( typeof JsonOptions === 'string' )
		{
			options = Liquicode.Object.ToJsonOptions( JsonOptions );
		}
		else if ( ( typeof JsonOptions === 'object' ) && Object.keys( JsonOptions ).length )
		{
			options = Liquicode.Object.Merge( options, JsonOptions );
		}

		return stringify_recurse( Value, 0, options );
	};


	//---------------------------------------------------------------------
	function stringify_recurse( Node, Depth, Options, Context = null )
	{
		let text = '';

		if ( typeof Node === 'undefined' )
		{
			// return '';
		}
		else if ( typeof Node === 'boolean' )
		{
			text += Node.toString();
		}
		else if ( typeof Node === 'number' )
		{
			text += Node.toString();
		}
		else if ( typeof Node === 'bigint' )
		{
			text += Node.toString();
		}
		else if ( typeof Node === 'string' )
		{
			let value = Node.toString();
			if ( Options.literal_quote )
			{
				value = value.replace( Options.literal_quote, '\\' + Options.literal_quote );
			}
			text += `${Options.literal_quote}${value}${Options.literal_quote}`;
		}
		else if ( typeof Node === 'symbol' )
		{
			// return '';
		}
		else if ( typeof Node === 'function' )
		{
			// return '';
		}
		else if ( typeof Node === 'object' )
		{
			if ( Node === null )
			{
				text += 'null';
			}
			else if ( Array.isArray( Node ) )
			{
				text += Options.eol_char;
				text += Options.tab_char.repeat( Depth );
				text += '[' + Options.space_char;
				text += Options.eol_char;
				for ( let index = 0; index < Node.length; index++ )
				{
					text += Options.tab_char.repeat( Depth + 1 );
					text += stringify_recurse( Node[ index ], Depth + 1, Options, 'array-element' );
					if ( ( index < ( Node.length - 1 ) ) || Options.liberal_commas )
					{
						text += ',' + Options.space_char;
					}
					text += Options.eol_char;
				}
				text += Options.tab_char.repeat( Depth );
				if ( !Options.eol_char ) { text += Options.space_char; }
				text += ']';
			}
			else
			{
				if ( Context === 'field-value' )
				{
					text += Options.eol_char;
					text += Options.tab_char.repeat( Depth );
				}
				text += '{' + Options.space_char;
				text += Options.eol_char;
				let keys = Object.keys( Node );
				let max_key_length = 0;
				keys.map( ( key ) => { if ( key.length > max_key_length ) { max_key_length = key.length; } } );
				for ( let index = 0; index < keys.length; index++ )
				{
					let key = keys[ index ];
					text += Options.tab_char.repeat( Depth + 1 );
					//TODO: Implement: Options.always_quote_identifiers = false
					text += `${Options.identifier_quote}${key}${Options.identifier_quote}`;
					text += ':';
					if ( Options.align_values )
					{
						text += ' '.repeat( max_key_length - key.length );
					}
					text += Options.space_char;
					text += stringify_recurse( Node[ key ], Depth + 1, Options, 'field-value' );
					if ( ( index < ( keys.length - 1 ) ) || Options.liberal_commas )
					{
						text += ',' + Options.space_char;
					}
					text += Options.eol_char;
				}
				text += Options.tab_char.repeat( Depth );
				if ( !Options.eol_char ) { text += Options.space_char; }
				text += '}';
			}
		}

		return text;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		ToJson: ToJson,
	};
};


/***/ }),

/***/ "./src/100-Object/125-Object.FromIni.js":
/*!**********************************************!*\
  !*** ./src/100-Object/125-Object.FromIni.js ***!
  \**********************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '125',
	member_of: 'Object',
	name: 'FromIni',
	type: 'function',
	returns: 'object',
	description: `
Parse an Ini string and return an object value.

`,
	Parameters: {
		IniString: {
			name: 'IniString',
			type: 'string',
			// required: true,
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function FromIni
	 * @returns {object}
	 * @description
	 * 
Parse an Ini string and return an object value.


	 * @param {string} [IniString]
	*/
	//-end-jsdoc-----------------------------------------------------------


	function FromIni( IniString )
	{
		IniString = Liquicode.Schema.CoerceValue( IniString, _Schema.Parameters.IniString, true );

		//NOTE: This function has the following side effects:
		//		- ignores all lines before the first section is found
		//		- ignores all entry lines which do not contain an '=' character
		//		- All entry values are stored as strings and no conversion is attempted
		let object_value = {};
		let lines = IniString.split( '\n' );
		let section_name = '';
		for ( let line_index = 0; line_index < lines.length; line_index++ )
		{
			let line = lines[ line_index ];
			if ( !line ) { continue; }
			line = line.trim();
			if ( line.startsWith( '[' ) )
			{
				// New Section
				let ich = line.indexOf( ']' );
				if ( ich < 0 ) { ich = line.length; }
				section_name = line.substring( 1, ich );
				section_name = section_name.trim();
				object_value[ section_name ] = {};
			}
			else if ( section_name )
			{
				// New Entry
				let ich = line.indexOf( '=' );
				if ( ich < 0 ) { continue; }
				let entry_name = line.substring( 0, ich );
				entry_name = entry_name.trim();
				let entry_value = line.substring( ich + 1 );
				entry_value = entry_value.trim();
				object_value[ section_name ][ entry_name ] = entry_value;
			}
		}
		return object_value;
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		FromIni: FromIni,
	};
};


/***/ }),

/***/ "./src/100-Object/126-Object.ToIni.js":
/*!********************************************!*\
  !*** ./src/100-Object/126-Object.ToIni.js ***!
  \********************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '126',
	member_of: 'Object',
	name: 'ToIni',
	type: 'function',
	returns: 'object',
	description: `
Parse an Ini string and return an object value.

`,
	Parameters: {
		Value: {
			name: 'Value',
			type: 'object',
			// required: true,
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function ToIni
	 * @returns {object}
	 * @description
	 * 
Parse an Ini string and return an object value.


	 * @param {object} [Value]
	*/
	//-end-jsdoc-----------------------------------------------------------


	function ToIni( Value )
	{
		// IniString = Liquicode.Schema.CoerceValue( IniString, _Schema.Parameters.IniString, true );

		//NOTE: This function has the following side effects:
		//		- ignores all sections that are not of type object
		//		- ignores all entry values that are not of a primitive type
		let ini_text = '';
		let section_keys = Object.keys( Value );
		for ( let section_index = 0; section_index < section_keys.length; section_index++ )
		{
			let section_key = section_keys[ section_index ];
			let section_data = Value[ section_key ];
			if ( !( typeof section_data === 'object' ) ) { continue; }
			if ( Array.isArray( section_data ) ) { continue; }
			ini_text += `[${section_key}]\n`;
			let entry_keys = Object.keys( section_data );
			for ( let entry_index = 0; entry_index < entry_keys.length; entry_index++ )
			{
				let entry_key = entry_keys[ entry_index ];
				let entry_value = section_data[ entry_key ];
				if (
					( typeof entry_value === 'symbol' )
					|| ( typeof entry_value === 'function' )
					|| ( typeof entry_value === 'object' )
				)
				{
					continue;
				}
				ini_text += `${entry_key}=${entry_value}\n`;
			}
		}
		return ini_text;
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		ToIni: ToIni,
	};
};


/***/ }),

/***/ "./src/200-Text/200-Text.js":
/*!**********************************!*\
  !*** ./src/200-Text/200-Text.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {




//---------------------------------------------------------------------
let Schema = {
	id: '200',
	name: 'Text',
	type: 'namespace',
	summary: 'Functions for text parsing and manipulation.',
};


//-start-jsdoc---------------------------------------------------------
/**
 * @public
 * @namespace Text
 * @summary Functions for text parsing and manipulation.
*/
//-end-jsdoc-----------------------------------------------------------


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{
	return {
		_Schema: Schema,
		// TextBuffer: require( './201-Text.TextBuffer.js' )( Liquicode ).TextBuffer,
		Compare: __webpack_require__( /*! ./202-Text.Compare.js */ "./src/200-Text/202-Text.Compare.js" )( Liquicode ).Compare,
		Matches: __webpack_require__( /*! ./203-Text.Matches.js */ "./src/200-Text/203-Text.Matches.js" )( Liquicode ).Matches,
		ReplaceCharacters: __webpack_require__( /*! ./210-Text.ReplaceCharacters.js */ "./src/200-Text/210-Text.ReplaceCharacters.js" )( Liquicode ).ReplaceCharacters,
		FirstWord: __webpack_require__( /*! ./220-Text.FirstWord.js */ "./src/200-Text/220-Text.FirstWord.js" )( Liquicode ).FirstWord,
		AfterFirstWord: __webpack_require__( /*! ./221-Text.AfterFirstWord.js */ "./src/200-Text/221-Text.AfterFirstWord.js" )( Liquicode ).AfterFirstWord,
		LastWord: __webpack_require__( /*! ./222-Text.LastWord.js */ "./src/200-Text/222-Text.LastWord.js" )( Liquicode ).LastWord,
		BeforeLastWord: __webpack_require__( /*! ./223-Text.BeforeLastWord.js */ "./src/200-Text/223-Text.BeforeLastWord.js" )( Liquicode ).BeforeLastWord,
	};
};



/***/ }),

/***/ "./src/200-Text/202-Text.Compare.js":
/*!******************************************!*\
  !*** ./src/200-Text/202-Text.Compare.js ***!
  \******************************************/
/***/ ((module) => {




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


/***/ }),

/***/ "./src/200-Text/203-Text.Matches.js":
/*!******************************************!*\
  !*** ./src/200-Text/203-Text.Matches.js ***!
  \******************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '203',
	member_of: 'Text',
	name: 'Matches',
	type: 'function',
	returns: 'string',
	description: [
		'Matches the text against a wildcard-lik pattern.',
		'Returns true If the match succeeds, otherwise false.',
	],
	Parameters: {
		Text: {
			name: 'Text',
			type: 'string',
			required: true,
			default: '',
		},
		Pattern: {
			name: 'Pattern',
			type: 'string',
			required: true,
			default: '',
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function Matches
	 * @returns {string}
	 * @description
	 * Matches the text against a wildcard-lik pattern.
	 * Returns true If the match succeeds, otherwise false.
	 * @param {string} Text
	 * @param {string} Pattern
	*/
	//-end-jsdoc-----------------------------------------------------------


	function Matches( Text, Pattern ) 
	{
		// Validate Parameters
		Text = Liquicode.Schema.ValidateValue( Text, _Schema.Parameters.Text , { coerce_values: true, throw_errors: true });
		Pattern = Liquicode.Schema.ValidateValue( Pattern, _Schema.Parameters.Pattern , { coerce_values: true, throw_errors: true });

		//FROM: https://stackoverflow.com/a/57527468
		let wildcard_exp = Pattern.replace( /[.+^${}()|[\]\\]/g, '\\$&' ); // regexp escape 
		let reg_exp = new RegExp( `^${wildcard_exp.replace( /\*/g, '.*' ).replace( /\?/g, '.' )}$`, 'i' );
		return reg_exp.test( Text ); // remove last 'i' above to have case sensitive
	}

	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		Matches: Matches,
	};
};


/***/ }),

/***/ "./src/200-Text/210-Text.ReplaceCharacters.js":
/*!****************************************************!*\
  !*** ./src/200-Text/210-Text.ReplaceCharacters.js ***!
  \****************************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '210',
	member_of: 'Text',
	name: 'ReplaceCharacters',
	type: 'function',
	returns: 'string',
	description: [
		'Replaces characters within a string.',
		'Returns the modified string.',
	],
	Parameters: {
		Text: {
			name: 'Text',
			type: 'string',
			required: true,
			default: '',
		},
		SearchCharacters: {
			name: 'SearchCharacters',
			type: 'string',
			required: true,
			default: '',
		},
		ReplacementText: {
			name: 'ReplacementText',
			type: 'string',
			required: true,
			default: '',
		},
		MaxTimes: {
			name: 'MaxTimes',
			type: 'number',
			format: 'integer',
			required: false,
			default: -1,
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function ReplaceCharacters
	 * @returns {string}
	 * @description
	 * Replaces characters within a string.
	 * Returns the modified string.
	 * @param {string} Text
	 * @param {string} SearchCharacters
	 * @param {string} ReplacementText
	 * @param {number} [MaxTimes=-1]
	*/
	//-end-jsdoc-----------------------------------------------------------


	function ReplaceCharacters( Text, SearchCharacters, ReplacementText, MaxTimes )
	{
		// Validate Parameters
		Text = Liquicode.Schema.ValidateValue( Text, _Schema.Parameters.Text , { coerce_values: true, throw_errors: true });
		SearchCharacters = Liquicode.Schema.ValidateValue( SearchCharacters, _Schema.Parameters.SearchCharacters, { coerce_values: true, throw_errors: true } );
		ReplacementText = Liquicode.Schema.ValidateValue( ReplacementText, _Schema.Parameters.ReplacementText , { coerce_values: true, throw_errors: true });
		MaxTimes = Liquicode.Schema.ValidateValue( MaxTimes, _Schema.Parameters.MaxTimes , { coerce_values: true, throw_errors: true });

		let new_text = '';
		let count = 0;
		for ( let index = 0; index < Text.length; index++ )
		{
			if ( ( MaxTimes > 0 ) && ( count >= MaxTimes ) ) 
			{
				new_text += Text.slice( index );
				break;
			}
			let char = Text[ index ];
			if ( SearchCharacters.indexOf( char ) >= 0 )
			{
				char = ReplacementText;
				count++;
			}
			new_text += char;
		}
		return new_text;
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		ReplaceCharacters: ReplaceCharacters,
	};
};


/***/ }),

/***/ "./src/200-Text/220-Text.FirstWord.js":
/*!********************************************!*\
  !*** ./src/200-Text/220-Text.FirstWord.js ***!
  \********************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '220',
	member_of: 'Text',
	name: 'FirstWord',
	type: 'function',
	returns: 'string',
	description: [
		'Returns the first word of a text phrase.',
	],
	Parameters: {
		Phrase: {
			name: 'Phrase',
			type: 'string',
			required: false,
			default: '',
			description: 'A text phrase containing words separated by delimiters.',
		},
		Delimiters: {
			name: 'Delimiters',
			type: 'string',
			required: false,
			default: ' ',
			description: 'A string of whitespace and punctuation characters that break the phrase into words.',
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function FirstWord
	 * @returns {string}
	 * @description
	 * Returns the first word of a text phrase.
	 * @param {string} [Phrase]
	 * A text phrase containing words separated by delimiters.
	 * @param {string} [Delimiters=" "]
	 * A string of whitespace and punctuation characters that break the phrase into words.
	*/
	//-end-jsdoc-----------------------------------------------------------


	function FirstWord( Phrase, Delimiters )
	{
		Phrase = Liquicode.Schema.ValidateValue( Phrase, _Schema.Parameters.Phrase , { coerce_values: true, throw_errors: true });
		Delimiters = Liquicode.Schema.ValidateValue( Delimiters, _Schema.Parameters.Delimiters, { coerce_values: true, throw_errors: true } );

		let word_start = -1;
		for ( let index = 0; index < Phrase.length; index++ )
		{
			let ch = Phrase.substr( index, 1 );
			if ( Delimiters.indexOf( ch ) >= 0 )
			{
				if ( word_start >= 0 )
				{
					return Phrase.substr( word_start, ( index - word_start ) );
				}
			}
			else
			{
				if ( word_start < 0 )
				{
					word_start = index;
				}
			}
		}
		if ( word_start < 0 ) { return ''; }
		return Phrase.substr( word_start );
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		FirstWord: FirstWord,
	};
};


/***/ }),

/***/ "./src/200-Text/221-Text.AfterFirstWord.js":
/*!*************************************************!*\
  !*** ./src/200-Text/221-Text.AfterFirstWord.js ***!
  \*************************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '221',
	member_of: 'Text',
	name: 'AfterFirstWord',
	type: 'function',
	returns: 'string',
	description: [
		'Returns the remainder of a text phrase occurring after the first word.',
	],
	Parameters: {
		Phrase: {
			name: 'Phrase',
			type: 'string',
			required: false,
			default: '',
			description: 'A text phrase containing words separated by delimiters.',
		},
		Delimiters: {
			name: 'Delimiters',
			type: 'string',
			required: false,
			default: ' ',
			description: 'A string of characters that break the phrase into words.',
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function AfterFirstWord
	 * @returns {string}
	 * @description
	 * Returns the remainder of a text phrase occurring after the first word.
	 * @param {string} [Phrase]
	 * A text phrase containing words separated by delimiters.
	 * @param {string} [Delimiters=" "]
	 * A string of characters that break the phrase into words.
	*/
	//-end-jsdoc-----------------------------------------------------------


	function AfterFirstWord( Phrase, Delimiters )
	{
		Phrase = Liquicode.Schema.ValidateValue( Phrase, _Schema.Parameters.Phrase , { coerce_values: true, throw_errors: true });
		Delimiters = Liquicode.Schema.ValidateValue( Delimiters, _Schema.Parameters.Delimiters , { coerce_values: true, throw_errors: true });

		for ( let index = 0; index < Phrase.length; index++ )
		{
			let ch = Phrase.substr( index, 1 );
			if ( Delimiters.indexOf( ch ) >= 0 )
			{
				while ( Delimiters.indexOf( ch ) >= 0 )
				{
					index++;
					if ( index >= Phrase.length ) { break; }
					ch = Phrase.substr( index, 1 );
				}
				return Phrase.substr( index );
			}
		}
		return '';
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		AfterFirstWord: AfterFirstWord,
	};
};


/***/ }),

/***/ "./src/200-Text/222-Text.LastWord.js":
/*!*******************************************!*\
  !*** ./src/200-Text/222-Text.LastWord.js ***!
  \*******************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '222',
	member_of: 'Text',
	name: 'LastWord',
	type: 'function',
	returns: 'string',
	description: [
		'Returns the last word of a text phrase.',
	],
	Parameters: {
		Phrase: {
			name: 'Phrase',
			type: 'string',
			required: false,
			default: '',
			description: 'A text phrase containing words separated by delimiters.',
		},
		Delimiters: {
			name: 'Delimiters',
			type: 'string',
			required: false,
			default: ' ',
			description: 'A string of characters that break the phrase into words.',
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function LastWord
	 * @returns {string}
	 * @description
	 * Returns the last word of a text phrase.
	 * @param {string} [Phrase]
	 * A text phrase containing words separated by delimiters.
	 * @param {string} [Delimiters=" "]
	 * A string of characters that break the phrase into words.
	*/
	//-end-jsdoc-----------------------------------------------------------


	function LastWord( Phrase, Delimiters )
	{
		Phrase = Liquicode.Schema.ValidateValue( Phrase, _Schema.Parameters.Phrase , { coerce_values: true, throw_errors: true });
		Delimiters = Liquicode.Schema.ValidateValue( Delimiters, _Schema.Parameters.Delimiters, { coerce_values: true, throw_errors: true } );

		let word_end = -1;
		for ( let index = Phrase.length - 1; index >= 0; index-- )
		{
			let ch = Phrase.substr( index, 1 );
			if ( Delimiters.indexOf( ch ) >= 0 )
			{
				if ( word_end > 0 )
				{
					return Phrase.substr( index + 1, ( word_end - index ) );
				}
			}
			else
			{
				if ( word_end < 0 )
				{
					word_end = index;
				}
			}
		}
		if ( word_end < 0 ) { return ''; }
		return Phrase.substr( 0, ( word_end - index ) );
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		LastWord: LastWord,
	};
};


/***/ }),

/***/ "./src/200-Text/223-Text.BeforeLastWord.js":
/*!*************************************************!*\
  !*** ./src/200-Text/223-Text.BeforeLastWord.js ***!
  \*************************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '223',
	member_of: 'Text',
	name: 'BeforeLastWord',
	type: 'function',
	returns: 'string',
	description: [
		'Returns the remainder of a text phrase occurring befiore the last word.',
	],
	Parameters: {
		Phrase: {
			name: 'Phrase',
			type: 'string',
			required: false,
			default: '',
			description: 'A text phrase containing words separated by delimiters.',
		},
		Delimiters: {
			name: 'Delimiters',
			type: 'string',
			required: false,
			default: ' ',
			description: 'A string of characters that break the phrase into words.',
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function BeforeLastWord
	 * @returns {string}
	 * @description
	 * Returns the remainder of a text phrase occurring befiore the last word.
	 * @param {string} [Phrase]
	 * A text phrase containing words separated by delimiters.
	 * @param {string} [Delimiters=" "]
	 * A string of characters that break the phrase into words.
	*/
	//-end-jsdoc-----------------------------------------------------------


	function BeforeLastWord( Phrase, Delimiters )
	{
		Phrase = Liquicode.Schema.ValidateValue( Phrase, _Schema.Parameters.Phrase , { coerce_values: true, throw_errors: true });
		Delimiters = Liquicode.Schema.ValidateValue( Delimiters, _Schema.Parameters.Delimiters , { coerce_values: true, throw_errors: true });

		for ( let index = Phrase.length - 1; index >= 0; index-- )
		{
			let ch = Phrase.substr( index, 1 );
			if ( Delimiters.indexOf( ch ) >= 0 )
			{
				return Phrase.substr( 0, index );
			}
		}
		return '';
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		BeforeLastWord: BeforeLastWord,
	};
};


/***/ }),

/***/ "./src/400-Date/400-Date.js":
/*!**********************************!*\
  !*** ./src/400-Date/400-Date.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {




//---------------------------------------------------------------------
let Schema = {
	id: '400',
	name: 'Date',
	type: 'namespace',
	summary: 'Functions for manipulating dates.',
};


//-start-jsdoc---------------------------------------------------------
/**
 * @public
 * @namespace Date
 * @summary Functions for manipulating dates.
*/
//-end-jsdoc-----------------------------------------------------------


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{
	return {
		_Schema: Schema,
		Parse: __webpack_require__( /*! ./401-Date.Parse.js */ "./src/400-Date/401-Date.Parse.js" )( Liquicode ).Parse,
		ZuluTimestamp: __webpack_require__( /*! ./410-Date.ZuluTimestamp.js */ "./src/400-Date/410-Date.ZuluTimestamp.js" )( Liquicode ).ZuluTimestamp,
	};
};


/***/ }),

/***/ "./src/400-Date/401-Date.Parse.js":
/*!****************************************!*\
  !*** ./src/400-Date/401-Date.Parse.js ***!
  \****************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '401',
	member_of: 'Date',
	name: 'Parse',
	type: 'function',
	returns: 'object',
	description: [
		'Converts a string to a date-time value.',
		'Returns a `date_time_parts` structure.'
	],
	Parameters: {
		Text: {
			name: 'Text',
			type: 'string',
			required: true,
		},
		TimeZoneOffset: {
			name: 'TimeZoneOffset',
			type: 'function',
			required: false,
			default: '+0000',
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function Parse
	 * @returns {object}
	 * @description
	 * Converts a string to a date-time value.
	 * Returns a `date_time_parts` structure.
	 * @param {string} Text
	 * @param {function} [TimeZoneOffset="+0000"]
	*/
	//-end-jsdoc-----------------------------------------------------------


	//---------------------------------------------------------------------
	function Parse( Text, TimeZoneOffset )
	{
		From = Liquicode.Schema.ValidateValue( From, _Schema.Parameters.From , { coerce_values: true, throw_errors: true });

		// Prepare and validate the date string.
		Text = Text.toLowerCase().trim();
		if ( !Text ) { return get_date_parts( null, TimeZoneOffset ); }

		// Validate AssumeTimeZone
		if ( !TimeZoneOffset ) { TimeZoneOffset = '+0000'; }
		if ( !TimeZoneOffset.startsWith( '+' ) && !TimeZoneOffset.startsWith( '-' ) )
		{
			throw new Error( `AssumeTimeZone must begin with a plus or minus sign.` );
		}
		let offset = TimeZoneOffset.substr( 1 );
		if ( ( offset.length !== 4 ) || isNaN( offset ) )
		{
			throw new Error( `AssumeTimeZone must have a four digit offset component.` );
		}

		let date = null;

		// Try some unusual cases of compressed timestamps.
		if ( !isNaN( Number( Text ) ) )
		{
			let s = Number( Text ).toString(); // Remove any noise.
			if ( s.length == 8 )
			{
				// 20180329 => 2018-03-29
				s = (
					s.substr( 0, 4 ) + '-' +
					s.substr( 4, 2 ) + '-' +
					s.substr( 6, 2 ) +
					' 00:00:00 ' + TimeZoneOffset
				);
			}
			else if ( s.length == 10 )
			{
				// 1465241631 => 1465241631000 => Date(1465241631000)
				s += '000'; // milliseconds
				s = Number( s );
			}
			else if ( s.length == 13 )
			{
				// 1465241631000 => Date(1465241631000)
				s = s; // milliseconds
				s = Number( s );
			}
			else if ( s.length == 14 )
			{
				// 20180329074753 => 2018-03-29 07:47:53
				s = (
					s.substr( 0, 4 ) + '-' +
					s.substr( 4, 2 ) + '-' +
					s.substr( 6, 2 ) + ' ' +
					s.substr( 8, 2 ) + ':' +
					s.substr( 10, 2 ) + ':' +
					s.substr( 12, 2 ) +
					' ' + TimeZoneOffset
				);
			}

			// Try the javascript date parsing.
			try { date = new Date( s ); }
			catch ( e ) { }
			if ( date ) { return get_date_parts( date, TimeZoneOffset ); }
		}

		// Test for ISO format: 2005-05-01T15:05:23.000Z
		if (
			( Text.length >= 24 )
			&& ( Text.substr( 4, 1 ) === '-' )
			&& ( Text.substr( 7, 1 ) === '-' )
			&& ( Text.substr( 10, 1 ) === 't' )
			&& ( Text.substr( 13, 1 ) === ':' )
			&& ( Text.substr( 16, 1 ) === ':' )
			&& ( Text.substr( 19, 1 ) === '.' )
			&& ( Text.substr( 23, 1 ) === 'z' )
		)
		{
			try { date = new Date( Text ); }
			catch ( e ) { }
			if ( date && !isNaN( date.getTime() ) )
			{ return get_date_parts( date, TimeZoneOffset ); }
			else { return get_date_parts( null, TimeZoneOffset ); }
		}

		// Test for ISO format (short): 2005-05-01T15:05:23Z
		if (
			( Text.length >= 20 )
			&& ( Text.substr( 4, 1 ) === '-' )
			&& ( Text.substr( 7, 1 ) === '-' )
			&& ( Text.substr( 10, 1 ) === 't' )
			&& ( Text.substr( 13, 1 ) === ':' )
			&& ( Text.substr( 16, 1 ) === ':' )
			&& ( Text.substr( 19, 1 ) === 'z' )
		)
		{
			try { date = new Date( Text ); }
			catch ( e ) { }
			if ( date && !isNaN( date.getTime() ) )
			{ return get_date_parts( date, TimeZoneOffset ); }
			else { return get_date_parts( null, TimeZoneOffset ); }
		}

		// We know its not a javascript supported format.
		// We have to do it the hard way.
		let tokens = tokenize_date( Text );
		let symbols = tokens2symbols( tokens );
		date = symbols2date( symbols, TimeZoneOffset );

		// Return the date.
		if ( date && !isNaN( date.getTime() ) )
		{ return get_date_parts( date, TimeZoneOffset ); }
		else { return get_date_parts( null, TimeZoneOffset ); }
	};


	//---------------------------------------------------------------------
	const REFS =
	{
		day_of_week: [ 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday' ],
		day_of_week_abbrev: [ 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun' ],
		months: [ 'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december' ],
		months_abbrev: [ 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec' ],
	};
	
	
	//---------------------------------------------------------------------
	function tokenize_date( text )
	{
		let tokens = [];
	
		// Split text into words.
		let words = text.split( ' ' );
	
		// Convert words to tokens.
		words.forEach(
			( word, word_index ) =>
			{
				// Remove punctuation
				if ( word.endsWith( ',' ) ) { word = word.substr( 0, word.length - 1 ); }
				if ( word.endsWith( '.' ) ) { word = word.substr( 0, word.length - 1 ); }
	
				// Split up date formats
				if ( word.includes( '/' ) )
				{
					let parts = word.split( '/' );
					parts.forEach( part => tokens.push( part ) );
				}
				else if ( word.includes( '-' ) )
				{
					if ( word.startsWith( '-' ) || word.startsWith( 'utc-' ) || word.startsWith( 'gmt-' ) )
					{
						// Treat as a time zone offset
						tokens.push( word );
					}
					else
					{
						// Treat as a date
						let parts = word.split( '-' );
						parts.forEach( part => tokens.push( part ) );
					}
				}
				else if ( word.includes( ',' ) )
				{
					let parts = word.split( ',' );
					parts.forEach( part => tokens.push( part ) );
				}
				else
				{
					tokens.push( word );
				}
			}
		);
	
		// Return tokens.
		return tokens;
	}
	
	
	//---------------------------------------------------------------------
	function tokens2symbols( tokens )
	{
		let symbols = [];
		tokens.forEach(
			( token, token_index ) =>
			{
	
				// Check for time zone.
				if ( token.startsWith( '+' ) || token.startsWith( 'utc+' ) || token.startsWith( 'gmt+' ) )
				{
					symbols.push( { type: 'zone', value: token } );
					return;
				}
				if ( token.startsWith( '-' ) || token.startsWith( 'utc-' ) || token.startsWith( 'gmt-' ) )
				{
					symbols.push( { type: 'zone', value: token } );
					return;
				}
	
				// Check for universal time format.
				if ( token.includes( ':' ) )
				{
					symbols.push( { type: 'time', value: token } );
					return;
				}
	
				// Check for month names.
				if ( REFS.months.includes( token ) )
				{
					let index = REFS.months.indexOf( token ) + 1;
					token = '' + index;
					if ( index < 10 ) { token = '0' + token; }
					symbols.push( { type: 'month', value: token } );
					return;
				}
				if ( REFS.months_abbrev.includes( token ) )
				{
					let index = REFS.months_abbrev.indexOf( token ) + 1;
					token = '' + index;
					if ( index < 10 ) { token = '0' + token; }
					symbols.push( { type: 'month', value: token } );
					return;
				}
	
				// Check for numeric
				if ( !isNaN( Number( token ) ) )
				{
					if ( token.length <= 2 )
					{
						if ( token.length === 1 ) { token = '0' + token; }
						symbols.push( { type: 'day-or-month', value: token } );
					}
					else if ( token.length === 4 )
					{
						symbols.push( { type: 'year', value: token } );
					}
					else
					{
						symbols.push( { type: 'number', value: token } );
					}
					return;
				}
				else
				{
					symbols.push( { type: 'text', value: token } );
					return;
				}
	
			}
		);
	
		// Return the symbols.
		return symbols;
	}
	
	
	//---------------------------------------------------------------------
	function symbols2date( symbols, AssumeTimeZone )
	{
		let fields =
		{
			year: null,
			month: null,
			day: null,
			time: null,
			zone: null,
		};
	
		// The first picks out the things we are pretty sure of.
		symbols.forEach(
			( symbol ) =>
			{
				if ( symbol.type === 'year' )
				{
					if ( fields.year ) { return; }
					fields.year = symbol.value;
				}
				else if ( symbol.type === 'month' )
				{
					if ( fields.month ) { return; }
					fields.month = symbol.value;
				}
				else if ( symbol.type === 'time' )
				{
					if ( fields.time ) { return; }
					fields.time = symbol.value;
				}
				else if ( symbol.type === 'zone' )
				{
					if ( fields.zone ) { return; }
					fields.zone = symbol.value;
				}
			}
		);
	
		// We go again to try to determine month and day.
		symbols.forEach(
			( symbol ) =>
			{
				if ( symbol.type === 'day-or-month' )
				{
					if ( fields.day && fields.month ) { return; }
					if ( fields.month )
					{
						fields.day = symbol.value;
					}
					else
					{
						fields.month = symbol.value;
					}
				}
			}
		);
	
		// Validate our date fields.
		if ( !fields.year ) { return null; }
		if ( !fields.month ) { return null; }
		if ( !fields.day ) { return null; }
		if ( !fields.time ) { fields.time = '00:00:00'; }
		if ( !fields.zone ) { fields.zone = AssumeTimeZone; }
	
		// Try to fix timezone offsets.
		if ( fields.zone )
		{
			let zone = fields.zone;
	
			// Find the offset and direction.
			let offset = '';
			let sign = '';
			let sign_index = -1;
			// - sign
			if ( zone.includes( '-' ) )
			{
				sign = '-';
				sign_index = zone.indexOf( '-' );
				offset = zone.substr( sign_index + 1 );
			}
			else if ( zone.includes( '+' ) )
			{
				sign = '+';
				sign_index = zone.indexOf( '+' );
				offset = zone.substr( sign_index + 1 );
			}
			else
			{
				sign = '+';
				offset = zone;
			}
			// - offset
			if ( offset.includes( ':' ) )
			{
				offset = offset.replace( ':', '' );
			}
			if ( offset.length > 4 ) { offset = offset.substr( 0, 4 ); } // e.g. +0500!@#
			if ( offset.length === 1 ) { offset = `0${offset}00`; } // e.g. -5
			else if ( offset.length === 2 ) { offset = `${offset}00`; } // e.g. -12
			else if ( offset.length === 3 ) { offset = `0${offset}`; } // e.g. -5:30
			// Reconstruct the zone.
			if ( offset.length === 4 )
			{
				fields.zone = `${sign}${offset}`;
			}
			else
			{
				fields.zone = AssumeTimeZone;
			}
		}
	
		// Convert what we have with javascript date parsing.
		let text = `${fields.year}-${fields.month}-${fields.day} ${fields.time} ${fields.zone}`;
		let date = null;
		try { date = new Date( text ); }
		catch ( e ) { }
		return date;
	}
	
	
		//---------------------------------------------------------------------
	function get_date_parts( JsDate, TimeZoneOffset = '+0000' )
	{
		let datetime_parts =
		{
			date: null,
			year: 0,
			month_num: 0,
			month_name: '',
			day_of_month: 0,
			day_of_week: 0,
			day_name: '',
			hours: 0,
			minutes: 0,
			seconds: 0,
			milliseconds: 0,
			timezone_offset: ''
		};
		if ( !JsDate ) { return datetime_parts; }
		if ( isNaN( JsDate.getTime() ) ) { return datetime_parts; }

		datetime_parts.date = new Date( JsDate.getTime() );
		datetime_parts.year = datetime_parts.date.getFullYear();
		datetime_parts.month_num = datetime_parts.date.getMonth();
		datetime_parts.month_name = REFS.months[ datetime_parts.month_num ];
		datetime_parts.day_of_month = datetime_parts.date.getDate();
		datetime_parts.day_of_week = datetime_parts.date.getDay();
		if ( datetime_parts.day_of_week === 0 ) { datetime_parts.day_of_week = 7; }
		datetime_parts.day_name = REFS.day_of_week[ datetime_parts.day_of_week - 1 ];
		datetime_parts.hours = datetime_parts.date.getHours();
		datetime_parts.minutes = datetime_parts.date.getMinutes();
		datetime_parts.seconds = datetime_parts.date.getSeconds();
		datetime_parts.milliseconds = datetime_parts.date.getMilliseconds();
		datetime_parts.timezone_offset = TimeZoneOffset;

		return datetime_parts;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		Parse: Parse,
	};
};


/***/ }),

/***/ "./src/400-Date/410-Date.ZuluTimestamp.js":
/*!************************************************!*\
  !*** ./src/400-Date/410-Date.ZuluTimestamp.js ***!
  \************************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let Schema = {
	id: '410',
	member_of: 'Date',
	name: 'ZuluTimestamp',
	type: 'function',
	returns: 'string',
	description: [
		'Returns the current date and time as a string.',
	],
	Parameters: {},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function ZuluTimestamp
	 * @returns {string}
	 * @description
	 * Returns the current date and time as a string.
	*/
	//-end-jsdoc-----------------------------------------------------------


	function ZuluTimestamp()
	{
		return ( new Date() ).toISOString();
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: Schema,
		ZuluTimestamp: ZuluTimestamp,
	};
};


/***/ }),

/***/ "./src/500-Token/500-Token.js":
/*!************************************!*\
  !*** ./src/500-Token/500-Token.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {




//---------------------------------------------------------------------
let Schema = {
	id: '500',
	name: 'Token',
	type: 'namespace',
	summary: 'Functions for tokenizing text strings.',
};


//-start-jsdoc---------------------------------------------------------
/**
 * @public
 * @namespace Token
 * @summary Functions for tokenizing text strings.
*/
//-end-jsdoc-----------------------------------------------------------


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{
	return {
		_Schema: Schema,
		TokenizeOptions: __webpack_require__( /*! ./501-Token.TokenizeOptions.js */ "./src/500-Token/501-Token.TokenizeOptions.js" )( Liquicode ).TokenizeOptions,
		Tokenize: __webpack_require__( /*! ./502-Token.Tokenize.js */ "./src/500-Token/502-Token.Tokenize.js" )( Liquicode ).Tokenize,
	};
};



/***/ }),

/***/ "./src/500-Token/501-Token.TokenizeOptions.js":
/*!****************************************************!*\
  !*** ./src/500-Token/501-Token.TokenizeOptions.js ***!
  \****************************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let Schema = {
	id: '501',
	member_of: 'Token',
	name: 'TokenizeOptions',
	type: 'function',
	returns: 'object',
	description: [
		'Returns a set of options for calling Tokenize().',
		'Throws an error if an invalid value for PresetName is given.',
	],
	Parameters: {
		Text: {
			name: 'PresetName',
			type: 'string',
			required: false,
			default: '',
			description: [
				`To retrieve an options preset, use one of: 'csv', or 'cli'`,
				`You can leave this empty or 'default' for the default options.`,
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
	 * @function TokenizeOptions
	 * @returns {object}
	 * @description
	 * Returns a set of options for calling Tokenize().
	 * Throws an error if an invalid value for PresetName is given.
	 * @param {string} [PresetName]
	 * To retrieve an options preset, use one of: 'csv', or 'cli'
	 * You can leave this empty or 'default' for the default options.
	*/
	//-end-jsdoc-----------------------------------------------------------


	function TokenizeOptions( PresetName )
	{
		let options = {
			whitespace: ` \t\r\n`,
			symbols: `.;,:<>+-*/^()[]{}=`,
			literal_delimiters: `'"`,
			literal_escape_chars: `\\`,
			self_escape_literal_delimiters: false,
			keywords: [],
			keywords_are_case_sensitive: false,
			discard_whitespace: false,
			resolve_literal_values: false,
			resolve_numeric_values: false,
		};
		if ( !PresetName || PresetName === 'default' )
		{
			/* Do Nothing */
		}
		else if ( PresetName === 'csv' )
		{
			options.symbols = `,`; // Comma seperated values.
			options.literal_delimiters = `"`; // Use double quotes around values.
			options.literal_escape_chars = `\\`; // Allow an escape character.
			options.self_escape_literal_delimiters = true; // Allow self-delimiting double quotes.
			options.resolve_literal_values = true;
		}
		else if ( PresetName === 'cli' )
		{
			options.whitespace = ` \t\r\n`;
			options.symbols = `-:=`;
			options.literal_delimiters = `'"`;
			options.literal_escape_chars = `\\`;
			options.keywords = [];
			options.discard_whitespace = true;
			options.resolve_literal_values = true;
			options.resolve_numeric_values = true;
		}
		else
		{
			throw new Error( `The parameter [PresetName] has an invalid value of [${PresetName}]. Must be one of: 'default', 'csv', or 'cli'.` );
		}
		return options;
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: Schema,
		TokenizeOptions: TokenizeOptions,
	};
};


/***/ }),

/***/ "./src/500-Token/502-Token.Tokenize.js":
/*!*********************************************!*\
  !*** ./src/500-Token/502-Token.Tokenize.js ***!
  \*********************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let Schema = {
	id: '502',
	member_of: 'Token',
	name: 'Tokenize',
	type: 'function',
	returns: 'object',
	description: [
		'Returns the parsed tokens.',
	],
	Parameters: {
		Text: {
			name: 'PresetName',
			type: 'string',
			required: false,
			default: '',
			description: [
				`To retrieve an options preset, use one of: 'csv', or 'cli'`,
				`You can leave this empty for the default options.`,
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
	 * @function Tokenize
	 * @returns {object}
	 * @description
	 * Returns the parsed tokens.
	 * @param {string} [PresetName]
	 * To retrieve an options preset, use one of: 'csv', or 'cli'
	 * You can leave this empty for the default options.
	*/
	//-end-jsdoc-----------------------------------------------------------


	function Tokenize( Text, Options )
	{
		// Get the options.
		let tokenize_options = Liquicode.Token.TokenizeOptions();
		tokenize_options = Liquicode.Object.Merge( tokenize_options, Options );

		// Tokenize the text.
		let tokens = [];
		if ( !Text ) { return tokens; }

		let ichar = 0;
		let len = Text.length;
		while ( true )
		{
			// Exit loop when reached end of text string.
			if ( ichar === len ) { break; }

			// Parse the next token.
			let token = read_whitespace( tokenize_options, Text, ichar );
			if ( !token ) { token = read_symbol( tokenize_options, Text, ichar ); }
			if ( !token ) { token = read_literal( tokenize_options, Text, ichar ); }
			if ( !token ) { token = read_numeric( tokenize_options, Text, ichar ); }
			if ( !token ) { token = read_identifier( tokenize_options, Text, ichar ); }
			if ( !token ) { throw new Error( `Unable to continue parsing at location ${ichar}.` ); }
			ichar += token.token.length;

			// Collect tokens.
			if (
				token
				&& ( token.type === TokenTypes.whitespace )
				&& tokenize_options.discard_whitespace
			) { continue; }
			tokens.push( token );
		}

		// Do required value conversions.
		convert_values( tokenize_options, tokens );

		// Return the tokens.
		return tokens;
	};


	//---------------------------------------------------------------------
	const TokenTypes =
	{
		whitespace: 'whitespace',
		symbol: 'symbol',
		delimiter: 'delimiter',
		literal: 'literal',
		identifier: 'identifier',
		numeric: 'numeric',
		keyword: 'keyword',
	};


	//---------------------------------------------------------------------
	function read_whitespace( Options, Text, StartAt )
	{
		let ichar = StartAt;
		let len = Text.length;
		while ( Options.whitespace.includes( Text.charAt( ichar ) ) ) 
		{
			ichar++;
			if ( ichar === len ) { break; }
		}
		if ( ichar === StartAt ) { return null; }
		let token = {
			type: TokenTypes.whitespace,
			token: Text.substring( StartAt, ichar ),
			at: StartAt
		};
		return token;
	}


	//---------------------------------------------------------------------
	function read_symbol( Options, Text, StartAt )
	{
		if ( !Options.symbols.includes( Text.charAt( StartAt ) ) ) { return null; }
		let token = {
			type: TokenTypes.symbol,
			token: Text.charAt( StartAt ),
			at: StartAt
		};
		return token;
	}


	//---------------------------------------------------------------------
	function read_numeric( Options, Text, StartAt )
	{
		let ichar = StartAt;
		let len = Text.length;
		while ( true ) 
		{
			let ch = Text.charAt( ichar );
			if (
				( ( ch >= '0' ) && ( ch <= '9' ) )
				|| ( ch === '.' ) )
			{ ichar++; }
			else
			{ break; }
			if ( ichar === len ) { break; }
		}
		if ( ichar === StartAt ) { return null; }
		let token = {
			type: TokenTypes.numeric,
			token: Text.substring( StartAt, ichar ),
			at: StartAt
		};
		return token;
	}


	//---------------------------------------------------------------------
	function read_literal( Options, Text, StartAt )
	{
		if ( !Options.literal_delimiters.includes( Text.charAt( StartAt ) ) ) { return null; }
		let start_char = Text.charAt( StartAt );
		let ichar = StartAt + 1;
		let len = Text.length;
		while ( true ) 
		{
			if ( ichar >= len ) { break; }
			let ch = Text.charAt( ichar );
			// Check for self escaping delimiters (e.g. "Hello ""World""!").
			if ( Options.self_escape_literal_delimiters
				&& Options.literal_delimiters.includes( ch )
				&& ( ( ichar + 1 ) < len )
				&& ( ch === Text.charAt( ichar + 1 ) )
			) 
			{
				ichar++; // Take the first instance of the character.
				ichar++; // Take the second instance of the character.
				continue;
			}
			// Check for an escape character.
			if ( Options.literal_escape_chars.includes( ch ) )
			{
				ichar++; // Take the escape character.
				ichar++; // Take the escaped character.
				continue;
			}
			// Check if we found the closing delimiter for this literal.
			if ( ch === start_char )
			{
				// Found the end of the literal.
				ichar++; // Take the closing delimiter.
				break;
			}
			// Check for the end of the given string.
			ichar++;
			if ( ichar >= len ) { break; }
		}
		if ( ichar === StartAt ) { return null; }
		let token = {
			type: TokenTypes.literal,
			token: Text.substring( StartAt, ichar ),
			at: StartAt
		};
		return token;
	}


	//---------------------------------------------------------------------
	function read_identifier( Options, Text, StartAt )
	{
		let ichar = StartAt;
		let len = Text.length;
		while ( true )
		{
			let ch = Text.charAt( ichar );
			if ( Options.whitespace.includes( ch ) ) { break; }
			if ( Options.symbols.includes( ch ) ) { break; }
			if ( Options.literal_delimiters.includes( ch ) ) { break; }
			ichar++;
			if ( ichar === len ) { break; }
		}
		if ( ichar === StartAt ) { return null; }
		let token = {
			type: TokenTypes.identifier,
			token: Text.substring( StartAt, ichar ),
			at: StartAt
		};

		// Detect keywords.
		let is_keyword = false;
		if ( Options.keywords_are_case_sensitive )
		{
			is_keyword = Options.keywords.find(
				keyword => ( keyword === token.token )
			);
		}
		else
		{
			is_keyword = Options.keywords.find(
				keyword => ( keyword.toLowerCase() === token.token.toLowerCase() )
			);
		}
		if ( is_keyword )
		{
			token.type = TokenTypes.keyword;
		}

		// Return the token.
		return token;
	}


	//---------------------------------------------------------------------
	function convert_values( Options, Tokens )
	{
		Tokens.forEach(
			( token ) =>
			{
				if ( token.type === TokenTypes.numeric )
				{
					if ( Options.resolve_numeric_values )
					{
						if ( token.token.indexOf( '.' ) >= 0 )
						{
							// Convert to float value.
							token.token = parseFloat( token.token );
						}
						else
						{
							// Convert to integer value.
							token.token = parseInt( token.token );
						}
					}
				}
				else if ( token.type === TokenTypes.literal )
				{
					if ( Options.resolve_literal_values )
					{
						// Remove the surrounding quote characters.
						token.token = token.token.substr( 1, token.token.length - 2 );
					}
				}
				return;
			} );
		return;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: Schema,
		Tokenize: Tokenize,
	};
};


/***/ }),

/***/ "./src/800-File/800-File.js":
/*!**********************************!*\
  !*** ./src/800-File/800-File.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {




//---------------------------------------------------------------------
let Schema = {
	id: '800',
	name: 'File',
	type: 'namespace',
	summary: 'Functions for manipulating files. (nodejs only)',
};


//-start-jsdoc---------------------------------------------------------
/**
 * @public
 * @namespace File
 * @summary Functions for manipulating files. (nodejs only)
*/
//-end-jsdoc-----------------------------------------------------------


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{
	return {
		_Schema: Schema,
		Visit: __webpack_require__( /*! ./810-File.Visit.js */ "./src/800-File/810-File.Visit.js" )( Liquicode ).Visit,
		CountFiles: __webpack_require__( /*! ./811-File.CountFiles.js */ "./src/800-File/811-File.CountFiles.js" )( Liquicode ).CountFiles,
		CountFolders: __webpack_require__( /*! ./812-File.CountFolders.js */ "./src/800-File/812-File.CountFolders.js" )( Liquicode ).CountFolders,
		CopyFolder: __webpack_require__( /*! ./813-File.CopyFolder.js */ "./src/800-File/813-File.CopyFolder.js" )( Liquicode ).CopyFolder,
		DeleteFolder: __webpack_require__( /*! ./814-File.DeleteFolder.js */ "./src/800-File/814-File.DeleteFolder.js" )( Liquicode ).DeleteFolder,
	};
};


/***/ }),

/***/ "./src/800-File/810-File.Visit.js":
/*!****************************************!*\
  !*** ./src/800-File/810-File.Visit.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '810',
	member_of: 'File',
	name: 'Visit',
	type: 'function',
	returns: 'number',
	description: [
		'Scans a folder and calls the Visitor callback function for each folder/file encountered.',
		'Returns the number of folders/files visited.',
	],
	Parameters: {
		StartFolder: {
			name: 'StartFolder',
			type: 'string',
			required: true,
		},
		FilePattern: {
			name: 'FilePattern',
			type: 'string',
			required: false,
			default: '',
		},
		Recurse: {
			name: 'Recurse',
			type: 'boolean',
			required: false,
			default: false,
		},
		Visitor: {
			name: 'Visitor',
			type: 'function',
			required: false,
			default: null,
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function Visit
	 * @returns {number}
	 * @description
	 * Scans a folder and calls the Visitor callback function for each folder/file encountered.
	 * Returns the number of folders/files visited.
	 * @param {string} StartFolder
	 * @param {string} [FilePattern]
	 * @param {boolean} [Recurse]
	 * @param {function} [Visitor]
	*/
	//-end-jsdoc-----------------------------------------------------------


	const LIB_FS = __webpack_require__( /*! fs */ "fs" );
	const LIB_PATH = __webpack_require__( /*! path */ "path" );


	function Visit( StartFolder, FilePattern, Recurse, Visitor ) 
	{
		StartFolder = Liquicode.Schema.ValidateValue( StartFolder, _Schema.Parameters.StartFolder, { coerce_values: true, throw_errors: true } );
		FilePattern = Liquicode.Schema.ValidateValue( FilePattern, _Schema.Parameters.FilePattern, { coerce_values: true, throw_errors: true } );
		Recurse = Liquicode.Schema.ValidateValue( Recurse, _Schema.Parameters.Recurse, { coerce_values: true, throw_errors: true } );
		// Visitor = Liquicode.Schema.ValidateValue( Visitor, Schema.Parameters.Visitor , { coerce_values: true, throw_errors: true });

		if ( !LIB_FS.existsSync( StartFolder ) ) { return; }
		let count = 0;
		let elements = LIB_FS.readdirSync( StartFolder );
		for ( let element_index = 0; element_index < elements.length; element_index++ )
		{
			let element = elements[ element_index ];
			let from_path = LIB_PATH.join( StartFolder, element );
			if ( LIB_FS.lstatSync( from_path ).isFile() )
			{
				if ( FilePattern ) 
				{
					if ( Liquicode.Text.Matches( element, FilePattern ) )
					{
						if ( Visitor ) { Visitor( StartFolder, element ); }
						count++;
					}
				}
				else
				{
					if ( Visitor ) { Visitor( StartFolder, element ); }
					count++;
				}
			}
			else if ( LIB_FS.lstatSync( from_path ).isDirectory() )
			{
				if ( !FilePattern ) 
				{
					if ( Visitor ) { Visitor( from_path, null ); }
					count++;
				}
				if ( Recurse )
				{
					count += Visit( from_path, FilePattern, Recurse, Visitor );
				}
			}
		}
		return count;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		Visit: Visit,
	};
};


/***/ }),

/***/ "./src/800-File/811-File.CountFiles.js":
/*!*********************************************!*\
  !*** ./src/800-File/811-File.CountFiles.js ***!
  \*********************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '811',
	member_of: 'File',
	name: 'CountFiles',
	type: 'function',
	returns: 'number',
	description: [
		'Scans a folder and calls the Visitor callback function for each folder/file encountered.',
		'Returns the number of folders/files visited.',
	],
	Parameters: {
		StartFolder: {
			name: 'StartFolder',
			type: 'string',
			required: true,
		},
		FilePattern: {
			name: 'FilePattern',
			type: 'string',
			required: false,
			default: '*',
		},
		Recurse: {
			name: 'Recurse',
			type: 'boolean',
			required: false,
			default: false,
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function CountFiles
	 * @returns {number}
	 * @description
	 * Scans a folder and calls the Visitor callback function for each folder/file encountered.
	 * Returns the number of folders/files visited.
	 * @param {string} StartFolder
	 * @param {string} [FilePattern="*"]
	 * @param {boolean} [Recurse]
	*/
	//-end-jsdoc-----------------------------------------------------------


	function CountFiles( StartFolder, FilePattern, Recurse ) 
	{
		StartFolder = Liquicode.Schema.ValidateValue( StartFolder, _Schema.Parameters.StartFolder , { coerce_values: true, throw_errors: true });
		FilePattern = Liquicode.Schema.ValidateValue( FilePattern, _Schema.Parameters.FilePattern, { coerce_values: true, throw_errors: true } );
		Recurse = Liquicode.Schema.ValidateValue( Recurse, _Schema.Parameters.Recurse , { coerce_values: true, throw_errors: true });

		let count = Liquicode.File.Visit( StartFolder, FilePattern, Recurse );
		return count;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		CountFiles: CountFiles,
	};
};


/***/ }),

/***/ "./src/800-File/812-File.CountFolders.js":
/*!***********************************************!*\
  !*** ./src/800-File/812-File.CountFolders.js ***!
  \***********************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '812',
	member_of: 'File',
	name: 'CountFolders',
	type: 'function',
	returns: 'number',
	description: [
		'Scans a folder and calls the Visitor callback function for each folder/file encountered.',
		'Returns the number of folders/files visited.',
	],
	Parameters: {
		StartFolder: {
			name: 'StartFolder',
			type: 'string',
			required: true,
		},
		Recurse: {
			name: 'Recurse',
			type: 'boolean',
			required: false,
			default: false,
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function CountFolders
	 * @returns {number}
	 * @description
	 * Scans a folder and calls the Visitor callback function for each folder/file encountered.
	 * Returns the number of folders/files visited.
	 * @param {string} StartFolder
	 * @param {boolean} [Recurse]
	*/
	//-end-jsdoc-----------------------------------------------------------


	function CountFolders( StartFolder, Recurse ) 
	{
		StartFolder = Liquicode.Schema.ValidateValue( StartFolder, _Schema.Parameters.StartFolder, { coerce_values: true, throw_errors: true } );
		Recurse = Liquicode.Schema.ValidateValue( Recurse, _Schema.Parameters.Recurse , { coerce_values: true, throw_errors: true });

		let folder_count = 0;
		Liquicode.File.Visit( StartFolder, '', Recurse,
			function ( Folder, Filename )
			{
				if ( Folder && !Filename )
				{
					folder_count++;
				}
			} );
		return folder_count;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		CountFolders: CountFolders,
	};
};


/***/ }),

/***/ "./src/800-File/813-File.CopyFolder.js":
/*!*********************************************!*\
  !*** ./src/800-File/813-File.CopyFolder.js ***!
  \*********************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '813',
	member_of: 'File',
	name: 'CopyFolder',
	type: 'function',
	returns: 'number',
	description: [
		'Copies files from one folder to another.',
		'Returns the number of files copied.',
	],
	Parameters: {
		FromFolder: {
			name: 'FromFolder',
			type: 'string',
			required: true,
		},
		ToFolder: {
			name: 'ToFolder',
			type: 'string',
			required: true,
		},
		FilePattern: {
			name: 'FilePattern',
			type: 'string',
			required: false,
			default: '*',
		},
		Overwrite: {
			name: 'Overwrite',
			type: 'boolean',
			required: false,
			default: false,
		},
		Recurse: {
			name: 'Recurse',
			type: 'boolean',
			required: false,
			default: false,
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function CopyFolder
	 * @returns {number}
	 * @description
	 * Copies files from one folder to another.
	 * Returns the number of files copied.
	 * @param {string} FromFolder
	 * @param {string} ToFolder
	 * @param {string} [FilePattern="*"]
	 * @param {boolean} [Overwrite]
	 * @param {boolean} [Recurse]
	*/
	//-end-jsdoc-----------------------------------------------------------


	function CopyFolder( FromFolder, ToFolder, FilePattern, Overwrite, Recurse ) 
	{
		FromFolder = Liquicode.Schema.ValidateValue( FromFolder, _Schema.Parameters.FromFolder, { coerce_values: true, throw_errors: true } );
		ToFolder = Liquicode.Schema.ValidateValue( ToFolder, _Schema.Parameters.ToFolder, { coerce_values: true, throw_errors: true } );
		FilePattern = Liquicode.Schema.ValidateValue( FilePattern, _Schema.Parameters.FilePattern, { coerce_values: true, throw_errors: true } );
		Overwrite = Liquicode.Schema.ValidateValue( Overwrite, _Schema.Parameters.Overwrite , { coerce_values: true, throw_errors: true });
		Recurse = Liquicode.Schema.ValidateValue( Recurse, _Schema.Parameters.Recurse , { coerce_values: true, throw_errors: true });

		if ( !LIB_FS.existsSync( FromFolder ) ) { return 0; }
		LIB_FS.mkdirSync( ToFolder, { recursive: true } );
		let count = 0;
		let elements = LIB_FS.readdirSync( FromFolder );
		for ( let element_index = 0; element_index < elements.length; element_index++ )
		{
			let element = elements[ element_index ];
			let from_path = LIB_PATH.join( FromFolder, element );
			let to_path = LIB_PATH.join( ToFolder, element );
			if ( LIB_FS.lstatSync( from_path ).isFile() )
			{
				if ( !LIB_FS.existsSync( to_path ) || Overwrite ) 
				{
					LIB_FS.copyFileSync( from_path, to_path );
					count++;
				}
			}
			else if ( Recurse && LIB_FS.lstatSync( from_path ).isDirectory() )
			{
				count += CopyFolder( from_path, to_path, Overwrite, Recurse );
			}
		}
		return count;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		CopyFolder: CopyFolder,
	};
};


/***/ }),

/***/ "./src/800-File/814-File.DeleteFolder.js":
/*!***********************************************!*\
  !*** ./src/800-File/814-File.DeleteFolder.js ***!
  \***********************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '814',
	member_of: 'File',
	name: 'DeleteFolder',
	type: 'function',
	returns: 'number',
	description: [
		'Deletes a folder and all of its sub-folders and files.',
		'Returns the number of folders and files deleted.',
	],
	Parameters: {
		Folder: {
			name: 'Folder',
			type: 'string',
			required: true,
		},
		// FilePattern: {
		// 	name: 'FilePattern',
		// 	type: 'string',
		// 	required: false,
		// 	default: '',
		// },
		Recurse: {
			name: 'Recurse',
			type: 'boolean',
			required: false,
			default: false,
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function DeleteFolder
	 * @returns {number}
	 * @description
	 * Deletes a folder and all of its sub-folders and files.
	 * Returns the number of folders and files deleted.
	 * @param {string} Folder
	 * @param {boolean} [Recurse]
	*/
	//-end-jsdoc-----------------------------------------------------------


	function DeleteFolder( Folder, Recurse ) 
	{
		Folder = Liquicode.Schema.ValidateValue( Folder, _Schema.Parameters.Folder, { coerce_values: true, throw_errors: true } );
		FilePattern = Liquicode.Schema.ValidateValue( FilePattern, _Schema.Parameters.FilePattern, { coerce_values: true, throw_errors: true } );
		Recurse = Liquicode.Schema.ValidateValue( Recurse, _Schema.Parameters.Recurse , { coerce_values: true, throw_errors: true });

		if ( !LIB_FS.existsSync( Folder ) ) { return 0; }
		let count = 0;
		let elements = LIB_FS.readdirSync( Folder );
		for ( let element_index = 0; element_index < elements.length; element_index++ )
		{
			let element = elements[ element_index ];
			let from_path = LIB_PATH.join( Folder, element );
			if ( LIB_FS.lstatSync( from_path ).isFile() )
			{
				LIB_FS.unlinkSync( from_path );
				count++;
			}
			else if ( Recurse && LIB_FS.lstatSync( from_path ).isDirectory() )
			{
				count += DeleteFolder( from_path, Recurse );
			}
		}
		// Delete this folder.
		if ( Recurse )
		{
			let elements = LIB_FS.readdirSync( Folder );
			if ( !elements.length ) { LIB_FS.rmdirSync( Folder ); }
		}
		return count;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		DeleteFolder: DeleteFolder,
	};
};


/***/ }),

/***/ "./src/900-Net/900-Net.js":
/*!********************************!*\
  !*** ./src/900-Net/900-Net.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {






//---------------------------------------------------------------------
let _Schema = {
	id: '900',
	name: 'Net',
	type: 'namespace',
	summary: 'Functions for working with networks. (nodejs only)',
};


//-start-jsdoc---------------------------------------------------------
/**
 * @public
 * @namespace Net
 * @summary Functions for working with networks. (nodejs only)
*/
//-end-jsdoc-----------------------------------------------------------


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{
	return {
		_Schema: _Schema,
		AsyncDownloadFile: __webpack_require__( /*! ./910-Net.AsyncDownloadFile.js */ "./src/900-Net/910-Net.AsyncDownloadFile.js" )( Liquicode ).AsyncDownloadFile,
		AsyncGetRequest: __webpack_require__( /*! ./920-Net.AsyncGetRequest.js */ "./src/900-Net/920-Net.AsyncGetRequest.js" )( Liquicode ).AsyncGetRequest,
	};
};


/***/ }),

/***/ "./src/900-Net/910-Net.AsyncDownloadFile.js":
/*!**************************************************!*\
  !*** ./src/900-Net/910-Net.AsyncDownloadFile.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {




//---------------------------------------------------------------------
let Schema = {
	id: '910',
	member_of: 'Net',
	name: 'AsyncDownloadFile',
	type: 'function',
	returns: 'string',
	description: `Download a file from an url.`,
	Parameters: {},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function AsyncDownloadFile
	 * @returns {string}
	 * @description
	 * Download a file from an url.
	*/
	//-end-jsdoc-----------------------------------------------------------


	const LIB_HTTP = __webpack_require__( /*! http */ "http" );
	const LIB_HTTPS = __webpack_require__( /*! https */ "https" );


	function AsyncDownloadFile( Url, Filename )
	{
		let http_engine = null;
		if ( Url.toLowerCase().startsWith( 'http:' ) ) { http_engine = LIB_HTTP; }
		else if ( Url.toLowerCase().startsWith( 'https:' ) ) { http_engine = LIB_HTTPS; }
		else { throw new Error( `Unsupported protocol. Must be either http or https.` ); }

		return new Promise(
			( resolve, reject ) =>
			{
				try
				{
					http_engine.get(
						Url,
						function ( response ) 
						{
							const file_stream = LIB_FS.createWriteStream( Filename );
							response.pipe( file_stream );
							file_stream.on(
								'finish',
								function ()
								{
									file_stream.close();
									resolve( true );
								} );
						} );
				}
				catch ( error )
				{
					reject( error );
				}
			} );
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: Schema,
		AsyncDownloadFile: AsyncDownloadFile,
	};
};


/***/ }),

/***/ "./src/900-Net/920-Net.AsyncGetRequest.js":
/*!************************************************!*\
  !*** ./src/900-Net/920-Net.AsyncGetRequest.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {




//---------------------------------------------------------------------
let Schema = {
	id: '920',
	member_of: 'Net',
	name: 'AsyncGetRequest',
	type: 'function',
	returns: 'string',
	description: `Make an http get request for a an url.`,
	Parameters: {
		Url: {
			name: 'Url',
			type: 'string',
			required: true,
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function AsyncGetRequest
	 * @returns {string}
	 * @description
	 * Make an http get request for a an url.
	 * @param {string} Url
	*/
	//-end-jsdoc-----------------------------------------------------------


	const LIB_HTTP = __webpack_require__( /*! http */ "http" );
	const LIB_HTTPS = __webpack_require__( /*! https */ "https" );


	function AsyncGetRequest( Url )
	{
		let http_engine = null;
		if ( Url.toLowerCase().startsWith( 'http:' ) ) { http_engine = LIB_HTTP; }
		else if ( Url.toLowerCase().startsWith( 'https:' ) ) { http_engine = LIB_HTTPS; }
		else { throw new Error( `Unsupported protocol. Must be http or https.` ); }

		return new Promise(
			( resolve, reject ) =>
			{
				try
				{
					http_engine.get(
						Url,
						function ( response ) 
						{
							response.on( 'data', data =>
							{
								resolve( data );
							} );
						} );
				}
				catch ( error )
				{
					reject( error );
				}
			} );
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: Schema,
		AsyncGetRequest: AsyncGetRequest,
	};
};


/***/ }),

/***/ "./src/liquicode-node.js":
/*!*******************************!*\
  !*** ./src/liquicode-node.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {




var Liquicode = {};

Liquicode.version = 'v0.0.1';
Liquicode.environment = 'node';

Liquicode.Schema = __webpack_require__( /*! ./000-Schema/000-Schema.js */ "./src/000-Schema/000-Schema.js" )( Liquicode );
Liquicode.Object = __webpack_require__( /*! ./100-Object/100-Object.js */ "./src/100-Object/100-Object.js" )( Liquicode );
Liquicode.Text = __webpack_require__( /*! ./200-Text/200-Text.js */ "./src/200-Text/200-Text.js" )( Liquicode );
Liquicode.Date = __webpack_require__( /*! ./400-Date/400-Date.js */ "./src/400-Date/400-Date.js" )( Liquicode );
Liquicode.Token = __webpack_require__( /*! ./500-Token/500-Token.js */ "./src/500-Token/500-Token.js" )( Liquicode );
Liquicode.File = __webpack_require__( /*! ./800-File/800-File.js */ "./src/800-File/800-File.js" )( Liquicode );
Liquicode.Net = __webpack_require__( /*! ./900-Net/900-Net.js */ "./src/900-Net/900-Net.js" )( Liquicode );

delete Liquicode.Schema._Schema;
delete Liquicode.Object._Schema;
delete Liquicode.Text._Schema;
delete Liquicode.Date._Schema;
delete Liquicode.Token._Schema;
delete Liquicode.File._Schema;
delete Liquicode.Net._Schema;


module.exports = Liquicode;



/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/liquicode-node.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=liquicode.js.map