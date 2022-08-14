"use strict";


const LIB_FS = require( 'fs' );
const LIB_PATH = require( 'path' );

const LIB_MARKED = require( 'marked' );
const LIB_PUG = require( 'pug' );

const BASE_FOLDER = LIB_PATH.resolve( __dirname, '..' );
const SOURCE_FOLDER = LIB_PATH.join( BASE_FOLDER, 'src' );
const SCHEMA_FOLDER = LIB_PATH.join( BASE_FOLDER, 'docs', 'schema' );

const LQC = require( LIB_PATH.join( SOURCE_FOLDER, 'liquicode-node.js' ) );

const VERSION = LIB_FS.readFileSync( LIB_PATH.join( BASE_FOLDER, 'VERSION' ), 'utf8' );


//---------------------------------------------------------------------
function get_function_parameter_list( Schema )
{
	let signature = '';
	let parameter_keys = Object.keys( Schema.Parameters );
	for ( let index = 0; index < parameter_keys.length; index++ )
	{
		let parameter = Schema.Parameters[ parameter_keys[ index ] ];
		if ( signature ) { signature += ', '; }
		signature += parameter.name;
	}
	return signature;
}


//---------------------------------------------------------------------
function generate_schema_markdown( Schema )
{
	let content_lines = [];
	function add_content( Text )
	{
		if ( Array.isArray( Text ) ) { content_lines.push( ...Text ); }
		else { content_lines.push( Text ); }
	}

	switch ( Schema.type )
	{
		case 'namespace':
		case 'module':
		case 'class':
			add_content( '' );
			add_content( '<br>' );
			add_content( '<br>' );
			add_content( '' );
			add_content( `## ***${Schema.name}***: ${Schema.summary}` );
			add_content( '' );
			if ( Schema.description && Schema.description.length )
			{
				add_content( '<details>' );
				add_content( '<summary>' );
				add_content( '<strong>' );
				add_content( `${Schema.name} Details` );
				add_content( '</strong>' );
				add_content( '</summary>' );
				add_content( '' );
				add_content( Schema.description );
				add_content( '' );
				add_content( '</details>' );
			}
			add_content( '' );
			add_content( '<br>' );
			add_content( '' );
			add_content( `### ***${Schema.name}*** Functions` );
			add_content( '' );
			break;

		case 'function':
			add_content( '' );
			add_content( '<br>' );
			add_content( '' );
			add_content( '<details>' );
			add_content( '<summary>' );
			add_content( '<strong>' );
			add_content( `${Schema.name}( ${get_function_parameter_list( Schema )} )` );
			add_content( '</strong>' );
			if ( Schema.summary && Schema.summary.length )
			{
				add_content( '<small>' );
				add_content( `- ${Schema.summary}` );
				add_content( '</small>' );
			}
			add_content( '</summary>' );
			add_content( '' );
			add_content( `> ### ${Schema.member_of}.***${Schema.name}***( ${get_function_parameter_list( Schema )} )` );
			add_content( '> ' );
			add_content( '> ' + Schema.summary );
			add_content( '> ' );
			if ( Schema.returns )
			{
				if ( Schema.returns )
				{
					if ( Schema.returns_description )
					{
						add_content( '> **Returns**: `' + Schema.returns + '` - ' + Schema.returns_description );
					}
					else
					{
						add_content( '> **Returns**: `' + Schema.returns + '`' );
					}
					add_content( '' );
				}
			}
			if ( Schema.Parameters && Object.keys( Schema.Parameters ).length )
			{
				add_content( '***Parameters***' );
				add_content( '' );
				add_content( '|  Name              |  Type   | Required  |  Default          |  Description  ' );
				add_content( '|--------------------|---------|-----------|-------------------|---------------' );
				let parameter_keys = Object.keys( Schema.Parameters );
				for ( let index = 0; index < parameter_keys.length; index++ )
				{
					let parameter = Schema.Parameters[ parameter_keys[ index ] ];
					let line = '| ' + parameter.name;
					line = line.padEnd( 20 );
					line += ' | `' + parameter.type + '`';
					line = line.padEnd( 30 );
					if ( parameter.required ) { line += ' | required'; }
					else { line += ' | -'; }
					line = line.padEnd( 42 );
					if ( parameter.default ) { line += ' | ' + JSON.stringify( parameter.default ); }
					else { line += ' | '; }
					line = line.padEnd( 62 );
					if ( Array.isArray( parameter.description ) )
					{
						line += ' | ' + parameter.description.join( ' ' );
					}
					else if ( typeof parameter.description === 'string' )
					{
						line += ' | ' + parameter.description;
					}
					else
					{
						line += ' | ';
					}
					add_content( line );
				}
				add_content( '' );
			}
			if ( Schema.description && Schema.description.length )
			{
				add_content( '***Description***' );
				add_content( '' );
				add_content( Schema.description );
				add_content( '' );
			}
			if ( Schema.examples && Schema.examples.length )
			{
				add_content( '***Examples***' );
				add_content( '' );
				add_content( Schema.examples );
				add_content( '' );
			}
			if ( Schema.todo && Schema.todo.length )
			{
				add_content( '***TODO***' );
				add_content( '' );
				if ( Array.isArray( Schema.todo ) )
				{
					for ( let index = 0; index < Schema.todo.length; index++ )
					{
						add_content( '- ' + Schema.todo[ index ] );
					}
				}
				else
				{
					add_content( '- ' + Schema.todo );
				}
				add_content( '' );
			}
			add_content( '' );
			add_content( '---' );
			add_content( '</details>' );
			add_content( '' );
			break;
	}

	return content_lines.join( `\n` );
}


//=====================================================================
//=====================================================================
//
//		Entry Point
//
//=====================================================================
//=====================================================================

/*
Reads source files and loads any _Schema objects found.
Schema are collected and converted to various formats.
The output of this script will be these files containing Schema data for the project in various formats.
- liquicodejs.schema.js
- liquicodejs.schema.json
- liquicodejs.schema.md
- liquicodejs.schema.html
*/
console.log( `Build Schema Docs:` );

//---------------------------------------------------------------------
let schema_json_content =
{
	version: VERSION,
	Schemas: []
};
let schema_markdown_content = '';
let schema_html_content = '';
let count_total_files = 0;
let count_files_with_errors = 0;
let count_files_processed = 0;
LQC.System.VisitFiles( SOURCE_FOLDER, '*.js', true,
	function ( Folder, Filename )
	{
		if ( !Filename ) { return; }
		if ( Filename.startsWith( '~' ) ) { return; }			// Ignore hidden files.
		if ( Filename.startsWith( '_' ) ) { return; }			// Ignore private files.
		if ( Filename.endsWith( '.Tests.js' ) ) { return; }		// Ignore testing files.
		let file_path = LIB_PATH.join( Folder, Filename );
		try
		{
			// Load the schema.
			let source = require( file_path );
			if ( typeof source !== 'function' ) { throw new Error( `File is not a Liquicode module [${file_path}].` ); }
			let schema = source( LQC )._Schema;
			if ( !schema ) { throw new Error( `File has no schema [${file_path}].` ); }
			count_total_files++;

			// Process the schema
			schema.source_filename = file_path.substring( SOURCE_FOLDER.length + 1 );

			// Save Json Content
			schema_json_content.Schemas.push( schema );

			// Save Markdown Content
			let schema_markdown = generate_schema_markdown( schema );
			schema_markdown_content += schema_markdown;

			// Save Html Content
			let schema_html = LIB_MARKED.parse( schema_markdown );
			schema_html_content += schema_html;

			// Update count and report.
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

// Report number of files processed.
console.log( `Total Files        : ${count_total_files}` );
console.log( `Files with Errors  : ${count_files_with_errors}` );
console.log( `Files Processed    : ${count_files_processed}` );

// Save the Json and JS Schema documents.
{
	let json = JSON.stringify( schema_json_content, null, '    ' );
	let filename = LIB_PATH.join( SCHEMA_FOLDER, 'liquicodejs.schema.json' );
	LIB_FS.writeFileSync( filename, json );
	console.log( `Wrote schema file [${filename}].` );

	json = `exports = ${json};`;
	filename = LIB_PATH.join( SCHEMA_FOLDER, 'liquicodejs.schema.js' );
	LIB_FS.writeFileSync( filename, json );
	console.log( `Wrote schema file [${filename}].` );
}

// Save the Markdown Schema document.
{
	let filename = LIB_PATH.join( SCHEMA_FOLDER, 'liquicodejs.schema.md' );
	LIB_FS.writeFileSync( filename, schema_markdown_content );
	console.log( `Wrote schema file [${filename}].` );
}

// Save the Html Schema document.
{
	let filename = LIB_PATH.join( SCHEMA_FOLDER, 'liquicodejs.schema.html' );
	LIB_FS.writeFileSync( filename, schema_html_content );
	console.log( `Wrote schema file [${filename}].` );
}

console.log( `Build complete.` );
