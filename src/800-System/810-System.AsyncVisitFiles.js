"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '810',
	member_of: 'System',
	name: 'AsyncVisitFiles',
	type: 'function',
	returns: '*',
	description: `
Scans a folder and calls the Visitor callback function for each folder/file encountered.

The \`FilePattern\` parameter is optional and can be a wildcard type string.
For example, to visit all text files, you can pass '*.txt'.
If \`FilePattern\` is not empty, then the callback will not be called for folders.

The Visitor callback function takes two parameters \`Visitor( Path, Filename )\`.
If the Visitor callback returns a value, then the visitation process is halted
and that value is returned by the \`VisitFiles\` function.
The Visitor callback is called for each file encountered and for each folder encountered.
When called for a folder, the \`Filename\` parameter will be null.
The Visitor callback function can be either synchronous or asymchronous.
`,
	Parameters: {
		StartFolder: {
			name: 'StartFolder',
			type: 'string',
			required: true,
		},
		FilePattern: {
			name: 'FilePattern',
			type: 'string',
			required: false,
			default: '',
		},
		Recurse: {
			name: 'Recurse',
			type: 'boolean',
			required: false,
			default: false,
		},
		Visitor: {
			name: 'Visitor',
			type: 'function',
			description: 'Function to be called for each folder and file: Visitor( Path, Filename )',
			required: false,
			default: null,
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function AsyncVisitFiles
	 * @returns {*}
	 * @description
	 * 
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

	 * @param {string} StartFolder
	 * @param {string} [FilePattern]
	 * @param {boolean} [Recurse]
	 * @param {function} [Visitor]
	 * Function to be called for each folder and file: Visitor( Path, Filename )
	*/
	//-end-jsdoc-----------------------------------------------------------


	const LIB_FS = require( 'fs' );
	const LIB_PATH = require( 'path' );


	async function AsyncVisitFiles( StartFolder, FilePattern, Recurse, Visitor ) 
	{
		StartFolder = Liquicode.Types.Coerce( StartFolder ).ToString();
		FilePattern = Liquicode.Types.Coerce( FilePattern ).ToString();
		Recurse = Liquicode.Types.Coerce( Recurse ).ToBoolean();
		// Visitor = Liquicode.Types.Coerce( Visitor, Schema.Parameters.Visitor , { coerce_values: true, throw_errors: true });

		if ( !LIB_FS.existsSync( StartFolder ) ) { return; }
		// let count = 0;
		let elements = LIB_FS.readdirSync( StartFolder );
		for ( let element_index = 0; element_index < elements.length; element_index++ )
		{
			let element = elements[ element_index ];
			let from_path = LIB_PATH.join( StartFolder, element );
			if ( LIB_FS.lstatSync( from_path ).isFile() )
			{
				if ( FilePattern ) 
				{
					if ( Liquicode.Text.Matches( element, FilePattern ) )
					{
						// if ( Visitor ) { Visitor( StartFolder, element ); }
						// count++;
						if ( Visitor ) 
						{
							let value = await Visitor( StartFolder, element );
							if ( value !== undefined ) { return value; }
						}
					}
				}
				else
				{
					// if ( Visitor ) { Visitor( StartFolder, element ); }
					// count++;
					if ( Visitor ) 
					{
						let value = await Visitor( StartFolder, element );
						if ( value !== undefined ) { return value; }
					}
				}
			}
			else if ( LIB_FS.lstatSync( from_path ).isDirectory() )
			{
				if ( !FilePattern ) 
				{
					// if ( Visitor ) { Visitor( from_path, null ); }
					// count++;
					if ( Visitor ) 
					{
						let value = await Visitor( from_path, null );
						if ( value !== undefined ) { return value; }
					}
				}
				if ( Recurse )
				{
					let value = AsyncVisitFiles( from_path, FilePattern, Recurse, Visitor );
					if ( value !== undefined ) { return value; }
				}
			}
		}
		return;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		AsyncVisitFiles: AsyncVisitFiles,
	};
};
