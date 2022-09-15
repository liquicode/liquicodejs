"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '816',
	member_of: 'System',
	name: 'WithFileText',
	type: 'function',
	returns: 'boolean',
	returns_description: 'False if no changes were made or True if changes were saved.',
	description: `
Loads content from a file and passes it to a callback function for processing.

The callback function takes two parameters: Filename and Text.
Filename is the Filename passed to \`WithFileText\` and Text is the content of that file.
The callback function is expected to return either \`undefined\` or \`null\` if no changes are made to the text.
If changes are made, the callback function can return the new text which will be saved back to Filename.

If the file content is changed during callback processing, then \`WithFileText\` will return True.
`,
	Parameters: {
		Filename: {
			name: 'Filename',
			type: 'string',
			required: true,
		},
		FileTextCallback: {
			name: 'FileTextCallback',
			type: 'function',
			required: true,
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function WithFileText
	 * @returns {boolean}
	 * False if no changes were made or True if changes were saved.
	 * @description
	 * 
Loads content from a file and passes it to a callback function for processing.

The callback function takes two parameters: Filename and Text.
Filename is the Filename passed to `WithFileText` and Text is the content of that file.
The callback function is expected to return either `undefined` or `null` if no changes are made to the text.
If changes are made, the callback function can return the new text which will be saved back to Filename.

If the file content is changed during callback processing, then `WithFileText` will return True.

	 * @param {string} Filename
	 * @param {function} FileTextCallback
	*/
	//-end-jsdoc-----------------------------------------------------------


	const LIB_FS = require( 'fs' );


	function WithFileText( Filename, FileTextCallback ) 
	{
		let text = LIB_FS.readFileSync( Filename, 'utf-8' );
		let processed_text = FileTextCallback( Filename, text );
		if ( ( processed_text === undefined ) || ( processed_text === null ) ) { return false; }
		if ( typeof processed_text !== 'string' ) { throw new Error( `The return value from [FileTextCallback] must be either undefined, null, or a text string.` ); }
		if ( processed_text === text ) { return false; }
		LIB_FS.writeFileSync( Filename, processed_text );
		return true;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		WithFileText: WithFileText,
	};
};
