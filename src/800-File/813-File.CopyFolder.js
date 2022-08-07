"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '813',
	member_of: 'File',
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


	function CopyFolder( FromFolder, ToFolder, FilePattern, Overwrite, Recurse ) 
	{
		FromFolder = Liquicode.Schema.ValidateValue( FromFolder, _Schema.Parameters.FromFolder, { coerce_values: true, throw_errors: true } );
		ToFolder = Liquicode.Schema.ValidateValue( ToFolder, _Schema.Parameters.ToFolder, { coerce_values: true, throw_errors: true } );
		FilePattern = Liquicode.Schema.ValidateValue( FilePattern, _Schema.Parameters.FilePattern, { coerce_values: true, throw_errors: true } );
		Overwrite = Liquicode.Schema.ValidateValue( Overwrite, _Schema.Parameters.Overwrite , { coerce_values: true, throw_errors: true });
		Recurse = Liquicode.Schema.ValidateValue( Recurse, _Schema.Parameters.Recurse , { coerce_values: true, throw_errors: true });

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
