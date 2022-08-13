"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '126',
	member_of: 'Object',
	name: 'ToIni',
	type: 'function',
	returns: 'object',
	description: `
Parse an Ini string and return an object value.

`,
	Parameters: {
		Value: {
			name: 'Value',
			type: 'object',
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
	 * @function ToIni
	 * @returns {object}
	 * @description
	 * 
Parse an Ini string and return an object value.


	 * @param {object} [Value]
	*/
	//-end-jsdoc-----------------------------------------------------------


	function ToIni( Value )
	{
		Value = Liquicode.Types.Coerce( Value ).ToObject();

		//NOTE: This function has the following side effects:
		//		- ignores all sections that are not of type object
		//		- ignores all entry values that are not of a primitive type
		let ini_text = '';
		let section_keys = Object.keys( Value );
		for ( let section_index = 0; section_index < section_keys.length; section_index++ )
		{
			let section_key = section_keys[ section_index ];
			let section_data = Value[ section_key ];
			if ( !( typeof section_data === 'object' ) ) { continue; }
			if ( Array.isArray( section_data ) ) { continue; }
			ini_text += `[${section_key}]\n`;
			let entry_keys = Object.keys( section_data );
			for ( let entry_index = 0; entry_index < entry_keys.length; entry_index++ )
			{
				let entry_key = entry_keys[ entry_index ];
				let entry_value = section_data[ entry_key ];
				if (
					( typeof entry_value === 'symbol' )
					|| ( typeof entry_value === 'function' )
					|| ( typeof entry_value === 'object' )
				)
				{
					continue;
				}
				ini_text += `${entry_key}=${entry_value}\n`;
			}
		}
		return ini_text;
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		ToIni: ToIni,
	};
};
