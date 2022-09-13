
### ***Types***: Data Type Handling

<br>

#### Types.***HasValue***( Value )
- Determine if a variable contains a value or or not.
- Returns: `boolean` - True if Value actually contains a value.

<br>

#### Types.***Coerce***( Value, Loud )
- Returns a `Coercion` object which is used to coerce values to different types.
- Returns: `object` - A `Coercion` object.

<br>

#### Types.***GetFormat***( Value )
- Determine the type and format of a value.
- Returns: `string` - An extended type description.

<br>

#### Types.***IsFormat***( Value, Format )
- Determine if a value is of a particular format.
- Returns: `boolean` - True if the value matches the format.

<br>

### ***Object***: Functions for manipulating Javascript objects.

<br>

#### Object.***Clone***( From )
- Returns: `string`

<br>

#### Object.***Merge***( Original, Updates )
- Returns: `object`

<br>

#### Object.***FromJson***( JsonString )
- Returns: `object`

<br>

#### Object.***ToJsonOptions***( PresetName )
- Returns: `object`

<br>

#### Object.***ToJson***( Value, JsonOptions )
- Returns: `object`

<br>

#### Object.***FromIni***( IniString )
- Returns: `object`

<br>

#### Object.***ToIni***( Value )
- Returns: `object`

<br>

#### Object.***ValueArrayOf***( Value )
- Returns: `array`

<br>

### ***Text***: Functions for text parsing and manipulation.

<br>

#### Text.***Compare***( StringA, StringB, CaseSensitive )
- Returns: `string`

<br>

#### Text.***Matches***( Text, Pattern )
- Returns: `string`

<br>

#### Text.***ReplaceCharacters***( Text, SearchCharacters, ReplacementText, MaxTimes )
- Returns: `string`

<br>

#### Text.***ReplaceText***( Text, SearchText, ReplacementText )
- Returns: `string`

<br>

#### Text.***FirstWord***( Phrase, Delimiters )
- Returns: `string`

<br>

#### Text.***AfterFirstWord***( Phrase, Delimiters )
- Returns: `string`

<br>

#### Text.***LastWord***( Phrase, Delimiters )
- Returns: `string`

<br>

#### Text.***BeforeLastWord***( Phrase, Delimiters )
- Returns: `string`

<br>

### ***Shapes***: Functions for manipulating data in different shapes.

<br>

#### Shapes.***Matrix***( Values, Options )
- Matrix stores a two-dimensional jagged array and exposes manipulation functions.
- Returns: `object`

<br>

### ***Parse***: Functions for tokenizing text strings.

<br>

#### Parse.***TokenizeOptions***( PresetName )
- Returns: `object`

<br>

#### Parse.***Tokenize***( PresetName )
- Returns: `object`

<br>

#### Parse.***DateParse***( Value, TimeZoneOffset )
- Returns: `object`

<br>

### ***System***: File system and process functions. (nodejs only)

<br>

#### System.***AsyncVisitFiles***( StartFolder, FilePattern, Recurse, Visitor )
- Returns: `*`

<br>

#### System.***VisitFiles***( StartFolder, FilePattern, Recurse, Visitor )
- Returns: `*`

<br>

#### System.***CountFiles***( StartFolder, FilePattern, Recurse )
- Returns: `number`

<br>

#### System.***CountFolders***( StartFolder, Recurse )
- Returns: `number`

<br>

#### System.***CopyFolder***( FromFolder, ToFolder, FilePattern, Overwrite, Recurse )
- Returns: `number`

<br>

#### System.***DeleteFolder***( Folder, Recurse )
- Returns: `number`

<br>

#### System.***EmptyFolder***( Folder )
- Returns: `number`

<br>

#### System.***AsyncSleep***( Milliseconds )

<br>

#### System.***ExecuteProcess***( Command, Environment, StartFolder )

<br>

#### System.***AsyncExecuteProcess***( Command, Environment, StartFolder )

<br>

#### System.***StartProcess***( Command, Environment, StartFolder )
- Returns: `string`

<br>

#### System.***StopProcess***( ProcessID )
- Returns: `string`

<br>

#### System.***StartContainer***( ImageName, Options )
- Returns: `string`

<br>

#### System.***StopContainer***( ContainerID )
- Returns: `string`

<br>

#### System.***ContainerStatus***( ContainerID )
- Returns: `string`

<br>

### ***Network***: Functions for working with networks. (nodejs only)

<br>

#### Network.***AsyncDownloadFile***(  )
- Returns: `string`

<br>

#### Network.***AsyncGetRequest***( Url )
- Returns: `string`

<br>
