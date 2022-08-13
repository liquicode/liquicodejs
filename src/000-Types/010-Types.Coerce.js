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
let number_42 = LiquicodeJS.Schema.Coerce( '42' ).ToNumber();
~~~

Another way is to reuse the \`Coercion\` object and alter the \`Coercion.value\` property yourself:
~~~javascript
let coercion = LiquicodeJS.Schema.Coerce();
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
