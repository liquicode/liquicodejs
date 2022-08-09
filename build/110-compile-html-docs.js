"use strict";

/*
npx pug-cli docs\\liquicodejs.pug --pretty --obj docs\\liquicodejs.schema.json
*/

const LIB_FS = require( 'fs' );
const LIB_PATH = require( 'path' );

const LIB_PUG = require( 'pug' );

const BASE_FOLDER = LIB_PATH.resolve( __dirname, '..' );
const SOURCE_FOLDER = LIB_PATH.join( BASE_FOLDER, 'src' );
const DOCS_FOLDER = LIB_PATH.join( BASE_FOLDER, 'docs' );
const SCHEMA_FOLDER = LIB_PATH.join( BASE_FOLDER, 'docs', 'schema' );
const TEMPLATE_FOLDER = LIB_PATH.join( BASE_FOLDER, 'docs', 'templates' );

const LQC = require( LIB_PATH.join( SOURCE_FOLDER, 'liquicode-node.js' ) );

//---------------------------------------------------------------------
console.log( `Compile Html Docs:` );

// Load the Schema Document
let schema_filename = LIB_PATH.join( SCHEMA_FOLDER, 'liquicodejs.schema.json' );
let schema_document = JSON.parse( LIB_FS.readFileSync( schema_filename, 'utf-8' ) );
// Load the PUG Template
let template_filename = LIB_PATH.join( TEMPLATE_FOLDER, 'liquicodejs.pug' );
// Render the PUG Template
schema_document.pretty = true;
let html_content = LIB_PUG.renderFile( template_filename, schema_document );
html_content = LQC.Text.ReplaceText( html_content, '<code>', '<code class="language-markdown">' );
// Save the Html file.
let html_filename = LIB_PATH.join( DOCS_FOLDER, 'liquicodejs.html' );
LIB_FS.writeFileSync( html_filename, html_content );
// Report.
console.log( `Generated html file [${html_filename}].` );

console.log( `Compilation complete.` );
