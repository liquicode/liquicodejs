"use strict";


const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LQC = require( LIB_PATH.resolve( __dirname, '../liquicode-node.js' ) );


//---------------------------------------------------------------------
describe( `010) Types.Coerce Tests`, function ()
{

	//---------------------------------------------------------------------
	describe( 'ToBoolean',
		async function ()
		{

			//---------------------------------------------------------------------
			it( `should coerce undefined to boolean`, function ()
			{
				LIB_ASSERT.ok( LQC.Types.Coerce().ToBoolean() === false );
				return;
			} );

			//---------------------------------------------------------------------
			it( `should coerce null to boolean`, function ()
			{
				LIB_ASSERT.ok( LQC.Types.Coerce( null ).ToBoolean() === false );
				return;
			} );

			//---------------------------------------------------------------------
			it( `should coerce boolean to boolean`, function ()
			{
				LIB_ASSERT.ok( LQC.Types.Coerce( false ).ToBoolean() === false );
				LIB_ASSERT.ok( LQC.Types.Coerce( true ).ToBoolean() === true );
				return;
			} );

			//---------------------------------------------------------------------
			it( `should coerce number to boolean`, function ()
			{
				LIB_ASSERT.ok( LQC.Types.Coerce( 0 ).ToBoolean() === false );
				LIB_ASSERT.ok( LQC.Types.Coerce( -1 ).ToBoolean() === true );
				LIB_ASSERT.ok( LQC.Types.Coerce( 1 ).ToBoolean() === true );
				LIB_ASSERT.ok( LQC.Types.Coerce( 3.14 ).ToBoolean() === true );
				return;
			} );

			//---------------------------------------------------------------------
			it( `should coerce string to boolean`, function ()
			{
				LIB_ASSERT.ok( LQC.Types.Coerce( '' ).ToBoolean() === false );
				LIB_ASSERT.ok( LQC.Types.Coerce( '1' ).ToBoolean() === true );
				LIB_ASSERT.ok( LQC.Types.Coerce( 'foo' ).ToBoolean() === true );
				return;
			} );

			//---------------------------------------------------------------------
			it( `should coerce special-case strings to boolean`, function ()
			{
				LIB_ASSERT.ok( LQC.Types.Coerce( 'false' ).ToBoolean() === false );
				LIB_ASSERT.ok( LQC.Types.Coerce( 'true' ).ToBoolean() === true );
				LIB_ASSERT.ok( LQC.Types.Coerce( '0' ).ToBoolean() === false );
				return;
			} );

			//---------------------------------------------------------------------
			it( `should coerce object to boolean`, function ()
			{
				LIB_ASSERT.ok( LQC.Types.Coerce( {} ).ToBoolean() === true );
				LIB_ASSERT.ok( LQC.Types.Coerce( { foo: 'bar' } ).ToBoolean() === true );
				return;
			} );

		} );

	//---------------------------------------------------------------------
	return;
} );
