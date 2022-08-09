
<br>
<br>

## ***Schema***: Data value and type handling

<details>
<summary>
<strong>
Schema Details
</strong>
</summary>



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
When obtaining FieldSchema objects from `Schema.ValueSchema()` or `Schema.ObjectSchema()`,
`FieldSchema.type` will contain the Javascript data type and `FieldSchema.format` will have a more specific type description.

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

The functions "Schema.ObjectSchema()" and "Schema.ValidateObject()" take these concepts to the next level and
provides schemas functionality on an object level rather than an individual value level.


**Additional References**

- [You Don't Know JS: Types & Grammar - Chapter 4. Coercion](https://www.oreilly.com/library/view/you-dont-know/9781491905159/ch04.html)


</details>

<br>

### ***Schema*** Functions

<br>

<details>
<summary>
<strong>
ErrorValue( Message, Context )
</strong>
<small>
- Returns an ErrorValue object containing error information.
</small>
</summary>

> ### Schema.***ErrorValue***( Message, Context )
> 
> Returns an ErrorValue object containing error information.
> 
> **Returns**: `object` - An ErrorValue object.

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| Message            | `string` | -        | "error"           | The error message.
| Context            | `string` | -        |                   | Context for the error (e.g. a function name).

***Description***




---
</details>

<br>

<details>
<summary>
<strong>
IsErrorValue( Value )
</strong>
<small>
- Tests if a Value is an ErrorValue object.
</small>
</summary>

> ### Schema.***IsErrorValue***( Value )
> 
> Tests if a Value is an ErrorValue object.
> 
> **Returns**: `boolean` - True if Value is an ErrorValue object, otherwise false.

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| Value              | `object` | -        |                   | The value to test.


---
</details>

<br>

<details>
<summary>
<strong>
ValueSchema( Value )
</strong>
<small>
- Returns a FieldSchema based upon a specific value.
</small>
</summary>

> ### Schema.***ValueSchema***( Value )
> 
> Returns a FieldSchema based upon a specific value.
> 
> **Returns**: `object` - A FieldSchema object.

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| Value              | `*`     | -         |                   | The value to infer a schema from.

***Description***


This function is used to obtain extended type information about a value.
While it does return an entire FieldSchema object, only the "FieldSchema.type" and "FieldSchema.format" fields are set.



---
</details>

<br>

<details>
<summary>
<strong>
DefaultValue( Schema, ThrowErrors )
</strong>
<small>
- Returns the default value for the FieldSchema.
</small>
</summary>

> ### Schema.***DefaultValue***( Schema, ThrowErrors )
> 
> Returns the default value for the FieldSchema.
> 
> **Returns**: `*` - The default value.

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| Schema             | `object` | required |                   | The schema to use when calculating a default value.
| ThrowErrors        | `boolean` | -       |                   | Errors are thrown if true, otherwise an ErrorValue object is returned.

***Description***


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



---
</details>

<br>

<details>
<summary>
<strong>
CoerceValue( Value, Schema, ThrowErrors )
</strong>
<small>
- Attempt to coerce the Value parameter to match the Schema's type.
</small>
</summary>

> ### Schema.***CoerceValue***( Value, Schema, ThrowErrors )
> 
> Attempt to coerce the Value parameter to match the Schema's type.
> 
> **Returns**: `*` - The coerced value or an error object.

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| Value              | `*`     | required  |                   | The value to coerce.
| Schema             | `object` | required |                   | The schema to use when coercing Value.
| ThrowErrors        | `boolean` | -       |                   | Errors are thrown if true, otherwise an ErrorValue object is returned.

***Description***



This function uses the Schema to coerce the Value to a particular data type.

If the "Schema.type" === "*", then no validation or coercion is performed and the Value is returned.
If the "Schema.type" === "function", then no validation or coercion is performed and the Value is returned.

If Value is "undefined" or "null", then the default value for "FieldSchema.type" will be returned.
This is done by calling "Schema.DefaultValue()" for the FieldSchema.

"Schema.ValueSchema()" is called the get the schema for Value, which is then compared against the expected Schema.

	


---
</details>

<br>

<details>
<summary>
<strong>
ValidateValue( Value, Schema, Options )
</strong>
<small>
- Validates a field value according to a schema and optionally coerces the value to match.
</small>
</summary>

> ### Schema.***ValidateValue***( Value, Schema, Options )
> 
> Validates a field value according to a schema and optionally coerces the value to match.
> 
> **Returns**: `*` - The validated/coerced Value or an ErrorValue object.

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| Value              | `*`     | required  |                   | The value to validate.
| Schema             | `object` | required |                   | The FieldSchema object to validate against.
| Options            | `object` | -        | "{ coerce: false, throw_errors: false, context: null }" | An options object to control validation:
~~~javascript
Options = {
	coerce_values: false,	// Attempt to coerce the provided value to match the schema's type.
	throw_errors: false,	// When true, throw an error validation errors are encountered.
	context: null,			// A context name (function name) to include in any error messages.
}
~~~

***Description***



This function uses "Schema.type", "Schema.format", "Schema.required', and "Schema.default" to validate the given Value.

If "Options.coerce = true", then an attempt will be made to coerce the given value to match the type and format specified in the FieldSchema.
(See: "Schema.CoerceValue()")

	


---
</details>

<br>

<details>
<summary>
<strong>
ObjectSchema( FromObject )
</strong>
<small>
- Returns an array of FieldSchema describing the top-most members of "FromObject".
</small>
</summary>

> ### Schema.***ObjectSchema***( FromObject )
> 
> Returns an array of FieldSchema describing the top-most members of "FromObject".
> 
> **Returns**: `object` - An array of FieldSchema.

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| FromObject         | `object` | required |                   | An object to retrieve the schema for.


---
</details>

<br>

<details>
<summary>
<strong>
ValidateValues( Values, Schemas )
</strong>
<small>
- Validate a set of values against an array of FieldSchema.
</small>
</summary>

> ### Schema.***ValidateValues***( Values, Schemas )
> 
> Validate a set of values against an array of FieldSchema.
> 
> **Returns**: `object` - An object containing the validation result.

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| Values             | `object` | required |                   | The values to validate. This can be an array of values, or an object described by Schemas.
| Schemas            | `object` | required |                   | An array of FieldSchemas to validate the Values with. Can also be an object whose top-most fields are instances of FieldSchema.

***Description***



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



---
</details>

<br>
<br>

## ***Object***: Functions for manipulating Javascript objects.


<br>

### ***Object*** Functions

<br>

<details>
<summary>
<strong>
Clone( From )
</strong>
</summary>

> ### Object.***Clone***( From )
> 
> undefined
> 
> **Returns**: `string`

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| From               | `object` | -        | {}                | 

***Description***

Returns a clone of the given object.
This is equivalent to doing A = JSON.parse( JSON.stringify( B ) ).


---
</details>

<br>

<details>
<summary>
<strong>
Merge( Original, Updates )
</strong>
</summary>

> ### Object.***Merge***( Original, Updates )
> 
> undefined
> 
> **Returns**: `object`

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| Original           | `object` | required |                   | 
| Updates            | `object` | -        |                   | 


---
</details>

<br>

<details>
<summary>
<strong>
Traverse( Root, Visitor )
</strong>
</summary>

> ### Object.***Traverse***( Root, Visitor )
> 
> undefined
> 
> **Returns**: `string`

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| Root               | `object` | required |                   | 
| Visitor            | `function` | required |                 | 

***Description***



Traverses and calls a visitor callback function for each field in an object.
This functions recurses through sub-objects and traverses the entire object.




---
</details>

<br>

<details>
<summary>
<strong>
HasPath( Root, Path )
</strong>
</summary>

> ### Object.***HasPath***( Root, Path )
> 
> undefined
> 
> **Returns**: `boolean`

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| Root               | `object` | required |                   | 
| Path               | `string` | required |                   | 


---
</details>

<br>

<details>
<summary>
<strong>
FindField( Root, Name )
</strong>
</summary>

> ### Object.***FindField***( Root, Name )
> 
> undefined
> 
> **Returns**: `string`

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| Root               | `object` | required |                   | 
| Name               | `string` | required |                   | 


---
</details>

<br>

<details>
<summary>
<strong>
FindValue( Root, Value )
</strong>
<small>
- Locate a value stored within an object.
</small>
</summary>

> ### Object.***FindValue***( Root, Value )
> 
> Locate a value stored within an object.
> 
> **Returns**: `string`

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| Root               | `object` | required |                   | 
| Value              | `*`     | required  |                   | The value to search for. This must be primitive data type (boolean, number, or string).


---
</details>

<br>

<details>
<summary>
<strong>
GetValue( Root, Path )
</strong>
</summary>

> ### Object.***GetValue***( Root, Path )
> 
> undefined
> 
> **Returns**: `*`

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| Root               | `object` | required |                   | 
| Path               | `string` | required |                   | 


---
</details>

<br>

<details>
<summary>
<strong>
SetValue( Root, Path, Value )
</strong>
</summary>

> ### Object.***SetValue***( Root, Path, Value )
> 
> undefined
> 
> **Returns**: `*`

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| Root               | `object` | required |                   | 
| Path               | `string` | required |                   | 
| Value              | `*`     | required  |                   | 


---
</details>

<br>

<details>
<summary>
<strong>
FromJson( JsonString )
</strong>
</summary>

> ### Object.***FromJson***( JsonString )
> 
> undefined
> 
> **Returns**: `object`

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| JsonString         | `string` | -        |                   | 

***Description***


Parse a Json string and return an object value.
This is identical Javascript's "JSON.parse()" function.

There are some significant differences from Javascript's version.
The parser is a bit more relaxed and allows:
- Identifiers are not required to have quotes.
- A comma can appear after the last element of an array or object.
- String literals can use either single or double quotes.
- Parsing automatically stops when the closing brace or bracket is found in the json string.




---
</details>

<br>

<details>
<summary>
<strong>
ToJsonOptions( PresetName )
</strong>
</summary>

> ### Object.***ToJsonOptions***( PresetName )
> 
> undefined
> 
> **Returns**: `object`

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| PresetName         | `string` | -        |                   | 

***Description***





---
</details>

<br>

<details>
<summary>
<strong>
ToJson( Value, JsonOptions )
</strong>
</summary>

> ### Object.***ToJson***( Value, JsonOptions )
> 
> undefined
> 
> **Returns**: `object`

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| Value              | `*`     | -         |                   | The value to convert to a json string.
| JsonOptions        | `object|string` | - |                   | Can be an options object or the name of an options preset ("default", "pretty", or "pretty-2")

***Description***





---
</details>

<br>

<details>
<summary>
<strong>
FromIni( IniString )
</strong>
</summary>

> ### Object.***FromIni***( IniString )
> 
> undefined
> 
> **Returns**: `object`

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| IniString          | `string` | -        |                   | 

***Description***


Parse an Ini string and return an object value.




---
</details>

<br>

<details>
<summary>
<strong>
ToIni( Value )
</strong>
</summary>

> ### Object.***ToIni***( Value )
> 
> undefined
> 
> **Returns**: `object`

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| Value              | `object` | -        |                   | 

***Description***


Parse an Ini string and return an object value.




---
</details>

<br>
<br>

## ***Text***: Functions for text parsing and manipulation.


<br>

### ***Text*** Functions

<br>

<details>
<summary>
<strong>
Compare( StringA, StringB, CaseSensitive )
</strong>
</summary>

> ### Text.***Compare***( StringA, StringB, CaseSensitive )
> 
> undefined
> 
> **Returns**: `string`

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| StringA            | `string` | -        |                   | 
| StringB            | `string` | -        |                   | 
| CaseSensitive      | `boolean` | -       | true              | 

***Description***

Compares two strings.
Returns a `-1` if `StringA` is less than `StringB`.
Returns a `1` if `StringA` is greater than than `StringB`.
Returns a `0` if `StringA` and `StringB` are the same.


---
</details>

<br>

<details>
<summary>
<strong>
Matches( Text, Pattern )
</strong>
</summary>

> ### Text.***Matches***( Text, Pattern )
> 
> undefined
> 
> **Returns**: `string`

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| Text               | `string` | required |                   | 
| Pattern            | `string` | required |                   | 

***Description***

Matches the text against a wildcard-lik pattern.
Returns true If the match succeeds, otherwise false.


---
</details>

<br>

<details>
<summary>
<strong>
ReplaceCharacters( Text, SearchCharacters, ReplacementText, MaxTimes )
</strong>
</summary>

> ### Text.***ReplaceCharacters***( Text, SearchCharacters, ReplacementText, MaxTimes )
> 
> undefined
> 
> **Returns**: `string`

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| Text               | `string` | required |                   | 
| SearchCharacters   | `string` | required |                   | 
| ReplacementText    | `string` | required |                   | 
| MaxTimes           | `number` | -        | -1                | 

***Description***

Replaces characters within a string.
Returns the modified string.


---
</details>

<br>

<details>
<summary>
<strong>
ReplaceText( Text, SearchText, ReplacementText )
</strong>
</summary>

> ### Text.***ReplaceText***( Text, SearchText, ReplacementText )
> 
> undefined
> 
> **Returns**: `string`

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| Text               | `string` | required |                   | 
| SearchText         | `string` | required |                   | 
| ReplacementText    | `string` | required |                   | 


---
</details>

<br>

<details>
<summary>
<strong>
FirstWord( Phrase, Delimiters )
</strong>
</summary>

> ### Text.***FirstWord***( Phrase, Delimiters )
> 
> undefined
> 
> **Returns**: `string`

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| Phrase             | `string` | -        |                   | A text phrase containing words separated by delimiters.
| Delimiters         | `string` | -        | " "               | A string of whitespace and punctuation characters that break the phrase into words.

***Description***

Returns the first word of a text phrase.


---
</details>

<br>

<details>
<summary>
<strong>
AfterFirstWord( Phrase, Delimiters )
</strong>
</summary>

> ### Text.***AfterFirstWord***( Phrase, Delimiters )
> 
> undefined
> 
> **Returns**: `string`

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| Phrase             | `string` | -        |                   | A text phrase containing words separated by delimiters.
| Delimiters         | `string` | -        | " "               | A string of characters that break the phrase into words.

***Description***

Returns the remainder of a text phrase occurring after the first word.


---
</details>

<br>

<details>
<summary>
<strong>
LastWord( Phrase, Delimiters )
</strong>
</summary>

> ### Text.***LastWord***( Phrase, Delimiters )
> 
> undefined
> 
> **Returns**: `string`

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| Phrase             | `string` | -        |                   | A text phrase containing words separated by delimiters.
| Delimiters         | `string` | -        | " "               | A string of characters that break the phrase into words.

***Description***

Returns the last word of a text phrase.


---
</details>

<br>

<details>
<summary>
<strong>
BeforeLastWord( Phrase, Delimiters )
</strong>
</summary>

> ### Text.***BeforeLastWord***( Phrase, Delimiters )
> 
> undefined
> 
> **Returns**: `string`

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| Phrase             | `string` | -        |                   | A text phrase containing words separated by delimiters.
| Delimiters         | `string` | -        | " "               | A string of characters that break the phrase into words.

***Description***

Returns the remainder of a text phrase occurring befiore the last word.


---
</details>

<br>
<br>

## ***Json***: Functions for manipulating Json.


<br>

### ***Json*** Functions

<br>
<br>

## ***Date***: Functions for manipulating dates.


<br>

### ***Date*** Functions

<br>

<details>
<summary>
<strong>
Parse( Text, TimeZoneOffset )
</strong>
</summary>

> ### Date.***Parse***( Text, TimeZoneOffset )
> 
> undefined
> 
> **Returns**: `object`

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| Text               | `string` | required |                   | 
| TimeZoneOffset     | `function` | -      | "+0000"           | 

***Description***

Converts a string to a date-time value.
Returns a `date_time_parts` structure.


---
</details>

<br>

<details>
<summary>
<strong>
ZuluTimestamp(  )
</strong>
</summary>

> ### Date.***ZuluTimestamp***(  )
> 
> undefined
> 
> **Returns**: `string`

***Description***

Returns the current date and time as a string.


---
</details>

<br>
<br>

## ***Token***: Functions for tokenizing text strings.


<br>

### ***Token*** Functions

<br>

<details>
<summary>
<strong>
TokenizeOptions( PresetName )
</strong>
</summary>

> ### Token.***TokenizeOptions***( PresetName )
> 
> undefined
> 
> **Returns**: `object`

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| PresetName         | `string` | -        |                   | To retrieve an options preset, use one of: 'csv', or 'cli' You can leave this empty or 'default' for the default options.

***Description***

Returns a set of options for calling Tokenize().
Throws an error if an invalid value for PresetName is given.


---
</details>

<br>

<details>
<summary>
<strong>
Tokenize( PresetName )
</strong>
</summary>

> ### Token.***Tokenize***( PresetName )
> 
> undefined
> 
> **Returns**: `object`

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| PresetName         | `string` | -        |                   | To retrieve an options preset, use one of: 'csv', or 'cli' You can leave this empty for the default options.

***Description***

Returns the parsed tokens.


---
</details>

<br>
<br>

## ***File***: Functions for manipulating files. (nodejs only)


<br>

### ***File*** Functions

<br>

<details>
<summary>
<strong>
Visit( StartFolder, FilePattern, Recurse, Visitor )
</strong>
</summary>

> ### File.***Visit***( StartFolder, FilePattern, Recurse, Visitor )
> 
> undefined
> 
> **Returns**: `number`

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| StartFolder        | `string` | required |                   | 
| FilePattern        | `string` | -        |                   | 
| Recurse            | `boolean` | -       |                   | 
| Visitor            | `function` | -      |                   | 

***Description***

Scans a folder and calls the Visitor callback function for each folder/file encountered.
Returns the number of folders/files visited.


---
</details>

<br>

<details>
<summary>
<strong>
CountFiles( StartFolder, FilePattern, Recurse )
</strong>
</summary>

> ### File.***CountFiles***( StartFolder, FilePattern, Recurse )
> 
> undefined
> 
> **Returns**: `number`

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| StartFolder        | `string` | required |                   | 
| FilePattern        | `string` | -        | "*"               | 
| Recurse            | `boolean` | -       |                   | 

***Description***

Scans a folder and calls the Visitor callback function for each folder/file encountered.
Returns the number of folders/files visited.


---
</details>

<br>

<details>
<summary>
<strong>
CountFolders( StartFolder, Recurse )
</strong>
</summary>

> ### File.***CountFolders***( StartFolder, Recurse )
> 
> undefined
> 
> **Returns**: `number`

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| StartFolder        | `string` | required |                   | 
| Recurse            | `boolean` | -       |                   | 

***Description***

Scans a folder and calls the Visitor callback function for each folder/file encountered.
Returns the number of folders/files visited.


---
</details>

<br>

<details>
<summary>
<strong>
CopyFolder( FromFolder, ToFolder, FilePattern, Overwrite, Recurse )
</strong>
</summary>

> ### File.***CopyFolder***( FromFolder, ToFolder, FilePattern, Overwrite, Recurse )
> 
> undefined
> 
> **Returns**: `number`

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| FromFolder         | `string` | required |                   | 
| ToFolder           | `string` | required |                   | 
| FilePattern        | `string` | -        | "*"               | 
| Overwrite          | `boolean` | -       |                   | 
| Recurse            | `boolean` | -       |                   | 

***Description***

Copies files from one folder to another.
Returns the number of files copied.


---
</details>

<br>

<details>
<summary>
<strong>
DeleteFolder( Folder, Recurse )
</strong>
</summary>

> ### File.***DeleteFolder***( Folder, Recurse )
> 
> undefined
> 
> **Returns**: `number`

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| Folder             | `string` | required |                   | 
| Recurse            | `boolean` | -       |                   | 

***Description***

Deletes a folder and all of its sub-folders and files.
Returns the number of folders and files deleted.


---
</details>

<br>

<details>
<summary>
<strong>
AsyncSleep( Milliseconds )
</strong>
</summary>

> ### OS.***AsyncSleep***( Milliseconds )
> 
> undefined
> 
***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| Milliseconds       | `number` | -        |                   | 


---
</details>

<br>

<details>
<summary>
<strong>
AsyncExecute( Milliseconds )
</strong>
</summary>

> ### OS.***AsyncExecute***( Milliseconds )
> 
> undefined
> 
***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| Milliseconds       | `number` | -        |                   | 


---
</details>

<br>
<br>

## ***Net***: Functions for working with networks. (nodejs only)


<br>

### ***Net*** Functions

<br>

<details>
<summary>
<strong>
AsyncDownloadFile(  )
</strong>
</summary>

> ### Net.***AsyncDownloadFile***(  )
> 
> undefined
> 
> **Returns**: `string`

***Description***

Download a file from an url.


---
</details>

<br>

<details>
<summary>
<strong>
AsyncGetRequest( Url )
</strong>
</summary>

> ### Net.***AsyncGetRequest***( Url )
> 
> undefined
> 
> **Returns**: `string`

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| Url                | `string` | required |                   | 

***Description***

Make an http get request for a an url.


---
</details>
