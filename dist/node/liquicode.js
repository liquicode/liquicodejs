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

/***/ "./src/000-Types/000-Types.js":
/*!************************************!*\
  !*** ./src/000-Types/000-Types.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '000',
	name: 'Types',
	type: 'namespace',
	summary: 'Data Type Handling',
	description: [ `
LiquicodeJS can classify and identify value types beyond the primitive data types supported by Javascript.


When obtaining FieldSchema objects from \`Schema.ValueSchema()\` or \`Schema.ObjectSchema()\`,
\`FieldSchema.type\` will contain the Javascript data type and \`FieldSchema.format\` will have a more specific type description.

Javascript (and JSON) offers four data types for your variable values: \`boolean\`, \`number\`, \`string\`,
and everything else is essentially an \`object\`.
This suits Javascript well for the types of things that Javascript needs to do like storing values in memory
and executing program statements with those values.
This is not always great on an application level though.
When you need to, for example, make sure that a variable contains an \`array\` of \`string\` or that value represents a floating point number.
Cases like these require additional progrma statements and type checking which can be consolidated into a set of functions.

The \`Schema\` module defines a few objects and functions to alleviate this burden from the application developer.

**The FieldSchema Object**

This object describes a value (or field) with greater precision then Javascript's \`typeof\` statement.
The \`FieldSchema.type\` member will always contain a Javascript data type while the \`FieldSchema.format\` field contains a more
detailed data type.

~~~javascript
FieldSchema = {
	type: '',				// Javascript data type (boolean, number, string, or object).
	format: '',				// A data type specific designation.
	default: undefined,		// A default value used for missing fields.
	name: '',				// Name of the field.
}
~~~

These functions will generate a \`FieldSchema\` from a single value or an object.
Be aware that only the top level members of an object are scrutinized as this is what we are typically interested in most cases.
Functions of the \`Schema\` module do not recurse into an object providing the schema for every single field in the object.
Rather, they inspect the top level of objects only and return an array of schema objects as a result.
Again, this handles most use cases with a consistent set of functions.
Any further validation/coercion that may be required can also be perfomed by the same functions on an individual case basis.

- \`Schema.ValueSchema( FromValue )\`
- \`Schema.ObjectSchema( FromObject )\`

Possible values for \`FieldSchema.type\` and \`FieldSchema.format\` are as follows:

| Type    | Format        | Default Value | Examples                              |
|---------|---------------|---------------|---------------------------------------|
| boolean | boolean       | false         | \`true\`, or \`false\`                |
| number  | integer       | 0             | \`1\`, \`2\`, or \`3.0\`              |
| number  | float         | 0             | \`1.1\`, \`2.071\`, or \`3.14\`       |
| string  | string        | ""            | \`"Hello"\`, or \`""\`                |
| object  | object        | {}            | \`{ foo: 'bar' }\`                    |
| object  | array         | []            | \`[ 1, 'two', 3.14, null ]\`          |
| object  | boolean-array | []            | \`[ true, false, true ]\`             |
| object  | number-array  | []            | \`[ 1, 2, 3.14 ]\`                    |
| object  | string-array  | []            | \`[ 'one', 'two', 'three' ]\`         |
| object  | object-array  | []            | \`[ { foo: 'bar' }, [1,2,3], null ]\` |
| object  | array-array   | []            | \`[ [1,2,3], [], [4,5] ]\`            |
`,
		`

**The ErrorValue Object**

LiquicodeJS introduces an \`ErrorValue\` object that is used to indicate and convey errors.
Some functions will return an \`ErrorValue\` object instead of throwing a Javascript \`Error\`.
In some cases, this can make code more efficient and legible when certain errors are tolerable
and you want to avoid the expensive cost of a Javascript \`Error\` that includes a call stack.

Use the \`Schema.ErrorValue()\` function to create an \`ErrorValue\` object and \`Schema.IsErrorValue()\` to test for errors.
An \`ErrorValue\` will always have \`ErrorValue.ok = false\` and \`ErrorValue.error\` will contain the error message.

~~~javascript
ErrorValue = {
	ok: false,		// Always set to "false".
	error: '',		// Error message.
	context: '',	// Context for the error (e.g. a function name).
}
~~~
`,
		`

**Value Coercion**

As data gets shuttled around between memory, files, and network transmissions, the representation of the data might
change to suit to the medium.
For example, an integer value being stored in a file might be read back out later as a string.
It's actual value hasn't changed, but the way it is represented has changed.
Javascript can be pretty forgiving in these cases by allowing a certain amount of type fluidity;
However, this can also cause some difficult to spot errors like when \`'2' + 2\` equals the string \`'22'\` and not the integer \`4\`.

Use these functions the validate that a value's type is of an expected type and to coerce the value, in a common sense way,
to that expected type.

- \`Types.Coerce( Value, Schema, ThrowErrors )\`
- \`Types.Coerce( Value, Schema, ThrowErrors )\`
- \`Types.Coerces( Values, Schemas, ThrowErrors )\`

This tables describes how values are converted from one data type to another during coercion:

| From Type | To Boolean     | To Number      | To String        | To Object      |
|-----------|----------------|----------------|------------------|----------------|
| undefined | DefaultValue() | DefaultValue() | DefaultValue()   | DefaultValue() |
| null      | DefaultValue() | DefaultValue() | DefaultValue()   | DefaultValue() |
| Boolean   | Value          | Number()       | toString()       | ErrorValue     |
| Number    | Boolean()      | Value          | toString()       | ErrorValue     |
| String    | Boolean()      | Number()       | Value            | JSON.parse()   |
| Object    | Boolean()      | Number()       | JSON.stringify() | Value          |
`,
		`

**Related Reading**

- [You Don't Know JS: Types & Grammar - Chapter 4. Coercion](https://www.oreilly.com/library/view/you-dont-know/9781491905159/ch04.html)
`,
	],
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
 * @namespace Types
 * @summary Data Type Handling
 * @description
 * 
LiquicodeJS can classify and identify value types beyond the primitive data types supported by Javascript.


When obtaining FieldSchema objects from `Schema.ValueSchema()` or `Schema.ObjectSchema()`,
`FieldSchema.type` will contain the Javascript data type and `FieldSchema.format` will have a more specific type description.

Javascript (and JSON) offers four data types for your variable values: `boolean`, `number`, `string`,
and everything else is essentially an `object`.
This suits Javascript well for the types of things that Javascript needs to do like storing values in memory
and executing program statements with those values.
This is not always great on an application level though.
When you need to, for example, make sure that a variable contains an `array` of `string` or that value represents a floating point number.
Cases like these require additional progrma statements and type checking which can be consolidated into a set of functions.

The `Schema` module defines a few objects and functions to alleviate this burden from the application developer.

**The FieldSchema Object**

This object describes a value (or field) with greater precision then Javascript's `typeof` statement.
The `FieldSchema.type` member will always contain a Javascript data type while the `FieldSchema.format` field contains a more
detailed data type.

~~~javascript
FieldSchema = {
	type: '',				// Javascript data type (boolean, number, string, or object).
	format: '',				// A data type specific designation.
	default: undefined,		// A default value used for missing fields.
	name: '',				// Name of the field.
}
~~~

These functions will generate a `FieldSchema` from a single value or an object.
Be aware that only the top level members of an object are scrutinized as this is what we are typically interested in most cases.
Functions of the `Schema` module do not recurse into an object providing the schema for every single field in the object.
Rather, they inspect the top level of objects only and return an array of schema objects as a result.
Again, this handles most use cases with a consistent set of functions.
Any further validation/coercion that may be required can also be perfomed by the same functions on an individual case basis.

- `Schema.ValueSchema( FromValue )`
- `Schema.ObjectSchema( FromObject )`

Possible values for `FieldSchema.type` and `FieldSchema.format` are as follows:

| Type    | Format        | Default Value | Examples                              |
|---------|---------------|---------------|---------------------------------------|
| boolean | boolean       | false         | `true`, or `false`                |
| number  | integer       | 0             | `1`, `2`, or `3.0`              |
| number  | float         | 0             | `1.1`, `2.071`, or `3.14`       |
| string  | string        | ""            | `"Hello"`, or `""`                |
| object  | object        | {}            | `{ foo: 'bar' }`                    |
| object  | array         | []            | `[ 1, 'two', 3.14, null ]`          |
| object  | boolean-array | []            | `[ true, false, true ]`             |
| object  | number-array  | []            | `[ 1, 2, 3.14 ]`                    |
| object  | string-array  | []            | `[ 'one', 'two', 'three' ]`         |
| object  | object-array  | []            | `[ { foo: 'bar' }, [1,2,3], null ]` |
| object  | array-array   | []            | `[ [1,2,3], [], [4,5] ]`            |

 * 

**The ErrorValue Object**

LiquicodeJS introduces an `ErrorValue` object that is used to indicate and convey errors.
Some functions will return an `ErrorValue` object instead of throwing a Javascript `Error`.
In some cases, this can make code more efficient and legible when certain errors are tolerable
and you want to avoid the expensive cost of a Javascript `Error` that includes a call stack.

Use the `Schema.ErrorValue()` function to create an `ErrorValue` object and `Schema.IsErrorValue()` to test for errors.
An `ErrorValue` will always have `ErrorValue.ok = false` and `ErrorValue.error` will contain the error message.

~~~javascript
ErrorValue = {
	ok: false,		// Always set to "false".
	error: '',		// Error message.
	context: '',	// Context for the error (e.g. a function name).
}
~~~

 * 

**Value Coercion**

As data gets shuttled around between memory, files, and network transmissions, the representation of the data might
change to suit to the medium.
For example, an integer value being stored in a file might be read back out later as a string.
It's actual value hasn't changed, but the way it is represented has changed.
Javascript can be pretty forgiving in these cases by allowing a certain amount of type fluidity;
However, this can also cause some difficult to spot errors like when `'2' + 2` equals the string `'22'` and not the integer `4`.

Use these functions the validate that a value's type is of an expected type and to coerce the value, in a common sense way,
to that expected type.

- `Types.Coerce( Value, Schema, ThrowErrors )`
- `Types.Coerce( Value, Schema, ThrowErrors )`
- `Types.Coerces( Values, Schemas, ThrowErrors )`

This tables describes how values are converted from one data type to another during coercion:

| From Type | To Boolean     | To Number      | To String        | To Object      |
|-----------|----------------|----------------|------------------|----------------|
| undefined | DefaultValue() | DefaultValue() | DefaultValue()   | DefaultValue() |
| null      | DefaultValue() | DefaultValue() | DefaultValue()   | DefaultValue() |
| Boolean   | Value          | Number()       | toString()       | ErrorValue     |
| Number    | Boolean()      | Value          | toString()       | ErrorValue     |
| String    | Boolean()      | Number()       | Value            | JSON.parse()   |
| Object    | Boolean()      | Number()       | JSON.stringify() | Value          |

 * 

**Related Reading**

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

		HasValue: __webpack_require__( /*! ./001-Types.HasValue.js */ "./src/000-Types/001-Types.HasValue.js" )( Liquicode ).HasValue,

		Coerce: __webpack_require__( /*! ./010-Types.Coerce.js */ "./src/000-Types/010-Types.Coerce.js" )( Liquicode ).Coerce,

		Formats: __webpack_require__( /*! ./020-Types.Formats.js */ "./src/000-Types/020-Types.Formats.js" )( Liquicode ).Formats,
		GetFormat: __webpack_require__( /*! ./021-Types.GetFormat.js */ "./src/000-Types/021-Types.GetFormat.js" )( Liquicode ).GetFormat,
		IsFormat: __webpack_require__( /*! ./022-Types.IsFormat.js */ "./src/000-Types/022-Types.IsFormat.js" )( Liquicode ).IsFormat,

	};
};


/***/ }),

/***/ "./src/000-Types/001-Types.HasValue.js":
/*!*********************************************!*\
  !*** ./src/000-Types/001-Types.HasValue.js ***!
  \*********************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '001',
	member_of: 'Types',
	name: 'HasValue',
	type: 'function',
	returns: 'boolean',
	returns_description: 'True if Value actually contains a value.',
	summary: 'Determine if a variable contains a value or or not.',
	description: `
Tests the provided Value parameter and returns false if it does not represent a value.
More specifically, if Value is undefined or null, then false is returned.
if Value is a zero length string \`""\` or an empty object \`{}\`, false is also returned.
In all other cases, this function returns true.
`,
	Parameters: {
		Value: {
			name: 'Value',
			type: '*',
			required: true,
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
	 * @function HasValue
	 * @returns {boolean}
	 * True if Value actually contains a value.
	 * @summary Determine if a variable contains a value or or not.
	 * @description
	 * 
Tests the provided Value parameter and returns false if it does not represent a value.
More specifically, if Value is undefined or null, then false is returned.
if Value is a zero length string `""` or an empty object `{}`, false is also returned.
In all other cases, this function returns true.

	 * @param {*} Value
	 * The value to test.
	*/
	//-end-jsdoc-----------------------------------------------------------


	function HasValue( Value )
	{
		if ( Value === undefined ) { return false; }
		if ( Value === null ) { return false; }
		if ( ( typeof Value === 'string' ) && ( Value.length === 0 ) ) { return false; }
		if ( ( typeof Value === 'object' ) && ( Object.keys( Value ).length === 0 ) ) { return false; }
		return true;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		HasValue: HasValue,
	};
};


/***/ }),

/***/ "./src/000-Types/010-Types.Coerce.js":
/*!*******************************************!*\
  !*** ./src/000-Types/010-Types.Coerce.js ***!
  \*******************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '010',
	member_of: 'Types',
	name: 'Coerce',
	type: 'function',
	returns: 'object',
	returns_description: 'A \`Coercion\` object.',
	summary: 'Returns a \`Coercion\` object which is used to coerce values to different types.',
	description: `
The returned \`Coercion\` object has a single member \`Coercion.value\` and a number of coercion functions:

- \`ToBoolean( Default = false )\` :
	Returns the boolean value of \`Coercion.value\`.
	Anything can be coerced to a boolean.
	If value is a string, then 'false' and '0' will return false while 'true' will return true.

- \`ToNumber( Default = 0 )\` :
	Returns the numeric value of \`Coercion.value\`.
	Booleans, other numbers, and numeric strings can be coerced to a number.

- \`ToString( Default = '' )\` :
	Returns the string value of \`Coercion.value\`.
	Anything can be coerced to a string.
	If value is an object, then it is JSON stringified and returned.

- \`ToObject( Default = null )\` :
	Returns the object value of \`Coercion.value\`.
	Only JSON strings and other objects can be coerced to an object.
	If value is a JSON string, then it is JSON parsed and returned.

\`Coercion.value\` is set to the Value parameter.

**Usage**

There are two ways to use the \`Coercion\` object.

One way is to immediately call one of the coercion functions after obtaining the \`Coercion\` object:
~~~javascript
let number_42 = Liquicode.Types.Coerce( '42' ).ToNumber();
~~~

Another way is to reuse the \`Coercion\` object and alter the \`Coercion.value\` property yourself:
~~~javascript
let coercion = Liquicode.Types.Coerce();
coercion.value = '42';
let number_42 = coercion.ToNumber();
~~~

**Examples**

~~~javascript
// Coercing to boolean
Schema.Coerce( null ).ToBoolean()           // = false
Schema.Coerce( 0 ).ToBoolean()              // = false
Schema.Coerce( 'true' ).ToBoolean()         // = true

// Coercing to number
Schema.Coerce( null ).ToNumber()            // = 0
Schema.Coerce( '3.14' ).ToNumber()          // = 3.14
Schema.Coerce( 'foo' ).ToNumber()           // = 0

// Coercing to string
Schema.Coerce( null ).ToString()            // = ''
Schema.Coerce( '3.14' ).ToString()          // = '3.14'
Schema.Coerce( { foo: 'bar' } ).ToString()  // = '{"foo":"bar"}'

// Coercing to object
Schema.Coerce( null ).ToObject()            // = null
Schema.Coerce( 3.14 ).ToObject()            // = null
Schema.Coerce( '{"foo":"bar"}' ).ToObject() // = { foo: 'bar' }

// Coercing with a Default
Schema.Coerce( 'Hello' ).ToNumber( -1 )     // = -1
Schema.Coerce( true ).ToObject( {} )        // = {}
Schema.Coerce( 1024 ).ToObject( {} )        // = {}
Schema.Coerce( null ).ToObject( { a: 1 } )  // = { a: 1 }
Schema.Coerce( null ).ToObject( [ 1, 2 ] )  // = [ 1, 2 ]
~~~
`,
	Parameters: {
		Value: {
			name: 'Value',
			type: '*',
			required: false,
			description: 'The value to coerce. This value is set to \`Coercion.value\`.',
		},
		Loud: {
			name: 'Loud',
			type: 'boolean',
			required: false,
			default: false,
			description: 'Throws errors when set to `true`.',
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
	 * @function Coerce
	 * @returns {object}
	 * A `Coercion` object.
	 * @summary Returns a `Coercion` object which is used to coerce values to different types.
	 * @description
	 * 
The returned `Coercion` object has a single member `Coercion.value` and a number of coercion functions:

- `ToBoolean( Default = false )` :
	Returns the boolean value of `Coercion.value`.
	Anything can be coerced to a boolean.
	If value is a string, then 'false' and '0' will return false while 'true' will return true.

- `ToNumber( Default = 0 )` :
	Returns the numeric value of `Coercion.value`.
	Booleans, other numbers, and numeric strings can be coerced to a number.

- `ToString( Default = '' )` :
	Returns the string value of `Coercion.value`.
	Anything can be coerced to a string.
	If value is an object, then it is JSON stringified and returned.

- `ToObject( Default = null )` :
	Returns the object value of `Coercion.value`.
	Only JSON strings and other objects can be coerced to an object.
	If value is a JSON string, then it is JSON parsed and returned.

`Coercion.value` is set to the Value parameter.

**Usage**

There are two ways to use the `Coercion` object.

One way is to immediately call one of the coercion functions after obtaining the `Coercion` object:
~~~javascript
let number_42 = Liquicode.Types.Coerce( '42' ).ToNumber();
~~~

Another way is to reuse the `Coercion` object and alter the `Coercion.value` property yourself:
~~~javascript
let coercion = Liquicode.Types.Coerce();
coercion.value = '42';
let number_42 = coercion.ToNumber();
~~~

**Examples**

~~~javascript
// Coercing to boolean
Schema.Coerce( null ).ToBoolean()           // = false
Schema.Coerce( 0 ).ToBoolean()              // = false
Schema.Coerce( 'true' ).ToBoolean()         // = true

// Coercing to number
Schema.Coerce( null ).ToNumber()            // = 0
Schema.Coerce( '3.14' ).ToNumber()          // = 3.14
Schema.Coerce( 'foo' ).ToNumber()           // = 0

// Coercing to string
Schema.Coerce( null ).ToString()            // = ''
Schema.Coerce( '3.14' ).ToString()          // = '3.14'
Schema.Coerce( { foo: 'bar' } ).ToString()  // = '{"foo":"bar"}'

// Coercing to object
Schema.Coerce( null ).ToObject()            // = null
Schema.Coerce( 3.14 ).ToObject()            // = null
Schema.Coerce( '{"foo":"bar"}' ).ToObject() // = { foo: 'bar' }

// Coercing with a Default
Schema.Coerce( 'Hello' ).ToNumber( -1 )     // = -1
Schema.Coerce( true ).ToObject( {} )        // = {}
Schema.Coerce( 1024 ).ToObject( {} )        // = {}
Schema.Coerce( null ).ToObject( { a: 1 } )  // = { a: 1 }
Schema.Coerce( null ).ToObject( [ 1, 2 ] )  // = [ 1, 2 ]
~~~

	 * @param {*} [Value]
	 * The value to coerce. This value is set to `Coercion.value`.
	 * @param {boolean} [Loud]
	 * Throws errors when set to `true`.
	*/
	//-end-jsdoc-----------------------------------------------------------


	function default_or_error( Loud, Default, ErrorMessage )
	{
		if ( Loud ) { throw new Error( ErrorMessage ); }
		return Default;
	}


	function Coerce( Value, Loud = false )
	{
		return {

			value: Value,
			loud: Loud,

			//---------------------------------------------------------------------
			ToBoolean: function ( Default = false )
			{
				if ( this.value === undefined ) { return Default; }
				if ( this.value === null ) { return Default; }
				// Special cases for strings.
				if ( typeof this.value === 'string' )
				{
					if ( this.value === 'false' ) { return false; }
					if ( this.value === 'true' ) { return true; }
					if ( this.value === '0' ) { return false; }
				}
				// Coerce to Boolean.
				let coerced = Boolean( this.value );
				return coerced;
			},

			//---------------------------------------------------------------------
			ToNumber: function ( Default = 0 )
			{
				if ( this.value === undefined ) { return Default; }
				if ( this.value === null ) { return Default; }
				// Coerce to Number.
				let coerced = Number( this.value );
				if ( isNaN( coerced ) ) { return default_or_error( this.loud, Default, 'Unable to coerce value to a number.' ); }
				// throw new Error( `Value is not numeric.` );
				return coerced;
			},

			//---------------------------------------------------------------------
			ToString: function ( Default = '' )
			{
				if ( this.value === undefined ) { return Default; }
				if ( this.value === null ) { return Default; }
				// Special case for objects.
				if ( typeof this.value === 'object' )
				{
					return JSON.stringify( this.value );
				}
				// Coerce to String.
				if ( this.value.toString === undefined ) { return default_or_error( this.loud, Default, 'Unable to coerce value to a string.' ); }
				let coerced = this.value.toString();
				return coerced;
			},

			//---------------------------------------------------------------------
			ToObject: function ( Default = null )
			{
				if ( this.value === undefined ) { return Default; }
				if ( this.value === null ) { return Default; }
				// Coerce to Object.
				switch ( typeof this.value )
				{
					// case 'boolean': throw new Error( `Unable to ceorce from boolean to object.` );
					case 'boolean': return default_or_error( this.loud, Default, 'Unable to coerce from boolean to object.' );

					// case 'number': throw new Error( `Unable to ceorce from number to object.` );
					case 'number': return default_or_error( this.loud, Default, 'Unable to coerce from number to object.' );

					case 'string':
						let coerced = this.value.trim();
						if ( coerced.startsWith( '{' ) || coerced.startsWith( '[' ) )
						{
							try
							{
								coerced = JSON.parse( coerced );
								return coerced;
							}
							catch ( error )
							{
								return default_or_error( this.loud, Default, 'Unable to coerce from non-json string to object.' );
							}
						}

					case 'object': return this.value;

					// case 'function': throw new Error( `Unable to ceorce from function to object.` );
					case 'function': return default_or_error( this.loud, Default, 'Unable to coerce from function to object.' );

					// case 'symbol': throw new Error( `Unable to ceorce from symbol to object.` );
					case 'symbol': return default_or_error( this.loud, Default, 'Unable to coerce from symbol to object.' );

					// default: throw new Error( `Unknown type encountered [${typeof this.value}].` );
					default: return default_or_error( this.loud, Default, `Unknown type encountered [${typeof this.value}].` );
				}
			},

			//---------------------------------------------------------------------
			ToType: function ( TypeName, Default )
			{
				switch ( TypeName )
				{
					case 'boolean': return this.ToBoolean( Default );
					case 'number': return this.ToNumber( Default );
					case 'string': return this.ToString( Default );
					case 'object': return this.ToObject( Default );
					default: throw new Error( `Invalid or unknown type name [${TypeName}].` );
				}
			},

		};
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		Coerce: Coerce,
	};
};


/***/ }),

/***/ "./src/000-Types/020-Types.Formats.js":
/*!********************************************!*\
  !*** ./src/000-Types/020-Types.Formats.js ***!
  \********************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '020',
	member_of: 'Types',
	name: 'Formats',
	source_type: 'function',
	returns: 'object',
	returns_description: 'An array of \`SchemaFormat\` objects.',
	summary: 'Returns an array of \`SchemaFormat\` objects used to convert values between different formats.',
	description: `
Returns the library's internal array of format objects, \`Types.Formats\`.

Each format has a \`type\` and \`format\` string, and an \`IsFormat( Value )\` function.
This list of formats is used by the \`Types.GetFormat()\` and \`Types.IsFormat()\` functions.

Applications can ammend this array in order to customize type processing or add new formats.
The structure of each format in the array is:
~~~javascript
{
	type: '',    // The Javascript data type. e.g. 'boolean', 'number', 'string', 'object'
	format: '',  // A type specific format. e.g. 'integer', 'date'. 
	IsFormat: function ( Value )
	{
		return true;  // Return true, if Value is of this format.
	}
}
~~~

For example, here is the format object for \`"string:string"\`:
~~~javascript
{
	type: 'string',
	format: 'string',
	IsFormat: function ( Value )
	{
		if ( typeof Value !== 'string' ) { return false; }
		return true;
	},
},
~~~

You have the ability to directly modify the \`Types.Formats\` array.

For example, suppose you want to define two new formats to detect objects of 'object:person' and 'object:employee'.
~~~javascript
Person = {
	first_name: '',
	last_name: '',
}
Employee = {
	first_name: '',
	last_name: '',
	title: '',
}
~~~

The format objects might look something like this:
~~~javascript
object_person = {
	type: 'object',
	format: 'person',
	IsFormat: function( Value )
	{
		if ( typeof Value !== 'object' ) { return false; }
		if ( !Value ) { return false; }
		if ( !Value.first_name ) { return false; }
		if ( !Value.last_name ) { return false; }
		return true;
	},
},
object_employee = {
	type: 'object',
	format: 'employee',
	IsFormat: function( Value )
	{
		if ( typeof Value !== 'object' ) { return false; }
		if ( !Value ) { return false; }
		if ( !Value.first_name ) { return false; }
		if ( !Value.last_name ) { return false; }
		if ( !Value.title ) { return false; }
		return true;
	},
},
~~~

And tou can add them to the \`Types.Formats\` array:
~~~javascript
let formats = Liquicode.Types.Formats();
formats.push( object_person );
formats.push( object_employee );
~~~

The \`Types.GetFormat()\` function reads the formats array in reverse order when matching a value to a format.
This is done so that more complex types will not get "short-circuited" by less complex types.
The more complex format in this case is "object:employee" and should appear after "object:person" in the array.

`,
	Parameters: {},
	todo: [],
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @name Formats
	 * @returns {object}
	 * An array of `SchemaFormat` objects.
	 * @summary Returns an array of `SchemaFormat` objects used to convert values between different formats.
	 * @description
	 * 
Returns the library's internal array of format objects, `Types.Formats`.

Each format has a `type` and `format` string, and an `IsFormat( Value )` function.
This list of formats is used by the `Types.GetFormat()` and `Types.IsFormat()` functions.

Applications can ammend this array in order to customize type processing or add new formats.
The structure of each format in the array is:
~~~javascript
{
	type: '',    // The Javascript data type. e.g. 'boolean', 'number', 'string', 'object'
	format: '',  // A type specific format. e.g. 'integer', 'date'. 
	IsFormat: function ( Value )
	{
		return true;  // Return true, if Value is of this format.
	}
}
~~~

For example, here is the format object for `"string:string"`:
~~~javascript
{
	type: 'string',
	format: 'string',
	IsFormat: function ( Value )
	{
		if ( typeof Value !== 'string' ) { return false; }
		return true;
	},
},
~~~

You have the ability to directly modify the `Types.Formats` array.

For example, suppose you want to define two new formats to detect objects of 'object:person' and 'object:employee'.
~~~javascript
Person = {
	first_name: '',
	last_name: '',
}
Employee = {
	first_name: '',
	last_name: '',
	title: '',
}
~~~

The format objects might look something like this:
~~~javascript
object_person = {
	type: 'object',
	format: 'person',
	IsFormat: function( Value )
	{
		if ( typeof Value !== 'object' ) { return false; }
		if ( !Value ) { return false; }
		if ( !Value.first_name ) { return false; }
		if ( !Value.last_name ) { return false; }
		return true;
	},
},
object_employee = {
	type: 'object',
	format: 'employee',
	IsFormat: function( Value )
	{
		if ( typeof Value !== 'object' ) { return false; }
		if ( !Value ) { return false; }
		if ( !Value.first_name ) { return false; }
		if ( !Value.last_name ) { return false; }
		if ( !Value.title ) { return false; }
		return true;
	},
},
~~~

And tou can add them to the `Types.Formats` array:
~~~javascript
let formats = Liquicode.Types.Formats();
formats.push( object_person );
formats.push( object_employee );
~~~

The `Types.GetFormat()` function reads the formats array in reverse order when matching a value to a format.
This is done so that more complex types will not get "short-circuited" by less complex types.
The more complex format in this case is "object:employee" and should appear after "object:person" in the array.


	*/
	//-end-jsdoc-----------------------------------------------------------


	let _Formats = [

		//---------------------------------------------------------------------
		// boolean : boolean
		{
			type: 'boolean',
			format: 'boolean',
			IsFormat: function ( Value )
			{
				if ( typeof Value !== 'boolean' ) { return false; }
				return true;
			},
		},

		//---------------------------------------------------------------------
		// number : number
		{
			type: 'number',
			format: 'number',
			IsFormat: function ( Value )
			{
				if ( typeof Value !== 'number' ) { return false; }
				return true;
			},
		},

		//---------------------------------------------------------------------
		// number : integer
		{
			type: 'number',
			format: 'integer',
			IsFormat: function ( Value )
			{
				if ( typeof Value !== 'number' ) { return false; }
				if ( Value !== parseInt( Value.toString() ) ) { return false; }
				return true;
			},
		},

		//---------------------------------------------------------------------
		// string : string
		{
			type: 'string',
			format: 'string',
			IsFormat: function ( Value )
			{
				if ( typeof Value !== 'string' ) { return false; }
				return true;
			},
		},

		//---------------------------------------------------------------------
		// string : json
		{
			type: 'string',
			format: 'json',
			IsFormat: function ( Value )
			{
				if ( typeof Value !== 'string' ) { return false; }
				if ( !Value ) { return false; }
				Value = Value.trimStart();
				if ( !Value.startsWith( '{' ) && !Value.startsWith( '[' ) ) { return false; }
				return true;
			},
		},

		//---------------------------------------------------------------------
		// string : datetime
		// 2005-05-01T00:00:00.000Z
		{
			type: 'string',
			format: 'datetime',
			IsFormat: function ( Value )
			{
				if ( typeof Value !== 'string' ) { return false; }
				if ( !Value ) { return false; }
				if ( Value.length !== 24 ) { return false; }
				if ( isNaN( Number( Value.substring( 0, 4 ) ) ) ) { return false; }
				if ( Value[ 4 ] !== '-' ) { return false; }
				if ( isNaN( Number( Value.substring( 5, 7 ) ) ) ) { return false; }
				if ( Value[ 7 ] !== '-' ) { return false; }
				if ( isNaN( Number( Value.substring( 8, 10 ) ) ) ) { return false; }
				if ( Value[ 10 ] !== 'T' ) { return false; }
				if ( isNaN( Number( Value.substring( 11, 13 ) ) ) ) { return false; }
				if ( Value[ 13 ] !== ':' ) { return false; }
				if ( isNaN( Number( Value.substring( 14, 16 ) ) ) ) { return false; }
				if ( Value[ 16 ] !== ':' ) { return false; }
				if ( isNaN( Number( Value.substring( 17, 19 ) ) ) ) { return false; }
				if ( Value[ 19 ] !== '.' ) { return false; }
				if ( isNaN( Number( Value.substring( 20, 23 ) ) ) ) { return false; }
				if ( Value[ 23 ] !== 'Z' ) { return false; }
				return true;
			},
		},

		//---------------------------------------------------------------------
		// string : date
		{
			type: 'string',
			format: 'date',
			IsFormat: function ( Value )
			{
				if ( typeof Value !== 'string' ) { return false; }
				if ( !Value ) { return false; }
				if ( Value.length !== 10 ) { return false; }
				if ( isNaN( Number( Value.substring( 0, 4 ) ) ) ) { return false; }
				if ( Value[ 4 ] !== '-' ) { return false; }
				if ( isNaN( Number( Value.substring( 5, 7 ) ) ) ) { return false; }
				if ( Value[ 7 ] !== '-' ) { return false; }
				if ( isNaN( Number( Value.substring( 8, 10 ) ) ) ) { return false; }
				return true;
			},
		},

		//---------------------------------------------------------------------
		// string : time
		{
			type: 'string',
			format: 'time',
			IsFormat: function ( Value )
			{
				if ( typeof Value !== 'string' ) { return false; }
				if ( !Value ) { return false; }
				if ( Value.length !== 8 ) { return false; }
				if ( isNaN( Number( Value.substring( 0, 2 ) ) ) ) { return false; }
				if ( Value[ 2 ] !== ':' ) { return false; }
				if ( isNaN( Number( Value.substring( 3, 5 ) ) ) ) { return false; }
				if ( Value[ 5 ] !== ':' ) { return false; }
				if ( isNaN( Number( Value.substring( 6, 8 ) ) ) ) { return false; }
				return true;
			},
		},

		//---------------------------------------------------------------------
		// object : object
		{
			type: 'object',
			format: 'object',
			IsFormat: function ( Value )
			{
				if ( typeof Value !== 'object' ) { return false; }
				if ( !Value ) { return false; }
				return true;
			},
		},

		//---------------------------------------------------------------------
		// object : datetime
		{
			type: 'object',
			format: 'datetime',
			IsFormat: function ( Value )
			{
				if ( typeof Value !== 'object' ) { return false; }
				if ( !Value ) { return false; }
				if ( !Value.getTime ) { return false; }
				if ( isNaN( Value.getTime() ) ) { return false; }
				return true;
			},
		},

		//---------------------------------------------------------------------
		// object : array
		{
			type: 'object',
			format: 'array',
			IsFormat: function ( Value )
			{
				if ( typeof Value !== 'object' ) { return false; }
				if ( !Value ) { return false; }
				if ( !Array.isArray( Value ) ) { return false; }
				return true;
			},
		},

		//---------------------------------------------------------------------
		// object : boolean-array
		{
			type: 'object',
			format: 'boolean-array',
			IsFormat: function ( Value )
			{
				if ( typeof Value !== 'object' ) { return false; }
				if ( !Value ) { return false; }
				if ( !Array.isArray( Value ) ) { return false; }
				if ( !Value.length ) { return false; }
				for ( let index = 0; index < Value.length; index++ )
				{
					if ( typeof Value[ index ] !== 'boolean' ) { return false; }
				}
				return true;
			},
		},

		//---------------------------------------------------------------------
		// object : number-array
		{
			type: 'object',
			format: 'number-array',
			IsFormat: function ( Value )
			{
				if ( typeof Value !== 'object' ) { return false; }
				if ( !Value ) { return false; }
				if ( !Array.isArray( Value ) ) { return false; }
				if ( !Value.length ) { return false; }
				for ( let index = 0; index < Value.length; index++ )
				{
					if ( typeof Value[ index ] !== 'number' ) { return false; }
				}
				return true;
			},
		},

		//---------------------------------------------------------------------
		// object : string-array
		{
			type: 'object',
			format: 'string-array',
			IsFormat: function ( Value )
			{
				if ( typeof Value !== 'object' ) { return false; }
				if ( !Value ) { return false; }
				if ( !Array.isArray( Value ) ) { return false; }
				if ( !Value.length ) { return false; }
				for ( let index = 0; index < Value.length; index++ )
				{
					if ( typeof Value[ index ] !== 'string' ) { return false; }
				}
				return true;
			},
		},

		//---------------------------------------------------------------------
		// object : object-array
		{
			type: 'object',
			format: 'object-array',
			// target_type: 'object',
			IsFormat: function ( Value )
			{
				if ( typeof Value !== 'object' ) { return false; }
				if ( !Value ) { return false; }
				if ( !Array.isArray( Value ) ) { return false; }
				if ( !Value.length ) { return false; }
				for ( let index = 0; index < Value.length; index++ )
				{
					if ( typeof Value[ index ] !== 'object' ) { return false; }
				}
				return true;
			},
		},

		//---------------------------------------------------------------------
		// object : array-array
		{
			type: 'object',
			format: 'array-array',
			target_type: 'object',
			IsFormat: function ( Value )
			{
				if ( typeof Value !== 'object' ) { return false; }
				if ( !Value ) { return false; }
				if ( !Array.isArray( Value ) ) { return false; }
				if ( !Value.length ) { return false; }
				for ( let index = 0; index < Value.length; index++ )
				{
					if ( typeof Value[ index ] !== 'object' ) { return false; }
					if ( !Array.isArray( Value[ index ] ) ) { return false; }
				}
				return true;
			},
		},
	];


	function Formats()
	{
		return _Formats;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		Formats: Formats,
	};
};


/***/ }),

/***/ "./src/000-Types/021-Types.GetFormat.js":
/*!**********************************************!*\
  !*** ./src/000-Types/021-Types.GetFormat.js ***!
  \**********************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '021',
	member_of: 'Types',
	name: 'GetFormat',
	type: 'function',
	returns: 'string',
	returns_description: 'An extended type description.',
	summary: 'Determine the type and format of a value.',
	description: `
Iterates through \`Types.Formats\` in reverse order and calls each \`Format.IsFormat()\` function.
When one of the formats returns \`true\`, then it's type and format are returned separated by \`:\`.

**Examples**

~~~javascript
Liquicode.Types.GetFormat( '42' )         // = 'number:integer'
Liquicode.Types.GetFormat( 'Hello' )      // = 'string:string'
Liquicode.Types.GetFormat( new Date() )   // = 'object:datetime'
Liquicode.Types.GetFormat( [ 1, 2, 3 ] )  // = 'object:number-array'
~~~
`,
	Parameters: {
		Value: {
			name: 'Value',
			type: '*',
			required: true,
			description: 'The value to get the format for.',
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
	 * @function GetFormat
	 * @returns {string}
	 * An extended type description.
	 * @summary Determine the type and format of a value.
	 * @description
	 * 
Iterates through `Types.Formats` in reverse order and calls each `Format.IsFormat()` function.
When one of the formats returns `true`, then it's type and format are returned separated by `:`.

**Examples**

~~~javascript
Liquicode.Types.GetFormat( '42' )         // = 'number:integer'
Liquicode.Types.GetFormat( 'Hello' )      // = 'string:string'
Liquicode.Types.GetFormat( new Date() )   // = 'object:datetime'
Liquicode.Types.GetFormat( [ 1, 2, 3 ] )  // = 'object:number-array'
~~~

	 * @param {*} Value
	 * The value to get the format for.
	*/
	//-end-jsdoc-----------------------------------------------------------


	function GetFormat( Value )
	{
		let formats = Liquicode.Types.Formats();
		for ( let index = ( formats.length - 1 ); index >= 0; index-- )
		{
			let format = formats[ index ];
			if ( format.IsFormat( Value ) )
			{
				return `${format.type}:${format.format}`;
			}
		}
		return null;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		GetFormat: GetFormat,
	};
};


/***/ }),

/***/ "./src/000-Types/022-Types.IsFormat.js":
/*!*********************************************!*\
  !*** ./src/000-Types/022-Types.IsFormat.js ***!
  \*********************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '022',
	member_of: 'Types',
	name: 'IsFormat',
	type: 'function',
	returns: 'boolean',
	returns_description: 'True if the value matches the format.',
	summary: 'Determine if a value is of a particular format.',
	description: `
Looks up the specified format in \`Types.Formats\` and calls the \`Format.IsFormat()\` function.

The \`Format\` parameter must specify both type and format to be tested for.

**Examples**

~~~javascript
Liquicode.Types.IsFormat( 'Hello', 'string:string' )            // = true
Liquicode.Types.IsFormat( 'Hello', 'string:json' )              // = false
Liquicode.Types.IsFormat( [ 1, 2, 3 ], 'object:array' )         // = true
Liquicode.Types.IsFormat( [ 1, 2, 3 ], 'object:number-array' )  // = true
Liquicode.Types.IsFormat( [ 1, 2, 3 ], 'object:string-array' )  // = false
~~~
`,
	Parameters: {
		Value: {
			name: 'Value',
			type: '*',
			required: true,
			description: 'The value to test.',
		},
		Format: {
			name: 'Format',
			type: 'string',
			required: true,
			description: 'The type and format to test for as: \`"type:format"\`.',
			examples:[
				'string:string',
				'string:json',
				'object:datetime',
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
	 * @function IsFormat
	 * @returns {boolean}
	 * True if the value matches the format.
	 * @summary Determine if a value is of a particular format.
	 * @description
	 * 
Looks up the specified format in `Types.Formats` and calls the `Format.IsFormat()` function.

The `Format` parameter must specify both type and format to be tested for.

**Examples**

~~~javascript
Liquicode.Types.IsFormat( 'Hello', 'string:string' )            // = true
Liquicode.Types.IsFormat( 'Hello', 'string:json' )              // = false
Liquicode.Types.IsFormat( [ 1, 2, 3 ], 'object:array' )         // = true
Liquicode.Types.IsFormat( [ 1, 2, 3 ], 'object:number-array' )  // = true
Liquicode.Types.IsFormat( [ 1, 2, 3 ], 'object:string-array' )  // = false
~~~

	 * @param {*} Value
	 * The value to test.
	 * @param {string} Format
	 * The type and format to test for as: `"type:format"`.
	*/
	//-end-jsdoc-----------------------------------------------------------


	function IsFormat( Value, Format )
	{
		let formats = Liquicode.Types.Formats();
		for ( let index = 0; index < formats.length; index++ )
		{
			let format = formats[ index ];
			if ( Format === `${format.type}:${format.format}` )
			{
				return format.IsFormat( Value );
			}
		}
		throw new Error( `Unknown type and format [${Format}]. Should be of the form [type:format].` );
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		IsFormat: IsFormat,
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
		
		// Traverse: require( './110-Object.Traverse.js' )( Liquicode ).Traverse,
		// HasPath: require( './111-Object.HasPath.js' )( Liquicode ).HasPath,
		// FindField: require( './112-Object.FindField.js' )( Liquicode ).FindField,
		// FindValue: require( './113-Object.FindValue.js' )( Liquicode ).FindValue,
		// GetValue: require( './114-Object.GetValue.js' )( Liquicode ).GetValue,
		// SetValue: require( './115-Object.SetValue.js' )( Liquicode ).SetValue,

		FromJson: __webpack_require__( /*! ./120-Object.FromJson.js */ "./src/100-Object/120-Object.FromJson.js" )( Liquicode ).FromJson,
		ToJsonOptions: __webpack_require__( /*! ./121-Object.ToJsonOptions.js */ "./src/100-Object/121-Object.ToJsonOptions.js" )( Liquicode ).ToJsonOptions,
		ToJson: __webpack_require__( /*! ./122-Object.ToJson.js */ "./src/100-Object/122-Object.ToJson.js" )( Liquicode ).ToJson,

		FromIni: __webpack_require__( /*! ./125-Object.FromIni.js */ "./src/100-Object/125-Object.FromIni.js" )( Liquicode ).FromIni,
		ToIni: __webpack_require__( /*! ./126-Object.ToIni.js */ "./src/100-Object/126-Object.ToIni.js" )( Liquicode ).ToIni,

		// ValueArrayOf: require( './130-Object.ValueArrayOf.js' )( Liquicode ).ValueArrayOf,

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
		// From = Liquicode.Types.Coerce( From, _Schema.Parameters.From, { coerce_values: true, throw_errors: true } );
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
	description: `
Merges the content of two objects and returns the composite result.

Similar to Clone, this function will remove any non-data fields (i.e. functions and symbols) from the objects.
`,
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
	 * @description
	 * 
Merges the content of two objects and returns the composite result.

Similar to Clone, this function will remove any non-data fields (i.e. functions and symbols) from the objects.

	 * @param {object} Original
	 * @param {object} [Updates]
	*/
	//-end-jsdoc-----------------------------------------------------------


	function Merge( Original, Updates )
	{
		Original = Liquicode.Types.Coerce( Original, true ).ToObject( {} );
		Updates = Liquicode.Types.Coerce( Updates, true ).ToObject( {} );

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
		// JsonString = Liquicode.Types.Coerce( JsonString, _Schema.Parameters.JsonString, true );
		JsonString = JsonString || '';
		if ( typeof JsonString !== 'string' ) { JsonString = JsonString.toString(); }

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
		PresetName = Liquicode.Types.Coerce( PresetName ).ToString();

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
		IniString = Liquicode.Types.Coerce( IniString ).ToString();

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
		Value = Liquicode.Types.Coerce( Value ).ToObject();

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

		Compare: __webpack_require__( /*! ./202-Text.Compare.js */ "./src/200-Text/202-Text.Compare.js" )( Liquicode ).Compare,
		Matches: __webpack_require__( /*! ./203-Text.Matches.js */ "./src/200-Text/203-Text.Matches.js" )( Liquicode ).Matches,

		ReplaceCharacters: __webpack_require__( /*! ./210-Text.ReplaceCharacters.js */ "./src/200-Text/210-Text.ReplaceCharacters.js" )( Liquicode ).ReplaceCharacters,
		ReplaceText: __webpack_require__( /*! ./211-Text.ReplaceText.js */ "./src/200-Text/211-Text.ReplaceText.js" )( Liquicode ).ReplaceText,
		FindBetween: __webpack_require__( /*! ./213-Text.FindBetween.js */ "./src/200-Text/213-Text.FindBetween.js" )( Liquicode ).FindBetween,
		ReplaceBetween: __webpack_require__( /*! ./214-Text.ReplaceBetween.js */ "./src/200-Text/214-Text.ReplaceBetween.js" )( Liquicode ).ReplaceBetween,

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
		StringA = Liquicode.Types.Coerce( StringA, _Schema.Parameters.StringA , { coerce_values: true, throw_errors: true });
		StringB = Liquicode.Types.Coerce( StringB, _Schema.Parameters.StringB , { coerce_values: true, throw_errors: true });
		CaseSensitive = Liquicode.Types.Coerce( CaseSensitive, _Schema.Parameters.CaseSensitive, { coerce_values: true, throw_errors: true } );

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
		Text = Liquicode.Types.Coerce( Text ).ToString();
		Pattern = Liquicode.Types.Coerce( Pattern ).ToString();

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
		Text = Liquicode.Types.Coerce( Text ).ToString();
		SearchCharacters = Liquicode.Types.Coerce( SearchCharacters ).ToString();
		ReplacementText = Liquicode.Types.Coerce( ReplacementText ).ToString();
		MaxTimes = Liquicode.Types.Coerce( MaxTimes ).ToNumber();

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

/***/ "./src/200-Text/211-Text.ReplaceText.js":
/*!**********************************************!*\
  !*** ./src/200-Text/211-Text.ReplaceText.js ***!
  \**********************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '211',
	member_of: 'Text',
	name: 'ReplaceText',
	type: 'function',
	returns: 'string',
	description: ``,
	Parameters: {
		Text: {
			name: 'Text',
			type: 'string',
			required: true,
			default: '',
		},
		SearchText: {
			name: 'SearchText',
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
			required: false,
			default: 1,
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function ReplaceText
	 * @returns {string}
	 * @param {string} Text
	 * @param {string} SearchText
	 * @param {string} ReplacementText
	*/
	//-end-jsdoc-----------------------------------------------------------


	function ReplaceText( Text, SearchText, ReplacementText, MaxTimes ) 
	{
		// // Validate Parameters
		// Text = Liquicode.Types.Coerce( Text ).ToString();
		// SearchText = Liquicode.Types.Coerce( SearchText ).ToString();
		// ReplacementText = Liquicode.Types.Coerce( ReplacementText ).ToString();
		// return Text.split( SearchText ).join( ReplacementText );

		if ( typeof Text !== 'string' ) { throw new Error( `The parameter [Text] is required and must be a string.` ); }
		if ( typeof SearchText !== 'string' ) { throw new Error( `The parameter [SearchText] is required and must be a string.` ); }
		if ( typeof ReplacementText !== 'string' ) { throw new Error( `The parameter [ReplacementText] is required and must be a string.` ); }
		if ( MaxTimes === undefined ) { MaxTimes = 1; }
		if ( typeof MaxTimes !== 'number' ) { throw new Error( `The parameter [MaxTimes] is optional but must be a number.` ); }

		let text = Text;
		let replacement_count = 0;
		while ( true )
		{
			if ( ( MaxTimes >= 0 ) && ( replacement_count >= MaxTimes ) ) { break; }
			let found_index = text.indexOf( SearchText );
			if ( found_index < 0 ) { break; }
			text = `${text.substring( 0, found_index )}${ReplacementText}${text.substring( found_index + SearchText.length )}`;
			replacement_count++;
		}

		return text;
	}

	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		ReplaceText: ReplaceText,
	};
};


/***/ }),

/***/ "./src/200-Text/213-Text.FindBetween.js":
/*!**********************************************!*\
  !*** ./src/200-Text/213-Text.FindBetween.js ***!
  \**********************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '213',
	member_of: 'Text',
	name: 'FindBetween',
	type: 'function',
	returns: 'string',
	returns_description: 'The text found between StartText and EndText.',
	summary: 'Search a string and return the text found between StartText and EndText.',
	description: `
This function searches a string for StartText and EndText and returns all text found between the two.

If StartText is missing, then the search will return all text up to the found EndText.

If EndText is missing, then the search will return all text found after StartText.

If both StartText and EndText are missing, then the entire Text string will be returned.

If StartText or EndText are not found within Text, then a \`null\` is returned.

`,
	Parameters: {
		Text: {
			name: 'Text',
			type: 'string',
			required: true,
			default: '',
		},
		StartText: {
			name: 'StartText',
			type: 'string',
			required: false,
			default: '',
		},
		EndText: {
			name: 'EndText',
			type: 'string',
			required: false,
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
	 * @function ReplaceText
	 * @returns {string}
	 * @param {string} Text
	 * @param {string} SearchText
	 * @param {string} ReplacementText
	*/
	//-end-jsdoc-----------------------------------------------------------


	function FindBetween( Text, StartText, EndText ) 
	{
		if ( typeof Text !== 'string' ) { throw new Error( `The parameter [Text] is required and must be a string.` ); }
		if ( ( StartText === undefined ) || ( StartText === null ) ) { StartText = ''; }
		if ( ( EndText === undefined ) || ( EndText === null ) ) { EndText = ''; }
		if ( typeof StartText !== 'string' ) { throw new Error( `The parameter [StartText] is optional but must be a string.` ); }
		if ( typeof EndText !== 'string' ) { throw new Error( `The parameter [EndText] is optional but must be a string.` ); }

		// Find StartText
		let start_text_begin = 0;
		if ( StartText.length ) { start_text_begin = Text.indexOf( StartText ); }
		if ( start_text_begin < 0 ) { return null; }

		// Find EndText
		let end_text_begin = Text.length;
		if ( EndText.length ) { end_text_begin = Text.indexOf( EndText, start_text_begin + StartText.length ); }
		if ( end_text_begin < 0 ) { return null; }

		let found_text = Text.substring( start_text_begin + StartText.length, end_text_begin );
		return found_text;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		FindBetween: FindBetween,
	};
};


/***/ }),

/***/ "./src/200-Text/214-Text.ReplaceBetween.js":
/*!*************************************************!*\
  !*** ./src/200-Text/214-Text.ReplaceBetween.js ***!
  \*************************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '214',
	member_of: 'Text',
	name: 'ReplaceBetween',
	type: 'function',
	returns: 'integer',
	returns_description: 'The new string with replacements performed.',
	summary: 'Search a string for StartText and EndText and replace the text found between the two.',
	description: `
This function searches a string for StartText and EndText and replaces all text found between the two.

If StartText is missing, then all text found up to EndText will be replaced.

If EndText is missing, then all text found after StartText will be replaced.

If both StartText and EndText are missing, then the entire Text string will be replaced.

If StartText or EndText are not found within Text, then this function returns \`0\` to indicate that no replacements were performed.

The MaxTimes parameter specifies the maximum number of replacements to perform.
If MaxTimes is \`-1\`, then all possible replacements will be made throughout Text.
`,
	Parameters: {
		Text: {
			name: 'Text',
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
		StartText: {
			name: 'StartText',
			type: 'string',
			required: false,
			default: '',
		},
		EndText: {
			name: 'EndText',
			type: 'string',
			required: false,
			default: '',
		},
		MaxTimes: {
			name: 'MaxTimes',
			type: 'number',
			required: false,
			default: 1,
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function ReplaceText
	 * @returns {string}
	 * @param {string} Text
	 * @param {string} SearchText
	 * @param {string} ReplacementText
	*/
	//-end-jsdoc-----------------------------------------------------------


	function ReplaceBetween( Text, ReplacementText, StartText, EndText, MaxTimes ) 
	{
		if ( typeof Text !== 'string' ) { throw new Error( `The parameter [Text] is required and must be a string.` ); }
		if ( typeof ReplacementText !== 'string' ) { throw new Error( `The parameter [ReplacementText] is required and must be a string.` ); }
		if ( ( StartText === undefined ) || ( StartText === null ) ) { StartText = ''; }
		if ( ( EndText === undefined ) || ( EndText === null ) ) { EndText = ''; }
		if ( typeof StartText !== 'string' ) { throw new Error( `The parameter [StartText] is optional but must be a string.` ); }
		if ( typeof EndText !== 'string' ) { throw new Error( `The parameter [EndText] is optional but must be a string.` ); }
		if ( MaxTimes === undefined ) { MaxTimes = 1; }
		if ( typeof MaxTimes !== 'number' ) { throw new Error( `The parameter [MaxTimes] is optional but must be a number.` ); }

		let text = Text;
		let replacement_count = 0;
		while ( true )
		{
			if ( ( MaxTimes >= 0 ) && ( replacement_count >= MaxTimes ) ) { break; }
			let found_text = Liquicode.Text.FindBetween( text, StartText, EndText );
			if ( found_text === null ) { break; }
			text = Liquicode.Text.ReplaceText( text, `${StartText}${found_text}${EndText}`, `${StartText}${ReplacementText}${EndText}`, 1 );
			replacement_count++;
		}

		return text;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		ReplaceBetween: ReplaceBetween,
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
		Phrase = Liquicode.Types.Coerce( Phrase ).ToString();
		Delimiters = Liquicode.Types.Coerce( Delimiters ).ToString();

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
		Phrase = Liquicode.Types.Coerce( Phrase ).ToString();
		Delimiters = Liquicode.Types.Coerce( Delimiters ).ToString();

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
		Phrase = Liquicode.Types.Coerce( Phrase ).ToString();
		Delimiters = Liquicode.Types.Coerce( Delimiters ).ToString();

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
		Phrase = Liquicode.Types.Coerce( Phrase ).ToString();
		Delimiters = Liquicode.Types.Coerce( Delimiters ).ToString();

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

/***/ "./src/300-Shapes/300-Shapes.js":
/*!**************************************!*\
  !*** ./src/300-Shapes/300-Shapes.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {




//---------------------------------------------------------------------
let Schema = {
	id: '300',
	name: 'Shapes',
	type: 'namespace',
	summary: 'Functions for manipulating data in different shapes.',
};


//-start-jsdoc---------------------------------------------------------
/**
 * @public
 * @namespace Shapes
 * @summary Functions for manipulating data in different shapes.
*/
//-end-jsdoc-----------------------------------------------------------


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{
	return {
		_Schema: Schema,

		Matrix: __webpack_require__( /*! ./310-Shapes.Matrix.js */ "./src/300-Shapes/310-Shapes.Matrix.js" )( Liquicode ).Matrix,

	};
};



/***/ }),

/***/ "./src/300-Shapes/310-Shapes.Matrix.js":
/*!*********************************************!*\
  !*** ./src/300-Shapes/310-Shapes.Matrix.js ***!
  \*********************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '310',
	member_of: 'Shapes',
	name: 'Matrix',
	type: 'function',
	returns: 'object',
	returns_summary: 'Returns a new Matrix object.',
	summary: 'Matrix stores a two-dimensional jagged array and exposes manipulation functions.',
	description: `
A Matrix object is essentially a two-dimensional array (an array of arrays).
This function will create and return a new Matrix object.


***Values Parameter***

You can specify the initial contents of the Matrix with the Values parameter.
If Values is an array of arrays, then Matrix will contain those values.
If Values is a one-dimensional array, then Matrix will have a single row reflecting those values.
If Values is an integer, then Matrix will be created with that number of blank rows.

Note that the only way to create a new Matrix with no rows in it is: \`Shapes.Matrix( 0, Options )\`


***Options Parameter***

The Options parameter is an options object:
~~~javascript
Options = {
	default_value: null,    // A default value to use when no other value exists.
	clone_values: true,     // If true, any values read from or written to the Matrix are cloned first.
}
~~~

The \`clone_values\` option is very important.
It is initialliy set to true, providing the safest and most sensible operation.
A performance improvement can be had by setting this to false;
However, unintended consequences may occur if you are not careful.
Alsa, this is a valid intended consequence if you want to use Matrix to quickly manipulate an existing array.

For example:
~~~javascript
let test_array = [
	[ 1, 2, 3, 4 ],
	[ 5, 6, 7, 8 ],
];
// test_array.length == 2
// Encapsulate the array in a matrix.
let matrix = Liquicode.Shapes.Matrix( test_array, { clone_values: false } );
// Append a row to the matrix.
matrix.AppendRows( [ 'A', 'B', 'C' ] );
// Since test_array was not cloned first, the new row also appears in test_array.
// test_array.length == 3 !!!
~~~


***How It Works***

The Matrix object contains a \`RowData\` member which is an array of arrays that contains the values for the matrix.
This is maintained as a jagged array, meaning that each row of the matrix may be of different lengths.
~~~javascript
[	// Matrix maintains values in a jagged array:
	[ 1, 2, 3, 4 ],
	[ 1, 2, 3 ],
	[ 1, 2, 3, 4, 5 ],
]
~~~

When calling the \`AppendColumns\`, \`InsertColumns\`, \`SetColumn\`, or \`SetValue\` functions,
it may be necessary for the matrix to fill out the columns of shorter rows so that the target column exists.
For example, appending a blank column (\`AppendColumns()\`) to the matrix above would yield:
~~~javascript
[	// Matrix fills columns with
	// default values as needed:
	[ 1, 2, 3, 4,    null, null ],
	[ 1, 2, 3, null, null, null ],
	[ 1, 2, 3, 4,    5,    null ],
]
~~~
You can change the value used to fill blank columns by changing \`Option.default_value\`.


***Cell Addressing***

When working with Matrix, you will usually need to identify a particular Row or Column to work with.
Matrix supports three types of addressing modes:

- 1) A zero-based index used as a row/column index.
This index must be greater than or equal to zero and less than the extent (i.e. the RowCount or ColumnCount).

- 2) A negative index that serves as an offset from the extent (e.g. -1 = RowCount - 1).
This type of index must be between -extent and -1, inclusive.

- 3) A spreadsheet style address (e.g. 'A1', 'B2', etc.).
This type of address has letters component which indicates a column.
This is followed by a digits component that is a one-based row number.


***Matrix Functions***

The Matrix object also has a number of functions which allow you to manipulate the Matrix object.

- Addressing Functions:
	These are utility functions that assist when working with the spreadsheet style of addressing.
	These functions are used internally by Matrix.
	They do not consider the validity of any particular address or index within the current Matrix.

	- \`IsValidAddress( Address )\`:
		Returns \`true\` if Address is a valid address, otherwise \`false\`.
		A valid address must contain a column component in letters ('AB') and a row component in digits ('12').
		This function determines only if the Address parameter is a properly formatted address,
		regardless if the address lies outside the bounds of this particular Matrix.

	- \`NumberToLetters( Number )\`:
		Returns the letters component of an address for any positive number (e.g. 1='A', 2='B', 28='AB', etc.).

	- \`LettersToNumber( Address )\`:
		Converts the letters component of an address to a positive number.
		Address is a string that starts with, or is entirely composed of, letters.

- Row Functions:
	
	- \`RowIndexOf( Address )\`:
	Will return a valid row index for this Matrix from the given Address.
	Address can represent any of the three addressing styles.

	- \`RowCount()\`:
	Returns the number of rows within the Matrix.

	- \`AppendRows( Values )\`:
	Appends one or more rows to the end of the Matrix.
	If Values is not supplied, then a blank row is appended.
	If Values is a one-dimensional array, then a single row is appended.
	If Values is a two-dimensional array, then multiple rows are appended.

	- \`InsertRows( Row, Values )\`:
	Inserts one or more rows within the Matrix, starting at the given Row address.
	If Values is not supplied, then a blank row is appended.
	If Values is a one-dimensional array, then a single row is appended.
	If Values is a two-dimensional array, then multiple rows are appended.
	Note that it is not possible to append a row to a Matrix by using this function.

	- \`DeleteRows( Row, Count )\`:
	Deletes one or more rows within the Matrix, starting at the given Row address.
	If Count is not supplied, then a single row is deleted.

	- \`GetRow( Row )\`:
	Returns a single row of values from the Matrix, at the given Row address.

	- \`SetRow( Row, Values )\`:
	Replaces a single row of values (a one-dimensional array) within the Matrix, at the given Row address.
	If Values is not supplied, then a blank row is set at that location.

- Column Functions:

	- \`ColumnIndexOf( Address )\`:
	Will return a valid column index for this Matrix from the given Address.
	Address can represent any of the three addressing styles.

	- \`ColumnCount()\`:
	Returns the number of columns within the Matrix.

	- \`AppendColumns( Values )\`:
	Appends one or more columns to the end of the Matrix.
	If Values is not supplied, then a blank column is appended.
	If Values is a one-dimensional array, then a single column is appended.
	If Values is a two-dimensional array, then multiple columns are appended.

	- \`InsertColumns( Column, Values )\`:
	Inserts one or more columns within the Matrix, starting at the given Column address.
	If Values is not supplied, then a blank column is appended.
	If Values is a one-dimensional array, then a single column is appended.
	If Values is a two-dimensional array, then multiple columns are appended.
	Note that it is not possible to append a column to a Matrix by using this function.

	- \`DeleteColumns( Column, Count )\`:
	Deletes one or more columns within the Matrix, starting at the given Column address.
	If Count is not supplied, then a single column is deleted.

	- \`GetColumn( Column )\`:
	Returns a single column of values from the Matrix, at the given Column address.

	- \`SetColumn( Column, Values )\`:
	Replaces a single column of values (a one-dimensional array) within the Matrix, at the given Column address.
	If Values is not supplied, then a blank column is set at that location.

- Value Functions:

	- \`GetValue( Row, Column )\`:
	Returns a single value located at Row and Column within the Matrix.
	Row can be a string address, in which case the Column parameter is omitted.

	- \`SetValue( Row, Column, Value )\`:
	Sets a single value located at Row and Column within the Matrix.
	Row can be a string address, in which case the Column parameter is omitted.
	
	- \`GetMatrix( Row, Column, RowCount, ColumnCount )\`:
	Constructs a new Matrix of values from within the called Matrix.
	Values are taken starting at the location described by Row and Column and extending for RowCount rows and ColumnCount columns.
		- You can call this using four parameters: \`GetMatrix( Row, Column, RowCount, ColumnCount )\`
		- You can call this using three parameters: \`GetMatrix( Address, RowCount, ColumnCount )\`
		- You can call this using two parameters: \`GetMatrix( Address, Size )\`

	- \`SetMatrix( Row, Column, Matrix )\`:
	Sets a matrix of values starting at Row and Column.

- Table Functions:

	- \`Clone()\`:
	Return a clone of this matrix.
	The clone will contain a copy of this matrix's data and options.

	- \`Transpose()\`:
	Return a copy of this matrix with its rows and column transposed.

	- \`Join( AtColumn, JoinType, JoinMatrix, MatrixColumn )\`:
	Return a new matrix by joining this matrix with another one.
	The join is produced by matching column values between the two matrices.
	The different supported join types are: 'inner', 'left', 'right', and 'full'.

`,
	Parameters: {
		Values: {
			name: 'Values',
			type: 'object',
			required: true,
			default: [ [] ],
			description: 'One of: a two-dimensional array of arrays, a one-dimensional array of values, or an integer.',
		},
		Options: {
			name: 'Options',
			type: 'object',
			required: false,
			default: {},
			description: 'Set of options controlling Matrix operation.',
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function Matrix
	 * @returns {object}
	 * @summary Matrix stores a two-dimensional jagged array and exposes manipulation functions.
	 * @description
	 * 
A Matrix object is essentially a two-dimensional array (an array of arrays).
This function will create and return a new Matrix object.


***Values Parameter***

You can specify the initial contents of the Matrix with the Values parameter.
If Values is an array of arrays, then Matrix will contain those values.
If Values is a one-dimensional array, then Matrix will have a single row reflecting those values.
If Values is an integer, then Matrix will be created with that number of blank rows.

Note that the only way to create a new Matrix with no rows in it is: `Shapes.Matrix( 0, Options )`


***Options Parameter***

The Options parameter is an options object:
~~~javascript
Options = {
	default_value: null,    // A default value to use when no other value exists.
	clone_values: true,     // If true, any values read from or written to the Matrix are cloned first.
}
~~~

The `clone_values` option is very important.
It is initialliy set to true, providing the safest and most sensible operation.
A performance improvement can be had by setting this to false;
However, unintended consequences may occur if you are not careful.
Alsa, this is a valid intended consequence if you want to use Matrix to quickly manipulate an existing array.

For example:
~~~javascript
let test_array = [
	[ 1, 2, 3, 4 ],
	[ 5, 6, 7, 8 ],
];
// test_array.length == 2
// Encapsulate the array in a matrix.
let matrix = Liquicode.Shapes.Matrix( test_array, { clone_values: false } );
// Append a row to the matrix.
matrix.AppendRows( [ 'A', 'B', 'C' ] );
// Since test_array was not cloned first, the new row also appears in test_array.
// test_array.length == 3 !!!
~~~


***How It Works***

The Matrix object contains a `RowData` member which is an array of arrays that contains the values for the matrix.
This is maintained as a jagged array, meaning that each row of the matrix may be of different lengths.
~~~javascript
[	// Matrix maintains values in a jagged array:
	[ 1, 2, 3, 4 ],
	[ 1, 2, 3 ],
	[ 1, 2, 3, 4, 5 ],
]
~~~

When calling the `AppendColumns`, `InsertColumns`, `SetColumn`, or `SetValue` functions,
it may be necessary for the matrix to fill out the columns of shorter rows so that the target column exists.
For example, appending a blank column (`AppendColumns()`) to the matrix above would yield:
~~~javascript
[	// Matrix fills columns with
	// default values as needed:
	[ 1, 2, 3, 4,    null, null ],
	[ 1, 2, 3, null, null, null ],
	[ 1, 2, 3, 4,    5,    null ],
]
~~~
You can change the value used to fill blank columns by changing `Option.default_value`.


***Cell Addressing***

When working with Matrix, you will usually need to identify a particular Row or Column to work with.
Matrix supports three types of addressing modes:

- 1) A zero-based index used as a row/column index.
This index must be greater than or equal to zero and less than the extent (i.e. the RowCount or ColumnCount).

- 2) A negative index that serves as an offset from the extent (e.g. -1 = RowCount - 1).
This type of index must be between -extent and -1, inclusive.

- 3) A spreadsheet style address (e.g. 'A1', 'B2', etc.).
This type of address has letters component which indicates a column.
This is followed by a digits component that is a one-based row number.


***Matrix Functions***

The Matrix object also has a number of functions which allow you to manipulate the Matrix object.

- Addressing Functions:
	These are utility functions that assist when working with the spreadsheet style of addressing.
	These functions are used internally by Matrix.
	They do not consider the validity of any particular address or index within the current Matrix.

	- `IsValidAddress( Address )`:
		Returns `true` if Address is a valid address, otherwise `false`.
		A valid address must contain a column component in letters ('AB') and a row component in digits ('12').
		This function determines only if the Address parameter is a properly formatted address,
		regardless if the address lies outside the bounds of this particular Matrix.

	- `NumberToLetters( Number )`:
		Returns the letters component of an address for any positive number (e.g. 1='A', 2='B', 28='AB', etc.).

	- `LettersToNumber( Address )`:
		Converts the letters component of an address to a positive number.
		Address is a string that starts with, or is entirely composed of, letters.

- Row Functions:
	
	- `RowIndexOf( Address )`:
	Will return a valid row index for this Matrix from the given Address.
	Address can represent any of the three addressing styles.

	- `RowCount()`:
	Returns the number of rows within the Matrix.

	- `AppendRows( Values )`:
	Appends one or more rows to the end of the Matrix.
	If Values is not supplied, then a blank row is appended.
	If Values is a one-dimensional array, then a single row is appended.
	If Values is a two-dimensional array, then multiple rows are appended.

	- `InsertRows( Row, Values )`:
	Inserts one or more rows within the Matrix, starting at the given Row address.
	If Values is not supplied, then a blank row is appended.
	If Values is a one-dimensional array, then a single row is appended.
	If Values is a two-dimensional array, then multiple rows are appended.
	Note that it is not possible to append a row to a Matrix by using this function.

	- `DeleteRows( Row, Count )`:
	Deletes one or more rows within the Matrix, starting at the given Row address.
	If Count is not supplied, then a single row is deleted.

	- `GetRow( Row )`:
	Returns a single row of values from the Matrix, at the given Row address.

	- `SetRow( Row, Values )`:
	Replaces a single row of values (a one-dimensional array) within the Matrix, at the given Row address.
	If Values is not supplied, then a blank row is set at that location.

- Column Functions:

	- `ColumnIndexOf( Address )`:
	Will return a valid column index for this Matrix from the given Address.
	Address can represent any of the three addressing styles.

	- `ColumnCount()`:
	Returns the number of columns within the Matrix.

	- `AppendColumns( Values )`:
	Appends one or more columns to the end of the Matrix.
	If Values is not supplied, then a blank column is appended.
	If Values is a one-dimensional array, then a single column is appended.
	If Values is a two-dimensional array, then multiple columns are appended.

	- `InsertColumns( Column, Values )`:
	Inserts one or more columns within the Matrix, starting at the given Column address.
	If Values is not supplied, then a blank column is appended.
	If Values is a one-dimensional array, then a single column is appended.
	If Values is a two-dimensional array, then multiple columns are appended.
	Note that it is not possible to append a column to a Matrix by using this function.

	- `DeleteColumns( Column, Count )`:
	Deletes one or more columns within the Matrix, starting at the given Column address.
	If Count is not supplied, then a single column is deleted.

	- `GetColumn( Column )`:
	Returns a single column of values from the Matrix, at the given Column address.

	- `SetColumn( Column, Values )`:
	Replaces a single column of values (a one-dimensional array) within the Matrix, at the given Column address.
	If Values is not supplied, then a blank column is set at that location.

- Value Functions:

	- `GetValue( Row, Column )`:
	Returns a single value located at Row and Column within the Matrix.
	Row can be a string address, in which case the Column parameter is omitted.

	- `SetValue( Row, Column, Value )`:
	Sets a single value located at Row and Column within the Matrix.
	Row can be a string address, in which case the Column parameter is omitted.
	
	- `GetMatrix( Row, Column, RowCount, ColumnCount )`:
	Constructs a new Matrix of values from within the called Matrix.
	Values are taken starting at the location described by Row and Column and extending for RowCount rows and ColumnCount columns.
		- You can call this using four parameters: `GetMatrix( Row, Column, RowCount, ColumnCount )`
		- You can call this using three parameters: `GetMatrix( Address, RowCount, ColumnCount )`
		- You can call this using two parameters: `GetMatrix( Address, Size )`

	- `SetMatrix( Row, Column, Matrix )`:
	Sets a matrix of values starting at Row and Column.

- Table Functions:

	- `Clone()`:
	Return a clone of this matrix.
	The clone will contain a copy of this matrix's data and options.

	- `Transpose()`:
	Return a copy of this matrix with its rows and column transposed.

	- `Join( AtColumn, JoinType, JoinMatrix, MatrixColumn )`:
	Return a new matrix by joining this matrix with another one.
	The join is produced by matching column values between the two matrices.
	The different supported join types are: 'inner', 'left', 'right', and 'full'.


	 * @param {object} Values
	 * One of: a two-dimensional array of arrays, a one-dimensional array of values, or an integer.
	 * @param {object} [Options={}]
	 * Set of options controlling Matrix operation.
	*/
	//-end-jsdoc-----------------------------------------------------------


	function Matrix( Values, Options )
	{
		// Validate the Values.
		if ( Liquicode.Types.IsFormat( Values, 'number:integer' ) ) 
		{
			// Pass an integer as an initial row count for the Matrix.
			let row_count = Values;
			Values = [];
			for ( let row_index = 0; row_index < row_count; row_index++ )
			{
				Values.push( [] );
			}
		}
		else if ( Liquicode.Types.IsFormat( Values, 'object:array-array' ) ) 
		{
			// Pass an array of arrays as values in the Matrix.
			/* Do Nothing */
		}
		else if ( Liquicode.Types.IsFormat( Values, 'object:array' ) ) 
		{
			// Pass a one-dimensional array as a single row in the Matrix.
			Values = [ Values ];
		}
		else 
		{
			throw new Error( `The Values parameter must be one of: an array of arrays, a single row of values, or a row count.` );
		}

		// Validate the Options.
		if ( Options === undefined ) { Options = {}; }
		Options = Liquicode.Object.Merge(
			{
				default_value: null,
				clone_values: true,
			},
			Options );

		let matrix = {


			//---------------------------------------------------------------------
			RowData: JSON.parse( JSON.stringify( Values ) ),
			Options: JSON.parse( JSON.stringify( Options ) ),


			//=====================================================================
			//=====================================================================
			//
			//		ADDRESSING FUNCTIONS
			//
			//=====================================================================
			//=====================================================================


			//---------------------------------------------------------------------
			IsValidAddress: function ( Address )
			{
				if ( typeof Address !== 'string' ) { return false; }
				Address = Address.toUpperCase();
				let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
				let digits = '0123456789';
				let has_alpha = false;
				let has_numeric = false;
				for ( let index = 0; index < Address.length; index++ )
				{
					if ( !has_alpha )
					{
						if ( alphabet.indexOf( Address[ index ] ) < 0 ) { return false; } // Address must begin with an letter.
						has_alpha = true;
					}
					else
					{
						if ( alphabet.indexOf( Address[ index ] ) >= 0 )
						{
							if ( has_numeric ) { return false; } // Address can only have other digits after the first digit.
						}
						else if ( digits.indexOf( Address[ index ] ) >= 0 )
						{
							if ( !has_alpha ) { return false; } // Address must begin with a letter.
							has_numeric = true;
						}
						else
						{
							return false; // Address can only have letters and digits.
						}
					}
				}
				if ( !has_alpha ) { return false; }		// Address must contain letters followed by digits.
				if ( !has_numeric ) { return false; }	// Address must contain letters followed by digits.
				return true;
			},


			//---------------------------------------------------------------------
			NumberToLetters: function ( Number )
			{
				if ( !Liquicode.Types.IsFormat( Number, 'number:integer' ) ) { throw new Error( `The Number parameter must be a positive integer.` ); }
				if ( Number <= 0 ) { throw new Error( `The Number parameter must be a positive integer.` ); }
				// FROM: https://cwestblog.com/2013/09/05/javascript-snippet-convert-number-to-column-name/
				for ( var address = '', a = 1, b = 26; ( Number -= a ) >= 0; a = b, b *= 26 ) 
				{
					address = String.fromCharCode( parseInt( ( Number % b ) / a ) + 65 ) + address;
				}
				return address;
			},


			//---------------------------------------------------------------------
			LettersToNumber: function ( Address )
			{
				if ( !Liquicode.Types.IsFormat( Address, 'string:string' ) ) { throw new Error( `The Address parameter must be a string of letters.` ); }
				Address = Address.toUpperCase();
				let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
				let letters = '';
				let number = 0;
				for ( let index = 0; index < Address.length; index++ )
				{
					let ich = alphabet.indexOf( Address[ index ] );
					if ( ich < 0 ) { break; }
					letters += Address[ index ];
				}
				for ( let index = 0; index < letters.length; index++ )
				{
					let ich = alphabet.indexOf( Address[ index ] );
					if ( ich < 0 ) { break; }
					number += ( ich + 1 ) * ( alphabet.length ** ( letters.length - ( index + 1 ) ) );
				}
				return number;
			},


			//=====================================================================
			//=====================================================================
			//
			//		MATRIX ROW FUNCTIONS
			//
			//=====================================================================
			//=====================================================================


			//---------------------------------------------------------------------
			RowIndexOf: function ( AddressOrIndex )
			{
				let row_index = null;
				if ( typeof AddressOrIndex === 'string' )
				{
					row_index = Number( AddressOrIndex );
					if ( isNaN( row_index ) )
					{
						if ( !this.IsValidAddress( AddressOrIndex ) ) { throw new Error( `The value "${AddressOrIndex}" is not a valid address.` ); }
						for ( let char_index = 0; char_index < AddressOrIndex.length; char_index++ )
						{
							if ( '0123456789'.indexOf( AddressOrIndex[ char_index ] ) >= 0 )
							{
								row_index = Number( AddressOrIndex.substring( char_index ) );
								row_index--; // Convert from row number to row index.
								break;
							}
						}
					}
					if ( isNaN( row_index ) )
					{
						throw new Error( `Unable to determine the row index of "${AddressOrIndex}".` );
					}
				}
				else if ( typeof AddressOrIndex === 'number' )
				{
					row_index = Math.floor( AddressOrIndex );
				}
				else
				{
					throw new Error( `The AddressOrIndex parameter must be a string address (e.g. "C2") or an integer.` );
				}
				let row_count = this.RowData.length;
				if ( row_index >= row_count ) { throw new Error( `The row index cannot be greater than or equal to the row count.` ); }
				if ( row_index < 0 ) { row_index += row_count; }
				if ( row_index < 0 ) { throw new Error( `The row index cannot be less than zero.` ); }
				return row_index;
			},


			//---------------------------------------------------------------------
			RowCount: function ()
			{
				return this.RowData.length;
			},


			//---------------------------------------------------------------------
			AppendRows: function ( Values )
			{
				if ( Values === undefined ) { Values = []; }
				if ( !Liquicode.Types.IsFormat( Values, 'object:array' ) ) { throw new Error( `The Values parameter must be an array of values.` ); }
				if ( this.Options.clone_values )
				{
					Values = JSON.parse( JSON.stringify( Values ) );
				}
				if ( Liquicode.Types.IsFormat( Values, 'object:array-array' ) ) 
				{
					for ( let row_index = 0; row_index < Values.length; row_index++ )
					{
						this.RowData.push( Values[ row_index ] );
					}
				}
				else
				{
					this.RowData.push( Values );
				}
				return;
			},


			//---------------------------------------------------------------------
			InsertRows: function ( Row, Values )
			{
				if ( Values === undefined ) { Values = []; }
				if ( !Liquicode.Types.IsFormat( Values, 'object:array' ) ) { throw new Error( `The Values parameter must be an array of values.` ); }
				let at_row_index = this.RowIndexOf( Row );
				if ( this.Options.clone_values )
				{
					Values = JSON.parse( JSON.stringify( Values ) );
				}
				if ( Liquicode.Types.IsFormat( Values, 'object:array-array' ) ) 
				{
					for ( let row_index = 0; row_index < Values.length; row_index++ )
					{
						this.RowData.splice( at_row_index + row_index, 0, Values[ row_index ] );
					}
				}
				else
				{
					this.RowData.splice( at_row_index, 0, Values );
				}
				return;
			},


			//---------------------------------------------------------------------
			DeleteRows: function ( Row, Count ) 
			{
				if ( Count === undefined ) { Count = 1; }
				if ( !Liquicode.Types.IsFormat( Count, 'number:integer' ) ) { throw new Error( `The RowCount parameter must be a positive integer.` ); }
				if ( Count <= 0 ) { throw new Error( `The RowCount parameter must be a positive integer.` ); }
				let row_index = this.RowIndexOf( Row );
				this.RowData.splice( row_index, Count );
				return;
			},


			//---------------------------------------------------------------------
			GetRow: function ( Row ) 
			{
				let at_row_index = this.RowIndexOf( Row );
				let values = this.RowData[ at_row_index ];
				if ( this.Options.clone_values )
				{
					values = JSON.parse( JSON.stringify( values ) );
				}
				return values;
			},


			//---------------------------------------------------------------------
			SetRow: function ( Row, Values )
			{
				if ( Values === undefined ) { Values = []; }
				if ( !Liquicode.Types.IsFormat( Values, 'object:array' ) ) { throw new Error( `The Values parameter must be an array of values.` ); }
				let at_row_index = this.RowIndexOf( Row );
				if ( this.Options.clone_values )
				{
					Values = JSON.parse( JSON.stringify( Values ) );
				}
				this.RowData[ at_row_index ] = Values;
				return;
			},


			//=====================================================================
			//=====================================================================
			//
			//		MATRIX COLUMN FUNCTIONS
			//
			//=====================================================================
			//=====================================================================


			//---------------------------------------------------------------------
			ColumnIndexOf: function ( AddressOrIndex ) 
			{
				let column_index = null;
				if ( typeof AddressOrIndex === 'string' )
				{
					column_index = Number( AddressOrIndex );
					if ( isNaN( column_index ) )
					{
						if ( !this.IsValidAddress( AddressOrIndex ) ) { throw new Error( `The value "${AddressOrIndex}" is not a valid address.` ); }
						column_index = this.LettersToNumber( AddressOrIndex );
						if ( column_index === 0 ) { throw new Error( `The AddressOrIndex parameter must be a string address (e.g. "C2") or an integer.` ); }
						column_index--; // Convert from column number to column index.
					}
				}
				else if ( typeof AddressOrIndex === 'number' )
				{
					column_index = Math.floor( AddressOrIndex );
				}
				else
				{
					throw new Error( `The AddressOrIndex parameter must be a string address (e.g. "C2") or an integer.` );
				}
				let column_count = this.ColumnCount();
				if ( column_index >= column_count ) { throw new Error( `The column index cannot be greater than or equal to the column count.` ); }
				if ( column_index < 0 ) { column_index += column_count; }
				if ( column_index < 0 ) { throw new Error( `The column index cannot be less than zero.` ); }
				return column_index;
			},


			//---------------------------------------------------------------------
			ColumnCount: function () 
			{
				let column_count = 0;
				for ( let row_index = 0; row_index < this.RowData.length; row_index++ )
				{
					if ( column_count < this.RowData[ row_index ].length ) 
					{
						column_count = this.RowData[ row_index ].length;
					}
				}
				return column_count;
			},


			//---------------------------------------------------------------------
			AppendColumns: function ( Values )
			{
				if ( Values === undefined ) { Values = []; }
				if ( !Liquicode.Types.IsFormat( Values, 'object:array' ) ) { throw new Error( `The Values parameter must be an array of values.` ); }
				if ( !Liquicode.Types.IsFormat( Values, 'object:array-array' ) ) { Values = [ Values ]; }
				let column_count = this.ColumnCount();
				for ( let row_index = 0; row_index < this.RowData.length; row_index++ )
				{
					let row_values = this.RowData[ row_index ];
					while ( row_values.length < column_count )
					{
						row_values.push( this.Options.default_value );
					}
					for ( let column_index = 0; column_index < Values.length; column_index++ )
					{
						let column_values = Values[ column_index ];
						let value = this.Options.default_value;
						if ( row_index < column_values.length )
						{
							value = column_values[ row_index ];
							if ( this.Options.clone_values )
							{
								value = JSON.parse( JSON.stringify( value ) );
							}
						}
						row_values.push( value );
					}
				}
				return;
			},


			//---------------------------------------------------------------------
			InsertColumns: function ( Column, Values ) 
			{
				if ( Values === undefined ) { Values = []; }
				if ( !Liquicode.Types.IsFormat( Values, 'object:array' ) ) { throw new Error( `The Values parameter must be an array of values.` ); }
				if ( !Liquicode.Types.IsFormat( Values, 'object:array-array' ) ) { Values = [ Values ]; }
				let at_column_index = this.ColumnIndexOf( Column );
				for ( let row_index = 0; row_index < this.RowData.length; row_index++ )
				{
					let row_values = this.RowData[ row_index ];
					while ( row_values.length <= at_column_index )
					{
						row_values.push( this.Options.default_value );
					}
					for ( let column_index = 0; column_index < Values.length; column_index++ )
					{
						let column_values = Values[ column_index ];
						let value = this.Options.default_value;
						if ( row_index < column_values.length )
						{
							value = column_values[ row_index ];
							if ( this.Options.clone_values )
							{
								value = JSON.parse( JSON.stringify( value ) );
							}
						}
						row_values.splice( ( at_column_index + column_index ), 0, value );
					}
				}
				return;
			},


			//---------------------------------------------------------------------
			DeleteColumns: function ( Column, ColumnCount ) 
			{
				if ( ColumnCount === undefined ) { ColumnCount = 1; }
				if ( !Liquicode.Types.IsFormat( ColumnCount, 'number:integer' ) ) { throw new Error( `The ColumnCount parameter must be a positive integer.` ); }
				if ( ColumnCount <= 0 ) { throw new Error( `The ColumnCount parameter must be a positive integer.` ); }
				let at_column_index = this.ColumnIndexOf( Column );
				for ( let row_index = 0; row_index < this.RowData.length; row_index++ )
				{
					let row_values = this.RowData[ row_index ];
					if ( row_values.length > at_column_index )
					{
						row_values.splice( at_column_index, ColumnCount );
					}
				}
				return;
			},


			//---------------------------------------------------------------------
			GetColumn: function ( Column ) 
			{
				let values = [];
				let at_column_index = this.ColumnIndexOf( Column );
				for ( let row_index = 0; row_index < this.RowData.length; row_index++ )
				{
					let row_values = this.RowData[ row_index ];
					let value = this.Options.default_value;
					if ( at_column_index < row_values.length )
					{
						value = row_values[ at_column_index ];
						if ( this.Options.clone_values )
						{
							value = JSON.parse( JSON.stringify( value ) );
						}
					}
					values.push( value );
				}
				return values;
			},


			//---------------------------------------------------------------------
			SetColumn: function ( Column, Values ) 
			{
				if ( Values === undefined ) { Values = []; }
				if ( !Liquicode.Types.IsFormat( Values, 'object:array' ) ) { throw new Error( `The Values parameter must be an array of values.` ); }
				let at_column_index = this.ColumnIndexOf( Column );
				for ( let row_index = 0; row_index < this.RowData.length; row_index++ )
				{
					let row_values = this.RowData[ row_index ];
					while ( row_values.length <= at_column_index )
					{
						row_values.push( this.Options.default_value );
					}
					let value = this.Options.default_value;
					if ( row_index < Values.length )
					{
						value = Values[ row_index ];
						if ( this.Options.clone_values )
						{
							value = JSON.parse( JSON.stringify( value ) );
						}
					}
					row_values[ at_column_index ] = value;
				}
				return;
			},


			//=====================================================================
			//=====================================================================
			//
			//		MATRIX VALUE FUNCTIONS
			//
			//=====================================================================
			//=====================================================================


			//---------------------------------------------------------------------
			GetValue: function ( Row, Column ) 
			{
				let at_row_index = null;
				let at_column_index = null;
				if ( ( typeof Row === 'string' ) && ( Column === undefined ) )
				{
					at_row_index = this.RowIndexOf( Row );
					at_column_index = this.ColumnIndexOf( Row );
				}
				else
				{
					at_row_index = this.RowIndexOf( Row );
					at_column_index = this.ColumnIndexOf( Column );
				}
				let row_values = this.RowData[ at_row_index ];
				let value = this.Options.default_value;
				if ( at_column_index < row_values.length )
				{
					value = row_values[ at_column_index ];
					if ( this.Options.clone_values )
					{
						value = JSON.parse( JSON.stringify( value ) );
					}
				}
				return value;
			},


			//---------------------------------------------------------------------
			SetValue: function ( Row, Column, Value ) 
			{
				let at_row_index = null;
				let at_column_index = null;
				if ( ( typeof Row === 'string' ) && ( Value === undefined ) )
				{
					at_row_index = this.RowIndexOf( Row );
					at_column_index = this.ColumnIndexOf( Row );
					Value = Column;
				}
				else
				{
					at_row_index = this.RowIndexOf( Row );
					at_column_index = this.ColumnIndexOf( Column );
				}
				if ( Value === undefined ) { Value = this.Options.default_value; }
				let row_values = this.RowData[ at_row_index ];
				while ( at_column_index >= row_values.length )
				{
					row_values.push( this.Options.default_value );
				}
				let value = Value;
				if ( this.Options.clone_values )
				{
					value = JSON.parse( JSON.stringify( value ) );
				}
				row_values[ at_column_index ] = value;
				return;
			},


			//---------------------------------------------------------------------
			GetMatrix: function ( Row, Column, RowCount, ColumnCount ) 
			{
				let at_row_index = null;
				let at_column_index = null;
				if ( ( typeof Row === 'string' ) && ( ColumnCount === undefined ) )
				{
					at_row_index = this.RowIndexOf( Row );
					at_column_index = this.ColumnIndexOf( Row );
					ColumnCount = RowCount;
					RowCount = Column;
				}
				else
				{
					at_row_index = this.RowIndexOf( Row );
					at_column_index = this.ColumnIndexOf( Column );
				}
				if ( RowCount === undefined ) { throw new Error( `The RowCount parameter is required.` ); }
				if ( ColumnCount === undefined ) { ColumnCount = RowCount; }
				let target_matrix = Liquicode.Shapes.Matrix( 0, this.Options );
				for ( let row_index = 0; row_index < RowCount; row_index++ )
				{
					if ( ( at_row_index + row_index ) >= this.RowData.length ) { break; }
					let source_values = this.GetRow( at_row_index + row_index );
					let target_values = [];
					for ( let column_index = 0; column_index < ColumnCount; column_index++ )
					{
						if ( ( at_column_index + column_index ) >= source_values.length ) { break; }
						target_values.push( source_values[ at_column_index + column_index ] );
					}
					target_matrix.AppendRows( target_values );
				}
				return target_matrix;
			},


			//---------------------------------------------------------------------
			SetMatrix: function ( Row, Column, Matrix ) 
			{
				let at_row_index = null;
				let at_column_index = null;
				if ( ( typeof Row === 'string' ) && ( Matrix === undefined ) )
				{
					at_row_index = this.RowIndexOf( Row );
					at_column_index = this.ColumnIndexOf( Row );
					Matrix = Column;
				}
				else
				{
					at_row_index = this.RowIndexOf( Row );
					at_column_index = this.ColumnIndexOf( Column );
				}
				if ( Matrix === undefined ) { throw new Error( `The Matrix parameter is required.` ); }
				if ( Matrix === null ) { throw new Error( `The Matrix parameter is required.` ); }
				let source_row_count = Matrix.RowCount();
				let source_column_count = Matrix.ColumnCount();
				for ( let row_index = 0; row_index < source_row_count; row_index++ )
				{
					for ( let column_index = 0; column_index < source_column_count; column_index++ )
					{
						let value = Matrix.GetValue( row_index, column_index );
						value = JSON.parse( JSON.stringify( value ) );
						this.SetValue( at_row_index + row_index, at_column_index + column_index, value );
					}
				}
				return;
			},


			//=====================================================================
			//=====================================================================
			//
			//		TABLE FUNCTIONS
			//
			//=====================================================================
			//=====================================================================


			//---------------------------------------------------------------------
			Clone: function () 
			{
				return Liquicode.Shapes.Matrix(
					JSON.parse( JSON.stringify( this.RowData ) ),
					JSON.parse( JSON.stringify( this.Options ) ),
				);
			},


			//---------------------------------------------------------------------
			Transpose: function () 
			{
				let new_matrix = Liquicode.Shapes.Matrix( 0 );
				let column_count = this.ColumnCount();
				for ( let column_index = 0; column_index < column_count; column_index++ )
				{
					let values = this.GetColumn( column_index );
					new_matrix.AppendRows( values );
				}
				return new_matrix;
			},


			//---------------------------------------------------------------------
			Join: function ( AtColumn, JoinType, RightMatrix, RightColumn ) 
			{
				// Get the left and right column counts.
				let left_column_count = this.ColumnCount();
				let right_column_count = RightMatrix.ColumnCount();

				// Get the left join column.
				let left_join_column = this.GetColumn( AtColumn );

				// Get the right join column.
				let right_join_column = RightMatrix.GetColumn( RightColumn );

				// Get the left values.
				let left_values = this.RowData;

				// Get the right values.
				let right_values = RightMatrix.RowData;

				// Build the join map.
				let join_map = [];
				JoinType = JoinType.toLowerCase();
				if ( JoinType === 'inner' )
				{
					left_join_column.forEach(
						( left_join_value, left_join_index ) =>
						{
							right_join_column.forEach(
								( right_join_value, right_join_index ) =>
								{
									if ( right_join_value === left_join_value )
									{
										join_map.push( { left: left_join_index, right: right_join_index } );
									}
								} );
						} );
				}
				else if ( JoinType === 'left' )
				{
					left_join_column.forEach(
						( left_join_value, left_join_index ) =>
						{
							let join_count = 0;
							right_join_column.forEach(
								( right_join_value, right_join_index ) =>
								{
									if ( right_join_value === left_join_value )
									{
										join_map.push( { left: left_join_index, right: right_join_index } );
										join_count++;
									}
								} );
							if ( !join_count ) { join_map.push( { left: left_join_index, right: null } ); }
						} );
				}
				else if ( JoinType === 'right' )
				{
					right_join_column.forEach(
						( right_join_value, right_join_index ) =>
						{
							let join_count = 0;
							left_join_column.forEach(
								( left_join_value, left_join_index ) =>
								{
									if ( right_join_value === left_join_value )
									{
										join_map.push( { left: left_join_index, right: right_join_index } );
										join_count++;
									}
								} );
							if ( !join_count ) { join_map.push( { left: null, right: right_join_index } ); }
						} );
				}
				else if ( JoinType === 'full' )
				{
					left_join_column.forEach(
						( left_join_value, left_join_index ) =>
						{
							let join_count = 0;
							right_join_column.forEach(
								( right_join_value, right_join_index ) =>
								{
									if ( right_join_value === left_join_value )
									{
										join_map.push( { left: left_join_index, right: right_join_index } );
										join_count++;
									}
								} );
							if ( !join_count ) { join_map.push( { left: left_join_index, right: null } ); }
						} );
					right_join_column.forEach(
						( right_join_value, right_join_index ) =>
						{
							let join_count = 0;
							left_join_column.forEach(
								( left_join_value, left_join_index ) =>
								{
									if ( right_join_value === left_join_value )
									{
										join_count++;
									}
								} );
							if ( !join_count ) { join_map.push( { left: null, right: right_join_index } ); }
						} );
				}
				else
				{
					throw new Error( `The [JoinType] parameter has an unknown value "${JoinType}".` );
				}

				// Join the data.
				let join_matrix = [];
				join_map.forEach(
					join =>
					{
						// let row_index = this.RowCount();
						let join_row = [];
						let has_values = false;

						for ( let index = 0; index < left_column_count; index++ )
						{
							if ( ( join.left !== null ) && ( index < left_values[ join.left ].length ) )
							{
								// Append left data values.
								join_row.push( left_values[ join.left ][ index ] );
								has_values = true;
							}
							else
							{
								join_row.push( this.Options.default_value );
							}
						}
						for ( let index = 0; index < right_column_count; index++ )
						{
							if ( ( join.right !== null ) && ( index < right_values[ join.right ].length ) )
							{
								// Append left data values.
								join_row.push( right_values[ join.right ][ index ] );
								has_values = true;
							}
							else
							{
								join_row.push( this.Options.default_value );
							}
						}
						if ( has_values )
						{
							join_matrix.push( join_row );
						}
					}
				);
				if ( this.Options.clone_values )
				{
					join_matrix = JSON.parse( JSON.stringify( join_matrix ) );
				}

				return Liquicode.Shapes.Matrix( join_matrix, this.Options );
			},

		};

		//---------------------------------------------------------------------
		// Assign the initial matrix values.
		if ( Options.clone_values )
		{
			Values = JSON.parse( JSON.stringify( Values ) );
		}
		matrix.RowData = Values;

		//---------------------------------------------------------------------
		// Return the new Matrix.
		return matrix;
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		Matrix: Matrix,
	};
};


/***/ }),

/***/ "./src/500-Parse/500-Parse.js":
/*!************************************!*\
  !*** ./src/500-Parse/500-Parse.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {




//---------------------------------------------------------------------
let Schema = {
	id: '500',
	name: 'Parse',
	type: 'namespace',
	summary: 'Functions for tokenizing text strings.',
};


//-start-jsdoc---------------------------------------------------------
/**
 * @public
 * @namespace Parse
 * @summary Functions for tokenizing text strings.
*/
//-end-jsdoc-----------------------------------------------------------


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{
	return {
		_Schema: Schema,
		TokenizeOptions: __webpack_require__( /*! ./501-Parse.TokenizeOptions.js */ "./src/500-Parse/501-Parse.TokenizeOptions.js" )( Liquicode ).TokenizeOptions,
		Tokenize: __webpack_require__( /*! ./502-Parse.Tokenize.js */ "./src/500-Parse/502-Parse.Tokenize.js" )( Liquicode ).Tokenize,
		DateParse: __webpack_require__( /*! ./510-Parse.DateParse.js */ "./src/500-Parse/510-Parse.DateParse.js" )( Liquicode ).DateParse,
	};
};



/***/ }),

/***/ "./src/500-Parse/501-Parse.TokenizeOptions.js":
/*!****************************************************!*\
  !*** ./src/500-Parse/501-Parse.TokenizeOptions.js ***!
  \****************************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let Schema = {
	id: '501',
	member_of: 'Parse',
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

/***/ "./src/500-Parse/502-Parse.Tokenize.js":
/*!*********************************************!*\
  !*** ./src/500-Parse/502-Parse.Tokenize.js ***!
  \*********************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let Schema = {
	id: '502',
	member_of: 'Parse',
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
		let tokenize_options = Liquicode.Parse.TokenizeOptions();
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

/***/ "./src/500-Parse/510-Parse.DateParse.js":
/*!**********************************************!*\
  !*** ./src/500-Parse/510-Parse.DateParse.js ***!
  \**********************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '011',
	member_of: 'Parse',
	name: 'DateParse',
	type: 'function',
	returns: 'object',
	returns_summary: 'Returns a \`DateParts\` object containing Date/Time detail.',
	description: [ `
Dates and times are funny little creatures.
`],
	Parameters: {
		Value: {
			name: 'Value',
			type: 'string',
			required: true,
		},
		TimeZoneOffset: {
			name: 'TimeZoneOffset',
			type: 'string',
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
	 * @function DateParse
	 * @returns {object}
	 * @description
	 * 
Dates and times are funny little creatures.

	 * @param {string} Value
	 * @param {string} [TimeZoneOffset="+0000"]
	*/
	//-end-jsdoc-----------------------------------------------------------


	//---------------------------------------------------------------------
	function DateParse( Value, TimeZoneOffset = '+0000' )
	{
		Value = Liquicode.Types.Coerce( Value ).ToString();

		// Prepare and validate the date string.
		Value = Value.toLowerCase().trim();
		if ( !Value ) { return get_date_parts( null, TimeZoneOffset ); }

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
		if ( !isNaN( Number( Value ) ) )
		{
			let s = Number( Value ).toString(); // Remove any noise.
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
			date = new Date( s );
			if ( !isNaN( date.getTime() ) ) { return get_date_parts( date, TimeZoneOffset ); }
		}

		// Test for ISO format: 2005-05-01T15:05:23.000Z
		if (
			( Value.length >= 24 )
			&& ( Value.substr( 4, 1 ) === '-' )
			&& ( Value.substr( 7, 1 ) === '-' )
			&& ( Value.substr( 10, 1 ) === 't' )
			&& ( Value.substr( 13, 1 ) === ':' )
			&& ( Value.substr( 16, 1 ) === ':' )
			&& ( Value.substr( 19, 1 ) === '.' )
			&& ( Value.substr( 23, 1 ) === 'z' )
		)
		{
			try { date = new Date( Value ); }
			catch ( e ) { }
			if ( date && !isNaN( date.getTime() ) ) { return get_date_parts( date, TimeZoneOffset ); }
			else { return get_date_parts( null, TimeZoneOffset ); }
		}

		// Test for ISO format (short): 2005-05-01T15:05:23Z
		if (
			( Value.length >= 20 )
			&& ( Value.substr( 4, 1 ) === '-' )
			&& ( Value.substr( 7, 1 ) === '-' )
			&& ( Value.substr( 10, 1 ) === 't' )
			&& ( Value.substr( 13, 1 ) === ':' )
			&& ( Value.substr( 16, 1 ) === ':' )
			&& ( Value.substr( 19, 1 ) === 'z' )
		)
		{
			try { date = new Date( Value ); }
			catch ( e ) { }
			if ( date && !isNaN( date.getTime() ) )
			{ return get_date_parts( date, TimeZoneOffset ); }
			else { return get_date_parts( null, TimeZoneOffset ); }
		}

		// We know its not a javascript supported format.
		// We have to do it the hard way.
		let tokens = tokenize_date( Value );
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
		DateParse: DateParse,
	};
};


/***/ }),

/***/ "./src/800-System/800-System.js":
/*!**************************************!*\
  !*** ./src/800-System/800-System.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {




//---------------------------------------------------------------------
let Schema = {
	id: '800',
	name: 'System',
	type: 'namespace',
	summary: 'File system and process functions. (nodejs only)',
};


//-start-jsdoc---------------------------------------------------------
/**
 * @public
 * @namespace System
 * @summary File system and process functions. (nodejs only)
*/
//-end-jsdoc-----------------------------------------------------------


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{
	return {
		_Schema: Schema,

		// File System
		AsyncVisitFiles: __webpack_require__( /*! ./810-System.AsyncVisitFiles.js */ "./src/800-System/810-System.AsyncVisitFiles.js" )( Liquicode ).AsyncVisitFiles,
		VisitFiles: __webpack_require__( /*! ./810-System.VisitFiles.js */ "./src/800-System/810-System.VisitFiles.js" )( Liquicode ).VisitFiles,
		CountFiles: __webpack_require__( /*! ./811-System.CountFiles.js */ "./src/800-System/811-System.CountFiles.js" )( Liquicode ).CountFiles,
		CountFolders: __webpack_require__( /*! ./812-System.CountFolders.js */ "./src/800-System/812-System.CountFolders.js" )( Liquicode ).CountFolders,
		CopyFolder: __webpack_require__( /*! ./813-System.CopyFolder.js */ "./src/800-System/813-System.CopyFolder.js" )( Liquicode ).CopyFolder,
		DeleteFolder: __webpack_require__( /*! ./814-System.DeleteFolder.js */ "./src/800-System/814-System.DeleteFolder.js" )( Liquicode ).DeleteFolder,
		EmptyFolder: __webpack_require__( /*! ./815-System.EmptyFolder.js */ "./src/800-System/815-System.EmptyFolder.js" )( Liquicode ).EmptyFolder,
		WithFileText: __webpack_require__( /*! ./816-System.WithFileText.js */ "./src/800-System/816-System.WithFileText.js" )( Liquicode ).WithFileText,

		// Process
		AsyncSleep: __webpack_require__( /*! ./820-System.AsyncSleep.js */ "./src/800-System/820-System.AsyncSleep.js" )( Liquicode ).AsyncSleep,
		ExecuteProcess: __webpack_require__( /*! ./821-System.ExecuteProcess.js */ "./src/800-System/821-System.ExecuteProcess.js" )( Liquicode ).ExecuteProcess,
		AsyncExecuteProcess: __webpack_require__( /*! ./822-System.AsyncExecuteProcess.js */ "./src/800-System/822-System.AsyncExecuteProcess.js" )( Liquicode ).AsyncExecuteProcess,
		StartProcess: __webpack_require__( /*! ./823-System.StartProcess.js */ "./src/800-System/823-System.StartProcess.js" )( Liquicode ).StartProcess,
		StopProcess: __webpack_require__( /*! ./824-System.StopProcess.js */ "./src/800-System/824-System.StopProcess.js" )( Liquicode ).StopProcess,

		// Docker
		StartContainer: __webpack_require__( /*! ./830-System.StartContainer.js */ "./src/800-System/830-System.StartContainer.js" )( Liquicode ).StartContainer,
		StopContainer: __webpack_require__( /*! ./831-System.StopContainer.js */ "./src/800-System/831-System.StopContainer.js" )( Liquicode ).StopContainer,
		ContainerStatus: __webpack_require__( /*! ./832-System.ContainerStatus.js */ "./src/800-System/832-System.ContainerStatus.js" )( Liquicode ).ContainerStatus,

	};
};



/***/ }),

/***/ "./src/800-System/810-System.AsyncVisitFiles.js":
/*!******************************************************!*\
  !*** ./src/800-System/810-System.AsyncVisitFiles.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '810',
	member_of: 'System',
	name: 'AsyncVisitFiles',
	type: 'function',
	returns: '*',
	description: `
Scans a folder and calls the Visitor callback function for each folder/file encountered.

The \`FilePattern\` parameter is optional and can be a wildcard type string.
For example, to visit all text files, you can pass '*.txt'.
If \`FilePattern\` is not empty, then the callback will not be called for folders.

The Visitor callback function takes two parameters \`Visitor( Path, Filename )\`.
If the Visitor callback returns a value, then the visitation process is halted
and that value is returned by the \`VisitFiles\` function.
The Visitor callback is called for each file encountered and for each folder encountered.
When called for a folder, the \`Filename\` parameter will be null.
The Visitor callback function can be either synchronous or asymchronous.
`,
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
			description: 'Function to be called for each folder and file: Visitor( Path, Filename )',
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
	 * @function AsyncVisitFiles
	 * @returns {*}
	 * @description
	 * 
Scans a folder and calls the Visitor callback function for each folder/file encountered.

The `FilePattern` parameter is optional and can be a wildcard type string.
For example, to visit all text files, you can pass '*.txt'.
If `FilePattern` is not empty, then the callback will not be called for folders.

The Visitor callback function takes two parameters `Visitor( Path, Filename )`.
If the Visitor callback returns a value, then the visitation process is halted
and that value is returned by the `VisitFiles` function.
The Visitor callback is called for each file encountered and for each folder encountered.
When called for a folder, the `Filename` parameter will be null.
The Visitor callback function can be either synchronous or asymchronous.

	 * @param {string} StartFolder
	 * @param {string} [FilePattern]
	 * @param {boolean} [Recurse]
	 * @param {function} [Visitor]
	 * Function to be called for each folder and file: Visitor( Path, Filename )
	*/
	//-end-jsdoc-----------------------------------------------------------


	const LIB_FS = __webpack_require__( /*! fs */ "fs" );
	const LIB_PATH = __webpack_require__( /*! path */ "path" );


	async function AsyncVisitFiles( StartFolder, FilePattern, Recurse, Visitor ) 
	{
		StartFolder = Liquicode.Types.Coerce( StartFolder ).ToString();
		FilePattern = Liquicode.Types.Coerce( FilePattern ).ToString();
		Recurse = Liquicode.Types.Coerce( Recurse ).ToBoolean();
		// Visitor = Liquicode.Types.Coerce( Visitor, Schema.Parameters.Visitor , { coerce_values: true, throw_errors: true });

		if ( !LIB_FS.existsSync( StartFolder ) ) { return; }
		// let count = 0;
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
						// if ( Visitor ) { Visitor( StartFolder, element ); }
						// count++;
						if ( Visitor ) 
						{
							let value = await Visitor( StartFolder, element );
							if ( value !== undefined ) { return value; }
						}
					}
				}
				else
				{
					// if ( Visitor ) { Visitor( StartFolder, element ); }
					// count++;
					if ( Visitor ) 
					{
						let value = await Visitor( StartFolder, element );
						if ( value !== undefined ) { return value; }
					}
				}
			}
			else if ( LIB_FS.lstatSync( from_path ).isDirectory() )
			{
				if ( !FilePattern ) 
				{
					// if ( Visitor ) { Visitor( from_path, null ); }
					// count++;
					if ( Visitor ) 
					{
						let value = await Visitor( from_path, null );
						if ( value !== undefined ) { return value; }
					}
				}
				if ( Recurse )
				{
					let value = AsyncVisitFiles( from_path, FilePattern, Recurse, Visitor );
					if ( value !== undefined ) { return value; }
				}
			}
		}
		return;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		AsyncVisitFiles: AsyncVisitFiles,
	};
};


/***/ }),

/***/ "./src/800-System/810-System.VisitFiles.js":
/*!*************************************************!*\
  !*** ./src/800-System/810-System.VisitFiles.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '810',
	member_of: 'System',
	name: 'VisitFiles',
	type: 'function',
	returns: '*',
	description: `
Scans a folder and calls the Visitor callback function for each folder/file encountered.

The \`FilePattern\` parameter is optional and can be a wildcard type string.
For example, to visit all text files, you can pass '*.txt'.
If \`FilePattern\` is not empty, then the callback will not be called for folders.

The Visitor callback function takes two parameters \`Visitor( Path, Filename )\`.
If the Visitor callback returns a value, then the visitation process is halted
and that value is returned by the \`VisitFiles\` function.
The Visitor callback is called for each file encountered and for each folder encountered.
When called for a folder, the \`Filename\` parameter will be null.
The Visitor callback function must be synchronous.
`,
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
			description: 'Function to be called for each folder and file: Visitor( Path, Filename )',
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
	 * @function VisitFiles
	 * @returns {*}
	 * @description
	 * 
Scans a folder and calls the Visitor callback function for each folder/file encountered.

The `FilePattern` parameter is optional and can be a wildcard type string.
For example, to visit all text files, you can pass '*.txt'.
If `FilePattern` is not empty, then the callback will not be called for folders.

The Visitor callback function takes two parameters `Visitor( Path, Filename )`.
If the Visitor callback returns a value, then the visitation process is halted
and that value is returned by the `VisitFiles` function.
The Visitor callback is called for each file encountered and for each folder encountered.
When called for a folder, the `Filename` parameter will be null.
The Visitor callback function must be synchronous.

	 * @param {string} StartFolder
	 * @param {string} [FilePattern]
	 * @param {boolean} [Recurse]
	 * @param {function} [Visitor]
	 * Function to be called for each folder and file: Visitor( Path, Filename )
	*/
	//-end-jsdoc-----------------------------------------------------------


	const LIB_FS = __webpack_require__( /*! fs */ "fs" );
	const LIB_PATH = __webpack_require__( /*! path */ "path" );


	function VisitFiles( StartFolder, FilePattern, Recurse, Visitor ) 
	{
		StartFolder = Liquicode.Types.Coerce( StartFolder ).ToString();
		FilePattern = Liquicode.Types.Coerce( FilePattern ).ToString();
		Recurse = Liquicode.Types.Coerce( Recurse ).ToBoolean();
		// Visitor = Liquicode.Types.Coerce( Visitor, Schema.Parameters.Visitor , { coerce_values: true, throw_errors: true });

		if ( !LIB_FS.existsSync( StartFolder ) ) { return; }
		// let count = 0;
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
						// if ( Visitor ) { Visitor( StartFolder, element ); }
						// count++;
						if ( Visitor ) 
						{
							let value = Visitor( StartFolder, element );
							if ( value !== undefined ) { return value; }
						}
					}
				}
				else
				{
					// if ( Visitor ) { Visitor( StartFolder, element ); }
					// count++;
					if ( Visitor ) 
					{
						let value = Visitor( StartFolder, element );
						if ( value !== undefined ) { return value; }
					}
				}
			}
			else if ( LIB_FS.lstatSync( from_path ).isDirectory() )
			{
				if ( !FilePattern ) 
				{
					// if ( Visitor ) { Visitor( from_path, null ); }
					// count++;
					if ( Visitor ) 
					{
						let value = Visitor( from_path, null );
						if ( value !== undefined ) { return value; }
					}
				}
				if ( Recurse )
				{
					let value = VisitFiles( from_path, FilePattern, Recurse, Visitor );
					if ( value !== undefined ) { return value; }
				}
			}
		}
		return;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		VisitFiles: VisitFiles,
	};
};


/***/ }),

/***/ "./src/800-System/811-System.CountFiles.js":
/*!*************************************************!*\
  !*** ./src/800-System/811-System.CountFiles.js ***!
  \*************************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '811',
	member_of: 'System',
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
		StartFolder = Liquicode.Types.Coerce( StartFolder ).ToString();
		FilePattern = Liquicode.Types.Coerce( FilePattern ).ToString();
		Recurse = Liquicode.Types.Coerce( Recurse ).ToBoolean();

		let count = Liquicode.System.VisitFiles( StartFolder, FilePattern, Recurse );
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

/***/ "./src/800-System/812-System.CountFolders.js":
/*!***************************************************!*\
  !*** ./src/800-System/812-System.CountFolders.js ***!
  \***************************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '812',
	member_of: 'System',
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
		StartFolder = Liquicode.Types.Coerce( StartFolder ).ToString();
		Recurse = Liquicode.Types.Coerce( Recurse ).ToBoolean();

		let folder_count = 0;
		Liquicode.System.VisitFiles( StartFolder, '', Recurse,
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

/***/ "./src/800-System/813-System.CopyFolder.js":
/*!*************************************************!*\
  !*** ./src/800-System/813-System.CopyFolder.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '813',
	member_of: 'System',
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


	const LIB_FS = __webpack_require__( /*! fs */ "fs" );
	const LIB_PATH = __webpack_require__( /*! path */ "path" );


	function CopyFolder( FromFolder, ToFolder, FilePattern, Overwrite, Recurse ) 
	{
		FromFolder = Liquicode.Types.Coerce( FromFolder ).ToString();
		ToFolder = Liquicode.Types.Coerce( ToFolder ).ToString();
		FilePattern = Liquicode.Types.Coerce( FilePattern ).ToString();
		Overwrite = Liquicode.Types.Coerce( Overwrite ).ToBoolean();
		Recurse = Liquicode.Types.Coerce( Recurse ).ToBoolean();

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

/***/ "./src/800-System/814-System.DeleteFolder.js":
/*!***************************************************!*\
  !*** ./src/800-System/814-System.DeleteFolder.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '814',
	member_of: 'System',
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


	const LIB_FS = __webpack_require__( /*! fs */ "fs" );
	const LIB_PATH = __webpack_require__( /*! path */ "path" );


	function DeleteFolder( Folder, Recurse ) 
	{
		Folder = Liquicode.Types.Coerce( Folder ).ToString();
		Recurse = Liquicode.Types.Coerce( Recurse ).ToBoolean();

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
			if ( !elements.length ) 
			{
				LIB_FS.rmdirSync( Folder );
				count++;
			}
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

/***/ "./src/800-System/815-System.EmptyFolder.js":
/*!**************************************************!*\
  !*** ./src/800-System/815-System.EmptyFolder.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '815',
	member_of: 'System',
	name: 'EmptyFolder',
	type: 'function',
	returns: 'number',
	return_description: 'Number of folders and files removed.',
	description: `
Empties a folder by removing all of its sub-folders and files.

Returns the number of folders and files removed.
`,
	Parameters: {
		Folder: {
			name: 'Folder',
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
	 * @function EmptyFolder
	 * @returns {number}
	 * @description
	 * Empties a folder by removing all of its sub-folders and files.
	 * Returns the number of folders and files deleted.
	 * @param {string} Folder
	*/
	//-end-jsdoc-----------------------------------------------------------


	const LIB_FS = __webpack_require__( /*! fs */ "fs" );
	const LIB_PATH = __webpack_require__( /*! path */ "path" );


	function _EmptyFolder( Folder, Depth ) 
	{
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
			else if ( LIB_FS.lstatSync( from_path ).isDirectory() )
			{
				count += _EmptyFolder( from_path, ( Depth + 1 ) );
			}
		}
		// Delete this folder.
		if ( Depth > 0 )
		{
			let elements = LIB_FS.readdirSync( Folder );
			if ( !elements.length ) 
			{
				LIB_FS.rmdirSync( Folder );
				count++;
			}
		}
		return count;
	}


	function EmptyFolder( Folder ) 
	{
		Folder = Liquicode.Types.Coerce( Folder ).ToString();
		if ( !LIB_FS.existsSync( Folder ) ) { return 0; }
		let count = _EmptyFolder( Folder, 0 );
		return count;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		EmptyFolder: EmptyFolder,
	};
};


/***/ }),

/***/ "./src/800-System/816-System.WithFileText.js":
/*!***************************************************!*\
  !*** ./src/800-System/816-System.WithFileText.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '816',
	member_of: 'System',
	name: 'WithFileText',
	type: 'function',
	returns: 'boolean',
	returns_description: 'False if no changes were made or True if changes were saved.',
	description: `
Loads content from a file and passes it to a callback function for processing.

The callback function takes two parameters: Filename and Text.
Filename is the Filename passed to \`WithFileText\` and Text is the content of that file.
The callback function is expected to return either \`undefined\` or \`null\` if no changes are made to the text.
If changes are made, the callback function can return the new text which will be saved back to Filename.

If the file content is changed during callback processing, then \`WithFileText\` will return True.
`,
	Parameters: {
		Filename: {
			name: 'Filename',
			type: 'string',
			required: true,
		},
		FileTextCallback: {
			name: 'FileTextCallback',
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
	 * @function EmptyFolder
	 * @returns {number}
	 * @description
	 * Empties a folder by removing all of its sub-folders and files.
	 * Returns the number of folders and files deleted.
	 * @param {string} Folder
	*/
	//-end-jsdoc-----------------------------------------------------------


	const LIB_FS = __webpack_require__( /*! fs */ "fs" );


	function WithFileText( Filename, FileTextCallback ) 
	{
		let text = LIB_FS.readFileSync( Filename, 'utf-8' );
		let processed_text = FileTextCallback( Filename, text );
		if ( ( processed_text === undefined ) || ( processed_text === null ) ) { return false; }
		if ( typeof processed_text !== 'string' ) { throw new Error( `The return value from [FileTextCallback] must be either undefined, null, or a text string.` ); }
		if ( processed_text === text ) { return false; }
		LIB_FS.writeFileSync( Filename, processed_text );
		return true;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		WithFileText: WithFileText,
	};
};


/***/ }),

/***/ "./src/800-System/820-System.AsyncSleep.js":
/*!*************************************************!*\
  !*** ./src/800-System/820-System.AsyncSleep.js ***!
  \*************************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '820',
	member_of: 'System',
	name: 'AsyncSleep',
	type: 'function',
	// returns: 'number',
	description: ``,
	Parameters: {
		Milliseconds: {
			name: 'Milliseconds',
			type: 'number',
			format: 'integer',
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
	 * @function AsyncSleep
	 * @param {number} [Milliseconds]
	*/
	//-end-jsdoc-----------------------------------------------------------


	function AsyncSleep( Milliseconds ) 
	{
		Milliseconds = Liquicode.Types.Coerce( Milliseconds ).ToNumber();

		return new Promise( resolve => setTimeout( resolve, Milliseconds ) );
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		AsyncSleep: AsyncSleep,
	};
};


/***/ }),

/***/ "./src/800-System/821-System.ExecuteProcess.js":
/*!*****************************************************!*\
  !*** ./src/800-System/821-System.ExecuteProcess.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '821',
	member_of: 'System',
	name: 'ExecuteProcess',
	type: 'function',
	// returns: 'number',
	description: ``,
	Parameters: {
		Command: {
			name: 'Command',
			type: 'string',
			required: true,
		},
		Environment: {
			name: 'Environment',
			type: 'object',
			required: false,
		},
		StartFolder: {
			name: 'StartFolder',
			type: 'string',
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
	 * @function ExecuteProcess
	 * @param {string} Command
	 * @param {object} [Environment]
	 * @param {string} [StartFolder]
	*/
	//-end-jsdoc-----------------------------------------------------------


	const LIB_FS = __webpack_require__( /*! fs */ "fs" );
	const LIB_CHILD_PROCESS = __webpack_require__( /*! child_process */ "child_process" );


	function ExecuteProcess( Command, Environment, StartFolder ) 
	{
		let options = {
			encoding: 'utf-8',
		};
		if ( Environment && Object.keys( Environment ) ) { options.env = Environment; }
		if ( StartFolder && LIB_FS.existsSync( StartFolder ) ) { options.cwd = StartFolder; }

		let result = {
			result: '',
			error: '',
			stdout: '',
			stderror: '',
		};
		try
		{
			result.result =
				LIB_CHILD_PROCESS.execSync( Command, options,
					( error, stdout, stderror ) =>
					{
						result.error = error;
						result.stdout = stdout;
						result.stderror = stderror;
					}
				);
		}
		catch ( error )
		{
			result.error = error.message;
		}

		return result;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		ExecuteProcess: ExecuteProcess,
	};
};


/***/ }),

/***/ "./src/800-System/822-System.AsyncExecuteProcess.js":
/*!**********************************************************!*\
  !*** ./src/800-System/822-System.AsyncExecuteProcess.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '822',
	member_of: 'System',
	name: 'AsyncExecuteProcess',
	type: 'function',
	// returns: 'number',
	description: ``,
	Parameters: {
		Command: {
			name: 'Command',
			type: 'string',
			required: true,
		},
		Environment: {
			name: 'Environment',
			type: 'object',
			required: false,
		},
		StartFolder: {
			name: 'StartFolder',
			type: 'string',
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
	 * @function AsyncExecuteProcess
	 * @param {string} Command
	 * @param {object} [Environment]
	 * @param {string} [StartFolder]
	*/
	//-end-jsdoc-----------------------------------------------------------


	const LIB_CHILD_PROCESS = __webpack_require__( /*! child_process */ "child_process" );


	function AsyncExecuteProcess( Command, Environment, StartFolder ) 
	{
		return new Promise(
			( resolve, reject ) =>
			{
				resolve( Liquicode.System.ExecuteProcess( Command, Environment, StartFolder ) );
			} );
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		AsyncExecuteProcess: AsyncExecuteProcess,
	};
};


/***/ }),

/***/ "./src/800-System/823-System.StartProcess.js":
/*!***************************************************!*\
  !*** ./src/800-System/823-System.StartProcess.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '823',
	member_of: 'System',
	name: 'StartProcess',
	type: 'function',
	returns: 'string',
	description: `Starts a new process and returns the ProcessID.`,
	Parameters: {
		Command: {
			name: 'Command',
			type: 'string',
			required: true,
		},
		Environment: {
			name: 'Environment',
			type: 'object',
			required: false,
		},
		StartFolder: {
			name: 'StartFolder',
			type: 'string',
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
	 * @function StartProcess
	 * @returns {string}
	 * @description
	 * Starts a new process and returns the ProcessID.
	 * @param {string} Command
	 * @param {object} [Environment]
	 * @param {string} [StartFolder]
	*/
	//-end-jsdoc-----------------------------------------------------------


	const LIB_FS = __webpack_require__( /*! fs */ "fs" );
	const LIB_CHILD_PROCESS = __webpack_require__( /*! child_process */ "child_process" );


	function StartProcess( Command, Environment, StartFolder ) 
	{
		let options = {};
		if ( Environment && Object.keys( Environment ) ) { options.env = Environment; }
		if ( StartFolder && LIB_FS.existsSync( StartFolder ) ) { options.cwd = StartFolder; }
		let child_process = LIB_CHILD_PROCESS.exec( Command, options );
		return child_process.pid;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		StartProcess: StartProcess,
	};
};


/***/ }),

/***/ "./src/800-System/824-System.StopProcess.js":
/*!**************************************************!*\
  !*** ./src/800-System/824-System.StopProcess.js ***!
  \**************************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '824',
	member_of: 'System',
	name: 'StopProcess',
	type: 'function',
	returns: 'string',
	description: `Stops a running process by its ProcessID.`,
	Parameters: {
		ProcessID: {
			name: 'ProcessID',
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
	 * @function StopProcess
	 * @returns {string}
	 * @description
	 * Stops a running process by its ProcessID.
	 * @param {string} ProcessID
	*/
	//-end-jsdoc-----------------------------------------------------------


	function StopProcess( ProcessID ) 
	{
		process.kill( ProcessID, 'SIGINT' );
		return;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		StopProcess: StopProcess,
	};
};


/***/ }),

/***/ "./src/800-System/830-System.StartContainer.js":
/*!*****************************************************!*\
  !*** ./src/800-System/830-System.StartContainer.js ***!
  \*****************************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '830',
	member_of: 'System',
	name: 'StartContainer',
	type: 'function',
	returns: 'string',
	description: `Starts a Docker Container.`,
	Parameters: {
		ImageName: {
			name: 'ImageName',
			type: 'string',
			required: true,
		},
		Options: {
			name: 'Options',
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
	 * @function StartContainer
	 * @returns {string}
	 * @description
	 * Starts a Docker Container.
	 * @param {string} ImageName
	 * @param {object} [Options]
	*/
	//-end-jsdoc-----------------------------------------------------------


	function StartContainer( ImageName, Options ) 
	{
		let command_line = `docker run --rm -d`;
		if ( Options )
		{
			// Container Name
			if ( Options.name )
			{
				if ( typeof Options.name !== 'string' ) { throw new Error( `Options.name must be a string.` ); }
				command_line += ` --name ${Options.name}`;
			}

			// Hostname
			if ( Options.hostname )
			{
				if ( typeof Options.hostname !== 'string' ) { throw new Error( `Options.hostname must be a string.` ); }
				command_line += ` --hostname ${Options.hostname}`;
			}

			// Network
			if ( Options.network )
			{
				if ( typeof Options.network !== 'string' ) { throw new Error( `Options.network must be a string.` ); }
				command_line += ` --network="${Options.network}"`;
			}

			// Publish Ports
			if ( Options.ports )
			{
				if ( !Array.isArray( Options.ports ) ) { throw new Error( `Options.ports must be an array of port definitions.` ); }
				for ( let index = 0; index < Options.ports.length; index++ )
				{
					let port = Options.ports[ index ];
					command_line += ` -p ${port.localhost}:${port.container}`;
				}
			}

			// Shared Volumes
			if ( Options.volumes )
			{
				if ( !Array.isArray( Options.volumes ) ) { throw new Error( `Options.volumes must be an array of volume definitions.` ); }
				for ( let index = 0; index < Options.volumes.length; index++ )
				{
					let volume = Options.volumes[ index ];
					command_line += ` -v ${volume.localhost}:${volume.container}`;
					if ( volume.readonly ) { command_line += `:ro`; }
				}
			}

			// Environment Variables
			if ( Options.environment )
			{
				if ( typeof Options.environment !== 'object' ) { throw new Error( `Options.environment must be an object.` ); }
				let keys = Object.keys( Options.environment );
				for ( let index = 0; index < keys.length; index++ )
				{
					let name = keys[ index ];
					command_line += ` -e "${name}=${Options.environment[ name ]}"`;
				}
			}

		}

		// Image Name
		command_line += ` ${ImageName}`;
		// Initial Command
		if ( Options && ( typeof Options.command === 'string' ) )
		{
			command_line += ` ${Options.command}`;
		}

		let result = Liquicode.System.ExecuteProcess( command_line );
		if ( result.error ) { throw new Error( result.error ); }
		let container_id = result.result.trim();
		return container_id;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		StartContainer: StartContainer,
	};
};


/***/ }),

/***/ "./src/800-System/831-System.StopContainer.js":
/*!****************************************************!*\
  !*** ./src/800-System/831-System.StopContainer.js ***!
  \****************************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '831',
	member_of: 'System',
	name: 'StopContainer',
	type: 'function',
	returns: 'string',
	description: `Stops a running Docker Container.`,
	Parameters: {
		ContainerID: {
			name: 'ContainerID',
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
	 * @function StopContainer
	 * @returns {string}
	 * @description
	 * Stops a running Docker Container.
	 * @param {string} ContainerID
	*/
	//-end-jsdoc-----------------------------------------------------------


	function StopContainer( ContainerID ) 
	{
		let command_line = `docker kill ${ContainerID}`;
		let result = Liquicode.System.ExecuteProcess( command_line );
		if ( result.error ) { throw new Error( result.error ); }
		return;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		StopContainer: StopContainer,
	};
};


/***/ }),

/***/ "./src/800-System/832-System.ContainerStatus.js":
/*!******************************************************!*\
  !*** ./src/800-System/832-System.ContainerStatus.js ***!
  \******************************************************/
/***/ ((module) => {




//---------------------------------------------------------------------
let _Schema = {
	id: '832',
	member_of: 'System',
	name: 'ContainerStatus',
	type: 'function',
	returns: 'string',
	description: `Gets the status of a running Docker Container.`,
	Parameters: {
		ContainerID: {
			name: 'ContainerID',
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
	 * @function ContainerStatus
	 * @returns {string}
	 * @description
	 * Gets the status of a running Docker Container.
	 * @param {string} ContainerID
	*/
	//-end-jsdoc-----------------------------------------------------------


	function ContainerStatus( ContainerID ) 
	{
		let command_line = `docker inspect ${ContainerID}`;
		let result = Liquicode.System.ExecuteProcess( command_line );
		if ( result.error ) 
		{
			// if ( result.error === `Command failed: docker inspect ${ContainerID}\nError: No such object: ${ContainerID}\n` ) { return null; }
			if ( result.error.indexOf( 'Error: No such object' ) ) { return null; }
			throw new Error( result.error );
		}
		let status = JSON.parse( result.result );
		if ( Array.isArray( status ) && status.length )
		{
			status = status[ 0 ];
		}
		return status;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		ContainerStatus: ContainerStatus,
	};
};


/***/ }),

/***/ "./src/900-Network/900-Network.js":
/*!****************************************!*\
  !*** ./src/900-Network/900-Network.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {






//---------------------------------------------------------------------
let _Schema = {
	id: '900',
	name: 'Network',
	type: 'namespace',
	summary: 'Functions for working with networks. (nodejs only)',
};


//-start-jsdoc---------------------------------------------------------
/**
 * @public
 * @namespace Network
 * @summary Functions for working with networks. (nodejs only)
*/
//-end-jsdoc-----------------------------------------------------------


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{
	return {
		_Schema: _Schema,
		AsyncDownloadFile: __webpack_require__( /*! ./910-Network.AsyncDownloadFile.js */ "./src/900-Network/910-Network.AsyncDownloadFile.js" )( Liquicode ).AsyncDownloadFile,
		AsyncGetRequest: __webpack_require__( /*! ./920-Network.AsyncGetRequest.js */ "./src/900-Network/920-Network.AsyncGetRequest.js" )( Liquicode ).AsyncGetRequest,
	};
};


/***/ }),

/***/ "./src/900-Network/910-Network.AsyncDownloadFile.js":
/*!**********************************************************!*\
  !*** ./src/900-Network/910-Network.AsyncDownloadFile.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {




//---------------------------------------------------------------------
let Schema = {
	id: '910',
	member_of: 'Network',
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

/***/ "./src/900-Network/920-Network.AsyncGetRequest.js":
/*!********************************************************!*\
  !*** ./src/900-Network/920-Network.AsyncGetRequest.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {




//---------------------------------------------------------------------
let Schema = {
	id: '920',
	member_of: 'Network',
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

Liquicode.Types = __webpack_require__( /*! ./000-Types/000-Types.js */ "./src/000-Types/000-Types.js" )( Liquicode );
Liquicode.Object = __webpack_require__( /*! ./100-Object/100-Object.js */ "./src/100-Object/100-Object.js" )( Liquicode );
Liquicode.Text = __webpack_require__( /*! ./200-Text/200-Text.js */ "./src/200-Text/200-Text.js" )( Liquicode );
Liquicode.Shapes = __webpack_require__( /*! ./300-Shapes/300-Shapes.js */ "./src/300-Shapes/300-Shapes.js" )( Liquicode );
Liquicode.Parse = __webpack_require__( /*! ./500-Parse/500-Parse.js */ "./src/500-Parse/500-Parse.js" )( Liquicode );
Liquicode.System = __webpack_require__( /*! ./800-System/800-System.js */ "./src/800-System/800-System.js" )( Liquicode );
Liquicode.Network = __webpack_require__( /*! ./900-Network/900-Network.js */ "./src/900-Network/900-Network.js" )( Liquicode );

delete Liquicode.Types._Schema;
delete Liquicode.Object._Schema;
delete Liquicode.Text._Schema;
delete Liquicode.Shapes._Schema;
delete Liquicode.Parse._Schema;
delete Liquicode.System._Schema;
delete Liquicode.Network._Schema;


module.exports = Liquicode;



/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("child_process");

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