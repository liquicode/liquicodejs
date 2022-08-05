"use strict";


//---------------------------------------------------------------------
let Schema = {
	id: '103',
	name: 'Merge',
	type: 'function',
	returns: 'object',
	description: [
		'Returns a clone of the given object.',
		'This is equivalent to doing A = JSON.parse( JSON.stringify( B ) ).',
	],
	Parameters: {
		Original: {
			name: 'Original',
			type: 'object',
			required: true,
		},
		Updates: {
			name: 'Updates',
			type: 'object',
			required: false,
			default: {},
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{

	//---------------------------------------------------------------------
	function Merge( Original, Updates )
	{
		Original = Liquicode.Core.ValidateField( Original, Schema.Parameters.Original );
		Updates = Liquicode.Core.ValidateField( Updates, Schema.Parameters.Updates );

		let new_object = JSON.parse( JSON.stringify( Original ) );

		function update_children( ParentA, ParentB )
		{
			Object.keys( ParentB ).forEach(
				key =>
				{
					let value = ParentB[ key ];
					if ( ParentA[ key ] === undefined )
					{
						ParentA[ key ] = JSON.parse( JSON.stringify( value ) );
					}
					else
					{
						if ( typeof value === 'object' )
						{
							// Merge objects.
							if ( ( ParentA[ key ] === null ) && ( value === null ) )
							{
								// Do nothing.
							}
							else if ( ( ParentA[ key ] !== null ) && ( value === null ) )
							{
								ParentA[ key ] = null;
							}
							else if ( ( ParentA[ key ] === null ) && ( value !== null ) )
							{
								ParentA[ key ] = {};
								update_children( ParentA[ key ], value );
							}
							else if ( ( ParentA[ key ] !== null ) && ( value !== null ) )
							{
								update_children( ParentA[ key ], value );
							}
						}
						else
						{
							// Overwrite values.
							ParentA[ key ] = JSON.parse( JSON.stringify( value ) );
						}
					}
				} );
		}

		update_children( new_object, Updates );
		return new_object;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: Schema,
		Merge: Merge,
	};
};
