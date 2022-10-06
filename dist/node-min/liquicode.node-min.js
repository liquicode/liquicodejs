/*! For license information please see liquicode.node-min.js.LICENSE.txt */
!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var r,n=t();for(r in n)("object"==typeof exports?exports:e)[r]=n[r]}}(global,(()=>{return t={526:(e,t,r)=>{"use strict";let n={id:"000",name:"Types",type:"namespace",summary:"Data Type Handling"};e.exports=function(e){return{_Schema:n,HasValue:r(438)(e).HasValue,Coerce:r(558)(e).Coerce,Formats:r(672)(e).Formats,GetFormat:r(507)(e).GetFormat,IsFormat:r(142)(e).IsFormat}}},438:e=>{"use strict";let t={id:"001",member_of:"Types",name:"HasValue",type:"function",returns:"boolean",returns_description:"True if Value actually contains a value.",summary:"Determine if a variable contains a value or or not.",description:'\nTests the provided Value parameter and returns false if it does not represent a value.\nMore specifically, if Value is undefined or null, then false is returned.\nif Value is a zero length string `""` or an empty object `{}`, false is also returned.\nIn all other cases, this function returns true.\n',Parameters:{Value:{name:"Value",type:"*",required:!0,description:"The value to test."}},todo:[]};e.exports=function(e){return{_Schema:t,HasValue:function(e){return!(null==e||"string"==typeof e&&0===e.length||"object"==typeof e&&0===Object.keys(e).length)}}}},558:e=>{"use strict";let t={id:"010",member_of:"Types",name:"Coerce",type:"function",returns:"object",returns_description:"A `Coercion` object.",summary:"Returns a `Coercion` object which is used to coerce values to different types.",description:"\nThe returned `Coercion` object has a single member `Coercion.value` and a number of coercion functions:\n\n- `ToBoolean( Default = false )` :\n\tReturns the boolean value of `Coercion.value`.\n\tAnything can be coerced to a boolean.\n\tIf value is a string, then 'false' and '0' will return false while 'true' will return true.\n\n- `ToNumber( Default = 0 )` :\n\tReturns the numeric value of `Coercion.value`.\n\tBooleans, other numbers, and numeric strings can be coerced to a number.\n\n- `ToString( Default = '' )` :\n\tReturns the string value of `Coercion.value`.\n\tAnything can be coerced to a string.\n\tIf value is an object, then it is JSON stringified and returned.\n\n- `ToObject( Default = null )` :\n\tReturns the object value of `Coercion.value`.\n\tOnly JSON strings and other objects can be coerced to an object.\n\tIf value is a JSON string, then it is JSON parsed and returned.\n\n`Coercion.value` is set to the Value parameter.\n\n**Usage**\n\nThere are two ways to use the `Coercion` object.\n\nOne way is to immediately call one of the coercion functions after obtaining the `Coercion` object:\n~~~javascript\nlet number_42 = Liquicode.Types.Coerce( '42' ).ToNumber();\n~~~\n\nAnother way is to reuse the `Coercion` object and alter the `Coercion.value` property yourself:\n~~~javascript\nlet coercion = Liquicode.Types.Coerce();\ncoercion.value = '42';\nlet number_42 = coercion.ToNumber();\n~~~\n\n**Examples**\n\n~~~javascript\n// Coercing to boolean\nSchema.Coerce( null ).ToBoolean()           // = false\nSchema.Coerce( 0 ).ToBoolean()              // = false\nSchema.Coerce( 'true' ).ToBoolean()         // = true\n\n// Coercing to number\nSchema.Coerce( null ).ToNumber()            // = 0\nSchema.Coerce( '3.14' ).ToNumber()          // = 3.14\nSchema.Coerce( 'foo' ).ToNumber()           // = 0\n\n// Coercing to string\nSchema.Coerce( null ).ToString()            // = ''\nSchema.Coerce( '3.14' ).ToString()          // = '3.14'\nSchema.Coerce( { foo: 'bar' } ).ToString()  // = '{\"foo\":\"bar\"}'\n\n// Coercing to object\nSchema.Coerce( null ).ToObject()            // = null\nSchema.Coerce( 3.14 ).ToObject()            // = null\nSchema.Coerce( '{\"foo\":\"bar\"}' ).ToObject() // = { foo: 'bar' }\n\n// Coercing with a Default\nSchema.Coerce( 'Hello' ).ToNumber( -1 )     // = -1\nSchema.Coerce( true ).ToObject( {} )        // = {}\nSchema.Coerce( 1024 ).ToObject( {} )        // = {}\nSchema.Coerce( null ).ToObject( { a: 1 } )  // = { a: 1 }\nSchema.Coerce( null ).ToObject( [ 1, 2 ] )  // = [ 1, 2 ]\n~~~\n",Parameters:{Value:{name:"Value",type:"*",required:!1,description:"The value to coerce. This value is set to `Coercion.value`."},Loud:{name:"Loud",type:"boolean",required:!1,default:!1,description:"Throws errors when set to `true`."}},todo:[]};e.exports=function(e){function r(e,t,r){if(e)throw new Error(r);return t}return{_Schema:t,Coerce:function(e,t=!1){return{value:e,loud:t,ToBoolean:function(e=!1){if(void 0===this.value)return e;if(null===this.value)return e;if("string"==typeof this.value){if("false"===this.value)return!1;if("true"===this.value)return!0;if("0"===this.value)return!1}return Boolean(this.value)},ToNumber:function(e=0){if(void 0===this.value)return e;if(null===this.value)return e;var t=Number(this.value);return isNaN(t)?r(this.loud,e,"Unable to coerce value to a number."):t},ToString:function(e=""){return void 0===this.value||null===this.value?e:"object"==typeof this.value?JSON.stringify(this.value):void 0===this.value.toString?r(this.loud,e,"Unable to coerce value to a string."):this.value.toString()},ToObject:function(e=null){if(void 0===this.value)return e;if(null===this.value)return e;switch(typeof this.value){case"boolean":return r(this.loud,e,"Unable to coerce from boolean to object.");case"number":return r(this.loud,e,"Unable to coerce from number to object.");case"string":let t=this.value.trim();if(t.startsWith("{")||t.startsWith("["))try{return t=JSON.parse(t)}catch(t){return r(this.loud,e,"Unable to coerce from non-json string to object.")}case"object":return this.value;case"function":return r(this.loud,e,"Unable to coerce from function to object.");case"symbol":return r(this.loud,e,"Unable to coerce from symbol to object.");default:return r(this.loud,e,`Unknown type encountered [${typeof this.value}].`)}},ToType:function(e,t){switch(e){case"boolean":return this.ToBoolean(t);case"number":return this.ToNumber(t);case"string":return this.ToString(t);case"object":return this.ToObject(t);default:throw new Error(`Invalid or unknown type name [${e}].`)}}}}}}},672:e=>{"use strict";let t={id:"020",member_of:"Types",name:"Formats",source_type:"function",returns:"object",returns_description:"An array of `SchemaFormat` objects.",summary:"Returns an array of `SchemaFormat` objects used to convert values between different formats.",description:"\nReturns the library's internal array of format objects, `Types.Formats`.\n\nEach format has a `type` and `format` string, and an `IsFormat( Value )` function.\nThis list of formats is used by the `Types.GetFormat()` and `Types.IsFormat()` functions.\n\nApplications can ammend this array in order to customize type processing or add new formats.\nThe structure of each format in the array is:\n~~~javascript\n{\n\ttype: '',    // The Javascript data type. e.g. 'boolean', 'number', 'string', 'object'\n\tformat: '',  // A type specific format. e.g. 'integer', 'date'. \n\tIsFormat: function ( Value )\n\t{\n\t\treturn true;  // Return true, if Value is of this format.\n\t}\n}\n~~~\n\nFor example, here is the format object for `\"string:string\"`:\n~~~javascript\n{\n\ttype: 'string',\n\tformat: 'string',\n\tIsFormat: function ( Value )\n\t{\n\t\tif ( typeof Value !== 'string' ) { return false; }\n\t\treturn true;\n\t},\n},\n~~~\n\nYou have the ability to directly modify the `Types.Formats` array.\n\nFor example, suppose you want to define two new formats to detect objects of 'object:person' and 'object:employee'.\n~~~javascript\nPerson = {\n\tfirst_name: '',\n\tlast_name: '',\n}\nEmployee = {\n\tfirst_name: '',\n\tlast_name: '',\n\ttitle: '',\n}\n~~~\n\nThe format objects might look something like this:\n~~~javascript\nobject_person = {\n\ttype: 'object',\n\tformat: 'person',\n\tIsFormat: function( Value )\n\t{\n\t\tif ( typeof Value !== 'object' ) { return false; }\n\t\tif ( !Value ) { return false; }\n\t\tif ( !Value.first_name ) { return false; }\n\t\tif ( !Value.last_name ) { return false; }\n\t\treturn true;\n\t},\n},\nobject_employee = {\n\ttype: 'object',\n\tformat: 'employee',\n\tIsFormat: function( Value )\n\t{\n\t\tif ( typeof Value !== 'object' ) { return false; }\n\t\tif ( !Value ) { return false; }\n\t\tif ( !Value.first_name ) { return false; }\n\t\tif ( !Value.last_name ) { return false; }\n\t\tif ( !Value.title ) { return false; }\n\t\treturn true;\n\t},\n},\n~~~\n\nAnd tou can add them to the `Types.Formats` array:\n~~~javascript\nlet formats = Liquicode.Types.Formats();\nformats.push( object_person );\nformats.push( object_employee );\n~~~\n\nThe `Types.GetFormat()` function reads the formats array in reverse order when matching a value to a format.\nThis is done so that more complex types will not get \"short-circuited\" by less complex types.\nThe more complex format in this case is \"object:employee\" and should appear after \"object:person\" in the array.\n\n",Parameters:{},todo:[]};e.exports=function(e){let r=[{type:"boolean",format:"boolean",IsFormat:function(e){return"boolean"==typeof e}},{type:"number",format:"number",IsFormat:function(e){return"number"==typeof e}},{type:"number",format:"integer",IsFormat:function(e){return"number"==typeof e&&e===parseInt(e.toString())}},{type:"string",format:"string",IsFormat:function(e){return"string"==typeof e}},{type:"string",format:"json",IsFormat:function(e){return!("string"!=typeof e||!e||!(e=e.trimStart()).startsWith("{")&&!e.startsWith("["))}},{type:"string",format:"datetime",IsFormat:function(e){return!("string"!=typeof e||!e||24!==e.length||isNaN(Number(e.substring(0,4)))||"-"!==e[4]||isNaN(Number(e.substring(5,7)))||"-"!==e[7]||isNaN(Number(e.substring(8,10)))||"T"!==e[10]||isNaN(Number(e.substring(11,13)))||":"!==e[13]||isNaN(Number(e.substring(14,16)))||":"!==e[16]||isNaN(Number(e.substring(17,19)))||"."!==e[19]||isNaN(Number(e.substring(20,23)))||"Z"!==e[23])}},{type:"string",format:"date",IsFormat:function(e){return!("string"!=typeof e||!e||10!==e.length||isNaN(Number(e.substring(0,4)))||"-"!==e[4]||isNaN(Number(e.substring(5,7)))||"-"!==e[7]||isNaN(Number(e.substring(8,10))))}},{type:"string",format:"time",IsFormat:function(e){return!("string"!=typeof e||!e||8!==e.length||isNaN(Number(e.substring(0,2)))||":"!==e[2]||isNaN(Number(e.substring(3,5)))||":"!==e[5]||isNaN(Number(e.substring(6,8))))}},{type:"object",format:"object",IsFormat:function(e){return"object"==typeof e&&!!e}},{type:"object",format:"datetime",IsFormat:function(e){return"object"==typeof e&&!!e&&!!e.getTime&&!isNaN(e.getTime())}},{type:"object",format:"array",IsFormat:function(e){return"object"==typeof e&&!!e&&!!Array.isArray(e)}},{type:"object",format:"boolean-array",IsFormat:function(e){if("object"!=typeof e)return!1;if(!e)return!1;if(!Array.isArray(e))return!1;if(!e.length)return!1;for(let t=0;t<e.length;t++)if("boolean"!=typeof e[t])return!1;return!0}},{type:"object",format:"number-array",IsFormat:function(e){if("object"!=typeof e)return!1;if(!e)return!1;if(!Array.isArray(e))return!1;if(!e.length)return!1;for(let t=0;t<e.length;t++)if("number"!=typeof e[t])return!1;return!0}},{type:"object",format:"string-array",IsFormat:function(e){if("object"!=typeof e)return!1;if(!e)return!1;if(!Array.isArray(e))return!1;if(!e.length)return!1;for(let t=0;t<e.length;t++)if("string"!=typeof e[t])return!1;return!0}},{type:"object",format:"object-array",IsFormat:function(e){if("object"!=typeof e)return!1;if(!e)return!1;if(!Array.isArray(e))return!1;if(!e.length)return!1;for(let t=0;t<e.length;t++)if("object"!=typeof e[t])return!1;return!0}},{type:"object",format:"array-array",target_type:"object",IsFormat:function(e){if("object"!=typeof e)return!1;if(!e)return!1;if(!Array.isArray(e))return!1;if(!e.length)return!1;for(let t=0;t<e.length;t++){if("object"!=typeof e[t])return!1;if(!Array.isArray(e[t]))return!1}return!0}}];return{_Schema:t,Formats:function(){return r}}}},507:e=>{"use strict";let t={id:"021",member_of:"Types",name:"GetFormat",type:"function",returns:"string",returns_description:"An extended type description.",summary:"Determine the type and format of a value.",description:"\nIterates through `Types.Formats` in reverse order and calls each `Format.IsFormat()` function.\nWhen one of the formats returns `true`, then it's type and format are returned separated by `:`.\n\n**Examples**\n\n~~~javascript\nLiquicode.Types.GetFormat( '42' )         // = 'number:integer'\nLiquicode.Types.GetFormat( 'Hello' )      // = 'string:string'\nLiquicode.Types.GetFormat( new Date() )   // = 'object:datetime'\nLiquicode.Types.GetFormat( [ 1, 2, 3 ] )  // = 'object:number-array'\n~~~\n",Parameters:{Value:{name:"Value",type:"*",required:!0,description:"The value to get the format for."}},todo:[]};e.exports=function(e){return{_Schema:t,GetFormat:function(t){var r=e.Types.Formats();for(let e=r.length-1;0<=e;e--){let n=r[e];if(n.IsFormat(t))return n.type+":"+n.format}return null}}}},142:e=>{"use strict";let t={id:"022",member_of:"Types",name:"IsFormat",type:"function",returns:"boolean",returns_description:"True if the value matches the format.",summary:"Determine if a value is of a particular format.",description:"\nLooks up the specified format in `Types.Formats` and calls the `Format.IsFormat()` function.\n\nThe `Format` parameter must specify both type and format to be tested for.\n\n**Examples**\n\n~~~javascript\nLiquicode.Types.IsFormat( 'Hello', 'string:string' )            // = true\nLiquicode.Types.IsFormat( 'Hello', 'string:json' )              // = false\nLiquicode.Types.IsFormat( [ 1, 2, 3 ], 'object:array' )         // = true\nLiquicode.Types.IsFormat( [ 1, 2, 3 ], 'object:number-array' )  // = true\nLiquicode.Types.IsFormat( [ 1, 2, 3 ], 'object:string-array' )  // = false\n~~~\n",Parameters:{Value:{name:"Value",type:"*",required:!0,description:"The value to test."},Format:{name:"Format",type:"string",required:!0,description:'The type and format to test for as: `"type:format"`.',examples:["string:string","string:json","object:datetime"]}},todo:[]};e.exports=function(e){return{_Schema:t,IsFormat:function(t,r){var n=e.Types.Formats();for(let e=0;e<n.length;e++){let o=n[e];if(r===o.type+":"+o.format)return o.IsFormat(t)}throw new Error(`Unknown type and format [${r}]. Should be of the form [type:format].`)}}}},470:(e,t,r)=>{"use strict";var n={};function o(e,t){n[e]={};var o=r(875)(t)(n),a=Object.keys(o);for(let t=0;t<a.length;t++){var s=a[t];"_Schema"!==s&&(n[s]=o[s],n[e][s]=o[s])}n.Types=r(526)(n)}n.version="v0.0.21",n.environment="node-min",o("Types","./000-Types/000-Types.js"),o("Object","./100-Object/100-Object.js"),o("Text","./200-Text/200-Text.js"),o("Shapes","./300-Shapes/300-Shapes.js"),o("Parse","./500-Parse/500-Parse.js"),o("System","./800-System/800-System.js"),o("Network","./900-Network/900-Network.js"),e.exports=n},875:e=>{function t(e){throw(e=new Error("Cannot find module '"+e+"'")).code="MODULE_NOT_FOUND",e}t.keys=()=>[],(t.resolve=t).id=875,e.exports=t}},r={},e.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),e(470);function e(n){var o=r[n];return void 0!==o||(o=r[n]={exports:{}},t[n](o,o.exports,e)),o.exports}var t,r}));