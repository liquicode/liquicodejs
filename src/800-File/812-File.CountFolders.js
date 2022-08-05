"use strict";


//---------------------------------------------------------------------
let Schema = {
	id: '812',
	name: 'CountFolders',
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
	function CountFolders( StartFolder, Recurse ) 
	{
		StartFolder = Liquicode.Core.ValidateField( StartFolder, Schema.Parameters.StartFolder );
		Recurse = Liquicode.Core.ValidateField( Recurse, Schema.Parameters.Recurse );

		let folder_count = 0;
		Liquicode.File.Visit( StartFolder, '', Recurse,
			function ( Folder, Filename )
			{
				if ( Folder && !Filename )
				{
					folder_count++;
				}
			} );
		return folder_count;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: Schema,
		CountFolders: CountFolders,
	};
};
