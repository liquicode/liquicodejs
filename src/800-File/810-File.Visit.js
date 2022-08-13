"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '810',
	member_of: 'File',
	name: 'Visit',
	type: 'function',
	returns: 'number',
	description: [
		'Scans a folder and calls the Visitor callback function for each folder/file encountered.',
		'Returns the number of folders/files visited.',
	],
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
	 * @function Visit
	 * @returns {number}
	 * @description
	 * Scans a folder and calls the Visitor callback function for each folder/file encountered.
	 * Returns the number of folders/files visited.
	 * @param {string} StartFolder
	 * @param {string} [FilePattern]
	 * @param {boolean} [Recurse]
	 * @param {function} [Visitor]
	*/
	//-end-jsdoc-----------------------------------------------------------


	const LIB_FS = require( 'fs' );
	const LIB_PATH = require( 'path' );


	function Visit( StartFolder, FilePattern, Recurse, Visitor ) 
	{
		StartFolder = Liquicode.Types.Coerce( StartFolder ).ToString();
		FilePattern = Liquicode.Types.Coerce( FilePattern ).ToString();
		Recurse = Liquicode.Types.Coerce( Recurse ).ToBoolean();
		// Visitor = Liquicode.Types.Coerce( Visitor, Schema.Parameters.Visitor , { coerce_values: true, throw_errors: true });

		if ( !LIB_FS.existsSync( StartFolder ) ) { return; }
		let count = 0;
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
						if ( Visitor ) { Visitor( StartFolder, element ); }
						count++;
					}
				}
				else
				{
					if ( Visitor ) { Visitor( StartFolder, element ); }
					count++;
				}
			}
			else if ( LIB_FS.lstatSync( from_path ).isDirectory() )
			{
				if ( !FilePattern ) 
				{
					if ( Visitor ) { Visitor( from_path, null ); }
					count++;
				}
				if ( Recurse )
				{
					count += Visit( from_path, FilePattern, Recurse, Visitor );
				}
			}
		}
		return count;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		Visit: Visit,
	};
};
