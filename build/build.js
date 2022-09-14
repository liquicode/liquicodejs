"use strict";


const LIB_FS = require( 'fs' );
const LIB_PATH = require( 'path' );

const Liquicode = require( LIB_PATH.resolve( __dirname, '..', 'src', 'liquicode-node.js' ) );
const Builder = require( './builder.js' );

const TIMESTAMP = ( new Date() ).toISOString();
const AWS_BUCKET = 'liquicodejs.liquicode.com';
const AWS_PROFILE = 'admin';


//=====================================================================
//=====================================================================
//
//		Build Startup
//
//=====================================================================
//=====================================================================


// Initial Heading.
Builder.LogHeading( `Build starting ...` );
Builder.LogMuted( `Running in: ${process.cwd()}` );


// Load the project's Package file.
let package_folder = process.cwd();
let package_filename = LIB_PATH.join( package_folder, 'package.json' );
let PACKAGE = require( package_filename );
Builder.LogMuted( `Loaded package.json` );
Builder.LogMuted( `  - name = ${PACKAGE.name}` );
Builder.LogMuted( `  - version = ${PACKAGE.version}` );


//=====================================================================
//=====================================================================
//
//		Run Tests and Update Docs Externals
//
//=====================================================================
//=====================================================================


Builder.LogHeading( `Run Tests and Update Docs Externals ...` );
{
	//---------------------------------------------------------------------
	// Run Tests
	//---------------------------------------------------------------------

	let source_folder = LIB_PATH.join( package_folder, 'src' );

	let testing_output = Builder.Execute( `npx mocha -u bdd ${source_folder}/*/*.Tests.js --no-timeout --slow 1000000` );

	//---------------------------------------------------------------------
	// Update Docs Externals
	//---------------------------------------------------------------------

	let docs_external_folder = LIB_PATH.join( package_folder, 'docs', 'external' );

	Builder.LogMuted( `Writing [testing-output.md] ...` );
	{
		let to = LIB_PATH.join( docs_external_folder, 'testing-output.md' );
		LIB_FS.writeFileSync( to, `
# Testing Output

- Project: ${PACKAGE.name}
- Timestamp: ${TIMESTAMP}

~~~
${testing_output}
~~~
` );
	}

	Builder.LogMuted( `Copying [readme.md] ...` );
	{
		let from = LIB_PATH.join( package_folder, 'readme.md' );
		let to = LIB_PATH.join( docs_external_folder, 'readme.md' );
		LIB_FS.copyFileSync( from, to );
	}

	Builder.LogMuted( `Copying [LICENSE] ...` );
	{
		let from = LIB_PATH.join( package_folder, 'LICENSE' );
		let to = LIB_PATH.join( docs_external_folder, 'LICENSE' );
		LIB_FS.copyFileSync( from, to );
	}

	Builder.LogMuted( `Copying [VERSION] ...` );
	{
		let from = LIB_PATH.join( package_folder, 'VERSION' );
		let to = LIB_PATH.join( docs_external_folder, 'VERSION' );
		LIB_FS.copyFileSync( from, to );
	}

	Builder.LogMuted( `Setting [TIMESTAMP] ...` );
	{
		let to = LIB_PATH.join( docs_external_folder, 'TIMESTAMP' );
		LIB_FS.writeFileSync( to, TIMESTAMP );
	}
}


//=====================================================================
//=====================================================================
//
//		Build Distributables
//
//=====================================================================
//=====================================================================


Builder.LogHeading( `Build Distributables ...` );
{
	//---------------------------------------------------------------------
	// Build webpack distributables.
	//---------------------------------------------------------------------

	let webpack_filename = LIB_PATH.join( __dirname, 'webpack.config.js' );

	Builder.LogHeading( `Building es5 ...` );
	Builder.Execute( `npx webpack-cli --config ${webpack_filename}`, { WEBPACK_ENV: 'es5' } );

	Builder.LogHeading( `Building es6 ...` );
	Builder.Execute( `npx webpack-cli --config ${webpack_filename}`, { WEBPACK_ENV: 'es6' } );

	Builder.LogHeading( `Building node-min ...` );
	Builder.Execute( `npx webpack-cli --config ${webpack_filename}`, { WEBPACK_ENV: 'node-min' } );

	Builder.LogHeading( `Building node ...` );
	Builder.Execute( `npx webpack-cli --config ${webpack_filename}`, { WEBPACK_ENV: 'node' } );

	//---------------------------------------------------------------------
	// Copy artifacts to the dist folder.
	//---------------------------------------------------------------------

	let dist_folder = LIB_PATH.join( package_folder, 'dist' );

	Builder.LogMuted( `Copying [LICENSE] ...` );
	{
		let from = LIB_PATH.join( package_folder, 'LICENSE' );
		let to = LIB_PATH.join( dist_folder, 'LICENSE' );
		LIB_FS.copyFileSync( from, to );
	}

	Builder.LogMuted( `Copying [VERSION] ...` );
	{
		let from = LIB_PATH.join( package_folder, 'VERSION' );
		let to = LIB_PATH.join( dist_folder, 'VERSION' );
		LIB_FS.copyFileSync( from, to );
	}

	Builder.LogMuted( `Setting [TIMESTAMP] ...` );
	{
		let to = LIB_PATH.join( dist_folder, 'TIMESTAMP' );
		LIB_FS.writeFileSync( to, TIMESTAMP );
	}
}


//=====================================================================
//=====================================================================
//
//		Publish Current Version
//
//=====================================================================
//=====================================================================


Builder.LogHeading( `Publish Current Version ...` );

// Publish current version to git.
Builder.Git_FinalizeAndMarkVersion( PACKAGE.version );

// Publish current version to npm.
Builder.Npm_Publish();

// Publish current version docs to S3.
Builder.Aws_S3_Sync( LIB_PATH.join( package_folder, 'docs' ), AWS_BUCKET, AWS_PROFILE );


//=====================================================================
//=====================================================================
//
//		Start New Version
//
//=====================================================================
//=====================================================================

Builder.LogHeading( `Incrementing Package Version Number` );
let previous_version = PACKAGE.version;
let semver = Builder.StringToSemver( PACKAGE.version );
semver.patch++;
PACKAGE.version = Builder.SemverToString( semver );

// Update 'package.json'
LIB_FS.writeFileSync( LIB_PATH.join( package_folder, 'package.json' ), JSON.stringify( PACKAGE, null, '\t' ) );

// Update 'VERSION'
LIB_FS.writeFileSync( LIB_PATH.join( package_folder, 'VERSION' ), PACKAGE.version );

// Update 'readme.md'
const semver_regex = /^v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/gm;
Builder.ReplaceTextInFile( LIB_PATH.join( package_folder, 'readme.md' ), semver_regexp, `(v${PACKAGE.version})` );

Builder.Git_PrepareNewVersion( PACKAGE.version );


Builder.LogHeading( `Published version [${previous_version}], you are now at version [${PACKAGE.version}].` );

