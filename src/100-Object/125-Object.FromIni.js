"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '125',
	member_of: 'Object',
	name: 'FromIni',
	type: 'function',
	returns: 'object',
	description: `
Parse an Ini string and return an object value.

`,
	Parameters: {
		IniString: {
			name: 'IniString',
			type: 'string',
			// required: true,
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function FromIni
	 * @returns {object}
	 * @description
	 * 
Parse an Ini string and return an object value.


	 * @param {string} [IniString]
	*/
	//-end-jsdoc-----------------------------------------------------------


	function FromIni( IniString )
	{
		IniString = Liquicode.Types.Coerce( IniString ).ToString();

		//NOTE: This function has the following side effects:
		//		- ignores all lines before the first section is found
		//		- ignores all entry lines which do not contain an '=' character
		//		- All entry values are stored as strings and no conversion is attempted
		let object_value = {};
		let lines = IniString.split( '\n' );
		let section_name = '';
		for ( let line_index = 0; line_index < lines.length; line_index++ )
		{
			let line = lines[ line_index ];
			if ( !line ) { continue; }
			line = line.trim();
			if ( line.startsWith( '[' ) )
			{
				// New Section
				let ich = line.indexOf( ']' );
				if ( ich < 0 ) { ich = line.length; }
				section_name = line.substring( 1, ich );
				section_name = section_name.trim();
				object_value[ section_name ] = {};
			}
			else if ( section_name )
			{
				// New Entry
				let ich = line.indexOf( '=' );
				if ( ich < 0 ) { continue; }
				let entry_name = line.substring( 0, ich );
				entry_name = entry_name.trim();
				let entry_value = line.substring( ich + 1 );
				entry_value = entry_value.trim();
				object_value[ section_name ][ entry_name ] = entry_value;
			}
		}
		return object_value;
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		FromIni: FromIni,
	};
};
