
# Testing Output

- Project: @liquicode/liquicodejs
- Timestamp: 2022-09-14T08:47:06.500Z

~~~
000) Types Module
    √ should load the Types module

  010) Types.Coerce Tests
    ToBoolean
      √ should coerce undefined to boolean
      √ should coerce null to boolean
      √ should coerce boolean to boolean
      √ should coerce number to boolean
      √ should coerce string to boolean
      √ should coerce special-case strings to boolean
      √ should coerce object to boolean

  021) Types.GetFormat Tests
    √ should return null for undefined
    √ should return null for null
    √ should detect boolean : boolean
    √ should detect number : number
    √ should detect number : integer
    √ should detect string : string
    √ should detect string : json
    √ should detect string : datetime
    √ should detect string : date
    √ should detect string : time
    √ should detect object : object
    √ should detect object : datetime
    √ should detect object : array
    √ should detect object : boolean-array
    √ should detect object : string-array
    √ should detect object : number-array
    √ should detect object : object-array
    √ should detect object : array-array

  100) Object Module
    √ should load the Object module

  120) Object.FromJson Tests
    Equivalence with Javascript's JSON.parse()
      √ should parse boolean value: true
      √ should parse number value: 3.14
      √ should parse string value: "text"
      √ should parse empty array: []
      √ should parse empty object: {}
    Parsing features
      √ should not require quoted identifiers
      √ should allow trailing commas
      √ should stop parsing after closing brace or bracket
      √ should ignore everything after closing brace or bracket

  121) Object.ToJsonOptions Tests
    √ should load the default options

  122) Object.ToJson Tests
    Stringify Primitives
      √ should stringify null [null]
      √ should stringify empty string [""]
      √ should stringify empty array [[]]
      √ should stringify empty object [{}]
      √ should stringify [true]
      √ should stringify [3.14]
      √ should stringify ["Hello World!"]
    Equivalence with Javascript's JSON.stringify()
      √ should stringify null [null] the same way
      √ should stringify empty string [""] the same way
      √ should stringify empty array [[]] the same way
      √ should stringify empty object [{}] the same way
      √ should stringify [true] the same way
      √ should stringify [3.14] the same way
      √ should stringify ["Hello World!"] the same way
      √ should stringify test_1.json the same way

  125) Object.FromIni Tests
    √ should handle simple cases
    √ should ignore invalid sections and entries

  200) Text Module
    √ should load the Text module

  203) Text.Matches Tests
    √ should match an empty string and an empty pattern
    √ an empty pattern should not match anything except an empty string
    √ the pattern '*' should match any text including an empty string
    √ the pattern '?' should match a single character
    √ the pattern '??' should match exactly two characters
    √ the pattern '??*' should match at least two characters
    √ the pattern '?*?' should match at least two characters
    √ the pattern '*??' should match at least two characters
    √ should match the pattern '1?3'
    √ should match the pattern '1*3'

  210) Text.ReplaceCharacters Tests
    replace a single character with a single character
      √ should replace a single character with a single character, one instance
      √ should replace a single character with a single character, two instances
      √ should replace a single character with a single character, all instances
    replace multiple characters with a single character
      √ should replace multiple characters with a single character, one instance
      √ should replace multiple characters with a single character, two instances
      √ should replace multiple characters with a single character, all instances
    replace a single character with a string
      √ should replace a single character with a string, one instance
      √ should replace a single character with a string, two instances
      √ should replace a single character with a string, all instances

  220) Text.FirstWord Tests
    √ should get an empty word from empty text
    √ should get an empty word from null text
    √ should get the first word
    √ should get the first word of a phrase with only a single word
    √ should ignore leading whitespace

  221) Text.AfterFirstWord Tests
    √ should get no words from empty text
    √ should get no words from null text
    √ should get words after the first word
    √ should get no words after a phrase with only a single word
    √ should get the first word and after the first word

  300) Shapes Module
    √ should load the Shapes module

  310) Shapes.Matrix Tests
    IsValidAddress Tests
      √ should return false when called without any parameters
      √ should return false when called with an invalid addresses
      √ should return true for valid addresses
    NumberToLetters Tests
      √ should throw an error when called without any parameters
      √ should throw an error when called with an invalid parameter
      √ should throw an error when called with a negative integer parameter
      √ should throw an error when called with a zero parameter
      √ should return an address for a number
    LettersToNumber Tests
      √ should throw an error when called without any parameters
      √ should throw an error when called with an invalid parameter
      √ should return zero when called with an invalid address parameter
      √ should return a number for an address
      √ should return a number for an address (lower-case)
    RowIndexOf Tests
      √ should throw an error when called without any parameters
      √ should throw an error when called with an invalid parameter
      √ should throw an error when called with an invalid address parameter
      √ should throw an error when called with an out of bounds parameter
      √ should return a valid row index for a valid row index
      √ should return a valid row index for a negative row index
      √ should return a valid row index for a valid address
    RowCount Tests
      √ should return the row count
    AppendRows Tests
      √ should append a single blank row when called with no paramters
      √ should append a single row when called with an array of values
      √ should append multiple rows when called with an array of arrays
    InsertRows Tests
      √ should throw an error when called without any parameters
      √ should throw an error when row index is out of bounds
      √ should insert a single blank row when called with no values
      √ should insert a single row when called with an array of values
      √ should insert multiple rows when called with an array of arrays
      √ should insert a row at a specific row index
      √ should insert a row at a specific (negative) row offset
      √ should insert a row at a specific address
    DeleteRows Tests
      √ should throw an error when called without any parameters
      √ should delete a single row when called without a row count
      √ should delete a single row when called with a row count of one
      √ should delete multiple rows when called with a row count greater than one
      √ should delete a row at a specific row index
      √ should delete a row at a specific (negative) row offset
      √ should delete a row at a specific address
    GetRow Tests
      √ should throw an error when called without any parameters
      √ should get a row at a specific row index
      √ should get a row at a specific (negative) row offset
      √ should get a row at a specific address
    SetRow Tests
      √ should throw an error when called without any parameters
      √ should throw an error when row index is out of bounds
      √ should set an empty row when called with no values
      √ should set a row at a specific row index
      √ should get a row at a specific (negative) row offset
      √ should set a row at a specific address
    ColumnIndexOf Tests
      √ should throw an error when called without any parameters
      √ should throw an error when called with an invalid parameter
      √ should throw an error when called with an invalid address parameter
      √ should throw an error when called with an out of bounds parameter
      √ should return a valid column index for a valid column index
      √ should return a valid column index for a negative column index
      √ should return a valid row index for a valid address
    ColumnCount Tests
      √ should return the column count
    AppendColumns Tests
      √ should append a single blank column when called with no paramters
      √ should append a single column when called with an array of values
      √ should append multiple columns when called with an array of arrays
    InsertColumns Tests
      √ should throw an error when called without any parameters
      √ should throw an error when column index is out of bounds
      √ should insert a single blank column when called with no values
      √ should insert a single column when called with an array of values
      √ should insert multiple columns when called with an array of arrays
      √ should insert a column at a specific column index
      √ should insert a column at a specific (negative) column offset
      √ should insert a column at a specific address
    DeleteColumns Tests
      √ should throw an error when called without any parameters
      √ should delete a single column when called without a column count
      √ should delete a single column when called with a column count of one
      √ should delete multiple columns when called with a column count greater than one
      √ should delete a column at a specific column index
      √ should delete a column at a specific (negative) column offset
      √ should delete a column at a specific address
    GetColumn Tests
      √ should throw an error when called without any parameters
      √ should get a column at a specific column index
      √ should get a column at a specific (negative) column offset
      √ should get a column at a specific address
    SetColumn Tests
      √ should throw an error when called without any parameters
      √ should throw an error when column index is out of bounds
      √ should set a blank column when called with no values
      √ should set a column at a specific column index
      √ should get a column at a specific (negative) column offset
      √ should set a column at a specific address
    GetValue Tests
      √ should throw an error when called without any parameters
      √ should throw an error when called with out of bounds parameters
      √ should get a value at a specific row and column indexes
      √ should get a value at a specific (negative) row and column offsets
      √ should get a value at a specific address
    SetValue Tests
      √ should throw an error when called without any parameters
      √ should throw an error when called with out of bounds parameters
      √ should set a value at a specific row and column indexes
      √ should get a value at a specific (negative) row and column offsets
      √ should get a value at a specific address
    GetMatrix Tests
      √ should throw an error when called without any parameters
      √ should throw an error when called with out of bounds parameters
      √ should get a matrix of values at specific row and column indexes
      √ should get a matrix of values at a specific (negative) row and column offsets
      √ should get a matrix of values at a specific address
    SetMatrix Tests
      √ should throw an error when called without any parameters
      √ should throw an error when called with out of bounds parameters
      √ should set a matrix of values at specific row and column indexes
      √ should get a matrix of values at a specific (negative) row and column offsets
      √ should get a matrix of values at a specific address
    Transpose Tests
      √ should transpose a matrix of values
    Join Tests
      √ should inner join tables
      √ should left join tables
      √ should right join tables
      √ should full join tables

  500) Parse Tests
    √ should load the Parse module

  501) Parse.TokenizeOptions Tests
    √ should get default options when PresetName is undefined
    √ should get default options when PresetName is null
    √ should get default options when PresetName is empty
    √ should get default options when PresetName is 'default'
    √ should get options when PresetName is 'csv'
    √ should get options when PresetName is 'cli'
    √ should throw an error when PresetName is 'blah'

  502) Parse.Tokenize Tests
    √ should tokenize an undefined string
    √ should tokenize an empty string
    √ should tokenize a simple string
    √ should tokenize a more complex string and detect custom keywords
    √ should tokenize a symbol
    √ should tokenize whitespace
    √ should tokenize a literal
    √ should tokenize a literal with an apostrophe
    √ should tokenize a literal with an escape character
    √ should tokenize a literal with an alternate escape character
    √ should tokenize a literal with a self escaping duplicate character
    √ should discard whitespace
    √ should detect keywords, case sensitive
    √ should detect keywords, case insensitive

  510) Parse.DateParse Tests
    Various Date Formats
      √ handle: mm/dd/yyyy
      √ handle: m/d/yyyy
      √ handle: mm-dd-yyyy
      √ handle: m-d-yyyy
      √ handle: yyyy-mm-dd
      √ handle: yyyy-m-d
      √ handle: month d, yyyy
      √ handle: month-d-yyyy
      √ handle: month/d/yyyy
      √ handle: d month yyyy
      √ handle: d-month-yyyy
      √ handle: d/month/yyyy
    Parse Day of week
      √ handle: dow, dd month yyyy
      √ handle: dow,dd month yyyy hh:mm:ss zone+offset
    Parse Date and Time
      √ handle: mm/dd/yyyy hh:mm:ss
      √ handle: mm/dd/yyyy hh:mm:ss.nnn
      √ handle: mm/dd/yyyy h:mm:ss
      √ handle: mm/dd/yyyy - h:mm
    Parse Time Zones
      √ handle: ISO Format
      √ handle: ISO Format (short)
      √ handle: mm/dd/yyyy hh:mm:ss zone
      √ handle: mm/dd/yyyy hh:mm:ss +offset
      √ handle: mm/dd/yyyy hh:mm:ss +offset (no zeros)
      √ handle: mm/dd/yyyy hh:mm:ss +offset (as time)
      √ handle: mm/dd/yyyy hh:mm:ss -offset
      √ handle: mm/dd/yyyy hh:mm:ss zone+offset
      √ handle: mm/dd/yyyy hh:mm:ss zone-offset
    Compressed date strings
      √ handle: compressed date
      √ handle: compressed date and time
      √ handle: number of seconds since whenever
      √ handle: number of milliseconds since whenever
    Reject invalid dates
      √ reject: empty string
      √ reject: garbage

  810) System.VisitFiles Tests
    √ should visit all elements of a folder
    √ should visit all elements of a folder recursively
    √ should visit only files when a pattern is supplied

  830) System.StartContainer Tests
    √ should start and stop a container


  254 passing (2s)
~~~
