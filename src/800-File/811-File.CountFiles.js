"use strict";


//---------------------------------------------------------------------
let Schema = {
	id: '811',
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


	//---------------------------------------------------------------------
	function CountFiles( StartFolder, FilePattern, Recurse ) 
	{
		StartFolder = Liquicode.Core.ValidateField( StartFolder, Schema.Parameters.StartFolder );
		FilePattern = Liquicode.Core.ValidateField( FilePattern, Schema.Parameters.FilePattern );
		Recurse = Liquicode.Core.ValidateField( Recurse, Schema.Parameters.Recurse );

		let count = Liquicode.File.Visit( StartFolder, FilePattern, Recurse );
		return count;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: Schema,
		CountFiles: CountFiles,
	};
};
