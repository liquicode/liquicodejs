"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '103',
	member_of: 'Object',
	name: 'Merge',
	type: 'function',
	returns: 'object',
	description: `
Merges the content of two objects and returns the composite result.

Similar to Clone, this function will remove any non-data fields (i.e. functions and symbols) from the objects.
`,
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
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function Merge
	 * @returns {object}
	 * @description
	 * 
Merges the content of two objects and returns the composite result.

Similar to Clone, this function will remove any non-data fields (i.e. functions and symbols) from the objects.

	 * @param {object} Original
	 * @param {object} [Updates]
	*/
	//-end-jsdoc-----------------------------------------------------------


	function Merge( Original, Updates )
	{
		Original = Liquicode.Types.Coerce( Original, true ).ToObject( {} );
		Updates = Liquicode.Types.Coerce( Updates, true ).ToObject( {} );

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
		_Schema: _Schema,
		Merge: Merge,
	};
};
