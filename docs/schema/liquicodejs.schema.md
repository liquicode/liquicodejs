
<br>
<br>

## ***Types***: Data Type Handling


<br>

### ***Types*** Functions

<br>

<details>
<summary>
<strong>
HasValue( Value )
</strong>
<small>
- Determine if a variable contains a value or or not.
</small>
</summary>

> ### Types.***HasValue***( Value )
> 
> Determine if a variable contains a value or or not.
> 
> **Returns**: `boolean` - True if Value actually contains a value.

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| Value              | `*`     | required  |                   | The value to test.

***Description***


Tests the provided Value parameter and returns false if it does not represent a value.
More specifically, if Value is undefined or null, then false is returned.
if Value is a zero length string `""` or an empty object `{}`, false is also returned.
In all other cases, this function returns true.



---
</details>

<br>

<details>
<summary>
<strong>
Coerce( Value, Loud )
</strong>
<small>
- Returns a `Coercion` object which is used to coerce values to different types.
</small>
</summary>

> ### Types.***Coerce***( Value, Loud )
> 
> Returns a `Coercion` object which is used to coerce values to different types.
> 
> **Returns**: `object` - A `Coercion` object.

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| Value              | `*`     | -         |                   | The value to coerce. This value is set to `Coercion.value`.
| Loud               | `boolean` | -       |                   | Throws errors when set to `true`.

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
Liquicode.Types.GetFormat( '42' )         // = 'number:integer'
Liquicode.Types.GetFormat( 'Hello' )      // = 'string:string'
Liquicode.Types.GetFormat( new Date() )   // = 'object:datetime'
Liquicode.Types.GetFormat( [ 1, 2, 3 ] )  // = 'object:number-array'
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
Liquicode.Types.IsFormat( 'Hello', 'string:string' )            // = true
Liquicode.Types.IsFormat( 'Hello', 'string:json' )              // = false
Liquicode.Types.IsFormat( [ 1, 2, 3 ], 'object:array' )         // = true
Liquicode.Types.IsFormat( [ 1, 2, 3 ], 'object:number-array' )  // = true
Liquicode.Types.IsFormat( [ 1, 2, 3 ], 'object:string-array' )  // = false
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

***Description***


Merges the content of two objects and returns the composite result.

Similar to Clone, this function will remove any non-data fields (i.e. functions and symbols) from the objects.



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

<details>
<summary>
<strong>
ValueArrayOf( Value )
</strong>
</summary>

> ### Object.***ValueArrayOf***( Value )
> 
> undefined
> 
> **Returns**: `array`

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| Value              | `any`   | -         |                   | 

***Description***


Returns an array of values.
If the Value parameter is missing or null, then an empty array `[]` is returned.
If Value is an object, its values are returned in the array.
If Value is already an array, it is returned unmodified.
Otherwise, an array is returned containing Value as its only member.



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
ReplaceText( Text, SearchText, ReplacementText, MaxTimes )
</strong>
</summary>

> ### Text.***ReplaceText***( Text, SearchText, ReplacementText, MaxTimes )
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
| MaxTimes           | `number` | -        | 1                 | 


---
</details>

<br>

<details>
<summary>
<strong>
FindBetween( Text, StartText, EndText )
</strong>
<small>
- Search a string and return the text found between StartText and EndText.
</small>
</summary>

> ### Text.***FindBetween***( Text, StartText, EndText )
> 
> Search a string and return the text found between StartText and EndText.
> 
> **Returns**: `string` - The text found between StartText and EndText.

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| Text               | `string` | required |                   | 
| StartText          | `string` | -        |                   | 
| EndText            | `string` | -        |                   | 

***Description***


This function searches a string for StartText and EndText and returns all text found between the two.

If StartText is missing, then the search will return all text up to the found EndText.

If EndText is missing, then the search will return all text found after StartText.

If both StartText and EndText are missing, then the entire Text string will be returned.

If StartText or EndText are not found within Text, then a `null` is returned.




---
</details>

<br>

<details>
<summary>
<strong>
ReplaceBetween( Text, StartText, EndText, ReplacementText, MaxTimes )
</strong>
<small>
- Search a string for StartText and EndText and replace the text found between the two.
</small>
</summary>

> ### Text.***ReplaceBetween***( Text, StartText, EndText, ReplacementText, MaxTimes )
> 
> Search a string for StartText and EndText and replace the text found between the two.
> 
> **Returns**: `integer` - The new string with replacements performed.

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| Text               | `string` | required |                   | 
| StartText          | `string` | -        |                   | 
| EndText            | `string` | -        |                   | 
| ReplacementText    | `string` | required |                   | 
| MaxTimes           | `number` | -        | 1                 | 

***Description***


This function searches a string for StartText and EndText and replaces all text found between the two.

If StartText is missing, then all text found up to EndText will be replaced.

If EndText is missing, then all text found after StartText will be replaced.

If both StartText and EndText are missing, then the entire Text string will be replaced.

If StartText or EndText are not found within Text, then this function returns `0` to indicate that no replacements were performed.

The MaxTimes parameter specifies the maximum number of replacements to perform.
If MaxTimes is `-1`, then all possible replacements will be made throughout Text.



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

## ***Shapes***: Functions for manipulating data in different shapes.


<br>

### ***Shapes*** Functions

<br>

<details>
<summary>
<strong>
Matrix( Values, Options )
</strong>
<small>
- Matrix stores a two-dimensional jagged array and exposes manipulation functions.
</small>
</summary>

> ### Shapes.***Matrix***( Values, Options )
> 
> Matrix stores a two-dimensional jagged array and exposes manipulation functions.
> 
> **Returns**: `object`

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| Values             | `object` | required | [[]]              | One of: a two-dimensional array of arrays, a one-dimensional array of values, or an integer.
| Options            | `object` | -        | {}                | Set of options controlling Matrix operation.

***Description***


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
AsyncVisitFiles( StartFolder, FilePattern, Recurse, Visitor )
</strong>
</summary>

> ### System.***AsyncVisitFiles***( StartFolder, FilePattern, Recurse, Visitor )
> 
> undefined
> 
> **Returns**: `*`

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| StartFolder        | `string` | required |                   | 
| FilePattern        | `string` | -        |                   | 
| Recurse            | `boolean` | -       |                   | 
| Visitor            | `function` | -      |                   | Function to be called for each folder and file: Visitor( Path, Filename )

***Description***


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



---
</details>

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
> **Returns**: `*`

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| StartFolder        | `string` | required |                   | 
| FilePattern        | `string` | -        |                   | 
| Recurse            | `boolean` | -       |                   | 
| Visitor            | `function` | -      |                   | Function to be called for each folder and file: Visitor( Path, Filename )

***Description***


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
EmptyFolder( Folder )
</strong>
</summary>

> ### System.***EmptyFolder***( Folder )
> 
> undefined
> 
> **Returns**: `number`

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| Folder             | `string` | required |                   | 

***Description***


Empties a folder by removing all of its sub-folders and files.

Returns the number of folders and files removed.



---
</details>

<br>

<details>
<summary>
<strong>
WithFileText( Filename, FileTextCallback )
</strong>
</summary>

> ### System.***WithFileText***( Filename, FileTextCallback )
> 
> undefined
> 
> **Returns**: `boolean` - False if no changes were made or True if changes were saved.

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| Filename           | `string` | required |                   | 
| FileTextCallback   | `function` | required |                 | 

***Description***


Loads content from a file and passes it to a callback function for processing.

The callback function takes two parameters: Filename and Text.
Filename is the Filename passed to `WithFileText` and Text is the content of that file.
The callback function is expected to return either `undefined` or `null` if no changes are made to the text.
If changes are made, the callback function can return the new text which will be saved back to Filename.

If the file content is changed during callback processing, then `WithFileText` will return True.



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
ExecuteProcess( Command, Environment, StartFolder )
</strong>
</summary>

> ### System.***ExecuteProcess***( Command, Environment, StartFolder )
> 
> undefined
> 
***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| Command            | `string` | required |                   | 
| Environment        | `object` | -        |                   | 
| StartFolder        | `string` | -        |                   | 


---
</details>

<br>

<details>
<summary>
<strong>
AsyncExecuteProcess( Command, Environment, StartFolder )
</strong>
</summary>

> ### System.***AsyncExecuteProcess***( Command, Environment, StartFolder )
> 
> undefined
> 
***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| Command            | `string` | required |                   | 
| Environment        | `object` | -        |                   | 
| StartFolder        | `string` | -        |                   | 


---
</details>

<br>

<details>
<summary>
<strong>
StartProcess( Command, Environment, StartFolder )
</strong>
</summary>

> ### System.***StartProcess***( Command, Environment, StartFolder )
> 
> undefined
> 
> **Returns**: `string`

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| Command            | `string` | required |                   | 
| Environment        | `object` | -        |                   | 
| StartFolder        | `string` | -        |                   | 

***Description***

Starts a new process and returns the ProcessID.


---
</details>

<br>

<details>
<summary>
<strong>
StopProcess( ProcessID )
</strong>
</summary>

> ### System.***StopProcess***( ProcessID )
> 
> undefined
> 
> **Returns**: `string`

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| ProcessID          | `string` | required |                   | 

***Description***

Stops a running process by its ProcessID.


---
</details>

<br>

<details>
<summary>
<strong>
ContainerStatus( ContainerID )
</strong>
</summary>

> ### System.***ContainerStatus***( ContainerID )
> 
> undefined
> 
> **Returns**: `string`

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| ContainerID        | `string` | required |                   | 

***Description***

Gets the status of a running Docker Container.


---
</details>

<br>

<details>
<summary>
<strong>
RunContainer( ImageName, Options )
</strong>
</summary>

> ### System.***RunContainer***( ImageName, Options )
> 
> undefined
> 
> **Returns**: `string`

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| ImageName          | `string` | required |                   | 
| Options            | `object` | -        |                   | 

***Description***


Runs a Docker Container.

Options Parameter:
~~~javascript
{
	name: '',           // Name of the container. Defaults to random name.
	hostname: '',       // Hostname for the container.
	network: '',        // Name of docker network for the container to use.
	ports: [],          // Array of port object { localhost: 80, container: 80 }
	volumes: [],        // Array of volume object { localhost: '/path', container: '/path' }
	environment: {},    // Environment variables and values.
}
~~~

Example:
~~~javascript
let container_id = Liquicode.RunContainer( 'mongo:latest',
	{
		name: 'mongo-server',
		ports: [ { localhost: 27017, container: 27017 } ],
	} );
~~~




---
</details>

<br>

<details>
<summary>
<strong>
StartContainer( ContainerID )
</strong>
</summary>

> ### System.***StartContainer***( ContainerID )
> 
> undefined
> 
> **Returns**: `string`

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| ContainerID        | `string` | required |                   | 

***Description***

Stops a running Docker Container.


---
</details>

<br>

<details>
<summary>
<strong>
StopContainer( ContainerID )
</strong>
</summary>

> ### System.***StopContainer***( ContainerID )
> 
> undefined
> 
> **Returns**: `string`

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| ContainerID        | `string` | required |                   | 

***Description***

Stops a running Docker Container.


---
</details>

<br>

<details>
<summary>
<strong>
KillContainer( ContainerID )
</strong>
</summary>

> ### System.***KillContainer***( ContainerID )
> 
> undefined
> 
> **Returns**: `string`

***Parameters***

|  Name              |  Type   | Required  |  Default          |  Description  
|--------------------|---------|-----------|-------------------|---------------
| ContainerID        | `string` | required |                   | 

***Description***

Kills a running Docker Container.


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
