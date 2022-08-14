
<br>
<br>

## ***Types***: Data Type Handling

<details>
<summary>
<strong>
Types Details
</strong>
</summary>


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



**Related Reading**

- [You Don't Know JS: Types & Grammar - Chapter 4. Coercion](https://www.oreilly.com/library/view/you-dont-know/9781491905159/ch04.html)


</details>

<br>

### ***Types*** Functions

<br>

<details>
<summary>
<strong>
Coerce( Value )
</strong>
<small>
- Returns a `Coercion` object which is used to coerce values to different types.
</small>
</summary>

> ### Types.***Coerce***( Value )
> 
> Returns a `Coercion` object which is used to coerce values to different types.
> 
> **Returns**: `object` - A `Coercion` object.

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| Value              | `*`     | -         |                   | The value to coerce. This value is set to `Coercion.value`.

***Description***


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
let number_42 = LiquicodeJS.Schema.Coerce( '42' ).ToNumber();
~~~

Another way is to reuse the `Coercion` object and alter the `Coercion.value` property yourself:
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



---
</details>

<br>

<details>
<summary>
<strong>
GetFormat( Value )
</strong>
<small>
- Determine the type and format of a value.
</small>
</summary>

> ### Types.***GetFormat***( Value )
> 
> Determine the type and format of a value.
> 
> **Returns**: `string` - An extended type description.

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| Value              | `*`     | required  |                   | The value to get the format for.

***Description***


Iterates through `Types.Formats` in reverse order and calls each `Format.IsFormat()` function.
When one of the formats returns `true`, then it's type and format are returned separated by `:`.

**Examples**

~~~javascript
LiquicodeJS.Types.GetFormat( '42' )         // = 'number:integer'
LiquicodeJS.Types.GetFormat( 'Hello' )      // = 'string:string'
LiquicodeJS.Types.GetFormat( new Date() )   // = 'object:datetime'
LiquicodeJS.Types.GetFormat( [ 1, 2, 3 ] )  // = 'object:number-array'
~~~



---
</details>

<br>

<details>
<summary>
<strong>
IsFormat( Value, Format )
</strong>
<small>
- Determine if a value is of a particular format.
</small>
</summary>

> ### Types.***IsFormat***( Value, Format )
> 
> Determine if a value is of a particular format.
> 
> **Returns**: `boolean` - True if the value matches the format.

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| Value              | `*`     | required  |                   | The value to test.
| Format             | `string` | required |                   | The type and format to test for as: `"type:format"`.

***Description***


Looks up the specified format in `Types.Formats` and calls the `Format.IsFormat()` function.

The `Format` parameter must specify both type and format to be tested for.

**Examples**

~~~javascript
LiquicodeJS.Types.IsFormat( 'Hello', 'string:string' )            // = true
LiquicodeJS.Types.IsFormat( 'Hello', 'string:json' )              // = false
LiquicodeJS.Types.IsFormat( [ 1, 2, 3 ], 'object:array' )         // = true
LiquicodeJS.Types.IsFormat( [ 1, 2, 3 ], 'object:number-array' )  // = true
LiquicodeJS.Types.IsFormat( [ 1, 2, 3 ], 'object:string-array' )  // = false
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

## ***Parse***: Functions for tokenizing text strings.


<br>

### ***Parse*** Functions

<br>

<details>
<summary>
<strong>
TokenizeOptions( PresetName )
</strong>
</summary>

> ### Parse.***TokenizeOptions***( PresetName )
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

> ### Parse.***Tokenize***( PresetName )
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

<details>
<summary>
<strong>
DateParse( Value, TimeZoneOffset )
</strong>
</summary>

> ### Parse.***DateParse***( Value, TimeZoneOffset )
> 
> undefined
> 
> **Returns**: `object`

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| Value              | `string` | required |                   | 
| TimeZoneOffset     | `string` | -        | "+0000"           | 

***Description***


Dates and times are funny little creatures.



---
</details>

<br>
<br>

## ***System***: File system and process functions. (nodejs only)


<br>

### ***System*** Functions

<br>

<details>
<summary>
<strong>
VisitFiles( StartFolder, FilePattern, Recurse, Visitor )
</strong>
</summary>

> ### System.***VisitFiles***( StartFolder, FilePattern, Recurse, Visitor )
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

> ### System.***CountFiles***( StartFolder, FilePattern, Recurse )
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

> ### System.***CountFolders***( StartFolder, Recurse )
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

> ### System.***CopyFolder***( FromFolder, ToFolder, FilePattern, Overwrite, Recurse )
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

> ### System.***DeleteFolder***( Folder, Recurse )
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

> ### System.***AsyncSleep***( Milliseconds )
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

> ### System.***AsyncExecute***( Milliseconds )
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

## ***Network***: Functions for working with networks. (nodejs only)


<br>

### ***Network*** Functions

<br>

<details>
<summary>
<strong>
AsyncDownloadFile(  )
</strong>
</summary>

> ### Network.***AsyncDownloadFile***(  )
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

> ### Network.***AsyncGetRequest***( Url )
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
