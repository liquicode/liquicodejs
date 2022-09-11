"use strict";

const LIB_FS = require( 'fs' );
const LIB_PATH = require( 'path' );

const BASE_FOLDER = LIB_PATH.resolve( __dirname, '..', '..', '..' );
const SOURCE_FOLDER = LIB_PATH.join( BASE_FOLDER, 'src' );

const LQC = require( LIB_PATH.join( SOURCE_FOLDER, 'liquicode-node.js' ) );


let ImageNumber = 0;
const TARGET_IMAGES_FOLDER = LIB_PATH.join( BASE_FOLDER, 'docs', 'components', 'Slimey', 'images' );


function FileCopier( Folder, Filename )
{
	if ( !Filename ) { return; }
	ImageNumber++;
	let image_number = ( '' + ImageNumber ).padStart( 3, '0' );
	let source_path = LIB_PATH.join( Folder, Filename );
	let target_path = LIB_PATH.join( TARGET_IMAGES_FOLDER, `slimey-${image_number}.png` );
	try
	{
		LIB_FS.copyFileSync( source_path, target_path );
		console.log( target_path + ' ... OK' );
	}
	catch ( error )
	{
		console.log( source_path + ' ... ERROR' );
		console.error( error.message );
	}
	return;
}

if ( !LIB_FS.existsSync( TARGET_IMAGES_FOLDER ) ) { LIB_FS.mkdirSync( LIB_TARGET_IMAGES_FOLDER ); }
LQC.System.VisitFiles( LIB_PATH.resolve( __dirname, 'slimeyarmsdown' ), '*.png', false, FileCopier );
LQC.System.VisitFiles( LIB_PATH.resolve( __dirname, 'slimeyleftarmup' ), '*.png', false, FileCopier );
LQC.System.VisitFiles( LIB_PATH.resolve( __dirname, 'slimeyrightarmup' ), '*.png', false, FileCopier );
LQC.System.VisitFiles( LIB_PATH.resolve( __dirname, 'slimeyarmsup' ), '*.png', false, FileCopier );
LQC.System.VisitFiles( LIB_PATH.resolve( __dirname, 'slimeyarmsallthewayup' ), '*.png', false, FileCopier );


console.log( `Processed ${ImageNumber} image files.` );

