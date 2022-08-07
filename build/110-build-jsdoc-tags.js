"use strict";


const LIB_FS = require( 'fs' );
const LIB_PATH = require( 'path' );


const SOURCE_FOLDER = LIB_PATH.resolve( __dirname, '..', 'src' );
const LQC = require( LIB_PATH.join( SOURCE_FOLDER, 'liquicode-node.js' ) );


//---------------------------------------------------------------------
// A helper object to keep track of all the bits.
function NewJSDocLines()
{
	let jsdoc = {

		//---------------------------------------------------------------------
		jsdoc_lines: [],

		//---------------------------------------------------------------------
		Add: function ( Text, LinePrefix = '' )
		{
			if ( Array.isArray( Text ) )
			{
				let lines = Text.map( item => LinePrefix + item );
				this.jsdoc_lines.push( ...lines );
			}
			else
			{
				this.jsdoc_lines.push( LinePrefix + Text );
			}
			return;
		},

		//---------------------------------------------------------------------
		filename: '',
		file_content: '',
		file_lines: [],
		jsdoc_first_index: -1,
		jsdoc_last_index: -1,
		block_prefix: '',

		//---------------------------------------------------------------------
		Load: function ( Filename )
		{
			this.filename = Filename;
			this.file_content = LIB_FS.readFileSync( this.filename, 'utf8' );
			this.file_lines = this.file_content.split( '\n' );
			this.jsdoc_first_index = -1;
			this.jsdoc_last_index = -1;
			for ( let index = 0; index < this.file_lines.length; index++ )
			{
				if ( this.jsdoc_first_index < 0 )
				{
					if ( this.file_lines[ index ].trimStart().startsWith( '//-start-jsdoc-' ) ) 
					{
						this.jsdoc_first_index = index;
						let ich = this.file_lines[ index ].indexOf( '//-start-jsdoc-' );
						this.block_prefix = this.file_lines[ index ].substring( 0, ich );
					}
				}
				else
				{
					if ( this.file_lines[ index ].trimStart().startsWith( '//-end-jsdoc-' ) ) 
					{
						this.jsdoc_last_index = index;
						break;
					}
				}
			}
			return;
		},

		//---------------------------------------------------------------------
		Update: function ()
		{
			// Package the jsdoc text.
			{
				this.jsdoc_lines = this.jsdoc_lines.map( item => `${this.block_prefix} * ${item}` );
				this.jsdoc_lines.unshift( `${this.block_prefix}/**` );
				this.jsdoc_lines.push( `${this.block_prefix}*/` );
			}

			// Replace the file content.
			{
				let start_index = this.jsdoc_first_index + 1;
				let count_lines = this.jsdoc_last_index - ( this.jsdoc_first_index + 1 );
				this.file_lines.splice( start_index, count_lines, ...this.jsdoc_lines );
			}

			//---------------------------------------------------------------------
			// Rewrite the source file.
			this.file_content = this.file_lines.join( '\n' );
			LIB_FS.writeFileSync( this.filename, this.file_content );
		}

	};
	return jsdoc;
}


//---------------------------------------------------------------------
// Process a single file by inserting jsdoc tags.
function ProcessSchema( Schema )
{
	let jsdoc = NewJSDocLines();

	//---------------------------------------------------------------------
	// Generate the JSDoc tags.

	// - Public
	jsdoc.Add( `@public` );

	// - Is Async
	if ( Schema.is_async )
	{
		jsdoc.Add( `@async` );
	}

	// - Type and Name
	if ( Schema.type === 'function' )
	{
		jsdoc.Add( `@function ${Schema.name}` );
	}
	else if ( Schema.type === 'class' )
	{
		jsdoc.Add( `@class ${Schema.name}` );
	}
	else if ( Schema.type === 'module' )
	{
		jsdoc.Add( `@module ${Schema.name}` );
	}
	else if ( Schema.type === 'namespace' )
	{
		jsdoc.Add( `@namespace ${Schema.name}` );
	}
	else
	{
		jsdoc.Add( `@name ${Schema.name}` );
	}

	// - Member Of
	if ( Schema.member_of )
	{
		// jsdoc.Add( `@memberof ${Schema.member_of}` );

		//NOTE: Adding the 'memberof' tag for functions spurgs out the VSCode intellisense.
		// Probably need to define the root 'Liquicode' object to fix it. :/
	}

	// - Returns
	if ( Schema.returns )
	{
		jsdoc.Add( `@returns {${Schema.returns}}` );
		if ( Schema.returns_description )
		{
			jsdoc.Add( Schema.returns_description );
		}
	}

	// - Summary
	if ( Schema.summary )
	{
		jsdoc.Add( `@summary ${Schema.summary}` );
	}

	// - Description
	if ( Schema.description )
	{
		jsdoc.Add( `@description` );
		jsdoc.Add( Schema.description );
	}

	// - Params
	if ( Schema.Parameters )
	{
		let parameter_keys = Object.keys( Schema.Parameters );
		for ( let index = 0; index < parameter_keys.length; index++ )
		{
			let parameter = Schema.Parameters[ parameter_keys[ index ] ];
			let text = `@param {${parameter.type}}`;
			if ( parameter.required )
			{
				text += ` ${parameter.name}`;
			}
			else
			{
				if ( parameter.default )
				{
					text += ` [${parameter.name}=${JSON.stringify( parameter.default )}]`;
				}
				else
				{
					text += ` [${parameter.name}]`;
				}
			}
			jsdoc.Add( text );
			if ( parameter.description )
			{
				jsdoc.Add( parameter.description );
			}
		}
	}

	// - Todo
	if ( Schema.todo )
	{
		jsdoc.Add( Schema.todo, '@todo ' );
	}

	//---------------------------------------------------------------------
	// Load the file content.
	let source_filename = LIB_PATH.join( SOURCE_FOLDER, Schema.source_filename );
	jsdoc.Load( source_filename );

	//---------------------------------------------------------------------
	// Validate the insertion point.
	if ( jsdoc.jsdoc_first_index < 0 ) 
	{
		let message = `Unable to find the insertion point in [${source_filename}].`;
		// console.error( message );
		throw new Error( message );
	}
	if ( jsdoc.jsdoc_last_index < 0 ) 
	{
		let message = `Unable to find the ending point in [${source_filename}].`;
		// console.error( message );
		throw new Error( message );
	}

	//---------------------------------------------------------------------
	// Update the source file.
	jsdoc.Update();

	// Return.
	return;
}


//---------------------------------------------------------------------
// Load the schema document.
let SchemaDoc = null;
{
	let filename = LIB_PATH.resolve( __dirname, '..', 'docs' );
	filename = LIB_PATH.join( filename, 'liquicodejs.schema.json' );
	SchemaDoc = JSON.parse( LIB_FS.readFileSync( filename, 'utf8' ) );
	console.log( `Loaded [${SchemaDoc.schema.length}] schemas from file [${filename}].` );
}


//---------------------------------------------------------------------
// Process the schemas.
for ( let schema_index = 0; schema_index < SchemaDoc.schema.length; schema_index++ )
{
	let schema = SchemaDoc.schema[ schema_index ];
	ProcessSchema( schema );
}

