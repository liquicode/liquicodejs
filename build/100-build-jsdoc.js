"use strict";


const LIB_FS = require( 'fs' );
const LIB_PATH = require( 'path' );


const SOURCE_FOLDER = LIB_PATH.resolve( __dirname, '..', 'src' );
const LQC = require( LIB_PATH.join( SOURCE_FOLDER, 'liquicode-node.js' ) );


//---------------------------------------------------------------------
// A helper object to keep track of all the bits.
function NewJSDoc()
{
	let jsdoc = {

		//---------------------------------------------------------------------
		filename: '',
		file_content: '',
		file_lines: [],
		jsdoc_first_index: -1,
		jsdoc_last_index: -1,
		block_prefix: '',
		jsdoc_lines: [],

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
function process_file( Filename )
{

	//---------------------------------------------------------------------
	// Load the schema.
	let source = require( Filename );
	if ( typeof source !== 'function' ) 
	{
		let message = `File is not a Liquicode module [${Filename}].`;
		// console.error( message );
		throw new Error( message );
	}
	let schema = source( LQC )._Schema;
	if ( !schema ) 
	{
		let message = `File has no schema [${Filename}].`;
		// console.error( message );
		throw new Error( message );
	}

	//---------------------------------------------------------------------
	// Load the file content.
	let jsdoc = NewJSDoc();
	jsdoc.Load( Filename );

	//---------------------------------------------------------------------
	// Validate the insertion point.
	if ( jsdoc.jsdoc_first_index < 0 ) 
	{
		let message = `Unable to find the insertion point in [${Filename}].`;
		// console.error( message );
		throw new Error( message );
	}
	if ( jsdoc.jsdoc_last_index < 0 ) 
	{
		let message = `Unable to find the ending point in [${Filename}].`;
		// console.error( message );
		throw new Error( message );
	}

	//---------------------------------------------------------------------
	// Generate the JSDoc tags.

	// - Public
	jsdoc.Add( `@public` );

	// - Is Async
	if ( schema.is_async )
	{
		jsdoc.Add( `@async` );
	}

	// - Type and Name
	if ( schema.type === 'function' )
	{
		jsdoc.Add( `@function ${schema.name}` );
	}
	else if ( schema.type === 'class' )
	{
		jsdoc.Add( `@class ${schema.name}` );
	}
	else if ( schema.type === 'module' )
	{
		jsdoc.Add( `@module ${schema.name}` );
	}
	else if ( schema.type === 'namespace' )
	{
		jsdoc.Add( `@namespace ${schema.name}` );
	}
	else
	{
		jsdoc.Add( `@name ${schema.name}` );
	}

	// - Member Of
	if ( schema.member_of )
	{
		// jsdoc.Add( `@memberof ${schema.member_of}` );

		//NOTE: Adding the 'memberof' tag for functions spurgs out the VSCode intellisense.
		// Probably need to define the root 'Liquicode' object to fix it. :/
	}

	// - Returns
	if ( schema.returns )
	{
		jsdoc.Add( `@returns {${schema.returns}}` );
		if ( schema.returns_description )
		{
			jsdoc.Add( schema.returns_description );
		}
	}

	// - Summary
	if ( schema.summary )
	{
		jsdoc.Add( `@summary ${schema.summary}` );
	}

	// - Description
	if ( schema.description )
	{
		jsdoc.Add( `@description` );
		jsdoc.Add( schema.description );
	}

	// - Params
	if ( schema.Parameters )
	{
		let parameter_keys = Object.keys( schema.Parameters );
		for ( let index = 0; index < parameter_keys.length; index++ )
		{
			let parameter = schema.Parameters[ parameter_keys[ index ] ];
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
	if ( schema.todo )
	{
		jsdoc.Add( schema.todo, '@todo ' );
	}

	//---------------------------------------------------------------------
	// Update the source file.
	jsdoc.Update();

	// Return.
	return;
}


//---------------------------------------------------------------------
let count_total_files = 0;
let count_files_with_errors = 0;
let count_files_processed = 0;
LQC.File.Visit( SOURCE_FOLDER, '*.js', true,
	function ( Folder, Filename )
	{
		if ( !Filename ) { return; }
		if ( Filename.endsWith( '.Tests.js' ) ) { return; }
		let file_path = LIB_PATH.join( Folder, Filename );
		try
		{
			count_total_files++;
			process_file( file_path );
			count_files_processed++;
			console.log( file_path + ' ... OK' );
		}
		catch ( error )
		{
			console.log( file_path + ' ... ERROR' );
			console.error( error.message );
			count_files_with_errors++;
		}
		return;
	} );


console.log( `Total Files        : ${count_total_files}` );
console.log( `Files with Errors  : ${count_files_with_errors}` );
console.log( `Files Processed    : ${count_files_processed}` );

