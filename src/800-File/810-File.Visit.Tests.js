"use strict";


const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LQC = require( LIB_PATH.resolve( __dirname, '../liquicode-node.js' ) );
const TEST_DATA_FOLDER = LIB_PATH.resolve( __dirname, '../../tests/_test-data/folders' );


//---------------------------------------------------------------------
describe( `810) File.Visit Tests`, function ()
{

	//---------------------------------------------------------------------
	it( `should visit all elements of a folder`, function ()
	{
		let count = LQC.File.Visit( TEST_DATA_FOLDER );
		LIB_ASSERT.strictEqual( count, 3 );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should visit all elements of a folder recursively`, function ()
	{
		let count = LQC.File.Visit( TEST_DATA_FOLDER, '', true );
		LIB_ASSERT.strictEqual( count, 9 );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should visit only files when a pattern is supplied`, function ()
	{
		let count = LQC.File.Visit( TEST_DATA_FOLDER, '*.txt', true );
		LIB_ASSERT.strictEqual( count, 6 );
		return;
	} );

	//---------------------------------------------------------------------
	return;
} );
