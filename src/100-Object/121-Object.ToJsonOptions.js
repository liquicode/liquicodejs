"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '121',
	member_of: 'Object',
	name: 'ToJsonOptions',
	type: 'function',
	returns: 'object',
	description: `
`,
	Parameters: {
		PresetName: {
			name: 'PresetName',
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
	 * @function Clone
	 * @returns {string}
	 * @description
	 * Returns a clone of the given object.
	 * This is equivalent to doing A = JSON.parse( JSON.stringify( B ) ).
	 * @param {object} [From={}]
	*/
	//-end-jsdoc-----------------------------------------------------------


	function ToJsonOptions( PresetName )
	{
		PresetName = Liquicode.Schema.CoerceValue( PresetName, _Schema.Parameters.PresetName, true );

		let options = {
			identifier_quote: `"`,
			literal_quote: `"`,
			always_quote_identifiers: true,	// Implemented?
			eol_char: '',
			tab_char: '',
			space_char: '',
			liberal_commas: false,
			align_values: false,
			//TODO: The following options have not been implemented:
			// extroverted_arrays: true,
			// extroverted_brackets: true,
			// extroverted_braces: true,
		};
		if ( !PresetName || PresetName === 'default' )
		{
			/* Do Nothing */
		}
		else if ( PresetName === 'pretty' )
		{
			options.identifier_quote = `"`;
			options.literal_quote = `"`;
			options.always_quote_identifiers = true;
			options.eol_char = '\n';
			options.tab_char = '    ';
			options.space_char = ' ';
		}
		else if ( PresetName === 'pretty-2' )
		{
			options.identifier_quote = `'`;
			options.literal_quote = `"`;
			options.always_quote_identifiers = false;
			options.eol_char = '\n';
			options.tab_char = '    ';
			options.space_char = ' ';
			options.liberal_commas = true;
			options.align_values = true;
			// options.extroverted_arrays = true;
			// options.extroverted_brackets = true;
			// options.extroverted_braces = true;
		}
		else
		{
			throw new Error( `The parameter [PresetName] has an invalid value of [${PresetName}]. Must be one of: 'default', 'pretty', or 'pretty-2'.` );
		}
		return options;
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		ToJsonOptions: ToJsonOptions,
	};
};
