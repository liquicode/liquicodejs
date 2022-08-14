"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '811',
	member_of: 'System',
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
		StartFolder = Liquicode.Types.Coerce( StartFolder ).ToString();
		FilePattern = Liquicode.Types.Coerce( FilePattern ).ToString();
		Recurse = Liquicode.Types.Coerce( Recurse ).ToBoolean();

		let count = Liquicode.System.VisitFiles( StartFolder, FilePattern, Recurse );
		return count;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		CountFiles: CountFiles,
	};
};
