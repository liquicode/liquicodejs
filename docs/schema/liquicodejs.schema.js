exports = {
    "version": "0.0.1",
    "Schemas": [
        {
            "id": "000",
            "name": "Types",
            "type": "namespace",
            "summary": "Data Type Handling",
            "description": [
                "\nLiquicodeJS can classify and identify value types beyond the primitive data types supported by Javascript.\n\n\nWhen obtaining FieldSchema objects from `Schema.ValueSchema()` or `Schema.ObjectSchema()`,\n`FieldSchema.type` will contain the Javascript data type and `FieldSchema.format` will have a more specific type description.\n\nJavascript (and JSON) offers four data types for your variable values: `boolean`, `number`, `string`,\nand everything else is essentially an `object`.\nThis suits Javascript well for the types of things that Javascript needs to do like storing values in memory\nand executing program statements with those values.\nThis is not always great on an application level though.\nWhen you need to, for example, make sure that a variable contains an `array` of `string` or that value represents a floating point number.\nCases like these require additional progrma statements and type checking which can be consolidated into a set of functions.\n\nThe `Schema` module defines a few objects and functions to alleviate this burden from the application developer.\n\n**The FieldSchema Object**\n\nThis object describes a value (or field) with greater precision then Javascript's `typeof` statement.\nThe `FieldSchema.type` member will always contain a Javascript data type while the `FieldSchema.format` field contains a more\ndetailed data type.\n\n~~~javascript\nFieldSchema = {\n\ttype: '',\t\t\t\t// Javascript data type (boolean, number, string, or object).\n\tformat: '',\t\t\t\t// A data type specific designation.\n\tdefault: undefined,\t\t// A default value used for missing fields.\n\tname: '',\t\t\t\t// Name of the field.\n}\n~~~\n\nThese functions will generate a `FieldSchema` from a single value or an object.\nBe aware that only the top level members of an object are scrutinized as this is what we are typically interested in most cases.\nFunctions of the `Schema` module do not recurse into an object providing the schema for every single field in the object.\nRather, they inspect the top level of objects only and return an array of schema objects as a result.\nAgain, this handles most use cases with a consistent set of functions.\nAny further validation/coercion that may be required can also be perfomed by the same functions on an individual case basis.\n\n- `Schema.ValueSchema( FromValue )`\n- `Schema.ObjectSchema( FromObject )`\n\nPossible values for `FieldSchema.type` and `FieldSchema.format` are as follows:\n\n| Type    | Format        | Default Value | Examples                              |\n|---------|---------------|---------------|---------------------------------------|\n| boolean | boolean       | false         | `true`, or `false`                |\n| number  | integer       | 0             | `1`, `2`, or `3.0`              |\n| number  | float         | 0             | `1.1`, `2.071`, or `3.14`       |\n| string  | string        | \"\"            | `\"Hello\"`, or `\"\"`                |\n| object  | object        | {}            | `{ foo: 'bar' }`                    |\n| object  | array         | []            | `[ 1, 'two', 3.14, null ]`          |\n| object  | boolean-array | []            | `[ true, false, true ]`             |\n| object  | number-array  | []            | `[ 1, 2, 3.14 ]`                    |\n| object  | string-array  | []            | `[ 'one', 'two', 'three' ]`         |\n| object  | object-array  | []            | `[ { foo: 'bar' }, [1,2,3], null ]` |\n| object  | array-array   | []            | `[ [1,2,3], [], [4,5] ]`            |\n",
                "\n\n**The ErrorValue Object**\n\nLiquicodeJS introduces an `ErrorValue` object that is used to indicate and convey errors.\nSome functions will return an `ErrorValue` object instead of throwing a Javascript `Error`.\nIn some cases, this can make code more efficient and legible when certain errors are tolerable\nand you want to avoid the expensive cost of a Javascript `Error` that includes a call stack.\n\nUse the `Schema.ErrorValue()` function to create an `ErrorValue` object and `Schema.IsErrorValue()` to test for errors.\nAn `ErrorValue` will always have `ErrorValue.ok = false` and `ErrorValue.error` will contain the error message.\n\n~~~javascript\nErrorValue = {\n\tok: false,\t\t// Always set to \"false\".\n\terror: '',\t\t// Error message.\n\tcontext: '',\t// Context for the error (e.g. a function name).\n}\n~~~\n",
                "\n\n**Value Coercion**\n\nAs data gets shuttled around between memory, files, and network transmissions, the representation of the data might\nchange to suit to the medium.\nFor example, an integer value being stored in a file might be read back out later as a string.\nIt's actual value hasn't changed, but the way it is represented has changed.\nJavascript can be pretty forgiving in these cases by allowing a certain amount of type fluidity;\nHowever, this can also cause some difficult to spot errors like when `'2' + 2` equals the string `'22'` and not the integer `4`.\n\nUse these functions the validate that a value's type is of an expected type and to coerce the value, in a common sense way,\nto that expected type.\n\n- `Types.Coerce( Value, Schema, ThrowErrors )`\n- `Types.Coerce( Value, Schema, ThrowErrors )`\n- `Types.Coerces( Values, Schemas, ThrowErrors )`\n\nThis tables describes how values are converted from one data type to another during coercion:\n\n| From Type | To Boolean     | To Number      | To String        | To Object      |\n|-----------|----------------|----------------|------------------|----------------|\n| undefined | DefaultValue() | DefaultValue() | DefaultValue()   | DefaultValue() |\n| null      | DefaultValue() | DefaultValue() | DefaultValue()   | DefaultValue() |\n| Boolean   | Value          | Number()       | toString()       | ErrorValue     |\n| Number    | Boolean()      | Value          | toString()       | ErrorValue     |\n| String    | Boolean()      | Number()       | Value            | JSON.parse()   |\n| Object    | Boolean()      | Number()       | JSON.stringify() | Value          |\n",
                "\n\n**Related Reading**\n\n- [You Don't Know JS: Types & Grammar - Chapter 4. Coercion](https://www.oreilly.com/library/view/you-dont-know/9781491905159/ch04.html)\n"
            ],
            "examples": [
                "Schema = { name: 'PersonName', type: 'string' }",
                "Schema = { name: 'options', type: 'object', default: { hoist: true, swab: 'decks' } }",
                "Schema = { name: 'max_tries', type: 'number', format: 'integer', required: true, default: 3 }"
            ],
            "todo": [
                "Support extended number formats: positive-integer, negative-integer, positive-float, negative-float",
                "Support type: function",
                "Support format plugin-ins. Must implement: get_default(), is_type_of(value), can_coerce(type), coerce(value)"
            ],
            "source_filename": "000-Types\\000-Types.js"
        },
        {
            "id": "010",
            "member_of": "Types",
            "name": "Coerce",
            "type": "function",
            "returns": "object",
            "returns_description": "A `Coercion` object.",
            "summary": "Returns a `Coercion` object which is used to coerce values to different types.",
            "description": "\nThe returned `Coercion` object has a single member `Coercion.value` and a number of coercion functions:\n\n- `ToBoolean( Default = false )` :\n\tReturns the boolean value of `Coercion.value`.\n\tAnything can be coerced to a boolean.\n\tIf value is a string, then 'false' and '0' will return false while 'true' will return true.\n\n- `ToNumber( Default = 0 )` :\n\tReturns the numeric value of `Coercion.value`.\n\tBooleans, other numbers, and numeric strings can be coerced to a number.\n\n- `ToString( Default = '' )` :\n\tReturns the string value of `Coercion.value`.\n\tAnything can be coerced to a string.\n\tIf value is an object, then it is JSON stringified and returned.\n\n- `ToObject( Default = null )` :\n\tReturns the object value of `Coercion.value`.\n\tOnly JSON strings and other objects can be coerced to an object.\n\tIf value is a JSON string, then it is JSON parsed and returned.\n\n`Coercion.value` is set to the Value parameter.\n\n**Usage**\n\nThere are two ways to use the `Coercion` object.\n\nOne way is to immediately call one of the coercion functions after obtaining the `Coercion` object:\n~~~javascript\nlet number_42 = LiquicodeJS.Schema.Coerce( '42' ).ToNumber();\n~~~\n\nAnother way is to reuse the `Coercion` object and alter the `Coercion.value` property yourself:\n~~~javascript\nlet coercion = LiquicodeJS.Schema.Coerce();\ncoercion.value = '42';\nlet number_42 = coercion.ToNumber();\n~~~\n\n**Examples**\n\n~~~javascript\n// Coercing to boolean\nSchema.Coerce( null ).ToBoolean()           // = false\nSchema.Coerce( 0 ).ToBoolean()              // = false\nSchema.Coerce( 'true' ).ToBoolean()         // = true\n\n// Coercing to number\nSchema.Coerce( null ).ToNumber()            // = 0\nSchema.Coerce( '3.14' ).ToNumber()          // = 3.14\nSchema.Coerce( 'foo' ).ToNumber()           // = 0\n\n// Coercing to string\nSchema.Coerce( null ).ToString()            // = ''\nSchema.Coerce( '3.14' ).ToString()          // = '3.14'\nSchema.Coerce( { foo: 'bar' } ).ToString()  // = '{\"foo\":\"bar\"}'\n\n// Coercing to object\nSchema.Coerce( null ).ToObject()            // = null\nSchema.Coerce( 3.14 ).ToObject()            // = null\nSchema.Coerce( '{\"foo\":\"bar\"}' ).ToObject() // = { foo: 'bar' }\n\n// Coercing with a Default\nSchema.Coerce( 'Hello' ).ToNumber( -1 )     // = -1\nSchema.Coerce( true ).ToObject( {} )        // = {}\nSchema.Coerce( 1024 ).ToObject( {} )        // = {}\nSchema.Coerce( null ).ToObject( { a: 1 } )  // = { a: 1 }\nSchema.Coerce( null ).ToObject( [ 1, 2 ] )  // = [ 1, 2 ]\n~~~\n",
            "Parameters": {
                "Value": {
                    "name": "Value",
                    "type": "*",
                    "required": false,
                    "description": "The value to coerce. This value is set to `Coercion.value`."
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
            "description": "\nReturns the library's internal array of format objects, `Types.Formats`.\n\nEach format has a `type` and `format` string, and an `IsFormat( Value )` function.\nThis list of formats is used by the `Types.GetFormat()` and `Types.IsFormat()` functions.\n\nApplications can ammend this array in order to customize type processing or add new formats.\nThe structure of each format in the array is:\n~~~javascript\n{\n\ttype: '',    // The Javascript data type. e.g. 'boolean', 'number', 'string', 'object'\n\tformat: '',  // A type specific format. e.g. 'integer', 'date'. \n\tIsFormat: function ( Value )\n\t{\n\t\treturn true;  // Return true, if Value is of this format.\n\t}\n}\n~~~\n\nFor example, here is the format object for `\"string:string\"`:\n~~~javascript\n{\n\ttype: 'string',\n\tformat: 'string',\n\tIsFormat: function ( Value )\n\t{\n\t\tif ( typeof Value !== 'string' ) { return false; }\n\t\treturn true;\n\t},\n},\n~~~\n\nYou have the ability to directly modify the `Types.Formats` array.\n\nFor example, suppose you want to define two new formats to detect objects of 'object:person' and 'object:employee'.\n~~~javascript\nPerson = {\n\tfirst_name: '',\n\tlast_name: '',\n}\nEmployee = {\n\tfirst_name: '',\n\tlast_name: '',\n\ttitle: '',\n}\n~~~\n\nThe format objects might look something like this:\n~~~javascript\nobject_person = {\n\ttype: 'object',\n\tformat: 'person',\n\tIsFormat: function( Value )\n\t{\n\t\tif ( typeof Value !== 'object' ) { return false; }\n\t\tif ( !Value ) { return false; }\n\t\tif ( !Value.first_name ) { return false; }\n\t\tif ( !Value.last_name ) { return false; }\n\t\treturn true;\n\t},\n},\nobject_employee = {\n\ttype: 'object',\n\tformat: 'employee',\n\tIsFormat: function( Value )\n\t{\n\t\tif ( typeof Value !== 'object' ) { return false; }\n\t\tif ( !Value ) { return false; }\n\t\tif ( !Value.first_name ) { return false; }\n\t\tif ( !Value.last_name ) { return false; }\n\t\tif ( !Value.title ) { return false; }\n\t\treturn true;\n\t},\n},\n~~~\n\nAnd tou can add them to the `Types.Formats` array:\n~~~javascript\nlet formats = LiquicodeJS.Types.Formats();\nformats.push( object_person );\nformats.push( object_employee );\n~~~\n\nThe `Types.GetFormat()` function reads the formats array in reverse order when matching a value to a format.\nThis is done so that more complex types will not get \"short-circuited\" by less complex types.\nThe more complex format in this case is \"object:employee\" and should appear after \"object:person\" in the array.\n\n",
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
            "description": "\nIterates through `Types.Formats` in reverse order and calls each `Format.IsFormat()` function.\nWhen one of the formats returns `true`, then it's type and format are returned separated by `:`.\n\n**Examples**\n\n~~~javascript\nLiquicodeJS.Types.GetFormat( '42' )         // = 'number:integer'\nLiquicodeJS.Types.GetFormat( 'Hello' )      // = 'string:string'\nLiquicodeJS.Types.GetFormat( new Date() )   // = 'object:datetime'\nLiquicodeJS.Types.GetFormat( [ 1, 2, 3 ] )  // = 'object:number-array'\n~~~\n",
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
            "description": "\nLooks up the specified format in `Types.Formats` and calls the `Format.IsFormat()` function.\n\nThe `Format` parameter must specify both type and format to be tested for.\n\n**Examples**\n\n~~~javascript\nLiquicodeJS.Types.IsFormat( 'Hello', 'string:string' )            // = true\nLiquicodeJS.Types.IsFormat( 'Hello', 'string:json' )              // = false\nLiquicodeJS.Types.IsFormat( [ 1, 2, 3 ], 'object:array' )         // = true\nLiquicodeJS.Types.IsFormat( [ 1, 2, 3 ], 'object:number-array' )  // = true\nLiquicodeJS.Types.IsFormat( [ 1, 2, 3 ], 'object:string-array' )  // = false\n~~~\n",
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
            "description": "",
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
            "id": "110",
            "member_of": "Object",
            "name": "Traverse",
            "type": "function",
            "returns": "string",
            "description": "\n\nTraverses and calls a visitor callback function for each field in an object.\nThis functions recurses through sub-objects and traverses the entire object.\n\n",
            "Parameters": {
                "Root": {
                    "name": "Root",
                    "type": "object",
                    "required": true
                },
                "Visitor": {
                    "name": "Visitor",
                    "type": "function",
                    "required": true
                }
            },
            "source_filename": "100-Object\\110-Object.Traverse.js"
        },
        {
            "id": "111",
            "member_of": "Object",
            "name": "HasPath",
            "type": "function",
            "returns": "boolean",
            "description": "",
            "Parameters": {
                "Root": {
                    "name": "Root",
                    "type": "object",
                    "required": true
                },
                "Path": {
                    "name": "Path",
                    "type": "string",
                    "required": true
                }
            },
            "source_filename": "100-Object\\111-Object.HasPath.js"
        },
        {
            "id": "112",
            "member_of": "Object",
            "name": "FindField",
            "type": "function",
            "returns": "string",
            "description": "",
            "Parameters": {
                "Root": {
                    "name": "Root",
                    "type": "object",
                    "required": true
                },
                "Name": {
                    "name": "Name",
                    "type": "string",
                    "required": true
                }
            },
            "source_filename": "100-Object\\112-Object.FindField.js"
        },
        {
            "id": "113",
            "member_of": "Object",
            "name": "FindValue",
            "type": "function",
            "returns": "string",
            "summary": "Locate a value stored within an object.",
            "description": "",
            "Parameters": {
                "Root": {
                    "name": "Root",
                    "type": "object",
                    "required": true
                },
                "Value": {
                    "name": "Value",
                    "type": "*",
                    "required": true,
                    "description": "The value to search for. This must be primitive data type (boolean, number, or string)."
                }
            },
            "source_filename": "100-Object\\113-Object.FindValue.js"
        },
        {
            "id": "114",
            "member_of": "Object",
            "name": "GetValue",
            "type": "function",
            "returns": "*",
            "description": "",
            "Parameters": {
                "Root": {
                    "name": "Root",
                    "type": "object",
                    "required": true
                },
                "Path": {
                    "name": "Path",
                    "type": "string",
                    "required": true
                }
            },
            "source_filename": "100-Object\\114-Object.GetValue.js"
        },
        {
            "id": "115",
            "member_of": "Object",
            "name": "SetValue",
            "type": "function",
            "returns": "*",
            "description": "",
            "Parameters": {
                "Root": {
                    "name": "Root",
                    "type": "object",
                    "required": true
                },
                "Path": {
                    "name": "Path",
                    "type": "string",
                    "required": true
                },
                "Value": {
                    "name": "Value",
                    "type": "*",
                    "required": true
                }
            },
            "source_filename": "100-Object\\115-Object.SetValue.js"
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
                }
            },
            "source_filename": "200-Text\\211-Text.ReplaceText.js"
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
            "name": "VisitFiles",
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
            "name": "AsyncExecute",
            "type": "function",
            "description": "",
            "Parameters": {
                "Milliseconds": {
                    "name": "Milliseconds",
                    "type": "number",
                    "format": "integer"
                }
            },
            "source_filename": "800-System\\821-System.AsyncExecute.js"
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