"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '813',
	member_of: 'System',
	name: 'CopyFolder',
	type: 'function',
	returns: 'number',
	description: [
		'Copies files from one folder to another.',
		'Returns the number of files copied.',
	],
	Parameters: {
		FromFolder: {
			name: 'FromFolder',
			type: 'string',
			required: true,
		},
		ToFolder: {
			name: 'ToFolder',
			type: 'string',
			required: true,
		},
		FilePattern: {
			name: 'FilePattern',
			type: 'string',
			required: false,
			default: '*',
		},
		Overwrite: {
			name: 'Overwrite',
			type: 'boolean',
			required: false,
			default: false,
		},
		Recurse: {
			name: 'Recurse',
			type: 'boolean',
			required: false,
			default: false,
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function CopyFolder
	 * @returns {number}
	 * @description
	 * Copies files from one folder to another.
	 * Returns the number of files copied.
	 * @param {string} FromFolder
	 * @param {string} ToFolder
	 * @param {string} [FilePattern="*"]
	 * @param {boolean} [Overwrite]
	 * @param {boolean} [Recurse]
	*/
	//-end-jsdoc-----------------------------------------------------------


	const LIB_FS = require( 'fs' );
	const LIB_PATH = require( 'path' );


	function CopyFolder( FromFolder, ToFolder, FilePattern, Overwrite, Recurse ) 
	{
		FromFolder = Liquicode.Types.Coerce( FromFolder ).ToString();
		ToFolder = Liquicode.Types.Coerce( ToFolder ).ToString();
		FilePattern = Liquicode.Types.Coerce( FilePattern ).ToString();
		Overwrite = Liquicode.Types.Coerce( Overwrite ).ToBoolean();
		Recurse = Liquicode.Types.Coerce( Recurse ).ToBoolean();

		if ( !LIB_FS.existsSync( FromFolder ) ) { return 0; }
		LIB_FS.mkdirSync( ToFolder, { recursive: true } );
		let count = 0;
		let elements = LIB_FS.readdirSync( FromFolder );
		for ( let element_index = 0; element_index < elements.length; element_index++ )
		{
			let element = elements[ element_index ];
			let from_path = LIB_PATH.join( FromFolder, element );
			let to_path = LIB_PATH.join( ToFolder, element );
			if ( LIB_FS.lstatSync( from_path ).isFile() )
			{
				if ( !LIB_FS.existsSync( to_path ) || Overwrite ) 
				{
					LIB_FS.copyFileSync( from_path, to_path );
					count++;
				}
			}
			else if ( Recurse && LIB_FS.lstatSync( from_path ).isDirectory() )
			{
				count += CopyFolder( from_path, to_path, Overwrite, Recurse );
			}
		}
		return count;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		CopyFolder: CopyFolder,
	};
};
