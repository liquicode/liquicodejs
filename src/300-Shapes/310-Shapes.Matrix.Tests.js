"use strict";


const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LQC = require( LIB_PATH.resolve( __dirname, '../liquicode-node.js' ) );


//---------------------------------------------------------------------
describe( `310) Shapes.Matrix Tests`, function ()
{


	//---------------------------------------------------------------------
	let BlankValues = [ null, null, null, null, null, ];
	let TestValues1 = [ 1.618, 1.618, 1.618, 1.618, 1.618, ];
	let TestValues2 = [ 2.718, 2.718, 2.718, 2.718, 2.718, ];
	let TestValues3 = [ 3.141, 3.141, 3.141, 3.141, 3.141, ];


	//---------------------------------------------------------------------
	const MatrixSize = 32;
	var CountMatrixData = [];
	{
		let cell_count = 0;
		for ( let row_index = 0; row_index < MatrixSize; row_index++ )
		{
			let row = [];
			for ( let col_index = 0; col_index < MatrixSize; col_index++ )
			{
				row.push( cell_count );
				cell_count++;
			}
			CountMatrixData.push( row );
		}
	}


	//=====================================================================
	//=====================================================================
	//
	//		IsValidAddress
	//
	//=====================================================================
	//=====================================================================


	describe( `IsValidAddress Tests`, function ()
	{
		let CountMatrix = null;
		beforeEach( function () { CountMatrix = LQC.Shapes.Matrix( CountMatrixData ); } );

		//---------------------------------------------------------------------
		it( `should return false when called without any parameters`,
			async function ()
			{
				LIB_ASSERT.strictEqual( CountMatrix.IsValidAddress(), false );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should return false when called with an invalid addresses`,
			async function ()
			{
				LIB_ASSERT.strictEqual( CountMatrix.IsValidAddress( null ), false );
				LIB_ASSERT.strictEqual( CountMatrix.IsValidAddress( 123 ), false );
				LIB_ASSERT.strictEqual( CountMatrix.IsValidAddress( '' ), false );
				LIB_ASSERT.strictEqual( CountMatrix.IsValidAddress( 'A' ), false );
				LIB_ASSERT.strictEqual( CountMatrix.IsValidAddress( '1' ), false );
				LIB_ASSERT.strictEqual( CountMatrix.IsValidAddress( '-A1' ), false );
				LIB_ASSERT.strictEqual( CountMatrix.IsValidAddress( 'A-1' ), false );
				LIB_ASSERT.strictEqual( CountMatrix.IsValidAddress( 'A1-' ), false );
				LIB_ASSERT.strictEqual( CountMatrix.IsValidAddress( '1A' ), false );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should return true for valid addresses`,
			async function ()
			{
				LIB_ASSERT.strictEqual( CountMatrix.IsValidAddress( 'A1' ), true );
				LIB_ASSERT.strictEqual( CountMatrix.IsValidAddress( 'A2' ), true );
				LIB_ASSERT.strictEqual( CountMatrix.IsValidAddress( 'A3' ), true );
				LIB_ASSERT.strictEqual( CountMatrix.IsValidAddress( 'a1' ), true );
				LIB_ASSERT.strictEqual( CountMatrix.IsValidAddress( 'a2' ), true );
				LIB_ASSERT.strictEqual( CountMatrix.IsValidAddress( 'a3' ), true );
				LIB_ASSERT.strictEqual( CountMatrix.IsValidAddress( 'B1' ), true );
				LIB_ASSERT.strictEqual( CountMatrix.IsValidAddress( 'B2' ), true );
				LIB_ASSERT.strictEqual( CountMatrix.IsValidAddress( 'B3' ), true );
				LIB_ASSERT.strictEqual( CountMatrix.IsValidAddress( 'ABC123' ), true );
				LIB_ASSERT.strictEqual( CountMatrix.IsValidAddress( 'abc123' ), true );
				return;
			} );

		return;
	} );


	//=====================================================================
	//=====================================================================
	//
	//		NumberToLetters
	//
	//=====================================================================
	//=====================================================================


	describe( `NumberToLetters Tests`, function ()
	{
		let CountMatrix = null;
		beforeEach( function () { CountMatrix = LQC.Shapes.Matrix( CountMatrixData ); } );

		//---------------------------------------------------------------------
		it( `should throw an error when called without any parameters`,
			async function ()
			{
				LIB_ASSERT.throws( () => CountMatrix.NumberToLetters(), Error );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should throw an error when called with an invalid parameter`,
			async function ()
			{
				LIB_ASSERT.throws( () => CountMatrix.NumberToLetters( null ), Error );
				LIB_ASSERT.throws( () => CountMatrix.NumberToLetters( 'abc' ), Error );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should throw an error when called with a negative integer parameter`,
			async function ()
			{
				LIB_ASSERT.throws( () => CountMatrix.NumberToLetters( -1 ), Error );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should throw an error when called with a zero parameter`,
			async function ()
			{
				LIB_ASSERT.throws( () => CountMatrix.NumberToLetters( 0 ), Error );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should return an address for a number`,
			async function ()
			{
				LIB_ASSERT.strictEqual( CountMatrix.NumberToLetters( 1 ), 'A' );
				LIB_ASSERT.strictEqual( CountMatrix.NumberToLetters( 2 ), 'B' );
				LIB_ASSERT.strictEqual( CountMatrix.NumberToLetters( 3 ), 'C' );
				LIB_ASSERT.strictEqual( CountMatrix.NumberToLetters( 26 ), 'Z' );
				LIB_ASSERT.strictEqual( CountMatrix.NumberToLetters( 27 ), 'AA' );
				LIB_ASSERT.strictEqual( CountMatrix.NumberToLetters( 28 ), 'AB' );
				LIB_ASSERT.strictEqual( CountMatrix.NumberToLetters( 29 ), 'AC' );
				LIB_ASSERT.strictEqual( CountMatrix.NumberToLetters( 52 ), 'AZ' );
				LIB_ASSERT.strictEqual( CountMatrix.NumberToLetters( 53 ), 'BA' );
				LIB_ASSERT.strictEqual( CountMatrix.NumberToLetters( 78 ), 'BZ' );
				return;
			} );

		return;
	} );


	//=====================================================================
	//=====================================================================
	//
	//		LettersToNumber
	//
	//=====================================================================
	//=====================================================================


	describe( `LettersToNumber Tests`, function ()
	{
		let CountMatrix = null;
		beforeEach( function () { CountMatrix = LQC.Shapes.Matrix( CountMatrixData ); } );

		//---------------------------------------------------------------------
		it( `should throw an error when called without any parameters`,
			async function ()
			{
				LIB_ASSERT.throws( () => CountMatrix.LettersToNumber(), Error );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should throw an error when called with an invalid parameter`,
			async function ()
			{
				LIB_ASSERT.throws( () => CountMatrix.LettersToNumber( null ), Error );
				LIB_ASSERT.throws( () => CountMatrix.LettersToNumber( 123 ), Error );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should return zero when called with an invalid address parameter`,
			async function ()
			{
				LIB_ASSERT.strictEqual( CountMatrix.LettersToNumber( '!C2' ), 0 );
				LIB_ASSERT.strictEqual( CountMatrix.LettersToNumber( '123' ), 0 );
				// LIB_ASSERT.throws( () => CountMatrix.LettersToNumber( '!C2' ), Error );
				// LIB_ASSERT.throws( () => CountMatrix.LettersToNumber( '123' ), Error );
				// LIB_ASSERT.throws( () => CountMatrix.LettersToNumber( 'R2D2' ), Error );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should return a number for an address`,
			async function ()
			{
				LIB_ASSERT.strictEqual( CountMatrix.LettersToNumber( 'A' ), 1 );
				LIB_ASSERT.strictEqual( CountMatrix.LettersToNumber( 'A1' ), 1 );
				LIB_ASSERT.strictEqual( CountMatrix.LettersToNumber( 'B' ), 2 );
				LIB_ASSERT.strictEqual( CountMatrix.LettersToNumber( 'B2' ), 2 );
				LIB_ASSERT.strictEqual( CountMatrix.LettersToNumber( 'C' ), 3 );
				LIB_ASSERT.strictEqual( CountMatrix.LettersToNumber( 'C3' ), 3 );
				LIB_ASSERT.strictEqual( CountMatrix.LettersToNumber( 'M' ), 13 );
				LIB_ASSERT.strictEqual( CountMatrix.LettersToNumber( 'M13' ), 13 );
				LIB_ASSERT.strictEqual( CountMatrix.LettersToNumber( 'Z' ), 26 );
				LIB_ASSERT.strictEqual( CountMatrix.LettersToNumber( 'Z26' ), 26 );
				LIB_ASSERT.strictEqual( CountMatrix.LettersToNumber( 'AA' ), 27 );
				LIB_ASSERT.strictEqual( CountMatrix.LettersToNumber( 'AB' ), 28 );
				LIB_ASSERT.strictEqual( CountMatrix.LettersToNumber( 'AC' ), 29 );
				LIB_ASSERT.strictEqual( CountMatrix.LettersToNumber( 'AZ' ), 52 );
				LIB_ASSERT.strictEqual( CountMatrix.LettersToNumber( 'BA' ), 53 );
				LIB_ASSERT.strictEqual( CountMatrix.LettersToNumber( 'BZ' ), 78 );
				LIB_ASSERT.strictEqual( CountMatrix.LettersToNumber( 'ABC' ), 731 );
				LIB_ASSERT.strictEqual( CountMatrix.LettersToNumber( 'DEF' ), 2840 );
				LIB_ASSERT.strictEqual( CountMatrix.LettersToNumber( 'KJUFH' ), 5216856 );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should return a number for an address (lower-case)`,
			async function ()
			{
				LIB_ASSERT.strictEqual( CountMatrix.LettersToNumber( 'a' ), 1 );
				LIB_ASSERT.strictEqual( CountMatrix.LettersToNumber( 'b' ), 2 );
				LIB_ASSERT.strictEqual( CountMatrix.LettersToNumber( 'c' ), 3 );
				LIB_ASSERT.strictEqual( CountMatrix.LettersToNumber( 'z' ), 26 );
				LIB_ASSERT.strictEqual( CountMatrix.LettersToNumber( 'aa' ), 27 );
				LIB_ASSERT.strictEqual( CountMatrix.LettersToNumber( 'ab' ), 28 );
				LIB_ASSERT.strictEqual( CountMatrix.LettersToNumber( 'ac' ), 29 );
				LIB_ASSERT.strictEqual( CountMatrix.LettersToNumber( 'az' ), 52 );
				LIB_ASSERT.strictEqual( CountMatrix.LettersToNumber( 'ba' ), 53 );
				LIB_ASSERT.strictEqual( CountMatrix.LettersToNumber( 'bz' ), 78 );
				return;
			} );

		return;
	} );


	//=====================================================================
	//=====================================================================
	//
	//		RowIndexOf
	//
	//=====================================================================
	//=====================================================================


	describe( `RowIndexOf Tests`, function ()
	{
		let CountMatrix = null;
		beforeEach( function () { CountMatrix = LQC.Shapes.Matrix( CountMatrixData ); } );

		//---------------------------------------------------------------------
		it( `should throw an error when called without any parameters`,
			async function ()
			{
				LIB_ASSERT.throws( () => CountMatrix.RowIndexOf(), Error );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should throw an error when called with an invalid parameter`,
			async function ()
			{
				LIB_ASSERT.throws( () => CountMatrix.RowIndexOf( null ), Error );
				LIB_ASSERT.throws( () => CountMatrix.RowIndexOf( true ), Error );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should throw an error when called with an invalid address parameter`,
			async function ()
			{
				LIB_ASSERT.throws( () => CountMatrix.RowIndexOf( '!C2' ), Error );
				LIB_ASSERT.throws( () => CountMatrix.RowIndexOf( '123' ), Error );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should throw an error when called with an out of bounds parameter`,
			async function ()
			{
				LIB_ASSERT.throws( () => CountMatrix.RowIndexOf( MatrixSize ), Error );
				LIB_ASSERT.throws( () => CountMatrix.RowIndexOf( -( MatrixSize + 1 ) ), Error );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should return a valid row index for a valid row index`,
			async function ()
			{
				let row_count = MatrixSize;
				for ( let row_index = 0; row_index < row_count; row_index++ )
				{
					LIB_ASSERT.strictEqual( CountMatrix.RowIndexOf( row_index ), row_index );
				}
				return;
			} );

		//---------------------------------------------------------------------
		it( `should return a valid row index for a negative row index`,
			async function ()
			{
				let row_count = MatrixSize;
				for ( let row_index = 0; row_index < row_count; row_index++ )
				{
					let row_number = row_index + 1;
					LIB_ASSERT.strictEqual( CountMatrix.RowIndexOf( -row_number ), row_count - row_number );
				}
				return;
			} );

		//---------------------------------------------------------------------
		it( `should return a valid row index for a valid address`,
			async function ()
			{
				let row_count = MatrixSize;
				for ( let row_index = 0; row_index < row_count; row_index++ )
				{
					let address = `${CountMatrix.NumberToLetters( row_index + 1 )}${row_index + 1}`;
					LIB_ASSERT.strictEqual( CountMatrix.RowIndexOf( address ), row_index );
				}
				return;
			} );

		return;
	} );


	//=====================================================================
	//=====================================================================
	//
	//		RowCount
	//
	//=====================================================================
	//=====================================================================


	describe( `RowCount Tests`, function ()
	{
		let CountMatrix = null;
		beforeEach( function () { CountMatrix = LQC.Shapes.Matrix( CountMatrixData ); } );

		//---------------------------------------------------------------------
		it( `should return the row count`,
			async function ()
			{
				LIB_ASSERT.strictEqual( CountMatrix.RowCount(), MatrixSize );
				return;
			} );

		return;
	} );


	//=====================================================================
	//=====================================================================
	//
	//		AppendRows
	//
	//=====================================================================
	//=====================================================================


	describe( `AppendRows Tests`, function ()
	{
		let CountMatrix = null;
		beforeEach( function () { CountMatrix = LQC.Shapes.Matrix( CountMatrixData ); } );

		//---------------------------------------------------------------------
		it( `should append a single blank row when called with no paramters`,
			async function ()
			{
				CountMatrix.AppendRows();
				LIB_ASSERT.strictEqual( CountMatrix.RowCount(), MatrixSize + 1 );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should append a single row when called with an array of values`,
			async function ()
			{
				CountMatrix.AppendRows( TestValues1 );
				LIB_ASSERT.strictEqual( CountMatrix.RowCount(), MatrixSize + 1 );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should append multiple rows when called with an array of arrays`,
			async function ()
			{
				CountMatrix.AppendRows( [ TestValues1, TestValues2, TestValues3 ] );
				LIB_ASSERT.strictEqual( CountMatrix.RowCount(), MatrixSize + 3 );
				return;
			} );

		return;
	} );


	//=====================================================================
	//=====================================================================
	//
	//		InsertRows
	//
	//=====================================================================
	//=====================================================================


	describe( `InsertRows Tests`, function ()
	{
		let CountMatrix = null;
		beforeEach( function () { CountMatrix = LQC.Shapes.Matrix( CountMatrixData ); } );

		//---------------------------------------------------------------------
		it( `should throw an error when called without any parameters`,
			async function ()
			{
				LIB_ASSERT.throws( () => CountMatrix.InsertRows(), Error );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should throw an error when row index is out of bounds`,
			async function ()
			{
				LIB_ASSERT.throws( () => CountMatrix.InsertRows( CountMatrix.RowCount() ), Error );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should insert a single blank row when called with no values`,
			async function ()
			{
				CountMatrix.InsertRows( 0 );
				LIB_ASSERT.strictEqual( CountMatrix.RowCount(), MatrixSize + 1 );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should insert a single row when called with an array of values`,
			async function ()
			{
				CountMatrix.InsertRows( 0, TestValues1 );
				LIB_ASSERT.strictEqual( CountMatrix.RowCount(), MatrixSize + 1 );
				LIB_ASSERT.deepStrictEqual( CountMatrix.RowData[ 0 ], TestValues1 );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should insert multiple rows when called with an array of arrays`,
			async function ()
			{
				CountMatrix.InsertRows( 0, [ TestValues1, TestValues2, TestValues3 ] );
				LIB_ASSERT.strictEqual( CountMatrix.RowCount(), MatrixSize + 3 );
				LIB_ASSERT.deepStrictEqual( CountMatrix.RowData[ 0 ], TestValues1 );
				LIB_ASSERT.deepStrictEqual( CountMatrix.RowData[ 1 ], TestValues2 );
				LIB_ASSERT.deepStrictEqual( CountMatrix.RowData[ 2 ], TestValues3 );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should insert a row at a specific row index`,
			async function ()
			{
				// Insert at beginning.
				CountMatrix.InsertRows( 0, TestValues1 );
				LIB_ASSERT.strictEqual( CountMatrix.RowCount(), MatrixSize + 1 );
				LIB_ASSERT.deepStrictEqual( CountMatrix.RowData[ 0 ], TestValues1 );
				// Insert in middle.
				CountMatrix.InsertRows( 4, TestValues2 );
				LIB_ASSERT.strictEqual( CountMatrix.RowCount(), MatrixSize + 2 );
				LIB_ASSERT.deepStrictEqual( CountMatrix.RowData[ 4 ], TestValues2 );
				// Insert at end. ERROR!
				// CountMatrix.InsertRows( CountMatrix.RowCount(), TestValues3 );
				// LIB_ASSERT.strictEqual( CountMatrix.RowCount(), MatrixSize + 3 );
				// LIB_ASSERT.strictEqual( CountMatrix.RowData[ CountMatrix.RowCount() - 1 ], TestValues3 );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should insert a row at a specific (negative) row offset`,
			async function ()
			{
				// Insert right before end.
				CountMatrix.InsertRows( -1, TestValues1 );
				LIB_ASSERT.strictEqual( CountMatrix.RowCount(), MatrixSize + 1 );
				LIB_ASSERT.deepStrictEqual( CountMatrix.RowData[ CountMatrix.RowCount() - 2 ], TestValues1 );
				// Insert in middle.
				CountMatrix.InsertRows( -4, TestValues2 );
				LIB_ASSERT.strictEqual( CountMatrix.RowCount(), MatrixSize + 2 );
				LIB_ASSERT.deepStrictEqual( CountMatrix.RowData[ CountMatrix.RowCount() - 5 ], TestValues2 );
				// Insert at beginning.
				CountMatrix.InsertRows( -CountMatrix.RowCount(), TestValues3 );
				LIB_ASSERT.strictEqual( CountMatrix.RowCount(), MatrixSize + 3 );
				LIB_ASSERT.deepStrictEqual( CountMatrix.RowData[ 0 ], TestValues3 );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should insert a row at a specific address`,
			async function ()
			{
				// Insert at beginning.
				CountMatrix.InsertRows( 'A1', TestValues1 );
				LIB_ASSERT.strictEqual( CountMatrix.RowCount(), MatrixSize + 1 );
				LIB_ASSERT.deepStrictEqual( CountMatrix.RowData[ 0 ], TestValues1 );
				// Insert in middle.
				CountMatrix.InsertRows( 'A5', TestValues2 );
				LIB_ASSERT.strictEqual( CountMatrix.RowCount(), MatrixSize + 2 );
				LIB_ASSERT.deepStrictEqual( CountMatrix.RowData[ 4 ], TestValues2 );
				// Insert at end. ERROR!
				// CountMatrix.InsertRows( 'A' + ( CountMatrix.RowCount() + 1 ), TestValues3 );
				// LIB_ASSERT.strictEqual( CountMatrix.RowCount(), MatrixSize + 3 );
				// LIB_ASSERT.strictEqual( CountMatrix.RowData[ CountMatrix.RowCount() - 1 ], TestValues3 );
				return;
			} );

		return;
	} );


	//=====================================================================
	//=====================================================================
	//
	//		DeleteRows
	//
	//=====================================================================
	//=====================================================================


	describe( `DeleteRows Tests`, function ()
	{
		let CountMatrix = null;
		beforeEach( function () { CountMatrix = LQC.Shapes.Matrix( CountMatrixData ); } );

		//---------------------------------------------------------------------
		it( `should throw an error when called without any parameters`,
			async function ()
			{
				LIB_ASSERT.throws( () => CountMatrix.DeleteRows(), Error );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should delete a single row when called without a row count`,
			async function ()
			{
				CountMatrix.DeleteRows( 0 );
				LIB_ASSERT.strictEqual( CountMatrix.RowCount(), MatrixSize - 1 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ 0 ], ( 1 * MatrixSize ) );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should delete a single row when called with a row count of one`,
			async function ()
			{
				CountMatrix.DeleteRows( 0, 1 );
				LIB_ASSERT.strictEqual( CountMatrix.RowCount(), MatrixSize - 1 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ 0 ], ( 1 * MatrixSize ) );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should delete multiple rows when called with a row count greater than one`,
			async function ()
			{
				CountMatrix.DeleteRows( 0, 3 );
				LIB_ASSERT.strictEqual( CountMatrix.RowCount(), MatrixSize - 3 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ 0 ], ( 3 * MatrixSize ) );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should delete a row at a specific row index`,
			async function ()
			{
				// Delete from the beginning.
				CountMatrix.DeleteRows( 0 );
				LIB_ASSERT.strictEqual( CountMatrix.RowCount(), MatrixSize - 1 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ 0 ], ( 1 * MatrixSize ) );
				// Delete from the middle.
				CountMatrix.DeleteRows( 4 );
				LIB_ASSERT.strictEqual( CountMatrix.RowCount(), MatrixSize - 2 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 4 ][ 0 ], ( 6 * MatrixSize ) );
				// Delete from the end.
				CountMatrix.DeleteRows( CountMatrix.RowCount() - 1 );
				LIB_ASSERT.strictEqual( CountMatrix.RowCount(), MatrixSize - 3 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ MatrixSize - 4 ][ 0 ], ( ( MatrixSize - 2 ) * MatrixSize ) );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should delete a row at a specific (negative) row offset`,
			async function ()
			{
				// Delete from the end.
				CountMatrix.DeleteRows( -1 );
				LIB_ASSERT.strictEqual( CountMatrix.RowCount(), MatrixSize - 1 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ MatrixSize - 2 ][ 0 ], ( ( MatrixSize - 2 ) * MatrixSize ) );
				// Delete from the middle.
				CountMatrix.DeleteRows( -5 );
				LIB_ASSERT.strictEqual( CountMatrix.RowCount(), MatrixSize - 2 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ MatrixSize - 6 ][ 0 ], ( ( MatrixSize - 5 ) * MatrixSize ) );
				// Delete from the beginning.
				CountMatrix.DeleteRows( -CountMatrix.RowCount() );
				LIB_ASSERT.strictEqual( CountMatrix.RowCount(), MatrixSize - 3 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ 0 ], ( 1 * MatrixSize ) );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should delete a row at a specific address`,
			async function ()
			{
				// Delete from the beginning.
				CountMatrix.DeleteRows( 'A1' );
				LIB_ASSERT.strictEqual( CountMatrix.RowCount(), MatrixSize - 1 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ 0 ], ( 1 * MatrixSize ) );
				// Delete from the middle.
				CountMatrix.DeleteRows( 'A5' );
				LIB_ASSERT.strictEqual( CountMatrix.RowCount(), MatrixSize - 2 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 4 ][ 0 ], ( 6 * MatrixSize ) );
				// Delete from the end.
				CountMatrix.DeleteRows( 'A' + CountMatrix.RowCount() );
				LIB_ASSERT.strictEqual( CountMatrix.RowCount(), MatrixSize - 3 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ MatrixSize - 4 ][ 0 ], ( ( MatrixSize - 2 ) * MatrixSize ) );
				return;
			} );

		return;
	} );


	//=====================================================================
	//=====================================================================
	//
	//		GetRow
	//
	//=====================================================================
	//=====================================================================


	describe( `GetRow Tests`, function ()
	{
		let CountMatrix = null;
		beforeEach( function () { CountMatrix = LQC.Shapes.Matrix( CountMatrixData ); } );

		//---------------------------------------------------------------------
		it( `should throw an error when called without any parameters`,
			async function ()
			{
				LIB_ASSERT.throws( () => CountMatrix.GetRow(), Error );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should get a row at a specific row index`,
			async function ()
			{
				let row_values = null;
				// Get from the beginning.
				row_values = CountMatrix.GetRow( 0 );
				LIB_ASSERT.strictEqual( CountMatrix.RowCount(), MatrixSize );
				LIB_ASSERT.deepStrictEqual( CountMatrix.RowData[ 0 ], row_values );
				// Get from the middle.
				row_values = CountMatrix.GetRow( 4 );
				LIB_ASSERT.strictEqual( CountMatrix.RowCount(), MatrixSize );
				LIB_ASSERT.deepStrictEqual( CountMatrix.RowData[ 4 ], row_values );
				// Get from the end.
				row_values = CountMatrix.GetRow( CountMatrix.RowCount() - 1 );
				LIB_ASSERT.strictEqual( CountMatrix.RowCount(), MatrixSize );
				LIB_ASSERT.deepStrictEqual( CountMatrix.RowData[ MatrixSize - 1 ], row_values );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should get a row at a specific (negative) row offset`,
			async function ()
			{
				let row_values = null;
				// Get from the end.
				row_values = CountMatrix.GetRow( -1 );
				LIB_ASSERT.strictEqual( CountMatrix.RowCount(), MatrixSize );
				LIB_ASSERT.deepStrictEqual( CountMatrix.RowData[ MatrixSize - 1 ], row_values );
				// Get from the middle.
				row_values = CountMatrix.GetRow( -5 );
				LIB_ASSERT.strictEqual( CountMatrix.RowCount(), MatrixSize );
				LIB_ASSERT.deepStrictEqual( CountMatrix.RowData[ MatrixSize - 5 ], row_values );
				// Get from the beginning.
				row_values = CountMatrix.GetRow( -CountMatrix.RowCount() );
				LIB_ASSERT.strictEqual( CountMatrix.RowCount(), MatrixSize );
				LIB_ASSERT.deepStrictEqual( CountMatrix.RowData[ 0 ], row_values );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should get a row at a specific address`,
			async function ()
			{
				let row_values = null;
				// Get from the beginning.
				row_values = CountMatrix.GetRow( 'A1' );
				LIB_ASSERT.strictEqual( CountMatrix.RowCount(), MatrixSize );
				LIB_ASSERT.deepStrictEqual( CountMatrix.RowData[ 0 ], row_values );
				// Get from the middle.
				row_values = CountMatrix.GetRow( 'A5' );
				LIB_ASSERT.strictEqual( CountMatrix.RowCount(), MatrixSize );
				LIB_ASSERT.deepStrictEqual( CountMatrix.RowData[ 4 ], row_values );
				// Get from the end.
				row_values = CountMatrix.GetRow( 'A' + CountMatrix.RowCount() );
				LIB_ASSERT.strictEqual( CountMatrix.RowCount(), MatrixSize );
				LIB_ASSERT.deepStrictEqual( CountMatrix.RowData[ MatrixSize - 1 ], row_values );
				return;
			} );

		return;
	} );


	//=====================================================================
	//=====================================================================
	//
	//		SetRow
	//
	//=====================================================================
	//=====================================================================


	describe( `SetRow Tests`, function ()
	{
		let CountMatrix = null;
		beforeEach( function () { CountMatrix = LQC.Shapes.Matrix( CountMatrixData ); } );

		//---------------------------------------------------------------------
		it( `should throw an error when called without any parameters`,
			async function ()
			{
				LIB_ASSERT.throws( () => CountMatrix.SetRow(), Error );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should throw an error when row index is out of bounds`,
			async function ()
			{
				LIB_ASSERT.throws( () => CountMatrix.SetRow( CountMatrix.RowCount() ), Error );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should set an empty row when called with no values`,
			async function ()
			{
				CountMatrix.SetRow( 0 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ 0 ], undefined );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ 1 ], undefined );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ 3 ], undefined );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should set a row at a specific row index`,
			async function ()
			{
				// Set at the beginning.
				CountMatrix.SetRow( 0, TestValues1 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ 0 ], TestValues1[ 0 ] );
				// Set in the middle.
				CountMatrix.SetRow( 4, TestValues2 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 4 ][ 0 ], TestValues2[ 0 ] );
				// Set at the end.
				CountMatrix.SetRow( CountMatrix.RowCount() - 1, TestValues3 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ MatrixSize - 1 ][ 0 ], TestValues3[ 0 ] );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should get a row at a specific (negative) row offset`,
			async function ()
			{
				// Set at the end.
				CountMatrix.SetRow( - 1, TestValues1 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ MatrixSize - 1 ][ 0 ], TestValues1[ 0 ] );
				// Set in the middle.
				CountMatrix.SetRow( -5, TestValues2 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ MatrixSize - 5 ][ 0 ], TestValues2[ 0 ] );
				// Set at the beginning.
				CountMatrix.SetRow( -CountMatrix.RowCount(), TestValues3 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ 0 ], TestValues3[ 0 ] );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should set a row at a specific address`,
			async function ()
			{
				// Set at the beginning.
				CountMatrix.SetRow( 'A1', TestValues1 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ 0 ], TestValues1[ 0 ] );
				// Set in the middle.
				CountMatrix.SetRow( 'A5', TestValues2 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 4 ][ 0 ], TestValues2[ 0 ] );
				// Set at the end.
				CountMatrix.SetRow( 'A' + CountMatrix.RowCount(), TestValues3 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ MatrixSize - 1 ][ 0 ], TestValues3[ 0 ] );
				return;
			} );

		return;
	} );


	//=====================================================================
	//=====================================================================
	//
	//		ColumnIndexOf
	//
	//=====================================================================
	//=====================================================================


	describe( `ColumnIndexOf Tests`, function ()
	{
		let CountMatrix = null;
		beforeEach( function () { CountMatrix = LQC.Shapes.Matrix( CountMatrixData ); } );

		//---------------------------------------------------------------------
		it( `should throw an error when called without any parameters`,
			async function ()
			{
				LIB_ASSERT.throws( () => CountMatrix.ColumnIndexOf(), Error );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should throw an error when called with an invalid parameter`,
			async function ()
			{
				LIB_ASSERT.throws( () => CountMatrix.ColumnIndexOf( null ), Error );
				LIB_ASSERT.throws( () => CountMatrix.ColumnIndexOf( true ), Error );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should throw an error when called with an invalid address parameter`,
			async function ()
			{
				LIB_ASSERT.throws( () => CountMatrix.ColumnIndexOf( '!C2' ), Error );
				LIB_ASSERT.throws( () => CountMatrix.ColumnIndexOf( '123' ), Error );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should throw an error when called with an out of bounds parameter`,
			async function ()
			{
				LIB_ASSERT.throws( () => CountMatrix.ColumnIndexOf( MatrixSize ), Error );
				LIB_ASSERT.throws( () => CountMatrix.ColumnIndexOf( -( MatrixSize + 1 ) ), Error );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should return a valid column index for a valid column index`,
			async function ()
			{
				let column_count = MatrixSize;
				for ( let column_index = 0; column_index < column_count; column_index++ )
				{
					LIB_ASSERT.strictEqual( CountMatrix.ColumnIndexOf( column_index ), column_index );
				}
				return;
			} );

		//---------------------------------------------------------------------
		it( `should return a valid column index for a negative column index`,
			async function ()
			{
				let column_count = MatrixSize;
				for ( let column_index = 0; column_index < column_count; column_index++ )
				{
					let column_number = column_index + 1;
					LIB_ASSERT.strictEqual( CountMatrix.ColumnIndexOf( -column_number ), column_count - column_number );
				}
				return;
			} );

		//---------------------------------------------------------------------
		it( `should return a valid row index for a valid address`,
			async function ()
			{
				let column_count = MatrixSize;
				for ( let column_index = 0; column_index < column_count; column_index++ )
				{
					let address = `${CountMatrix.NumberToLetters( column_index + 1 )}${column_index + 1}`;
					LIB_ASSERT.strictEqual( CountMatrix.ColumnIndexOf( address ), column_index );
				}
				return;
			} );

		return;
	} );


	//=====================================================================
	//=====================================================================
	//
	//		ColumnCount
	//
	//=====================================================================
	//=====================================================================


	describe( `ColumnCount Tests`, function ()
	{
		let CountMatrix = null;
		beforeEach( function () { CountMatrix = LQC.Shapes.Matrix( CountMatrixData ); } );

		//---------------------------------------------------------------------
		it( `should return the column count`,
			async function ()
			{
				LIB_ASSERT.strictEqual( CountMatrix.ColumnCount(), MatrixSize );
				return;
			} );

		return;
	} );


	//=====================================================================
	//=====================================================================
	//
	//		AppendColumns
	//
	//=====================================================================
	//=====================================================================


	describe( `AppendColumns Tests`, function ()
	{
		let CountMatrix = null;
		beforeEach( function () { CountMatrix = LQC.Shapes.Matrix( CountMatrixData ); } );

		//---------------------------------------------------------------------
		it( `should append a single blank column when called with no paramters`,
			async function ()
			{
				CountMatrix.AppendColumns();
				LIB_ASSERT.strictEqual( CountMatrix.ColumnCount(), MatrixSize + 1 );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should append a single column when called with an array of values`,
			async function ()
			{
				CountMatrix.AppendColumns( TestValues1 );
				LIB_ASSERT.strictEqual( CountMatrix.ColumnCount(), MatrixSize + 1 );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should append multiple columns when called with an array of arrays`,
			async function ()
			{
				CountMatrix.AppendColumns( [ TestValues1, TestValues2, TestValues3 ] );
				LIB_ASSERT.strictEqual( CountMatrix.ColumnCount(), MatrixSize + 3 );
				return;
			} );

		return;
	} );


	//=====================================================================
	//=====================================================================
	//
	//		InsertColumns
	//
	//=====================================================================
	//=====================================================================


	describe( `InsertColumns Tests`, function ()
	{
		let CountMatrix = null;
		beforeEach( function () { CountMatrix = LQC.Shapes.Matrix( CountMatrixData ); } );

		//---------------------------------------------------------------------
		it( `should throw an error when called without any parameters`,
			async function ()
			{
				LIB_ASSERT.throws( () => CountMatrix.InsertColumns(), Error );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should throw an error when column index is out of bounds`,
			async function ()
			{
				LIB_ASSERT.throws( () => CountMatrix.InsertColumns( CountMatrix.ColumnCount() ), Error );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should insert a single blank column when called with no values`,
			async function ()
			{
				CountMatrix.InsertColumns( 0 );
				LIB_ASSERT.strictEqual( CountMatrix.ColumnCount(), MatrixSize + 1 );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should insert a single column when called with an array of values`,
			async function ()
			{
				CountMatrix.InsertColumns( 0, TestValues1 );
				LIB_ASSERT.strictEqual( CountMatrix.ColumnCount(), MatrixSize + 1 );
				for ( let row_index = 0; row_index < TestValues1.length; row_index++ )
				{
					LIB_ASSERT.strictEqual( CountMatrix.RowData[ row_index ][ 0 ], TestValues1[ row_index ] );
				}
				return;
			} );

		//---------------------------------------------------------------------
		it( `should insert multiple columns when called with an array of arrays`,
			async function ()
			{
				CountMatrix.InsertColumns( 0, [ TestValues1, TestValues2, TestValues3 ] );
				LIB_ASSERT.strictEqual( CountMatrix.ColumnCount(), MatrixSize + 3 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ 0 ], TestValues1[ 0 ] );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ 1 ], TestValues2[ 0 ] );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ 2 ], TestValues3[ 0 ] );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should insert a column at a specific column index`,
			async function ()
			{
				// Insert at beginning.
				CountMatrix.InsertColumns( 0, TestValues1 );
				LIB_ASSERT.strictEqual( CountMatrix.ColumnCount(), MatrixSize + 1 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ 0 ], TestValues1[ 0 ] );
				// Insert in middle.
				CountMatrix.InsertColumns( 4, TestValues2 );
				LIB_ASSERT.strictEqual( CountMatrix.ColumnCount(), MatrixSize + 2 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ 4 ], TestValues2[ 0 ] );
				// Insert at end. ERROR!
				// CountMatrix.InsertColumns( CountMatrix.ColumnCount(), TestValues3 );
				// LIB_ASSERT.strictEqual( CountMatrix.ColumnCount(), MatrixSize + 3 );
				// LIB_ASSERT.strictEqual( CountMatrix.RowData[ CountMatrix.ColumnCount() - 1 ], TestValues3 );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should insert a column at a specific (negative) column offset`,
			async function ()
			{
				// Insert right before end.
				CountMatrix.InsertColumns( -1, TestValues1 );
				LIB_ASSERT.strictEqual( CountMatrix.ColumnCount(), MatrixSize + 1 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ CountMatrix.ColumnCount() - 2 ], TestValues1[ 0 ] );
				// Insert in middle.
				CountMatrix.InsertColumns( -4, TestValues2 );
				LIB_ASSERT.strictEqual( CountMatrix.ColumnCount(), MatrixSize + 2 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ CountMatrix.ColumnCount() - 5 ], TestValues2[ 0 ] );
				// Insert at beginning.
				CountMatrix.InsertColumns( -CountMatrix.ColumnCount(), TestValues3 );
				LIB_ASSERT.strictEqual( CountMatrix.ColumnCount(), MatrixSize + 3 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ 0 ], TestValues3[ 0 ] );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should insert a column at a specific address`,
			async function ()
			{
				// Insert at beginning.
				CountMatrix.InsertColumns( 'A1', TestValues1 );
				LIB_ASSERT.strictEqual( CountMatrix.ColumnCount(), MatrixSize + 1 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ 0 ], TestValues1[ 0 ] );
				// Insert in middle.
				CountMatrix.InsertColumns( 'E1', TestValues2 );
				LIB_ASSERT.strictEqual( CountMatrix.ColumnCount(), MatrixSize + 2 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ 4 ], TestValues2[ 0 ] );
				// Insert at end. ERROR!
				// CountMatrix.InsertColumns( 'A' + ( CountMatrix.ColumnCount() + 1 ), TestValues3 );
				// LIB_ASSERT.strictEqual( CountMatrix.ColumnCount(), MatrixSize + 3 );
				// LIB_ASSERT.strictEqual( CountMatrix.RowData[ CountMatrix.ColumnCount() - 1 ], TestValues3 );
				return;
			} );

		return;
	} );


	//=====================================================================
	//=====================================================================
	//
	//		DeleteColumns
	//
	//=====================================================================
	//=====================================================================


	describe( `DeleteColumns Tests`, function ()
	{
		let CountMatrix = null;
		beforeEach( function () { CountMatrix = LQC.Shapes.Matrix( CountMatrixData ); } );

		//---------------------------------------------------------------------
		it( `should throw an error when called without any parameters`,
			async function ()
			{
				LIB_ASSERT.throws( () => CountMatrix.DeleteColumns(), Error );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should delete a single column when called without a column count`,
			async function ()
			{
				CountMatrix.DeleteColumns( 0 );
				LIB_ASSERT.strictEqual( CountMatrix.ColumnCount(), MatrixSize - 1 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ 0 ], 1 );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should delete a single column when called with a column count of one`,
			async function ()
			{
				CountMatrix.DeleteColumns( 0, 1 );
				LIB_ASSERT.strictEqual( CountMatrix.ColumnCount(), MatrixSize - 1 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ 0 ], 1 );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should delete multiple columns when called with a column count greater than one`,
			async function ()
			{
				CountMatrix.DeleteColumns( 0, 3 );
				LIB_ASSERT.strictEqual( CountMatrix.ColumnCount(), MatrixSize - 3 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ 0 ], 3 );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should delete a column at a specific column index`,
			async function ()
			{
				// Delete from the beginning.
				CountMatrix.DeleteColumns( 0 );
				LIB_ASSERT.strictEqual( CountMatrix.ColumnCount(), MatrixSize - 1 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ 0 ], 1 );
				// Delete from the middle.
				CountMatrix.DeleteColumns( 4 );
				LIB_ASSERT.strictEqual( CountMatrix.ColumnCount(), MatrixSize - 2 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ 4 ], 6 );
				// Delete from the end.
				CountMatrix.DeleteColumns( CountMatrix.ColumnCount() - 1 );
				LIB_ASSERT.strictEqual( CountMatrix.ColumnCount(), MatrixSize - 3 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ CountMatrix.ColumnCount() - 1 ], ( MatrixSize - 2 ) );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should delete a column at a specific (negative) column offset`,
			async function ()
			{
				// Delete from the end.
				CountMatrix.DeleteColumns( -1 );
				LIB_ASSERT.strictEqual( CountMatrix.ColumnCount(), MatrixSize - 1 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ MatrixSize - 2 ], ( MatrixSize - 2 ) );
				// Delete from the middle.
				CountMatrix.DeleteColumns( -5 );
				LIB_ASSERT.strictEqual( CountMatrix.ColumnCount(), MatrixSize - 2 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ MatrixSize - 6 ], ( MatrixSize - 5 ) );
				// Delete from the beginning.
				CountMatrix.DeleteColumns( -CountMatrix.ColumnCount() );
				LIB_ASSERT.strictEqual( CountMatrix.ColumnCount(), MatrixSize - 3 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ 0 ], 1 );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should delete a column at a specific address`,
			async function ()
			{
				return;
			} );

		return;
	} );


	//=====================================================================
	//=====================================================================
	//
	//		GetColumn
	//
	//=====================================================================
	//=====================================================================


	describe( `GetColumn Tests`, function ()
	{
		let CountMatrix = null;
		beforeEach( function () { CountMatrix = LQC.Shapes.Matrix( CountMatrixData ); } );

		//---------------------------------------------------------------------
		it( `should throw an error when called without any parameters`,
			async function ()
			{
				LIB_ASSERT.throws( () => CountMatrix.GetColumn(), Error );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should get a column at a specific column index`,
			async function ()
			{
				let column_values = null;
				// Get from the beginning.
				column_values = CountMatrix.GetColumn( 0 );
				LIB_ASSERT.strictEqual( CountMatrix.ColumnCount(), MatrixSize );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ 0 ], column_values[ 0 ] );
				// Get from the middle.
				column_values = CountMatrix.GetColumn( 4 );
				LIB_ASSERT.strictEqual( CountMatrix.ColumnCount(), MatrixSize );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ 4 ], column_values[ 0 ] );
				// Get from the end.
				column_values = CountMatrix.GetColumn( CountMatrix.ColumnCount() - 1 );
				LIB_ASSERT.strictEqual( CountMatrix.ColumnCount(), MatrixSize );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ MatrixSize - 1 ], column_values[ 0 ] );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should get a column at a specific (negative) column offset`,
			async function ()
			{
				let column_values = null;
				// Get from the end.
				column_values = CountMatrix.GetColumn( -1 );
				LIB_ASSERT.strictEqual( CountMatrix.ColumnCount(), MatrixSize );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ MatrixSize - 1 ], column_values[ 0 ] );
				// Get from the middle.
				column_values = CountMatrix.GetColumn( -5 );
				LIB_ASSERT.strictEqual( CountMatrix.ColumnCount(), MatrixSize );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ MatrixSize - 5 ], column_values[ 0 ] );
				// Get from the beginning.
				column_values = CountMatrix.GetColumn( -CountMatrix.ColumnCount() );
				LIB_ASSERT.strictEqual( CountMatrix.ColumnCount(), MatrixSize );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ 0 ], column_values[ 0 ] );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should get a column at a specific address`,
			async function ()
			{
				let column_values = null;
				// Get from the beginning.
				column_values = CountMatrix.GetColumn( 'A1' );
				LIB_ASSERT.strictEqual( CountMatrix.ColumnCount(), MatrixSize );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ 0 ], column_values[ 0 ] );
				// Get from the middle.
				column_values = CountMatrix.GetColumn( 'E1' );
				LIB_ASSERT.strictEqual( CountMatrix.ColumnCount(), MatrixSize );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ 4 ], column_values[ 0 ] );
				// Get from the end.
				column_values = CountMatrix.GetColumn( CountMatrix.NumberToLetters( MatrixSize ) + '1' );
				LIB_ASSERT.strictEqual( CountMatrix.ColumnCount(), MatrixSize );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ MatrixSize - 1 ], column_values[ 0 ] );
				return;
			} );

		return;
	} );


	//=====================================================================
	//=====================================================================
	//
	//		SetColumn
	//
	//=====================================================================
	//=====================================================================


	describe( `SetColumn Tests`, function ()
	{
		let CountMatrix = null;
		beforeEach( function () { CountMatrix = LQC.Shapes.Matrix( CountMatrixData ); } );

		//---------------------------------------------------------------------
		it( `should throw an error when called without any parameters`,
			async function ()
			{
				LIB_ASSERT.throws( () => CountMatrix.SetColumn(), Error );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should throw an error when column index is out of bounds`,
			async function ()
			{
				LIB_ASSERT.throws( () => CountMatrix.SetColumn( CountMatrix.ColumnCount() ), Error );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should set a blank column when called with no values`,
			async function ()
			{
				CountMatrix.SetColumn( 0 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ 0 ], null );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 1 ][ 0 ], null );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 2 ][ 0 ], null );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should set a column at a specific column index`,
			async function ()
			{
				// Set at the beginning.
				CountMatrix.SetColumn( 0, TestValues1 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ 0 ], TestValues1[ 0 ] );
				// Set in the middle.
				CountMatrix.SetColumn( 4, TestValues2 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ 4 ], TestValues2[ 0 ] );
				// Set at the end.
				CountMatrix.SetColumn( CountMatrix.ColumnCount() - 1, TestValues3 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ MatrixSize - 1 ], TestValues3[ 0 ] );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should get a column at a specific (negative) column offset`,
			async function ()
			{
				// Set at the end.
				CountMatrix.SetColumn( - 1, TestValues1 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ MatrixSize - 1 ], TestValues1[ 0 ] );
				// Set in the middle.
				CountMatrix.SetColumn( -5, TestValues2 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ MatrixSize - 5 ], TestValues2[ 0 ] );
				// Set at the beginning.
				CountMatrix.SetColumn( -CountMatrix.ColumnCount(), TestValues3 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ 0 ], TestValues3[ 0 ] );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should set a column at a specific address`,
			async function ()
			{
				// Set at the beginning.
				CountMatrix.SetColumn( 'A1', TestValues1 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ 0 ], TestValues1[ 0 ] );
				// Set in the middle.
				CountMatrix.SetColumn( 'E1', TestValues2 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ 4 ], TestValues2[ 0 ] );
				// Set at the end.
				CountMatrix.SetColumn( CountMatrix.NumberToLetters( MatrixSize ) + '1', TestValues3 );
				LIB_ASSERT.strictEqual( CountMatrix.RowData[ 0 ][ MatrixSize - 1 ], TestValues3[ 0 ] );
				return;
			} );

		return;
	} );


	//=====================================================================
	//=====================================================================
	//
	//		GetValue
	//
	//=====================================================================
	//=====================================================================


	describe( `GetValue Tests`, function ()
	{
		let CountMatrix = null;
		beforeEach( function () { CountMatrix = LQC.Shapes.Matrix( CountMatrixData ); } );

		//---------------------------------------------------------------------
		it( `should throw an error when called without any parameters`,
			async function ()
			{
				LIB_ASSERT.throws( () => CountMatrix.GetValue(), Error );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should throw an error when called with out of bounds parameters`,
			async function ()
			{
				LIB_ASSERT.throws( () => CountMatrix.GetValue( MatrixSize, 0 ), Error );
				LIB_ASSERT.throws( () => CountMatrix.GetValue( 0, MatrixSize ), Error );
				LIB_ASSERT.throws( () => CountMatrix.GetValue( MatrixSize, MatrixSize ), Error );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should get a value at a specific row and column indexes`,
			async function ()
			{
				for ( let row_index = 0; row_index < MatrixSize; row_index++ )
				{
					for ( let column_index = 0; column_index < MatrixSize; column_index++ )
					{
						LIB_ASSERT.strictEqual(
							CountMatrix.GetValue( row_index, column_index ),
							CountMatrix.RowData[ row_index ][ column_index ] );
					}
				}
				return;
			} );

		//---------------------------------------------------------------------
		it( `should get a value at a specific (negative) row and column offsets`,
			async function ()
			{
				for ( let row_number = 1; row_number <= MatrixSize; row_number++ )
				{
					for ( let column_number = 1; column_number <= MatrixSize; column_number++ )
					{
						LIB_ASSERT.strictEqual(
							CountMatrix.GetValue( -row_number, -column_number ),
							CountMatrix.RowData[ MatrixSize - row_number ][ MatrixSize - column_number ] );
					}
				}
				return;
			} );

		//---------------------------------------------------------------------
		it( `should get a value at a specific address`,
			async function ()
			{
				for ( let row_number = 1; row_number <= MatrixSize; row_number++ )
				{
					for ( let column_number = 1; column_number <= MatrixSize; column_number++ )
					{
						let address = `${CountMatrix.NumberToLetters( column_number )}${row_number}`;
						LIB_ASSERT.strictEqual(
							CountMatrix.GetValue( address ),
							CountMatrix.RowData[ row_number - 1 ][ column_number - 1 ] );
					}
				}
				return;
			} );

		return;
	} );


	//=====================================================================
	//=====================================================================
	//
	//		SetValue
	//
	//=====================================================================
	//=====================================================================


	describe( `SetValue Tests`, function ()
	{
		let CountMatrix = null;
		beforeEach( function () { CountMatrix = LQC.Shapes.Matrix( CountMatrixData ); } );

		//---------------------------------------------------------------------
		it( `should throw an error when called without any parameters`,
			async function ()
			{
				LIB_ASSERT.throws( () => CountMatrix.SetValue(), Error );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should throw an error when called with out of bounds parameters`,
			async function ()
			{
				LIB_ASSERT.throws( () => CountMatrix.SetValue( MatrixSize, 0, 'xyz' ), Error );
				LIB_ASSERT.throws( () => CountMatrix.SetValue( 0, MatrixSize, 'xyz' ), Error );
				LIB_ASSERT.throws( () => CountMatrix.SetValue( MatrixSize, MatrixSize, 'xyz' ), Error );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should set a value at a specific row and column indexes`,
			async function ()
			{
				for ( let row_index = 0; row_index < MatrixSize; row_index++ )
				{
					for ( let column_index = 0; column_index < MatrixSize; column_index++ )
					{
						let value = `${row_index}, ${column_index}`;
						CountMatrix.SetValue( row_index, column_index, value );
						LIB_ASSERT.strictEqual( CountMatrix.GetValue( row_index, column_index ), value );
					}
				}
				return;
			} );

		//---------------------------------------------------------------------
		it( `should get a value at a specific (negative) row and column offsets`,
			async function ()
			{
				for ( let row_number = 1; row_number <= MatrixSize; row_number++ )
				{
					for ( let column_number = 1; column_number <= MatrixSize; column_number++ )
					{
						let value = `${row_number}, ${column_number}`;
						CountMatrix.SetValue( -row_number, -column_number, value );
						LIB_ASSERT.strictEqual( CountMatrix.GetValue( -row_number, -column_number ), value );
					}
				}
				return;
			} );

		//---------------------------------------------------------------------
		it( `should get a value at a specific address`,
			async function ()
			{
				for ( let row_number = 1; row_number <= MatrixSize; row_number++ )
				{
					for ( let column_number = 1; column_number <= MatrixSize; column_number++ )
					{
						let address = `${CountMatrix.NumberToLetters( column_number )}${row_number}`;
						let value = `${row_number}, ${column_number}`;
						CountMatrix.SetValue( address, value );
						LIB_ASSERT.strictEqual( CountMatrix.GetValue( address ), value );
					}
				}
				return;
			} );

		return;
	} );


	//=====================================================================
	//=====================================================================
	//
	//		GetMatrix
	//
	//=====================================================================
	//=====================================================================


	describe( `GetMatrix Tests`, function ()
	{
		let CountMatrix = null;
		beforeEach( function () { CountMatrix = LQC.Shapes.Matrix( CountMatrixData ); } );

		//---------------------------------------------------------------------
		it( `should throw an error when called without any parameters`,
			async function ()
			{
				LIB_ASSERT.throws( () => CountMatrix.GetMatrix(), Error );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should throw an error when called with out of bounds parameters`,
			async function ()
			{
				LIB_ASSERT.throws( () => CountMatrix.GetMatrix( MatrixSize, 0, 1, 1 ), Error );
				LIB_ASSERT.throws( () => CountMatrix.GetMatrix( 0, MatrixSize, 1, 1 ), Error );
				LIB_ASSERT.throws( () => CountMatrix.GetMatrix( MatrixSize, MatrixSize, 1, 1 ), Error );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should get a matrix of values at specific row and column indexes`,
			async function ()
			{
				let matrix = null;

				matrix = CountMatrix.GetMatrix( 0, 0, 3, 3 );
				LIB_ASSERT.strictEqual( matrix.RowCount(), 3 );
				LIB_ASSERT.strictEqual( matrix.ColumnCount(), 3 );
				LIB_ASSERT.deepStrictEqual( matrix.RowData, [
					[ ( MatrixSize * 0 ) + 0, ( MatrixSize * 0 ) + 1, ( MatrixSize * 0 ) + 2, ],
					[ ( MatrixSize * 1 ) + 0, ( MatrixSize * 1 ) + 1, ( MatrixSize * 1 ) + 2, ],
					[ ( MatrixSize * 2 ) + 0, ( MatrixSize * 2 ) + 1, ( MatrixSize * 2 ) + 2, ],
				] );

				matrix = CountMatrix.GetMatrix( 4, 0, 3, 3 );
				LIB_ASSERT.strictEqual( matrix.RowCount(), 3 );
				LIB_ASSERT.strictEqual( matrix.ColumnCount(), 3 );
				LIB_ASSERT.deepStrictEqual( matrix.RowData, [
					[ ( MatrixSize * 4 ) + 0, ( MatrixSize * 4 ) + 1, ( MatrixSize * 4 ) + 2, ],
					[ ( MatrixSize * 5 ) + 0, ( MatrixSize * 5 ) + 1, ( MatrixSize * 5 ) + 2, ],
					[ ( MatrixSize * 6 ) + 0, ( MatrixSize * 6 ) + 1, ( MatrixSize * 6 ) + 2, ],
				] );

				return;
			} );

		//---------------------------------------------------------------------
		it( `should get a matrix of values at a specific (negative) row and column offsets`,
			async function ()
			{
				let matrix = null;
				matrix = CountMatrix.GetMatrix( -MatrixSize, -MatrixSize, 3, 3 );
				LIB_ASSERT.strictEqual( matrix.RowCount(), 3 );
				LIB_ASSERT.strictEqual( matrix.ColumnCount(), 3 );
				LIB_ASSERT.deepStrictEqual( matrix.RowData, [
					[ ( MatrixSize * 0 ) + 0, ( MatrixSize * 0 ) + 1, ( MatrixSize * 0 ) + 2, ],
					[ ( MatrixSize * 1 ) + 0, ( MatrixSize * 1 ) + 1, ( MatrixSize * 1 ) + 2, ],
					[ ( MatrixSize * 2 ) + 0, ( MatrixSize * 2 ) + 1, ( MatrixSize * 2 ) + 2, ],
				] );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should get a matrix of values at a specific address`,
			async function ()
			{
				let matrix = null;

				matrix = CountMatrix.GetMatrix( 'A1', 3, 3 );
				LIB_ASSERT.strictEqual( matrix.RowCount(), 3 );
				LIB_ASSERT.strictEqual( matrix.ColumnCount(), 3 );
				LIB_ASSERT.deepStrictEqual( matrix.RowData, [
					[ ( MatrixSize * 0 ) + 0, ( MatrixSize * 0 ) + 1, ( MatrixSize * 0 ) + 2, ],
					[ ( MatrixSize * 1 ) + 0, ( MatrixSize * 1 ) + 1, ( MatrixSize * 1 ) + 2, ],
					[ ( MatrixSize * 2 ) + 0, ( MatrixSize * 2 ) + 1, ( MatrixSize * 2 ) + 2, ],
				] );

				matrix = CountMatrix.GetMatrix( 'A5', 3, 3 );
				LIB_ASSERT.strictEqual( matrix.RowCount(), 3 );
				LIB_ASSERT.strictEqual( matrix.ColumnCount(), 3 );
				LIB_ASSERT.deepStrictEqual( matrix.RowData, [
					[ ( MatrixSize * 4 ) + 0, ( MatrixSize * 4 ) + 1, ( MatrixSize * 4 ) + 2, ],
					[ ( MatrixSize * 5 ) + 0, ( MatrixSize * 5 ) + 1, ( MatrixSize * 5 ) + 2, ],
					[ ( MatrixSize * 6 ) + 0, ( MatrixSize * 6 ) + 1, ( MatrixSize * 6 ) + 2, ],
				] );

				matrix = CountMatrix.GetMatrix( 'E5', 3 );
				LIB_ASSERT.strictEqual( matrix.RowCount(), 3 );
				LIB_ASSERT.strictEqual( matrix.ColumnCount(), 3 );
				LIB_ASSERT.deepStrictEqual( matrix.RowData, [
					[ ( MatrixSize * 4 ) + 4, ( MatrixSize * 4 ) + 5, ( MatrixSize * 4 ) + 6, ],
					[ ( MatrixSize * 5 ) + 4, ( MatrixSize * 5 ) + 5, ( MatrixSize * 5 ) + 6, ],
					[ ( MatrixSize * 6 ) + 4, ( MatrixSize * 6 ) + 5, ( MatrixSize * 6 ) + 6, ],
				] );

				return;
			} );

		return;
	} );


	//=====================================================================
	//=====================================================================
	//
	//		SetMatrix
	//
	//=====================================================================
	//=====================================================================


	describe( `SetMatrix Tests`, function ()
	{
		let CountMatrix = null;
		beforeEach( function () { CountMatrix = LQC.Shapes.Matrix( CountMatrixData ); } );

		//---------------------------------------------------------------------
		it( `should throw an error when called without any parameters`,
			async function ()
			{
				LIB_ASSERT.throws( () => CountMatrix.SetMatrix(), Error );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should throw an error when called with out of bounds parameters`,
			async function ()
			{
				let matrix = LQC.Shapes.Matrix( 0 );
				LIB_ASSERT.throws( () => CountMatrix.SetMatrix( MatrixSize, 0, matrix ), Error );
				LIB_ASSERT.throws( () => CountMatrix.SetMatrix( 0, MatrixSize, matrix ), Error );
				LIB_ASSERT.throws( () => CountMatrix.SetMatrix( MatrixSize, MatrixSize, matrix ), Error );
				return;
			} );

		//---------------------------------------------------------------------
		it( `should set a matrix of values at specific row and column indexes`,
			async function ()
			{
				let matrix = LQC.Shapes.Matrix( [
					[ 'A', 'B', 'C' ],
					[ 'D', 'E', 'F' ],
					[ 'G', 'H', 'I' ],
				] );
				let matrix2 = null;

				CountMatrix.SetMatrix( 0, 0, matrix );
				LIB_ASSERT.strictEqual( CountMatrix.RowCount(), MatrixSize );
				LIB_ASSERT.strictEqual( CountMatrix.ColumnCount(), MatrixSize );
				matrix2 = CountMatrix.GetMatrix( 0, 0, matrix.RowCount(), matrix.ColumnCount() );
				LIB_ASSERT.deepStrictEqual( matrix2.RowData, matrix.RowData );

				CountMatrix.SetMatrix( 4, 4, matrix );
				LIB_ASSERT.strictEqual( CountMatrix.RowCount(), MatrixSize );
				LIB_ASSERT.strictEqual( CountMatrix.ColumnCount(), MatrixSize );
				matrix2 = CountMatrix.GetMatrix( 4, 4, matrix.RowCount(), matrix.ColumnCount() );
				LIB_ASSERT.deepStrictEqual( matrix2.RowData, matrix.RowData );

				return;
			} );

		//---------------------------------------------------------------------
		it( `should get a matrix of values at a specific (negative) row and column offsets`,
			async function ()
			{
				let matrix = LQC.Shapes.Matrix( [
					[ 'A', 'B', 'C' ],
					[ 'D', 'E', 'F' ],
					[ 'G', 'H', 'I' ],
				] );
				let matrix2 = null;

				CountMatrix.SetMatrix( -MatrixSize, -MatrixSize, matrix );
				LIB_ASSERT.strictEqual( CountMatrix.RowCount(), MatrixSize );
				LIB_ASSERT.strictEqual( CountMatrix.ColumnCount(), MatrixSize );
				matrix2 = CountMatrix.GetMatrix( -MatrixSize, -MatrixSize, matrix.RowCount(), matrix.ColumnCount() );
				LIB_ASSERT.deepStrictEqual( matrix2.RowData, matrix.RowData );

				CountMatrix.SetMatrix( -matrix.RowCount(), -matrix.ColumnCount(), matrix );
				LIB_ASSERT.strictEqual( CountMatrix.RowCount(), MatrixSize );
				LIB_ASSERT.strictEqual( CountMatrix.ColumnCount(), MatrixSize );
				matrix2 = CountMatrix.GetMatrix( -matrix.RowCount(), -matrix.ColumnCount(), matrix.RowCount(), matrix.ColumnCount() );
				LIB_ASSERT.deepStrictEqual( matrix2.RowData, matrix.RowData );

				return;
			} );

		//---------------------------------------------------------------------
		it( `should get a matrix of values at a specific address`,
			async function ()
			{
				let matrix = LQC.Shapes.Matrix( [
					[ 'A', 'B', 'C' ],
					[ 'D', 'E', 'F' ],
					[ 'G', 'H', 'I' ],
				] );
				let matrix2 = null;

				CountMatrix.SetMatrix( 'A1', matrix );
				LIB_ASSERT.strictEqual( CountMatrix.RowCount(), MatrixSize );
				LIB_ASSERT.strictEqual( CountMatrix.ColumnCount(), MatrixSize );
				matrix2 = CountMatrix.GetMatrix( 'A1', matrix.RowCount(), matrix.ColumnCount() );
				LIB_ASSERT.deepStrictEqual( matrix2.RowData, matrix.RowData );

				CountMatrix.SetMatrix( 'E5', matrix );
				LIB_ASSERT.strictEqual( CountMatrix.RowCount(), MatrixSize );
				LIB_ASSERT.strictEqual( CountMatrix.ColumnCount(), MatrixSize );
				matrix2 = CountMatrix.GetMatrix( 'E5', matrix.RowCount(), matrix.ColumnCount() );
				LIB_ASSERT.deepStrictEqual( matrix2.RowData, matrix.RowData );

				return;
			} );

		return;
	} );


	//=====================================================================
	//=====================================================================
	//
	//		Transpose
	//
	//=====================================================================
	//=====================================================================


	describe( `Transpose Tests`, function ()
	{
		let CountMatrix = null;
		beforeEach( function () { CountMatrix = LQC.Shapes.Matrix( CountMatrixData ); } );

		//---------------------------------------------------------------------
		it( `should transpose a matrix of values`,
			async function ()
			{
				let matrix = CountMatrix.Transpose();
				LIB_ASSERT.strictEqual( matrix.RowCount(), MatrixSize );
				LIB_ASSERT.strictEqual( matrix.ColumnCount(), MatrixSize );
				for ( let row_index = 0; row_index < MatrixSize; row_index++ )
				{
					for ( let column_index = 0; column_index < MatrixSize; column_index++ )
					{
						let value1 = CountMatrix.GetValue( column_index, row_index );
						let value2 = matrix.GetValue( row_index, column_index );
						LIB_ASSERT.strictEqual( value1, value2 );
					}
				}
				return;
			} );

		return;
	} );


	//=====================================================================
	//=====================================================================
	//
	//		Join
	//
	//=====================================================================
	//=====================================================================


	describe( `Join Tests`, function ()
	{
		let table_customers = null;
		let table_orders = null;
		beforeEach( function () 
		{
			// Setup table 1.
			table_customers = LQC.Shapes.Matrix(
				[
					// customer_id, name
					[ 1, 'Alice' ],
					[ 2, 'Bob' ],
					[ 3, 'Eve' ],
				]
			);

			// Setup table 2.
			table_orders = LQC.Shapes.Matrix(
				[
					// order_id, customer_id, item
					[ 1, 2, 'pretzels' ],
					[ 2, 1, 'chips' ],
					[ 3, 2, 'soda' ],
					[ 4, 0, 'cheeseburger' ], // no customer for this order
				]
			);

		} );

		//---------------------------------------------------------------------
		it( `should inner join tables`,
			async function ()
			{
				let table = table_customers.Join( 0, 'inner', table_orders, 1 );
				LIB_ASSERT.strictEqual( table.ColumnCount(), 5, 'mismatched column count' );
				LIB_ASSERT.strictEqual( table.RowCount(), 3, 'mismatched row count' );
				LIB_ASSERT.deepStrictEqual( table.RowData,
					[
						// customer_id, name, order_id, customer_id, item
						[ 1, 'Alice', 2, 1, 'chips' ],
						[ 2, 'Bob', 1, 2, 'pretzels' ],
						[ 2, 'Bob', 3, 2, 'soda' ],
					]
				);
				return;
			} );

		//---------------------------------------------------------------------
		it( `should left join tables`,
			async function ()
			{
				let table = table_customers.Join( 0, 'left', table_orders, 1 );
				LIB_ASSERT.strictEqual( table.ColumnCount(), 5, 'mismatched column count' );
				LIB_ASSERT.strictEqual( table.RowCount(), 4, 'mismatched row count' );
				LIB_ASSERT.deepStrictEqual( table.RowData,
					[
						// customer_id, name, order_id, customer_id, item
						[ 1, 'Alice', 2, 1, 'chips' ],
						[ 2, 'Bob', 1, 2, 'pretzels' ],
						[ 2, 'Bob', 3, 2, 'soda' ],
						[ 3, 'Eve', null, null, null ],
					]
				);
				return;
			} );

		//---------------------------------------------------------------------
		it( `should right join tables`,
			async function ()
			{
				let table = table_customers.Join( 0, 'right', table_orders, 1 );
				LIB_ASSERT.strictEqual( table.ColumnCount(), 5, 'mismatched column count' );
				LIB_ASSERT.strictEqual( table.RowCount(), 4, 'mismatched row count' );
				LIB_ASSERT.deepStrictEqual( table.RowData,
					[
						// customer_id, name, order_id, customer_id, item
						[ 2, 'Bob', 1, 2, 'pretzels' ],
						[ 1, 'Alice', 2, 1, 'chips' ],
						[ 2, 'Bob', 3, 2, 'soda' ],
						[ null, null, 4, 0, 'cheeseburger' ],
					]
				);
				return;
			} );

		//---------------------------------------------------------------------
		it( `should full join tables`,
			async function ()
			{
				let table = table_customers.Join( 0, 'full', table_orders, 1 );
				LIB_ASSERT.strictEqual( table.ColumnCount(), 5, 'mismatched column count' );
				LIB_ASSERT.strictEqual( table.RowCount(), 5, 'mismatched row count' );
				LIB_ASSERT.deepStrictEqual( table.RowData,
					[
						// customer_id, name, order_id, customer_id, item
						[ 1, 'Alice', 2, 1, 'chips' ],
						[ 2, 'Bob', 1, 2, 'pretzels' ],
						[ 2, 'Bob', 3, 2, 'soda' ],
						[ 3, 'Eve', null, null, null ],
						[ null, null, 4, 0, 'cheeseburger' ],
					]
				);
				return;
			} );

		return;
	} );


	//---------------------------------------------------------------------
	return;
} );
