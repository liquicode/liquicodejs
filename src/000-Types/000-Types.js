"use strict";


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

		Coerce: require( './010-Types.Coerce.js' )( Liquicode ).Coerce,

		Formats: require( './020-Types.Formats.js' )( Liquicode ).Formats,
		GetFormat: require( './021-Types.GetFormat.js' )( Liquicode ).GetFormat,
		IsFormat: require( './022-Types.IsFormat.js' )( Liquicode ).IsFormat,

	};
};
