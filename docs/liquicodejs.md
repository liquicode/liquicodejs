
<br>
<br>

# ***Schema***: Data value and type handling

***Description***



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





<br>

<details>
<summary>
<strong>
Schema.ErrorValue( Message, Context ) - Returns an ErrorValue object containing error information.
</strong>
</summary>

>## Function: ErrorValue( Message, Context )
> 
> Returns an ErrorValue object containing error information.
> 
> **Returns**: ***object*** - An ErrorValue object.

***Description***



***TODO***



---

</details>

<br>

<details>
<summary>
<strong>
Schema.IsErrorValue( Value ) - Tests if a Value is an ErrorValue object.
</strong>
</summary>

>## Function: IsErrorValue( Value )
> 
> Tests if a Value is an ErrorValue object.
> 
> **Returns**: ***boolean*** - True if Value is an ErrorValue object, otherwise false.

***TODO***



---

</details>

<br>

<details>
<summary>
<strong>
Schema.ValueSchema( Value ) - Returns a FieldSchema based upon a specific value.
</strong>
</summary>

>## Function: ValueSchema( Value )
> 
> Returns a FieldSchema based upon a specific value.
> 
> **Returns**: ***object*** - A FieldSchema object.

***Description***


This function is used to obtain extended type information about a value.
While it does return an entire FieldSchema object, only the "FieldSchema.type" and "FieldSchema.format" fields are set.


***TODO***



---

</details>

<br>

<details>
<summary>
<strong>
Schema.DefaultValue( Schema, ThrowsErrors ) - Returns the default value for the FieldSchema.
</strong>
</summary>

>## Function: DefaultValue( Schema, ThrowsErrors )
> 
> Returns the default value for the FieldSchema.
> 
> **Returns**: ******* - The default value.

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
Schema.CoerceValue( Value, Schema, ThrowsErrors ) - Attempt to coerce the Value parameter to match the Schema's type.
</strong>
</summary>

>## Function: CoerceValue( Value, Schema, ThrowsErrors )
> 
> Attempt to coerce the Value parameter to match the Schema's type.
> 
> **Returns**: ******* - The coerced value or an error object.

***Description***


This function uses the "FieldSchema.type", "FieldSchema.format", "FieldSchema.required", and "FieldSchema.default" fields to coerce Value to a particular data type.

If Value is "undefined" or "null", then the default value for "FieldSchema.type" will be returned.
This is done by calling "Schema.DefaultValue()" for the FieldSchema.

***Coercion Table***

|    **From**   | **to boolean** |    **to number**    |      **to string**      |    **to object**    |
|:-------------:|:--------------:|:-------------------:|:-----------------------:|:-------------------:|
| **undefined** |  DefaultValue  |     DefaultValue    |       DefaultValue      |     DefaultValue    |
|    **null**   |  DefaultValue  |     DefaultValue    |       DefaultValue      |     DefaultValue    |
|  **boolean**  |      Value     |         0, 1        |      Value.toString     |        Error        |
|   **number**  |   true, false  |        Value        |      Value.toString     |        Error        |
|   **string**  |   true, false  | parseFloat( Value ) |          Value          | JSON.parse( Value ) |
|   **object**  |   true, false  |        Error        | JSON.stringify( Value ) |        Value        |

- **DefaultValue** is calculated by calling Schema.DefaultValue( Schema ).
- **Error** is an "ErrorValue": { ok: false, error: '...', context: 'CoerceValue' }

	


---

</details>

<br>

<details>
<summary>
<strong>
Schema.ValidateValue( Value, Schema, Options ) - Validates a field value according to a schema and optionally coerces the value to match.
</strong>
</summary>

>## Function: ValidateValue( Value, Schema, Options )
> 
> Validates a field value according to a schema and optionally coerces the value to match.
> 
> **Returns**: ******* - The validated/coerced Value or an ErrorValue object.

***Description***



This function uses "Schema.type", "Schema.format", "Schema.required', and "Schema.default" to validate the given Value.

If "Options.coerce = true", then an attempt will be made to coerce the given value to match the type and format specified in the FieldSchema.
(See: "Schema.CoerceValue()")

	


---

</details>

<br>
<br>

# ***Object***: Functions for manipulating Javascript objects.

<br>

<details>
<summary>
<strong>
Object.Clone( From ) - undefined
</strong>
</summary>

>## Function: Clone( From )
> 
> undefined
> 
> **Returns**: ***string*** - undefined

***Description***

Returns a clone of the given object.
This is equivalent to doing A = JSON.parse( JSON.stringify( B ) ).


---

</details>

<br>

<details>
<summary>
<strong>
Object.Merge( Original, Updates ) - undefined
</strong>
</summary>

>## Function: Merge( Original, Updates )
> 
> undefined
> 
> **Returns**: ***object*** - undefined


---

</details>

<br>

<details>
<summary>
<strong>
Object.Traverse( Root, Visitor ) - undefined
</strong>
</summary>

>## Function: Traverse( Root, Visitor )
> 
> undefined
> 
> **Returns**: ***string*** - undefined

***Description***

Traverses and calls a visitor callback function for each field in an object.
This functions recurses through sub-objects and traverses the entire object.


---

</details>

<br>
<br>

# ***Text***: Functions for text parsing and manipulation.

<br>

<details>
<summary>
<strong>
Text.NewTextBuffer( InitialValue, BlockLength ) - undefined
</strong>
</summary>

>## Function: NewTextBuffer( InitialValue, BlockLength )
> 
> undefined
> 
> **Returns**: ***string*** - undefined

***Description***

Returns a new TextBuffer.


---

</details>

<br>

<details>
<summary>
<strong>
Text.Compare( StringA, StringB, CaseSensitive ) - undefined
</strong>
</summary>

>## Function: Compare( StringA, StringB, CaseSensitive )
> 
> undefined
> 
> **Returns**: ***string*** - undefined

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
Text.Matches( Text, Pattern ) - undefined
</strong>
</summary>

>## Function: Matches( Text, Pattern )
> 
> undefined
> 
> **Returns**: ***string*** - undefined

***Description***

Matches the text against a wildcard-lik pattern.
Returns true If the match succeeds, otherwise false.


---

</details>

<br>

<details>
<summary>
<strong>
Text.ReplaceCharacters( Text, SearchCharacters, ReplacementText, MaxTimes ) - undefined
</strong>
</summary>

>## Function: ReplaceCharacters( Text, SearchCharacters, ReplacementText, MaxTimes )
> 
> undefined
> 
> **Returns**: ***string*** - undefined

***Description***

Replaces characters within a string.
Returns the modified string.


---

</details>

<br>

<details>
<summary>
<strong>
Text.FirstWord( Phrase, Delimiters ) - undefined
</strong>
</summary>

>## Function: FirstWord( Phrase, Delimiters )
> 
> undefined
> 
> **Returns**: ***string*** - undefined

***Description***

Returns the first word of a text phrase.


---

</details>

<br>

<details>
<summary>
<strong>
Text.AfterFirstWord( Phrase, Delimiters ) - undefined
</strong>
</summary>

>## Function: AfterFirstWord( Phrase, Delimiters )
> 
> undefined
> 
> **Returns**: ***string*** - undefined

***Description***

Returns the remainder of a text phrase occurring after the first word.


---

</details>

<br>

<details>
<summary>
<strong>
Text.LastWord( Phrase, Delimiters ) - undefined
</strong>
</summary>

>## Function: LastWord( Phrase, Delimiters )
> 
> undefined
> 
> **Returns**: ***string*** - undefined

***Description***

Returns the last word of a text phrase.


---

</details>

<br>

<details>
<summary>
<strong>
Text.BeforeLastWord( Phrase, Delimiters ) - undefined
</strong>
</summary>

>## Function: BeforeLastWord( Phrase, Delimiters )
> 
> undefined
> 
> **Returns**: ***string*** - undefined

***Description***

Returns the remainder of a text phrase occurring befiore the last word.


---

</details>

<br>
<br>

# ***Json***: Functions for manipulating Json.

<br>
<br>

# ***Date***: Functions for manipulating dates.

<br>

<details>
<summary>
<strong>
Date.Parse( Text, TimeZoneOffset ) - undefined
</strong>
</summary>

>## Function: Parse( Text, TimeZoneOffset )
> 
> undefined
> 
> **Returns**: ***object*** - undefined

***Description***

Converts a string to a date-time value.
Returns a `date_time_parts` structure.


---

</details>

<br>

<details>
<summary>
<strong>
Date.ZuluTimestamp(  ) - undefined
</strong>
</summary>

>## Function: ZuluTimestamp(  )
> 
> undefined
> 
> **Returns**: ***string*** - undefined

***Description***

Returns the current date and time as a string.


---

</details>

<br>
<br>

# ***Token***: Functions for tokenizing text strings.

<br>

<details>
<summary>
<strong>
Token.TokenizeOptions( PresetName ) - undefined
</strong>
</summary>

>## Function: TokenizeOptions( PresetName )
> 
> undefined
> 
> **Returns**: ***object*** - undefined

***Description***

Returns a set of options for calling Tokenize().
Throws an error if an invalid value for PresetName is given.


---

</details>

<br>

<details>
<summary>
<strong>
Token.Tokenize( PresetName ) - undefined
</strong>
</summary>

>## Function: Tokenize( PresetName )
> 
> undefined
> 
> **Returns**: ***object*** - undefined

***Description***

Returns the parsed tokens.


---

</details>

<br>
<br>

# ***File***: Functions for manipulating files. (nodejs only)

<br>

<details>
<summary>
<strong>
File.Visit( StartFolder, FilePattern, Recurse, Visitor ) - undefined
</strong>
</summary>

>## Function: Visit( StartFolder, FilePattern, Recurse, Visitor )
> 
> undefined
> 
> **Returns**: ***number*** - undefined

***Description***

Scans a folder and calls the Visitor callback function for each folder/file encountered.
Returns the number of folders/files visited.


---

</details>

<br>

<details>
<summary>
<strong>
File.CountFiles( StartFolder, FilePattern, Recurse ) - undefined
</strong>
</summary>

>## Function: CountFiles( StartFolder, FilePattern, Recurse )
> 
> undefined
> 
> **Returns**: ***number*** - undefined

***Description***

Scans a folder and calls the Visitor callback function for each folder/file encountered.
Returns the number of folders/files visited.


---

</details>

<br>

<details>
<summary>
<strong>
File.CountFolders( StartFolder, Recurse ) - undefined
</strong>
</summary>

>## Function: CountFolders( StartFolder, Recurse )
> 
> undefined
> 
> **Returns**: ***number*** - undefined

***Description***

Scans a folder and calls the Visitor callback function for each folder/file encountered.
Returns the number of folders/files visited.


---

</details>

<br>

<details>
<summary>
<strong>
File.CopyFolder( FromFolder, ToFolder, FilePattern, Overwrite, Recurse ) - undefined
</strong>
</summary>

>## Function: CopyFolder( FromFolder, ToFolder, FilePattern, Overwrite, Recurse )
> 
> undefined
> 
> **Returns**: ***number*** - undefined

***Description***

Copies files from one folder to another.
Returns the number of files copied.


---

</details>

<br>

<details>
<summary>
<strong>
File.DeleteFolder( Folder, Recurse ) - undefined
</strong>
</summary>

>## Function: DeleteFolder( Folder, Recurse )
> 
> undefined
> 
> **Returns**: ***number*** - undefined

***Description***

Deletes a folder and all of its sub-folders and files.
Returns the number of folders and files deleted.


---

</details>

<br>
<br>

# ***Net***: Functions for working with networks. (nodejs only)
