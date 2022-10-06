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
/******/ 	var __webpack_modules__ = ({

/***/ "./src/000-Types/000-Types.js":
/*!************************************!*\
  !*** ./src/000-Types/000-Types.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";



//---------------------------------------------------------------------
let _Schema = {
	id: '000',
	name: 'Types',
	type: 'namespace',
	summary: 'Data Type Handling',
};


//-start-jsdoc---------------------------------------------------------
/**
 * @public
 * @namespace Types
 * @summary Data Type Handling
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

"use strict";



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

"use strict";



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

"use strict";



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

"use strict";



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

"use strict";



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

/***/ "./src/liquicode-node.js":
/*!*******************************!*\
  !*** ./src/liquicode-node.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Liquicode = {};

Liquicode.version = 'v0.0.20';
Liquicode.environment = 'node';

function build_library( Group, Filename )
{
	Liquicode[ Group ] = {};
	let members = __webpack_require__("./src sync recursive")(Filename)( Liquicode );
	let member_keys = Object.keys( members );
	for ( let index = 0; index < member_keys.length; index++ )
	{
		let member_key = member_keys[ index ];
		if ( member_key === '_Schema' ) { continue; }
		Liquicode[ member_key ] = members[ member_key ];
		Liquicode[ Group ][ member_key ] = members[ member_key ];
	}
	Liquicode.Types = __webpack_require__( /*! ./000-Types/000-Types.js */ "./src/000-Types/000-Types.js" )( Liquicode );
	return;
}

build_library( 'Types', './000-Types/000-Types.js' );
build_library( 'Object', './100-Object/100-Object.js' );
build_library( 'Text', './200-Text/200-Text.js' );
build_library( 'Shapes', './300-Shapes/300-Shapes.js' );
build_library( 'Parse', './500-Parse/500-Parse.js' );
build_library( 'System', './800-System/800-System.js' );
build_library( 'Network', './900-Network/900-Network.js' );

// Liquicode.Types = require( './000-Types/000-Types.js' )( Liquicode );
// Liquicode.Object = require( './100-Object/100-Object.js' )( Liquicode );
// Liquicode.Text = require( './200-Text/200-Text.js' )( Liquicode );
// Liquicode.Shapes = require( './300-Shapes/300-Shapes.js' )( Liquicode );
// Liquicode.Parse = require( './500-Parse/500-Parse.js' )( Liquicode );
// Liquicode.System = require( './800-System/800-System.js' )( Liquicode );
// Liquicode.Network = require( './900-Network/900-Network.js' )( Liquicode );

// delete Liquicode.Types._Schema;
// delete Liquicode.Object._Schema;
// delete Liquicode.Text._Schema;
// delete Liquicode.Shapes._Schema;
// delete Liquicode.Parse._Schema;
// delete Liquicode.System._Schema;
// delete Liquicode.Network._Schema;

module.exports = Liquicode;



/***/ }),

/***/ "./src sync recursive":
/*!*******************!*\
  !*** ./src/ sync ***!
  \*******************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "./src sync recursive";
module.exports = webpackEmptyContext;

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
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
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