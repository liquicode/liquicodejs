"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '122',
	member_of: 'Object',
	name: 'ToJson',
	type: 'function',
	returns: 'object',
	description: `
`,
	Parameters: {
		Value: {
			name: 'Value',
			type: '*',
			description: `The value to convert to a json string.`,
		},
		JsonOptions: {
			name: 'JsonOptions',
			type: 'object|string',
			description: `Can be an options object or the name of an options preset ("default", "pretty", or "pretty-2")`,
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


	function ToJson( Value, JsonOptions )
	{
		let options = Liquicode.Object.ToJsonOptions();
		if ( typeof JsonOptions === 'string' )
		{
			options = Liquicode.Object.ToJsonOptions( JsonOptions );
		}
		else if ( ( typeof JsonOptions === 'object' ) && Object.keys( JsonOptions ).length )
		{
			options = Liquicode.Object.Merge( options, JsonOptions );
		}

		return stringify_recurse( Value, 0, options );
	};


	//---------------------------------------------------------------------
	function stringify_recurse( Node, Depth, Options, Context = null )
	{
		let text = '';

		if ( typeof Node === 'undefined' )
		{
			// return '';
		}
		else if ( typeof Node === 'boolean' )
		{
			text += Node.toString();
		}
		else if ( typeof Node === 'number' )
		{
			text += Node.toString();
		}
		else if ( typeof Node === 'bigint' )
		{
			text += Node.toString();
		}
		else if ( typeof Node === 'string' )
		{
			let value = Node.toString();
			if ( Options.literal_quote )
			{
				value = value.replace( Options.literal_quote, '\\' + Options.literal_quote );
			}
			text += `${Options.literal_quote}${value}${Options.literal_quote}`;
		}
		else if ( typeof Node === 'symbol' )
		{
			// return '';
		}
		else if ( typeof Node === 'function' )
		{
			// return '';
		}
		else if ( typeof Node === 'object' )
		{
			if ( Node === null )
			{
				text += 'null';
			}
			else if ( Array.isArray( Node ) )
			{
				text += Options.eol_char;
				text += Options.tab_char.repeat( Depth );
				text += '[' + Options.space_char;
				text += Options.eol_char;
				for ( let index = 0; index < Node.length; index++ )
				{
					text += Options.tab_char.repeat( Depth + 1 );
					text += stringify_recurse( Node[ index ], Depth + 1, Options, 'array-element' );
					if ( ( index < ( Node.length - 1 ) ) || Options.liberal_commas )
					{
						text += ',' + Options.space_char;
					}
					text += Options.eol_char;
				}
				text += Options.tab_char.repeat( Depth );
				if ( !Options.eol_char ) { text += Options.space_char; }
				text += ']';
			}
			else
			{
				if ( Context === 'field-value' )
				{
					text += Options.eol_char;
					text += Options.tab_char.repeat( Depth );
				}
				text += '{' + Options.space_char;
				text += Options.eol_char;
				let keys = Object.keys( Node );
				let max_key_length = 0;
				keys.map( ( key ) => { if ( key.length > max_key_length ) { max_key_length = key.length; } } );
				for ( let index = 0; index < keys.length; index++ )
				{
					let key = keys[ index ];
					text += Options.tab_char.repeat( Depth + 1 );
					//TODO: Implement: Options.always_quote_identifiers = false
					text += `${Options.identifier_quote}${key}${Options.identifier_quote}`;
					text += ':';
					if ( Options.align_values )
					{
						text += ' '.repeat( max_key_length - key.length );
					}
					text += Options.space_char;
					text += stringify_recurse( Node[ key ], Depth + 1, Options, 'field-value' );
					if ( ( index < ( keys.length - 1 ) ) || Options.liberal_commas )
					{
						text += ',' + Options.space_char;
					}
					text += Options.eol_char;
				}
				text += Options.tab_char.repeat( Depth );
				if ( !Options.eol_char ) { text += Options.space_char; }
				text += '}';
			}
		}

		return text;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		ToJson: ToJson,
	};
};
