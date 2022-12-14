exports = {
    "version": "0.0.23",
    "Schemas": [
        {
            "id": "000",
            "name": "Types",
            "type": "namespace",
            "summary": "Data Type Handling",
            "source_filename": "000-Types\\000-Types.js"
        },
        {
            "id": "001",
            "member_of": "Types",
            "name": "HasValue",
            "type": "function",
            "returns": "boolean",
            "returns_description": "True if Value actually contains a value.",
            "summary": "Determine if a variable contains a value or or not.",
            "description": "\nTests the provided Value parameter and returns false if it does not represent a value.\nMore specifically, if Value is undefined or null, then false is returned.\nif Value is a zero length string `\"\"` or an empty object `{}`, false is also returned.\nIn all other cases, this function returns true.\n",
            "Parameters": {
                "Value": {
                    "name": "Value",
                    "type": "*",
                    "required": true,
                    "description": "The value to test."
                }
            },
            "todo": [],
            "source_filename": "000-Types\\001-Types.HasValue.js"
        },
        {
            "id": "010",
            "member_of": "Types",
            "name": "Coerce",
            "type": "function",
            "returns": "object",
            "returns_description": "A `Coercion` object.",
            "summary": "Returns a `Coercion` object which is used to coerce values to different types.",
            "description": "\nThe returned `Coercion` object has a single member `Coercion.value` and a number of coercion functions:\n\n- `ToBoolean( Default = false )` :\n\tReturns the boolean value of `Coercion.value`.\n\tAnything can be coerced to a boolean.\n\tIf value is a string, then 'false' and '0' will return false while 'true' will return true.\n\n- `ToNumber( Default = 0 )` :\n\tReturns the numeric value of `Coercion.value`.\n\tBooleans, other numbers, and numeric strings can be coerced to a number.\n\n- `ToString( Default = '' )` :\n\tReturns the string value of `Coercion.value`.\n\tAnything can be coerced to a string.\n\tIf value is an object, then it is JSON stringified and returned.\n\n- `ToObject( Default = null )` :\n\tReturns the object value of `Coercion.value`.\n\tOnly JSON strings and other objects can be coerced to an object.\n\tIf value is a JSON string, then it is JSON parsed and returned.\n\n`Coercion.value` is set to the Value parameter.\n\n**Usage**\n\nThere are two ways to use the `Coercion` object.\n\nOne way is to immediately call one of the coercion functions after obtaining the `Coercion` object:\n~~~javascript\nlet number_42 = Liquicode.Types.Coerce( '42' ).ToNumber();\n~~~\n\nAnother way is to reuse the `Coercion` object and alter the `Coercion.value` property yourself:\n~~~javascript\nlet coercion = Liquicode.Types.Coerce();\ncoercion.value = '42';\nlet number_42 = coercion.ToNumber();\n~~~\n\n**Examples**\n\n~~~javascript\n// Coercing to boolean\nSchema.Coerce( null ).ToBoolean()           // = false\nSchema.Coerce( 0 ).ToBoolean()              // = false\nSchema.Coerce( 'true' ).ToBoolean()         // = true\n\n// Coercing to number\nSchema.Coerce( null ).ToNumber()            // = 0\nSchema.Coerce( '3.14' ).ToNumber()          // = 3.14\nSchema.Coerce( 'foo' ).ToNumber()           // = 0\n\n// Coercing to string\nSchema.Coerce( null ).ToString()            // = ''\nSchema.Coerce( '3.14' ).ToString()          // = '3.14'\nSchema.Coerce( { foo: 'bar' } ).ToString()  // = '{\"foo\":\"bar\"}'\n\n// Coercing to object\nSchema.Coerce( null ).ToObject()            // = null\nSchema.Coerce( 3.14 ).ToObject()            // = null\nSchema.Coerce( '{\"foo\":\"bar\"}' ).ToObject() // = { foo: 'bar' }\n\n// Coercing with a Default\nSchema.Coerce( 'Hello' ).ToNumber( -1 )     // = -1\nSchema.Coerce( true ).ToObject( {} )        // = {}\nSchema.Coerce( 1024 ).ToObject( {} )        // = {}\nSchema.Coerce( null ).ToObject( { a: 1 } )  // = { a: 1 }\nSchema.Coerce( null ).ToObject( [ 1, 2 ] )  // = [ 1, 2 ]\n~~~\n",
            "Parameters": {
                "Value": {
                    "name": "Value",
                    "type": "*",
                    "required": false,
                    "description": "The value to coerce. This value is set to `Coercion.value`."
                },
                "Loud": {
                    "name": "Loud",
                    "type": "boolean",
                    "required": false,
                    "default": false,
                    "description": "Throws errors when set to `true`."
                }
            },
            "todo": [],
            "source_filename": "000-Types\\010-Types.Coerce.js"
        },
        {
            "id": "020",
            "member_of": "Types",
            "name": "Formats",
            "source_type": "function",
            "returns": "object",
            "returns_description": "An array of `SchemaFormat` objects.",
            "summary": "Returns an array of `SchemaFormat` objects used to convert values between different formats.",
            "description": "\nReturns the library's internal array of format objects, `Types.Formats`.\n\nEach format has a `type` and `format` string, and an `IsFormat( Value )` function.\nThis list of formats is used by the `Types.GetFormat()` and `Types.IsFormat()` functions.\n\nApplications can ammend this array in order to customize type processing or add new formats.\nThe structure of each format in the array is:\n~~~javascript\n{\n\ttype: '',    // The Javascript data type. e.g. 'boolean', 'number', 'string', 'object'\n\tformat: '',  // A type specific format. e.g. 'integer', 'date'. \n\tIsFormat: function ( Value )\n\t{\n\t\treturn true;  // Return true, if Value is of this format.\n\t}\n}\n~~~\n\nFor example, here is the format object for `\"string:string\"`:\n~~~javascript\n{\n\ttype: 'string',\n\tformat: 'string',\n\tIsFormat: function ( Value )\n\t{\n\t\tif ( typeof Value !== 'string' ) { return false; }\n\t\treturn true;\n\t},\n},\n~~~\n\nYou have the ability to directly modify the `Types.Formats` array.\n\nFor example, suppose you want to define two new formats to detect objects of 'object:person' and 'object:employee'.\n~~~javascript\nPerson = {\n\tfirst_name: '',\n\tlast_name: '',\n}\nEmployee = {\n\tfirst_name: '',\n\tlast_name: '',\n\ttitle: '',\n}\n~~~\n\nThe format objects might look something like this:\n~~~javascript\nobject_person = {\n\ttype: 'object',\n\tformat: 'person',\n\tIsFormat: function( Value )\n\t{\n\t\tif ( typeof Value !== 'object' ) { return false; }\n\t\tif ( !Value ) { return false; }\n\t\tif ( !Value.first_name ) { return false; }\n\t\tif ( !Value.last_name ) { return false; }\n\t\treturn true;\n\t},\n},\nobject_employee = {\n\ttype: 'object',\n\tformat: 'employee',\n\tIsFormat: function( Value )\n\t{\n\t\tif ( typeof Value !== 'object' ) { return false; }\n\t\tif ( !Value ) { return false; }\n\t\tif ( !Value.first_name ) { return false; }\n\t\tif ( !Value.last_name ) { return false; }\n\t\tif ( !Value.title ) { return false; }\n\t\treturn true;\n\t},\n},\n~~~\n\nAnd tou can add them to the `Types.Formats` array:\n~~~javascript\nlet formats = Liquicode.Types.Formats();\nformats.push( object_person );\nformats.push( object_employee );\n~~~\n\nThe `Types.GetFormat()` function reads the formats array in reverse order when matching a value to a format.\nThis is done so that more complex types will not get \"short-circuited\" by less complex types.\nThe more complex format in this case is \"object:employee\" and should appear after \"object:person\" in the array.\n\n",
            "Parameters": {},
            "todo": [],
            "source_filename": "000-Types\\020-Types.Formats.js"
        },
        {
            "id": "021",
            "member_of": "Types",
            "name": "GetFormat",
            "type": "function",
            "returns": "string",
            "returns_description": "An extended type description.",
            "summary": "Determine the type and format of a value.",
            "description": "\nIterates through `Types.Formats` in reverse order and calls each `Format.IsFormat()` function.\nWhen one of the formats returns `true`, then it's type and format are returned separated by `:`.\n\n**Examples**\n\n~~~javascript\nLiquicode.Types.GetFormat( '42' )         // = 'number:integer'\nLiquicode.Types.GetFormat( 'Hello' )      // = 'string:string'\nLiquicode.Types.GetFormat( new Date() )   // = 'object:datetime'\nLiquicode.Types.GetFormat( [ 1, 2, 3 ] )  // = 'object:number-array'\n~~~\n",
            "Parameters": {
                "Value": {
                    "name": "Value",
                    "type": "*",
                    "required": true,
                    "description": "The value to get the format for."
                }
            },
            "todo": [],
            "source_filename": "000-Types\\021-Types.GetFormat.js"
        },
        {
            "id": "022",
            "member_of": "Types",
            "name": "IsFormat",
            "type": "function",
            "returns": "boolean",
            "returns_description": "True if the value matches the format.",
            "summary": "Determine if a value is of a particular format.",
            "description": "\nLooks up the specified format in `Types.Formats` and calls the `Format.IsFormat()` function.\n\nThe `Format` parameter must specify both type and format to be tested for.\n\n**Examples**\n\n~~~javascript\nLiquicode.Types.IsFormat( 'Hello', 'string:string' )            // = true\nLiquicode.Types.IsFormat( 'Hello', 'string:json' )              // = false\nLiquicode.Types.IsFormat( [ 1, 2, 3 ], 'object:array' )         // = true\nLiquicode.Types.IsFormat( [ 1, 2, 3 ], 'object:number-array' )  // = true\nLiquicode.Types.IsFormat( [ 1, 2, 3 ], 'object:string-array' )  // = false\n~~~\n",
            "Parameters": {
                "Value": {
                    "name": "Value",
                    "type": "*",
                    "required": true,
                    "description": "The value to test."
                },
                "Format": {
                    "name": "Format",
                    "type": "string",
                    "required": true,
                    "description": "The type and format to test for as: `\"type:format\"`.",
                    "examples": [
                        "string:string",
                        "string:json",
                        "object:datetime"
                    ]
                }
            },
            "todo": [],
            "source_filename": "000-Types\\022-Types.IsFormat.js"
        },
        {
            "id": "100",
            "name": "Object",
            "type": "namespace",
            "summary": "Functions for manipulating Javascript objects.",
            "source_filename": "100-Object\\100-Object.js"
        },
        {
            "id": "101",
            "member_of": "Object",
            "name": "Clone",
            "type": "function",
            "returns": "string",
            "description": [
                "Returns a clone of the given object.",
                "This is equivalent to doing A = JSON.parse( JSON.stringify( B ) )."
            ],
            "Parameters": {
                "From": {
                    "name": "From",
                    "type": "object",
                    "default": {}
                }
            },
            "source_filename": "100-Object\\101-Object.Clone.js"
        },
        {
            "id": "103",
            "member_of": "Object",
            "name": "Merge",
            "type": "function",
            "returns": "object",
            "description": "\nMerges the content of two objects and returns the composite result.\n\nSimilar to Object.Clone, this function will remove any non-data fields (i.e. functions and symbols) from the objects.\n\nThis function is similar to javascript's `Object.assign` function except that `Object.Merge` will do a recursive\nfield-wise comparison, while `Object.assign` only compares top-level fields.\n\nIn cases where a field is an array, the field value will be overwritten.\nThere is no element-wise comparison performed.\n\n**Examples**\n\nSimple Object Merging\n\n~~~javascript\nlet A = { one: 1, two: 0 };\nlet B = { two: 2 };\nlet C = LiquicodeJS.Object.Merge( A, B );\n// C = { one: 1, two: 2 };\n~~~\n\nMerging with Nested Objects\n\n~~~javascript\nlet A = { misc: { foo: 'bar' }, numbers: { one: 1, two: 0 } };\nlet B = { numbers: { two: 2 } };\nlet C = LiquicodeJS.Object.Merge( A, B );\n// C = {\n// \tmisc: { foo: 'bar' },\n// \tnumbers: { one: 1, two: 2 }\n// };\n~~~\n\n\nMerging with Nested Arrays\n\n~~~javascript\nlet A = { misc: { foo: 'bar' }, numbers: '' };\nlet B = {\n\tnumbers: [\n\t\t{ value: 1 },\n\t\t{ value: 2 }\n\t]\n};\nlet C = LiquicodeJS.Object.Merge( A, B );\n\n// C = {\n// \tmisc: { foo: 'bar' },\n// \tnumbers: [\n// \t\t{ value: 1 },\n// \t\t{ value: 2 }\n// \t]\n// };\n\n~~~\n\n",
            "Parameters": {
                "Original": {
                    "name": "Original",
                    "type": "object",
                    "required": true
                },
                "Updates": {
                    "name": "Updates",
                    "type": "object",
                    "required": false
                }
            },
            "source_filename": "100-Object\\103-Object.Merge.js"
        },
        {
            "id": "120",
            "member_of": "Object",
            "name": "FromJson",
            "type": "function",
            "returns": "object",
            "description": "\nParse a Json string and return an object value.\nThis is identical Javascript's \"JSON.parse()\" function.\n\nThere are some significant differences from Javascript's version.\nThe parser is a bit more relaxed and allows:\n- Identifiers are not required to have quotes.\n- A comma can appear after the last element of an array or object.\n- String literals can use either single or double quotes.\n- Parsing automatically stops when the closing brace or bracket is found in the json string.\n\n",
            "Parameters": {
                "JsonString": {
                    "name": "JsonString",
                    "type": "string"
                }
            },
            "source_filename": "100-Object\\120-Object.FromJson.js"
        },
        {
            "id": "121",
            "member_of": "Object",
            "name": "ToJsonOptions",
            "type": "function",
            "returns": "object",
            "description": "\n",
            "Parameters": {
                "PresetName": {
                    "name": "PresetName",
                    "type": "string"
                }
            },
            "source_filename": "100-Object\\121-Object.ToJsonOptions.js"
        },
        {
            "id": "122",
            "member_of": "Object",
            "name": "ToJson",
            "type": "function",
            "returns": "object",
            "description": "\n",
            "Parameters": {
                "Value": {
                    "name": "Value",
                    "type": "*",
                    "description": "The value to convert to a json string."
                },
                "JsonOptions": {
                    "name": "JsonOptions",
                    "type": "object|string",
                    "description": "Can be an options object or the name of an options preset (\"default\", \"pretty\", or \"pretty-2\")"
                }
            },
            "source_filename": "100-Object\\122-Object.ToJson.js"
        },
        {
            "id": "125",
            "member_of": "Object",
            "name": "FromIni",
            "type": "function",
            "returns": "object",
            "description": "\nParse an Ini string and return an object value.\n\n",
            "Parameters": {
                "IniString": {
                    "name": "IniString",
                    "type": "string"
                }
            },
            "source_filename": "100-Object\\125-Object.FromIni.js"
        },
        {
            "id": "126",
            "member_of": "Object",
            "name": "ToIni",
            "type": "function",
            "returns": "object",
            "description": "\nParse an Ini string and return an object value.\n\n",
            "Parameters": {
                "Value": {
                    "name": "Value",
                    "type": "object"
                }
            },
            "source_filename": "100-Object\\126-Object.ToIni.js"
        },
        {
            "id": "130",
            "member_of": "Object",
            "name": "ValueArrayOf",
            "type": "function",
            "returns": "array",
            "description": "\nReturns an array of values.\nIf the Value parameter is missing or null, then an empty array `[]` is returned.\nIf Value is an object, its values are returned in the array.\nIf Value is already an array, it is returned unmodified.\nOtherwise, an array is returned containing Value as its only member.\n",
            "Parameters": {
                "Value": {
                    "name": "Value",
                    "type": "any"
                }
            },
            "source_filename": "100-Object\\130-Object.ValueArrayOf.js"
        },
        {
            "id": "200",
            "name": "Text",
            "type": "namespace",
            "summary": "Functions for text parsing and manipulation.",
            "source_filename": "200-Text\\200-Text.js"
        },
        {
            "id": "201",
            "member_of": "Text",
            "name": "Compare",
            "type": "function",
            "returns": "string",
            "description": [
                "Compares two strings.",
                "Returns a `-1` if `StringA` is less than `StringB`.",
                "Returns a `1` if `StringA` is greater than than `StringB`.",
                "Returns a `0` if `StringA` and `StringB` are the same."
            ],
            "Parameters": {
                "StringA": {
                    "name": "StringA",
                    "type": "string",
                    "default": ""
                },
                "StringB": {
                    "name": "StringB",
                    "type": "string",
                    "default": ""
                },
                "CaseSensitive": {
                    "name": "CaseSensitive",
                    "type": "boolean",
                    "default": true
                }
            },
            "source_filename": "200-Text\\202-Text.Compare.js"
        },
        {
            "id": "203",
            "member_of": "Text",
            "name": "Matches",
            "type": "function",
            "returns": "string",
            "description": [
                "Matches the text against a wildcard-lik pattern.",
                "Returns true If the match succeeds, otherwise false."
            ],
            "Parameters": {
                "Text": {
                    "name": "Text",
                    "type": "string",
                    "required": true,
                    "default": ""
                },
                "Pattern": {
                    "name": "Pattern",
                    "type": "string",
                    "required": true,
                    "default": ""
                }
            },
            "source_filename": "200-Text\\203-Text.Matches.js"
        },
        {
            "id": "210",
            "member_of": "Text",
            "name": "ReplaceCharacters",
            "type": "function",
            "returns": "string",
            "description": [
                "Replaces characters within a string.",
                "Returns the modified string."
            ],
            "Parameters": {
                "Text": {
                    "name": "Text",
                    "type": "string",
                    "required": true,
                    "default": ""
                },
                "SearchCharacters": {
                    "name": "SearchCharacters",
                    "type": "string",
                    "required": true,
                    "default": ""
                },
                "ReplacementText": {
                    "name": "ReplacementText",
                    "type": "string",
                    "required": true,
                    "default": ""
                },
                "MaxTimes": {
                    "name": "MaxTimes",
                    "type": "number",
                    "format": "integer",
                    "required": false,
                    "default": -1
                }
            },
            "source_filename": "200-Text\\210-Text.ReplaceCharacters.js"
        },
        {
            "id": "211",
            "member_of": "Text",
            "name": "ReplaceText",
            "type": "function",
            "returns": "string",
            "description": "",
            "Parameters": {
                "Text": {
                    "name": "Text",
                    "type": "string",
                    "required": true,
                    "default": ""
                },
                "SearchText": {
                    "name": "SearchText",
                    "type": "string",
                    "required": true,
                    "default": ""
                },
                "ReplacementText": {
                    "name": "ReplacementText",
                    "type": "string",
                    "required": true,
                    "default": ""
                },
                "MaxTimes": {
                    "name": "MaxTimes",
                    "type": "number",
                    "required": false,
                    "default": 1
                }
            },
            "source_filename": "200-Text\\211-Text.ReplaceText.js"
        },
        {
            "id": "213",
            "member_of": "Text",
            "name": "FindBetween",
            "type": "function",
            "returns": "string",
            "returns_description": "The text found between StartText and EndText.",
            "summary": "Search a string and return the text found between StartText and EndText.",
            "description": "\nThis function searches a string for StartText and EndText and returns all text found between the two.\n\nIf StartText is missing, then the search will return all text up to the found EndText.\n\nIf EndText is missing, then the search will return all text found after StartText.\n\nIf both StartText and EndText are missing, then the entire Text string will be returned.\n\nIf StartText or EndText are not found within Text, then a `null` is returned.\n\n",
            "Parameters": {
                "Text": {
                    "name": "Text",
                    "type": "string",
                    "required": true,
                    "default": ""
                },
                "StartText": {
                    "name": "StartText",
                    "type": "string",
                    "required": false,
                    "default": ""
                },
                "EndText": {
                    "name": "EndText",
                    "type": "string",
                    "required": false,
                    "default": ""
                }
            },
            "source_filename": "200-Text\\213-Text.FindBetween.js"
        },
        {
            "id": "214",
            "member_of": "Text",
            "name": "ReplaceBetween",
            "type": "function",
            "returns": "integer",
            "returns_description": "The new string with replacements performed.",
            "summary": "Search a string for StartText and EndText and replace the text found between the two.",
            "description": "\nThis function searches a string for StartText and EndText and replaces all text found between the two.\n\nIf StartText is missing, then all text found up to EndText will be replaced.\n\nIf EndText is missing, then all text found after StartText will be replaced.\n\nIf both StartText and EndText are missing, then the entire Text string will be replaced.\n\nIf StartText or EndText are not found within Text, then this function returns `0` to indicate that no replacements were performed.\n\nThe MaxTimes parameter specifies the maximum number of replacements to perform.\nIf MaxTimes is `-1`, then all possible replacements will be made throughout Text.\n",
            "Parameters": {
                "Text": {
                    "name": "Text",
                    "type": "string",
                    "required": true,
                    "default": ""
                },
                "StartText": {
                    "name": "StartText",
                    "type": "string",
                    "required": false,
                    "default": ""
                },
                "EndText": {
                    "name": "EndText",
                    "type": "string",
                    "required": false,
                    "default": ""
                },
                "ReplacementText": {
                    "name": "ReplacementText",
                    "type": "string",
                    "required": true,
                    "default": ""
                },
                "MaxTimes": {
                    "name": "MaxTimes",
                    "type": "number",
                    "required": false,
                    "default": 1
                }
            },
            "source_filename": "200-Text\\214-Text.ReplaceBetween.js"
        },
        {
            "id": "220",
            "member_of": "Text",
            "name": "FirstWord",
            "type": "function",
            "returns": "string",
            "description": [
                "Returns the first word of a text phrase."
            ],
            "Parameters": {
                "Phrase": {
                    "name": "Phrase",
                    "type": "string",
                    "required": false,
                    "default": "",
                    "description": "A text phrase containing words separated by delimiters."
                },
                "Delimiters": {
                    "name": "Delimiters",
                    "type": "string",
                    "required": false,
                    "default": " ",
                    "description": "A string of whitespace and punctuation characters that break the phrase into words."
                }
            },
            "source_filename": "200-Text\\220-Text.FirstWord.js"
        },
        {
            "id": "221",
            "member_of": "Text",
            "name": "AfterFirstWord",
            "type": "function",
            "returns": "string",
            "description": [
                "Returns the remainder of a text phrase occurring after the first word."
            ],
            "Parameters": {
                "Phrase": {
                    "name": "Phrase",
                    "type": "string",
                    "required": false,
                    "default": "",
                    "description": "A text phrase containing words separated by delimiters."
                },
                "Delimiters": {
                    "name": "Delimiters",
                    "type": "string",
                    "required": false,
                    "default": " ",
                    "description": "A string of characters that break the phrase into words."
                }
            },
            "source_filename": "200-Text\\221-Text.AfterFirstWord.js"
        },
        {
            "id": "222",
            "member_of": "Text",
            "name": "LastWord",
            "type": "function",
            "returns": "string",
            "description": [
                "Returns the last word of a text phrase."
            ],
            "Parameters": {
                "Phrase": {
                    "name": "Phrase",
                    "type": "string",
                    "required": false,
                    "default": "",
                    "description": "A text phrase containing words separated by delimiters."
                },
                "Delimiters": {
                    "name": "Delimiters",
                    "type": "string",
                    "required": false,
                    "default": " ",
                    "description": "A string of characters that break the phrase into words."
                }
            },
            "source_filename": "200-Text\\222-Text.LastWord.js"
        },
        {
            "id": "223",
            "member_of": "Text",
            "name": "BeforeLastWord",
            "type": "function",
            "returns": "string",
            "description": [
                "Returns the remainder of a text phrase occurring befiore the last word."
            ],
            "Parameters": {
                "Phrase": {
                    "name": "Phrase",
                    "type": "string",
                    "required": false,
                    "default": "",
                    "description": "A text phrase containing words separated by delimiters."
                },
                "Delimiters": {
                    "name": "Delimiters",
                    "type": "string",
                    "required": false,
                    "default": " ",
                    "description": "A string of characters that break the phrase into words."
                }
            },
            "source_filename": "200-Text\\223-Text.BeforeLastWord.js"
        },
        {
            "id": "300",
            "name": "Shapes",
            "type": "namespace",
            "summary": "Functions for manipulating data in different shapes.",
            "source_filename": "300-Shapes\\300-Shapes.js"
        },
        {
            "id": "310",
            "member_of": "Shapes",
            "name": "Matrix",
            "type": "function",
            "returns": "object",
            "returns_summary": "Returns a new Matrix object.",
            "summary": "Matrix stores a two-dimensional jagged array and exposes manipulation functions.",
            "description": "\nA Matrix object is essentially a two-dimensional array (an array of arrays).\nThis function will create and return a new Matrix object.\n\n\n***Values Parameter***\n\nYou can specify the initial contents of the Matrix with the Values parameter.\nIf Values is an array of arrays, then Matrix will contain those values.\nIf Values is a one-dimensional array, then Matrix will have a single row reflecting those values.\nIf Values is an integer, then Matrix will be created with that number of blank rows.\n\nNote that the only way to create a new Matrix with no rows in it is: `Shapes.Matrix( 0, Options )`\n\n\n***Options Parameter***\n\nThe Options parameter is an options object:\n~~~javascript\nOptions = {\n\tdefault_value: null,    // A default value to use when no other value exists.\n\tclone_values: true,     // If true, any values read from or written to the Matrix are cloned first.\n}\n~~~\n\nThe `clone_values` option is very important.\nIt is initialliy set to true, providing the safest and most sensible operation.\nA performance improvement can be had by setting this to false;\nHowever, unintended consequences may occur if you are not careful.\nAlsa, this is a valid intended consequence if you want to use Matrix to quickly manipulate an existing array.\n\nFor example:\n~~~javascript\nlet test_array = [\n\t[ 1, 2, 3, 4 ],\n\t[ 5, 6, 7, 8 ],\n];\n// test_array.length == 2\n// Encapsulate the array in a matrix.\nlet matrix = Liquicode.Shapes.Matrix( test_array, { clone_values: false } );\n// Append a row to the matrix.\nmatrix.AppendRows( [ 'A', 'B', 'C' ] );\n// Since test_array was not cloned first, the new row also appears in test_array.\n// test_array.length == 3 !!!\n~~~\n\n\n***How It Works***\n\nThe Matrix object contains a `RowData` member which is an array of arrays that contains the values for the matrix.\nThis is maintained as a jagged array, meaning that each row of the matrix may be of different lengths.\n~~~javascript\n[\t// Matrix maintains values in a jagged array:\n\t[ 1, 2, 3, 4 ],\n\t[ 1, 2, 3 ],\n\t[ 1, 2, 3, 4, 5 ],\n]\n~~~\n\nWhen calling the `AppendColumns`, `InsertColumns`, `SetColumn`, or `SetValue` functions,\nit may be necessary for the matrix to fill out the columns of shorter rows so that the target column exists.\nFor example, appending a blank column (`AppendColumns()`) to the matrix above would yield:\n~~~javascript\n[\t// Matrix fills columns with\n\t// default values as needed:\n\t[ 1, 2, 3, 4,    null, null ],\n\t[ 1, 2, 3, null, null, null ],\n\t[ 1, 2, 3, 4,    5,    null ],\n]\n~~~\nYou can change the value used to fill blank columns by changing `Option.default_value`.\n\n\n***Cell Addressing***\n\nWhen working with Matrix, you will usually need to identify a particular Row or Column to work with.\nMatrix supports three types of addressing modes:\n\n- 1) A zero-based index used as a row/column index.\nThis index must be greater than or equal to zero and less than the extent (i.e. the RowCount or ColumnCount).\n\n- 2) A negative index that serves as an offset from the extent (e.g. -1 = RowCount - 1).\nThis type of index must be between -extent and -1, inclusive.\n\n- 3) A spreadsheet style address (e.g. 'A1', 'B2', etc.).\nThis type of address has letters component which indicates a column.\nThis is followed by a digits component that is a one-based row number.\n\n\n***Matrix Functions***\n\nThe Matrix object also has a number of functions which allow you to manipulate the Matrix object.\n\n- Addressing Functions:\n\tThese are utility functions that assist when working with the spreadsheet style of addressing.\n\tThese functions are used internally by Matrix.\n\tThey do not consider the validity of any particular address or index within the current Matrix.\n\n\t- `IsValidAddress( Address )`:\n\t\tReturns `true` if Address is a valid address, otherwise `false`.\n\t\tA valid address must contain a column component in letters ('AB') and a row component in digits ('12').\n\t\tThis function determines only if the Address parameter is a properly formatted address,\n\t\tregardless if the address lies outside the bounds of this particular Matrix.\n\n\t- `NumberToLetters( Number )`:\n\t\tReturns the letters component of an address for any positive number (e.g. 1='A', 2='B', 28='AB', etc.).\n\n\t- `LettersToNumber( Address )`:\n\t\tConverts the letters component of an address to a positive number.\n\t\tAddress is a string that starts with, or is entirely composed of, letters.\n\n- Row Functions:\n\t\n\t- `RowIndexOf( Address )`:\n\tWill return a valid row index for this Matrix from the given Address.\n\tAddress can represent any of the three addressing styles.\n\n\t- `RowCount()`:\n\tReturns the number of rows within the Matrix.\n\n\t- `AppendRows( Values )`:\n\tAppends one or more rows to the end of the Matrix.\n\tIf Values is not supplied, then a blank row is appended.\n\tIf Values is a one-dimensional array, then a single row is appended.\n\tIf Values is a two-dimensional array, then multiple rows are appended.\n\n\t- `InsertRows( Row, Values )`:\n\tInserts one or more rows within the Matrix, starting at the given Row address.\n\tIf Values is not supplied, then a blank row is appended.\n\tIf Values is a one-dimensional array, then a single row is appended.\n\tIf Values is a two-dimensional array, then multiple rows are appended.\n\tNote that it is not possible to append a row to a Matrix by using this function.\n\n\t- `DeleteRows( Row, Count )`:\n\tDeletes one or more rows within the Matrix, starting at the given Row address.\n\tIf Count is not supplied, then a single row is deleted.\n\n\t- `GetRow( Row )`:\n\tReturns a single row of values from the Matrix, at the given Row address.\n\n\t- `SetRow( Row, Values )`:\n\tReplaces a single row of values (a one-dimensional array) within the Matrix, at the given Row address.\n\tIf Values is not supplied, then a blank row is set at that location.\n\n- Column Functions:\n\n\t- `ColumnIndexOf( Address )`:\n\tWill return a valid column index for this Matrix from the given Address.\n\tAddress can represent any of the three addressing styles.\n\n\t- `ColumnCount()`:\n\tReturns the number of columns within the Matrix.\n\n\t- `AppendColumns( Values )`:\n\tAppends one or more columns to the end of the Matrix.\n\tIf Values is not supplied, then a blank column is appended.\n\tIf Values is a one-dimensional array, then a single column is appended.\n\tIf Values is a two-dimensional array, then multiple columns are appended.\n\n\t- `InsertColumns( Column, Values )`:\n\tInserts one or more columns within the Matrix, starting at the given Column address.\n\tIf Values is not supplied, then a blank column is appended.\n\tIf Values is a one-dimensional array, then a single column is appended.\n\tIf Values is a two-dimensional array, then multiple columns are appended.\n\tNote that it is not possible to append a column to a Matrix by using this function.\n\n\t- `DeleteColumns( Column, Count )`:\n\tDeletes one or more columns within the Matrix, starting at the given Column address.\n\tIf Count is not supplied, then a single column is deleted.\n\n\t- `GetColumn( Column )`:\n\tReturns a single column of values from the Matrix, at the given Column address.\n\n\t- `SetColumn( Column, Values )`:\n\tReplaces a single column of values (a one-dimensional array) within the Matrix, at the given Column address.\n\tIf Values is not supplied, then a blank column is set at that location.\n\n- Value Functions:\n\n\t- `GetValue( Row, Column )`:\n\tReturns a single value located at Row and Column within the Matrix.\n\tRow can be a string address, in which case the Column parameter is omitted.\n\n\t- `SetValue( Row, Column, Value )`:\n\tSets a single value located at Row and Column within the Matrix.\n\tRow can be a string address, in which case the Column parameter is omitted.\n\t\n\t- `GetMatrix( Row, Column, RowCount, ColumnCount )`:\n\tConstructs a new Matrix of values from within the called Matrix.\n\tValues are taken starting at the location described by Row and Column and extending for RowCount rows and ColumnCount columns.\n\t\t- You can call this using four parameters: `GetMatrix( Row, Column, RowCount, ColumnCount )`\n\t\t- You can call this using three parameters: `GetMatrix( Address, RowCount, ColumnCount )`\n\t\t- You can call this using two parameters: `GetMatrix( Address, Size )`\n\n\t- `SetMatrix( Row, Column, Matrix )`:\n\tSets a matrix of values starting at Row and Column.\n\n- Table Functions:\n\n\t- `Clone()`:\n\tReturn a clone of this matrix.\n\tThe clone will contain a copy of this matrix's data and options.\n\n\t- `Transpose()`:\n\tReturn a copy of this matrix with its rows and column transposed.\n\n\t- `Join( AtColumn, JoinType, JoinMatrix, MatrixColumn )`:\n\tReturn a new matrix by joining this matrix with another one.\n\tThe join is produced by matching column values between the two matrices.\n\tThe different supported join types are: 'inner', 'left', 'right', and 'full'.\n\n",
            "Parameters": {
                "Values": {
                    "name": "Values",
                    "type": "object",
                    "required": true,
                    "default": [
                        []
                    ],
                    "description": "One of: a two-dimensional array of arrays, a one-dimensional array of values, or an integer."
                },
                "Options": {
                    "name": "Options",
                    "type": "object",
                    "required": false,
                    "default": {},
                    "description": "Set of options controlling Matrix operation."
                }
            },
            "source_filename": "300-Shapes\\310-Shapes.Matrix.js"
        },
        {
            "id": "500",
            "name": "Parse",
            "type": "namespace",
            "summary": "Functions for tokenizing text strings.",
            "source_filename": "500-Parse\\500-Parse.js"
        },
        {
            "id": "501",
            "member_of": "Parse",
            "name": "TokenizeOptions",
            "type": "function",
            "returns": "object",
            "description": [
                "Returns a set of options for calling Tokenize().",
                "Throws an error if an invalid value for PresetName is given."
            ],
            "Parameters": {
                "Text": {
                    "name": "PresetName",
                    "type": "string",
                    "required": false,
                    "default": "",
                    "description": [
                        "To retrieve an options preset, use one of: 'csv', or 'cli'",
                        "You can leave this empty or 'default' for the default options."
                    ]
                }
            },
            "source_filename": "500-Parse\\501-Parse.TokenizeOptions.js"
        },
        {
            "id": "502",
            "member_of": "Parse",
            "name": "Tokenize",
            "type": "function",
            "returns": "object",
            "description": [
                "Returns the parsed tokens."
            ],
            "Parameters": {
                "Text": {
                    "name": "PresetName",
                    "type": "string",
                    "required": false,
                    "default": "",
                    "description": [
                        "To retrieve an options preset, use one of: 'csv', or 'cli'",
                        "You can leave this empty for the default options."
                    ]
                }
            },
            "source_filename": "500-Parse\\502-Parse.Tokenize.js"
        },
        {
            "id": "011",
            "member_of": "Parse",
            "name": "DateParse",
            "type": "function",
            "returns": "object",
            "returns_summary": "Returns a `DateParts` object containing Date/Time detail.",
            "description": [
                "\nDates and times are funny little creatures.\n"
            ],
            "Parameters": {
                "Value": {
                    "name": "Value",
                    "type": "string",
                    "required": true
                },
                "TimeZoneOffset": {
                    "name": "TimeZoneOffset",
                    "type": "string",
                    "required": false,
                    "default": "+0000"
                }
            },
            "source_filename": "500-Parse\\510-Parse.DateParse.js"
        },
        {
            "id": "800",
            "name": "System",
            "type": "namespace",
            "summary": "File system and process functions. (nodejs only)",
            "source_filename": "800-System\\800-System.js"
        },
        {
            "id": "810",
            "member_of": "System",
            "name": "AsyncVisitFiles",
            "type": "function",
            "returns": "*",
            "description": "\nScans a folder and calls the Visitor callback function for each folder/file encountered.\n\nThe `FilePattern` parameter is optional and can be a wildcard type string.\nFor example, to visit all text files, you can pass '*.txt'.\nIf `FilePattern` is not empty, then the callback will not be called for folders.\n\nThe Visitor callback function takes two parameters `Visitor( Path, Filename )`.\nIf the Visitor callback returns a value, then the visitation process is halted\nand that value is returned by the `VisitFiles` function.\nThe Visitor callback is called for each file encountered and for each folder encountered.\nWhen called for a folder, the `Filename` parameter will be null.\nThe Visitor callback function can be either synchronous or asymchronous.\n",
            "Parameters": {
                "StartFolder": {
                    "name": "StartFolder",
                    "type": "string",
                    "required": true
                },
                "FilePattern": {
                    "name": "FilePattern",
                    "type": "string",
                    "required": false,
                    "default": ""
                },
                "Recurse": {
                    "name": "Recurse",
                    "type": "boolean",
                    "required": false,
                    "default": false
                },
                "Visitor": {
                    "name": "Visitor",
                    "type": "function",
                    "description": "Function to be called for each folder and file: Visitor( Path, Filename )",
                    "required": false,
                    "default": null
                }
            },
            "source_filename": "800-System\\810-System.AsyncVisitFiles.js"
        },
        {
            "id": "810",
            "member_of": "System",
            "name": "VisitFiles",
            "type": "function",
            "returns": "*",
            "description": "\nScans a folder and calls the Visitor callback function for each folder/file encountered.\n\nThe `FilePattern` parameter is optional and can be a wildcard type string.\nFor example, to visit all text files, you can pass '*.txt'.\nIf `FilePattern` is not empty, then the callback will not be called for folders.\n\nThe Visitor callback function takes two parameters `Visitor( Path, Filename )`.\nIf the Visitor callback returns a value, then the visitation process is halted\nand that value is returned by the `VisitFiles` function.\nThe Visitor callback is called for each file encountered and for each folder encountered.\nWhen called for a folder, the `Filename` parameter will be null.\nThe Visitor callback function must be synchronous.\n",
            "Parameters": {
                "StartFolder": {
                    "name": "StartFolder",
                    "type": "string",
                    "required": true
                },
                "FilePattern": {
                    "name": "FilePattern",
                    "type": "string",
                    "required": false,
                    "default": ""
                },
                "Recurse": {
                    "name": "Recurse",
                    "type": "boolean",
                    "required": false,
                    "default": false
                },
                "Visitor": {
                    "name": "Visitor",
                    "type": "function",
                    "description": "Function to be called for each folder and file: Visitor( Path, Filename )",
                    "required": false,
                    "default": null
                }
            },
            "source_filename": "800-System\\810-System.VisitFiles.js"
        },
        {
            "id": "811",
            "member_of": "System",
            "name": "CountFiles",
            "type": "function",
            "returns": "number",
            "description": [
                "Scans a folder and calls the Visitor callback function for each folder/file encountered.",
                "Returns the number of folders/files visited."
            ],
            "Parameters": {
                "StartFolder": {
                    "name": "StartFolder",
                    "type": "string",
                    "required": true
                },
                "FilePattern": {
                    "name": "FilePattern",
                    "type": "string",
                    "required": false,
                    "default": "*"
                },
                "Recurse": {
                    "name": "Recurse",
                    "type": "boolean",
                    "required": false,
                    "default": false
                }
            },
            "source_filename": "800-System\\811-System.CountFiles.js"
        },
        {
            "id": "812",
            "member_of": "System",
            "name": "CountFolders",
            "type": "function",
            "returns": "number",
            "description": [
                "Scans a folder and calls the Visitor callback function for each folder/file encountered.",
                "Returns the number of folders/files visited."
            ],
            "Parameters": {
                "StartFolder": {
                    "name": "StartFolder",
                    "type": "string",
                    "required": true
                },
                "Recurse": {
                    "name": "Recurse",
                    "type": "boolean",
                    "required": false,
                    "default": false
                }
            },
            "source_filename": "800-System\\812-System.CountFolders.js"
        },
        {
            "id": "813",
            "member_of": "System",
            "name": "CopyFolder",
            "type": "function",
            "returns": "number",
            "description": [
                "Copies files from one folder to another.",
                "Returns the number of files copied."
            ],
            "Parameters": {
                "FromFolder": {
                    "name": "FromFolder",
                    "type": "string",
                    "required": true
                },
                "ToFolder": {
                    "name": "ToFolder",
                    "type": "string",
                    "required": true
                },
                "FilePattern": {
                    "name": "FilePattern",
                    "type": "string",
                    "required": false,
                    "default": "*"
                },
                "Overwrite": {
                    "name": "Overwrite",
                    "type": "boolean",
                    "required": false,
                    "default": false
                },
                "Recurse": {
                    "name": "Recurse",
                    "type": "boolean",
                    "required": false,
                    "default": false
                }
            },
            "source_filename": "800-System\\813-System.CopyFolder.js"
        },
        {
            "id": "814",
            "member_of": "System",
            "name": "DeleteFolder",
            "type": "function",
            "returns": "number",
            "description": [
                "Deletes a folder and all of its sub-folders and files.",
                "Returns the number of folders and files deleted."
            ],
            "Parameters": {
                "Folder": {
                    "name": "Folder",
                    "type": "string",
                    "required": true
                },
                "Recurse": {
                    "name": "Recurse",
                    "type": "boolean",
                    "required": false,
                    "default": false
                }
            },
            "source_filename": "800-System\\814-System.DeleteFolder.js"
        },
        {
            "id": "815",
            "member_of": "System",
            "name": "EmptyFolder",
            "type": "function",
            "returns": "number",
            "return_description": "Number of folders and files removed.",
            "description": "\nEmpties a folder by removing all of its sub-folders and files.\n\nReturns the number of folders and files removed.\n",
            "Parameters": {
                "Folder": {
                    "name": "Folder",
                    "type": "string",
                    "required": true
                }
            },
            "source_filename": "800-System\\815-System.EmptyFolder.js"
        },
        {
            "id": "816",
            "member_of": "System",
            "name": "WithFileText",
            "type": "function",
            "returns": "boolean",
            "returns_description": "False if no changes were made or True if changes were saved.",
            "description": "\nLoads content from a file and passes it to a callback function for processing.\n\nThe callback function takes two parameters: Filename and Text.\nFilename is the Filename passed to `WithFileText` and Text is the content of that file.\nThe callback function is expected to return either `undefined` or `null` if no changes are made to the text.\nIf changes are made, the callback function can return the new text which will be saved back to Filename.\n\nIf the file content is changed during callback processing, then `WithFileText` will return True.\n",
            "Parameters": {
                "Filename": {
                    "name": "Filename",
                    "type": "string",
                    "required": true
                },
                "FileTextCallback": {
                    "name": "FileTextCallback",
                    "type": "function",
                    "required": true
                }
            },
            "source_filename": "800-System\\816-System.WithFileText.js"
        },
        {
            "id": "820",
            "member_of": "System",
            "name": "AsyncSleep",
            "type": "function",
            "description": "",
            "Parameters": {
                "Milliseconds": {
                    "name": "Milliseconds",
                    "type": "number",
                    "format": "integer"
                }
            },
            "source_filename": "800-System\\820-System.AsyncSleep.js"
        },
        {
            "id": "821",
            "member_of": "System",
            "name": "ExecuteProcess",
            "type": "function",
            "description": "",
            "Parameters": {
                "Command": {
                    "name": "Command",
                    "type": "string",
                    "required": true
                },
                "Environment": {
                    "name": "Environment",
                    "type": "object",
                    "required": false
                },
                "StartFolder": {
                    "name": "StartFolder",
                    "type": "string",
                    "required": false
                }
            },
            "source_filename": "800-System\\821-System.ExecuteProcess.js"
        },
        {
            "id": "822",
            "member_of": "System",
            "name": "AsyncExecuteProcess",
            "type": "function",
            "description": "",
            "Parameters": {
                "Command": {
                    "name": "Command",
                    "type": "string",
                    "required": true
                },
                "Environment": {
                    "name": "Environment",
                    "type": "object",
                    "required": false
                },
                "StartFolder": {
                    "name": "StartFolder",
                    "type": "string",
                    "required": false
                }
            },
            "source_filename": "800-System\\822-System.AsyncExecuteProcess.js"
        },
        {
            "id": "823",
            "member_of": "System",
            "name": "StartProcess",
            "type": "function",
            "returns": "string",
            "description": "Starts a new process and returns the ProcessID.",
            "Parameters": {
                "Command": {
                    "name": "Command",
                    "type": "string",
                    "required": true
                },
                "Environment": {
                    "name": "Environment",
                    "type": "object",
                    "required": false
                },
                "StartFolder": {
                    "name": "StartFolder",
                    "type": "string",
                    "required": false
                }
            },
            "source_filename": "800-System\\823-System.StartProcess.js"
        },
        {
            "id": "824",
            "member_of": "System",
            "name": "StopProcess",
            "type": "function",
            "returns": "string",
            "description": "Stops a running process by its ProcessID.",
            "Parameters": {
                "ProcessID": {
                    "name": "ProcessID",
                    "type": "string",
                    "required": true
                }
            },
            "source_filename": "800-System\\824-System.StopProcess.js"
        },
        {
            "id": "830",
            "member_of": "System",
            "name": "ContainerStatus",
            "type": "function",
            "returns": "string",
            "description": "Gets the status of a running Docker Container.",
            "Parameters": {
                "ContainerID": {
                    "name": "ContainerID",
                    "type": "string",
                    "required": true
                }
            },
            "source_filename": "800-System\\830-System.ContainerStatus.js"
        },
        {
            "id": "831",
            "member_of": "System",
            "name": "RunContainer",
            "type": "function",
            "returns": "string",
            "description": "\nRuns a Docker Container.\n\nOptions Parameter:\n~~~javascript\n{\n\tname: '',           // Name of the container. Defaults to random name.\n\thostname: '',       // Hostname for the container.\n\tnetwork: '',        // Name of docker network for the container to use.\n\tports: [],          // Array of port object { localhost: 80, container: 80 }\n\tvolumes: [],        // Array of volume object { localhost: '/path', container: '/path' }\n\tenvironment: {},    // Environment variables and values.\n}\n~~~\n\nExample:\n~~~javascript\nlet container_id = Liquicode.RunContainer( 'mongo:latest',\n\t{\n\t\tname: 'mongo-server',\n\t\tports: [ { localhost: 27017, container: 27017 } ],\n\t} );\n~~~\n\n",
            "Parameters": {
                "ImageName": {
                    "name": "ImageName",
                    "type": "string",
                    "required": true
                },
                "Options": {
                    "name": "Options",
                    "type": "object",
                    "required": false
                }
            },
            "source_filename": "800-System\\831-System.RunContainer.js"
        },
        {
            "id": "832",
            "member_of": "System",
            "name": "StartContainer",
            "type": "function",
            "returns": "string",
            "description": "Stops a running Docker Container.",
            "Parameters": {
                "ContainerID": {
                    "name": "ContainerID",
                    "type": "string",
                    "required": true
                }
            },
            "source_filename": "800-System\\832-System.StartContainer.js"
        },
        {
            "id": "833",
            "member_of": "System",
            "name": "StopContainer",
            "type": "function",
            "returns": "string",
            "description": "Stops a running Docker Container.",
            "Parameters": {
                "ContainerID": {
                    "name": "ContainerID",
                    "type": "string",
                    "required": true
                }
            },
            "source_filename": "800-System\\833-System.StopContainer.js"
        },
        {
            "id": "834",
            "member_of": "System",
            "name": "KillContainer",
            "type": "function",
            "returns": "string",
            "description": "Kills a running Docker Container.",
            "Parameters": {
                "ContainerID": {
                    "name": "ContainerID",
                    "type": "string",
                    "required": true
                }
            },
            "source_filename": "800-System\\834-System.KillContainer.js"
        },
        {
            "id": "900",
            "name": "Network",
            "type": "namespace",
            "summary": "Functions for working with networks. (nodejs only)",
            "source_filename": "900-Network\\900-Network.js"
        },
        {
            "id": "910",
            "member_of": "Network",
            "name": "AsyncDownloadFile",
            "type": "function",
            "returns": "string",
            "description": "Download a file from an url.",
            "Parameters": {},
            "source_filename": "900-Network\\910-Network.AsyncDownloadFile.js"
        },
        {
            "id": "920",
            "member_of": "Network",
            "name": "AsyncGetRequest",
            "type": "function",
            "returns": "string",
            "description": "Make an http get request for a an url.",
            "Parameters": {
                "Url": {
                    "name": "Url",
                    "type": "string",
                    "required": true
                }
            },
            "source_filename": "900-Network\\920-Network.AsyncGetRequest.js"
        }
    ]
};