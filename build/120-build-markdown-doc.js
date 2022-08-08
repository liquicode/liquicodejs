"use strict";


const LIB_FS = require( 'fs' );
const LIB_PATH = require( 'path' );


const BASE_FOLDER = LIB_PATH.resolve( __dirname, '..' );
const SOURCE_FOLDER = LIB_PATH.join( BASE_FOLDER, 'src' );


//---------------------------------------------------------------------
function function_signature( Schema )
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
function ProcessSchema( Schema )
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
			add_content( `# ***${Schema.name}***: ${Schema.summary}` );
			add_content( '' );
			if ( Schema.description )
			{
				add_content( '***Description***' );
				add_content( '' );
				add_content( Schema.description );
				add_content( '' );
			}
			break;

		case 'function':
			add_content( '' );
			add_content( '<br>' );
			add_content( '' );
			add_content( '<details>' );
			add_content( '<summary>' );
			add_content( '<strong>' );
			add_content( `${Schema.member_of}.${Schema.name}( ${function_signature( Schema )} ) - ${Schema.summary}` );
			add_content( '</strong>' );
			add_content( '</summary>' );
			add_content( '' );
			add_content( `>## Function: ${Schema.name}( ${function_signature( Schema )} )` );
			add_content( '> ' );
			add_content( '> ' + Schema.summary );
			if ( Schema.returns )
			{
				add_content( '> ' );
				add_content( '> **Returns**: ***' + Schema.returns + '*** - ' + Schema.returns_description );
			}
			add_content( '' );
			if ( Schema.Parameters && Schema.Parameters.length )
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
					line += ' | ' + parameter.type;
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
			if ( Schema.description )
			{
				add_content( '***Description***' );
				add_content( '' );
				add_content( Schema.description );
				add_content( '' );
			}
			if ( Schema.examples )
			{
				add_content( '***Examples***' );
				add_content( '' );
				add_content( Schema.examples );
				add_content( '' );
			}
			if ( Schema.todo )
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
			add_content( '' );
			add_content( '</details>' );
			add_content( '' );
			break;
	}

	return content_lines.join( `\n` );
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
let markdown_content = '';
for ( let schema_index = 0; schema_index < SchemaDoc.Schemas.length; schema_index++ )
{
	let schema = SchemaDoc.Schemas[ schema_index ];
	markdown_content += ProcessSchema( schema );
}


//---------------------------------------------------------------------
// Update the markdown file.
{
	let filename = LIB_PATH.resolve( __dirname, '..', 'docs' );
	filename = LIB_PATH.join( filename, 'liquicodejs.md' );
	LIB_FS.writeFileSync( filename, markdown_content );
	console.log( `Updated markdown file [${filename}].` );
}

console.log( `Build complete.` );
