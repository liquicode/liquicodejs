"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '811',
	member_of: 'File',
	name: 'CountFiles',
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
			default: '*',
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
	 * @function CountFiles
	 * @returns {number}
	 * @description
	 * Scans a folder and calls the Visitor callback function for each folder/file encountered.
	 * Returns the number of folders/files visited.
	 * @param {string} StartFolder
	 * @param {string} [FilePattern="*"]
	 * @param {boolean} [Recurse]
	*/
	//-end-jsdoc-----------------------------------------------------------


	function CountFiles( StartFolder, FilePattern, Recurse ) 
	{
		StartFolder = Liquicode.Schema.ValidateValue( StartFolder, _Schema.Parameters.StartFolder , { coerce_values: true, throw_errors: true });
		FilePattern = Liquicode.Schema.ValidateValue( FilePattern, _Schema.Parameters.FilePattern, { coerce_values: true, throw_errors: true } );
		Recurse = Liquicode.Schema.ValidateValue( Recurse, _Schema.Parameters.Recurse , { coerce_values: true, throw_errors: true });

		let count = Liquicode.File.Visit( StartFolder, FilePattern, Recurse );
		return count;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		CountFiles: CountFiles,
	};
};
