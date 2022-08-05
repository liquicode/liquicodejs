"use strict";


const LIB_FS = require( 'fs' );
const LIB_PATH = require( 'path' );


const SOURCE_FOLDER = LIB_PATH.resolve( __dirname, '..', 'src' );
const LQC = require( LIB_PATH.join( SOURCE_FOLDER, 'liquicode-node.js' ) );


//---------------------------------------------------------------------
LQC.File.Visit( SOURCE_FOLDER, '*.js', true,
	function ( Folder, Filename )
	{
		if ( !Filename ) { return; }
		if ( Filename.endsWith( '.Tests.js' ) ) { return; }

		//---------------------------------------------------------------------
		// Load the file.
		let path = LIB_PATH.join( Folder, Filename );
		console.log( path );

		//---------------------------------------------------------------------
		// Load the schema.
		let source = require( path );
		if ( typeof source !== 'function' ) 
		{
			let message = `File is not a Liquicode module [${path}].`;
			console.error( message );
			return;
		}
		let schema = source( LQC )._Schema;
		if ( !schema ) 
		{
			let message = `File has no schema [${path}].`;
			console.error( message );
			return;
		}

		//---------------------------------------------------------------------
		// Load the file content.
		let file_content = LIB_FS.readFileSync( path, 'utf8' );
		let file_lines = file_content.split( '\n' );

		//---------------------------------------------------------------------
		// Scan for the insertion point.
		let start_line = -1;
		let last_line = -1;
		for ( let index = 0; index < file_lines.length; index++ )
		{
			if ( start_line < 0 )
			{
				if ( file_lines[ index ].trimStart().startsWith( '//-start-jsdoc-' ) ) 
				{
					start_line = index;
				}
			}
			else
			{
				if ( file_lines[ index ].trimStart().startsWith( '//-end-jsdoc-' ) ) 
				{
					last_line = index;
					break;
				}
			}
		}
		if ( start_line < 0 ) 
		{
			let message = `Unable to find the insertion point in [${path}].`;
			console.error( message );
			return;
		}
		if ( last_line < 0 ) 
		{
			let message = `Unable to find the ending point in [${path}].`;
			console.log( message );
			return;
		}
		let line_prefix = '';
		{
			let ich = file_lines[ start_line ].indexOf( '//-start-jsdoc-' );
			line_prefix = file_lines[ start_line ].substring( 0, ich );
		}

		//---------------------------------------------------------------------
		// JSDoc formatting functions.
		function format_jsdoc_line( Text )
		{
			return line_prefix + ' * ' + Text + '\n';
		}
		function format_jsdoc_lines( TextLines )
		{
			let text = '';
			for ( let index = 0; index < TextLines.length; index++ )
			{
				text += format_jsdoc_line( TextLines[ index ] );
			}
			return text;
		}
		function format_jsdoc( Text )
		{
			if ( Array.isArray( Text ) ) { return format_jsdoc_lines( Text ); }
			else { return format_jsdoc_line( Text ); }
		}

		//---------------------------------------------------------------------
		// Generate the JSDoc tags.
		// - Starting Marker.
		let jsdoc = format_jsdoc( '/**' );
		// - Type
		if ( schema.type === 'function' )
		{
			jsdoc += format_jsdoc( '@function' );
		}
		// - Public
		jsdoc += format_jsdoc( '@public' );
		// - Name
		jsdoc += format_jsdoc( `@name ${schema.name}` );
		// - Returns
		if ( schema.returns )
		{
			let text = `@returns ${schema.returns}`;
			if ( schema.returns_description )
			{
				text += ` ${schema.returns_description}`;
			}
			jsdoc += format_jsdoc( text );
		}
		// - Description
		if ( schema.description )
		{
			jsdoc += format_jsdoc( `@description` );
			jsdoc += format_jsdoc( schema.description );
		}
		// - Params
		for ( let index = 0; index < schema.Parameters.length; index++ )
		{
			let parameter = schema.Parameters[ index ];
			jsdoc += format_jsdoc_line( `@param ${parameter.name} {${parameter.type}} ${parameter.name}` );
			if ( parameter.description )
			{
				jsdoc += format_jsdoc( parameter.description );
			}
		}

		// - Closing Marker.
		jsdoc += format_jsdoc_line( '*/' );
		// - Remove ending newline.
		if ( jsdoc.endsWith( '\n' ) ) { jsdoc = jsdoc.substring( 0, jsdoc.length - 1 ); }



		//---------------------------------------------------------------------
		// Replace the file content.
		let jsdoc_lines = jsdoc.split( '\n' );
		file_lines.splice( start_line + 1, ( last_line - ( start_line + 1 ) ), ...jsdoc_lines );

		//---------------------------------------------------------------------
		// Rewrite the source file.
		file_content = file_lines.join( '\n' );


		// Return.
		return;
	} );