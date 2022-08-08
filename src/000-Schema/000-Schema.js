"use strict";


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
	name: '',				// Name of the field.
	type: '',				// Javascript data type (boolean, number, string, object).
	format: '',				// A data type specific designation.
	required: false,		// True if field is required.
	default: undefined,		// A default value used for missing fields.
	description: '',		// A string or array of strings.
	examples: '',			// A string or array of strings.
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




*/
//-end-jsdoc-----------------------------------------------------------


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{
	return {
		_Schema: _Schema,
		ErrorValue: require( './010-Schema.ErrorValue.js' )( Liquicode ).ErrorValue,
		IsErrorValue: require( './011-Schema.IsErrorValue.js' )( Liquicode ).IsErrorValue,
		ValueSchema: require( './020-Schema.ValueSchema.js' )( Liquicode ).ValueSchema,
		DefaultValue: require( './021-Schema.DefaultValue.js' )( Liquicode ).DefaultValue,
		CoerceValue: require( './022-Schema.CoerceValue.js' )( Liquicode ).CoerceValue,
		ValidateValue: require( './023-Schema.ValidateValue.js' )( Liquicode ).ValidateValue,
		ObjectSchema: require( './030-Schema.ObjectSchema.js' )( Liquicode ).ObjectSchema,
		ValidateValues: require( './031-Schema.ValidateValues.js' )( Liquicode ).ValidateValues,
	};
};
