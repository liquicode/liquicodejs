exports = {
    "version": "0.0.1",
    "Schemas": [
        {
            "id": "000",
            "name": "Schema",
            "type": "namespace",
            "summary": "Data value and type handling",
            "description": "\n\n**The FieldSchema Object**\n\n~~~javascript\nFieldSchema = {\n\ttype: '',\t\t\t\t// Javascript data type (boolean, number, string, object).\n\tformat: '',\t\t\t\t// A data type specific designation.\n\tdefault: undefined,\t\t// A default value used for missing fields.\n\tname: '',\t\t\t\t// Name of the field.\n}\n~~~\n\nLiquicodeJS can classify and identify value types beyond the primitive data types supported by Javascript.\nWhen obtaining FieldSchema objects from \"Schema.ValueSchema()\" or \"Schema.ObjectSchema()\",\n\"FieldSchema.type\" will contain the Javascript data type and",
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
            "source_filename": "000-Schema\\000-Schema.js"
        },
        {
            "id": "010",
            "member_of": "Schema",
            "name": "ErrorValue",
            "type": "function",
            "returns": "object",
            "returns_description": "An ErrorValue object.",
            "summary": "Returns an ErrorValue object containing error information.",
            "description": [
                ""
            ],
            "Parameters": {
                "Message": {
                    "name": "Message",
                    "type": "string",
                    "required": false,
                    "default": "error",
                    "description": "The error message."
                },
                "Context": {
                    "name": "Context",
                    "type": "string",
                    "required": false,
                    "description": "Context for the error (e.g. a function name)."
                }
            },
            "todo": [],
            "source_filename": "000-Schema\\010-Schema.ErrorValue.js"
        },
        {
            "id": "011",
            "member_of": "Schema",
            "name": "IsErrorValue",
            "type": "function",
            "returns": "boolean",
            "returns_description": "True if Value is an ErrorValue object, otherwise false.",
            "summary": "Tests if a Value is an ErrorValue object.",
            "description": "",
            "Parameters": {
                "Value": {
                    "name": "Value",
                    "type": "object",
                    "required": false,
                    "description": "The value to test."
                }
            },
            "todo": [],
            "source_filename": "000-Schema\\011-Schema.IsErrorValue.js"
        },
        {
            "id": "020",
            "member_of": "Schema",
            "name": "ValueSchema",
            "type": "function",
            "returns": "object",
            "returns_description": "A FieldSchema object.",
            "summary": "Returns a FieldSchema based upon a specific value.",
            "description": [
                "\nThis function is used to obtain extended type information about a value.\nWhile it does return an entire FieldSchema object, only the \"FieldSchema.type\" and \"FieldSchema.format\" fields are set.\n"
            ],
            "Parameters": {
                "Value": {
                    "name": "Value",
                    "type": "*",
                    "required": false,
                    "description": "The value to infer a schema from."
                }
            },
            "todo": [],
            "source_filename": "000-Schema\\020-Schema.ValueSchema.js"
        },
        {
            "id": "021",
            "member_of": "Schema",
            "name": "DefaultValue",
            "type": "function",
            "returns": "*",
            "returns_description": "The default value.",
            "summary": "Returns the default value for the FieldSchema.",
            "description": "\nIf the FieldSchema specifies a default value, then that value will be returned.\nOtherwise, a default value is calculated based upon the type and format of the FieldSchema.\n\n| Type    | Format        | Default\n|---------|---------------|-----------\n| boolean | -             | false\n| number  | integer       | 0\n| number  | float         | 0\n| string  | -             | ''\n| object  | -             | {}\n| object  | array         | []\n| object  | boolean-array | []\n| object  | number-array  | []\n| object  | string-array  | []\n| object  | object-array  | []\n",
            "Parameters": {
                "Schema": {
                    "name": "Schema",
                    "type": "object",
                    "required": true,
                    "description": "The schema to use when calculating a default value."
                },
                "ThrowErrors": {
                    "name": "ThrowErrors",
                    "type": "boolean",
                    "required": false,
                    "default": false,
                    "description": "Errors are thrown if true, otherwise an ErrorValue object is returned."
                }
            },
            "source_filename": "000-Schema\\021-Schema.DefaultValue.js"
        },
        {
            "id": "022",
            "member_of": "Schema",
            "name": "CoerceValue",
            "type": "function",
            "returns": "*",
            "returns_description": "The coerced value or an error object.",
            "summary": "Attempt to coerce the Value parameter to match the Schema's type.",
            "description": "\n\nThis function uses the Schema to coerce the Value to a particular data type.\n\nIf the \"Schema.type\" === \"*\", then no validation or coercion is performed and the Value is returned.\nIf the \"Schema.type\" === \"function\", then no validation or coercion is performed and the Value is returned.\n\nIf Value is \"undefined\" or \"null\", then the default value for \"FieldSchema.type\" will be returned.\nThis is done by calling \"Schema.DefaultValue()\" for the FieldSchema.\n\n\"Schema.ValueSchema()\" is called the get the schema for Value, which is then compared against the expected Schema.\n\n\t",
            "Parameters": {
                "Value": {
                    "name": "Value",
                    "type": "*",
                    "required": true,
                    "description": [
                        "The value to coerce."
                    ]
                },
                "Schema": {
                    "name": "Schema",
                    "type": "object",
                    "required": true,
                    "description": "The schema to use when coercing Value."
                },
                "ThrowErrors": {
                    "name": "ThrowErrors",
                    "type": "boolean",
                    "required": false,
                    "default": false,
                    "description": "Errors are thrown if true, otherwise an ErrorValue object is returned."
                }
            },
            "source_filename": "000-Schema\\022-Schema.CoerceValue.js"
        },
        {
            "id": "023",
            "member_of": "Schema",
            "name": "ValidateValue",
            "type": "function",
            "returns": "*",
            "returns_description": "The validated/coerced Value or an ErrorValue object.",
            "summary": "Validates a field value according to a schema and optionally coerces the value to match.",
            "description": "\n\nThis function uses \"Schema.type\", \"Schema.format\", \"Schema.required', and \"Schema.default\" to validate the given Value.\n\nIf \"Options.coerce = true\", then an attempt will be made to coerce the given value to match the type and format specified in the FieldSchema.\n(See: \"Schema.CoerceValue()\")\n\n\t",
            "Parameters": {
                "Value": {
                    "name": "Value",
                    "type": "*",
                    "required": true,
                    "description": [
                        "The value to validate."
                    ]
                },
                "Schema": {
                    "name": "Schema",
                    "type": "object",
                    "required": true,
                    "description": "The FieldSchema object to validate against.",
                    "examples": [
                        "{ name: 'Name', type: 'string' }",
                        "{ name: 'options', type: 'object', default: { hoist: true, swab: 'decks' } }",
                        "{ name: 'max_tries', type: 'number', format: 'integer', required: true, default: 3 }"
                    ]
                },
                "Options": {
                    "name": "Options",
                    "type": "object",
                    "required": false,
                    "default": "{ coerce: false, throw_errors: false, context: null }",
                    "description": "An options object to control validation:\n~~~javascript\nOptions = {\n\tcoerce_values: false,\t// Attempt to coerce the provided value to match the schema's type.\n\tthrow_errors: false,\t// When true, throw an error validation errors are encountered.\n\tcontext: null,\t\t\t// A context name (function name) to include in any error messages.\n}\n~~~"
                }
            },
            "source_filename": "000-Schema\\023-Schema.ValidateValue.js"
        },
        {
            "id": "030",
            "member_of": "Schema",
            "name": "ObjectSchema",
            "type": "function",
            "returns": "object",
            "returns_description": "An array of FieldSchema.",
            "summary": "Returns an array of FieldSchema describing the top-most members of \"FromObject\".",
            "description": "",
            "Parameters": {
                "FromObject": {
                    "name": "FromObject",
                    "type": "object",
                    "required": true,
                    "description": "An object to retrieve the schema for."
                }
            },
            "todo": [],
            "source_filename": "000-Schema\\030-Schema.ObjectSchema.js"
        },
        {
            "id": "031",
            "member_of": "Schema",
            "name": "ValidateValues",
            "type": "function",
            "returns": "object",
            "returns_description": "An object containing the validation result.",
            "summary": "Validate a set of values against an array of FieldSchema.",
            "description": "\n\nTakes an array of Values and an array of FieldSchema to validate a number of fields at once.\nThis function does not throw validation errors.\nInstead, all validation errors are returned to the caller in the return value.\nAdditionally, the number of fields processed and a set of coerced values is also returned.\n\n**The Return Value**\n\n~~~javascript\nReturnValue = {\n\tfield_count: 0,\t\t\t\t// The number of fields processed.\n\tvalidation_errors: [],\t\t// All validation errors encountered.\n\tcoerced_values: [],\t\t\t// An array of coerced values.\n}\n~~~\n",
            "Parameters": {
                "Values": {
                    "name": "Values",
                    "type": "object",
                    "required": true,
                    "description": "The values to validate. This can be an array of values, or an object described by Schemas."
                },
                "Schemas": {
                    "name": "Schemas",
                    "type": "object",
                    "required": true,
                    "description": "An array of FieldSchemas to validate the Values with. Can also be an object whose top-most fields are instances of FieldSchema."
                }
            },
            "todo": [],
            "source_filename": "000-Schema\\031-Schema.ValidateValues.js"
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
            "name": "Json",
            "type": "namespace",
            "summary": "Functions for manipulating Json.",
            "source_filename": "300-Json\\300-Json.js"
        },
        {
            "id": "400",
            "name": "Date",
            "type": "namespace",
            "summary": "Functions for manipulating dates.",
            "source_filename": "400-Date\\400-Date.js"
        },
        {
            "id": "401",
            "member_of": "Date",
            "name": "Parse",
            "type": "function",
            "returns": "object",
            "description": [
                "Converts a string to a date-time value.",
                "Returns a `date_time_parts` structure."
            ],
            "Parameters": {
                "Text": {
                    "name": "Text",
                    "type": "string",
                    "required": true
                },
                "TimeZoneOffset": {
                    "name": "TimeZoneOffset",
                    "type": "function",
                    "required": false,
                    "default": "+0000"
                }
            },
            "source_filename": "400-Date\\401-Date.Parse.js"
        },
        {
            "id": "410",
            "member_of": "Date",
            "name": "ZuluTimestamp",
            "type": "function",
            "returns": "string",
            "description": [
                "Returns the current date and time as a string."
            ],
            "Parameters": {},
            "source_filename": "400-Date\\410-Date.ZuluTimestamp.js"
        },
        {
            "id": "500",
            "name": "Token",
            "type": "namespace",
            "summary": "Functions for tokenizing text strings.",
            "source_filename": "500-Token\\500-Token.js"
        },
        {
            "id": "501",
            "member_of": "Token",
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
            "source_filename": "500-Token\\501-Token.TokenizeOptions.js"
        },
        {
            "id": "502",
            "member_of": "Token",
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
            "source_filename": "500-Token\\502-Token.Tokenize.js"
        },
        {
            "id": "800",
            "name": "File",
            "type": "namespace",
            "summary": "Functions for manipulating files. (nodejs only)",
            "source_filename": "800-File\\800-File.js"
        },
        {
            "id": "810",
            "member_of": "File",
            "name": "Visit",
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
            "source_filename": "800-File\\810-File.Visit.js"
        },
        {
            "id": "811",
            "member_of": "File",
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
            "source_filename": "800-File\\811-File.CountFiles.js"
        },
        {
            "id": "812",
            "member_of": "File",
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
            "source_filename": "800-File\\812-File.CountFolders.js"
        },
        {
            "id": "813",
            "member_of": "File",
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
            "source_filename": "800-File\\813-File.CopyFolder.js"
        },
        {
            "id": "814",
            "member_of": "File",
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
            "source_filename": "800-File\\814-File.DeleteFolder.js"
        },
        {
            "id": "900",
            "name": "Net",
            "type": "namespace",
            "summary": "Functions for working with networks. (nodejs only)",
            "source_filename": "900-Net\\900-Net.js"
        },
        {
            "id": "910",
            "member_of": "Net",
            "name": "AsyncDownloadFile",
            "type": "function",
            "returns": "string",
            "description": "Download a file from an url.",
            "Parameters": {},
            "source_filename": "900-Net\\910-Net.AsyncDownloadFile.js"
        },
        {
            "id": "920",
            "member_of": "Net",
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
            "source_filename": "900-Net\\920-Net.AsyncGetRequest.js"
        }
    ]
}