"use strict";


//---------------------------------------------------------------------
let Schema = {
	id: '110',
	member_of: 'Object',
	name: 'Traverse',
	type: 'function',
	returns: 'string',
	description: [
		'Traverses and calls a visitor callback function for each field in an object.',
		'This functions recurses through sub-objects and traverses the entire object.',
	],
	Parameters: {
		Root: {
			name: 'Root',
			type: 'object',
			required: true,
		},
		Visitor: {
			name: 'Visitor',
			type: 'function',
			required: true,
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function Traverse
	 * @returns {string}
	 * @description
	 * Traverses and calls a visitor callback function for each field in an object.
	 * This functions recurses through sub-objects and traverses the entire object.
	 * @param {object} Root
	 * @param {function} Visitor
	*/
	//-end-jsdoc-----------------------------------------------------------


	function Traverse( Root, Visitor )
	{
		Root = Liquicode.Core.ValidateField( Root, Schema.Parameters.Root );
		Visitor = Liquicode.Core.ValidateField( Visitor, Schema.Parameters.Visitor );

		//---------------------------------------------------------------------
		function traverse_recurse( Visitor, Parent, Name, Value, Path, Depth )
		{
			let info =
			{
				parent: Parent,
				name: Name,
				value: Value,
				path: Path,
				depth: Depth,
			};
			let result = Visitor( info );
			if ( typeof result !== 'undefined' ) { return result; }

			if ( typeof Value === 'object' )
			{
				if ( Value === null ) { return; }
				if ( Array.isArray( Value ) )
				{
					for ( let index = 0; index < Value.length; index++ )
					{
						result = traverse_recurse( Visitor, Value, index, Value[ index ], Path + `[${index}]`, Depth + 1 );
						if ( typeof result !== 'undefined' ) { return result; }
					}
				}
				else
				{
					let keys = Object.keys( Value );
					for ( let index = 0; index < keys.length; index++ )
					{
						let key = keys[ index ];
						result = traverse_recurse( Visitor, Value, key, Value[ key ], Path + `.${key}`, Depth + 1 );
						if ( typeof result !== 'undefined' ) { return result; }
					}
				}
			}

			return;
		}

		//---------------------------------------------------------------------
		return traverse_recurse( Visitor, null, '$', Root, '$', 0 );
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: Schema,
		Traverse: Traverse,
	};
};
