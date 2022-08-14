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
