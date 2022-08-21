"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '310',
	member_of: 'Shapes',
	name: 'Matrix',
	type: 'function',
	returns: 'object',
	returns_summary: 'Returns a new Matrix object.',
	summary: 'Matrix stores a two-dimensional jagged array and exposes manipulation functions.',
	description: `
A Matrix object is essentially a two-dimensional array (an array of arrays).
This function will create and return a new Matrix object.


***Values Parameter***

You can specify the initial contents of the Matrix with the Values parameter.
If Values is an array of arrays, then Matrix will contain those values.
If Values is a one-dimensional array, then Matrix will have a single row reflecting those values.
If Values is an integer, then Matrix will be created with that number of blank rows.

Note that the only way to create a new Matrix with no rows in it is: \`Shapes.Matrix( 0, Options )\`


***Options Parameter***

The Options parameter is an options object:
~~~javascript
Options = {
	default_value: null,    // A default value to use when no other value exists.
	clone_values: true,     // If true, any values read from or written to the Matrix are cloned first.
}
~~~

The \`clone_values\` option is very important.
It is initialliy set to true, providing the safest and most sensible operation.
A performance improvement can be had by setting this to false;
However, unintended consequences may occur if you are not careful.
Alsa, this is a valid intended consequence if you want to use Matrix to quickly manipulate an existing array.

For example:
~~~javascript
let test_array = [
	[ 1, 2, 3, 4 ],
	[ 5, 6, 7, 8 ],
];
// test_array.length == 2
// Encapsulate the array in a matrix.
let matrix = Liquicode.Shapes.Matrix( test_array, { clone_values: false } );
// Append a row to the matrix.
matrix.AppendRows( [ 'A', 'B', 'C' ] );
// Since test_array was not cloned first, the new row also appears in test_array.
// test_array.length == 3 !!!
~~~


***How It Works***

The Matrix object contains a \`RowData\` member which is an array of arrays that contains the values for the matrix.
This is maintained as a jagged array, meaning that each row of the matrix may be of different lengths.
~~~javascript
[	// Matrix maintains values in a jagged array:
	[ 1, 2, 3, 4 ],
	[ 1, 2, 3 ],
	[ 1, 2, 3, 4, 5 ],
]
~~~

When calling the \`AppendColumns\`, \`InsertColumns\`, \`SetColumn\`, or \`SetValue\` functions,
it may be necessary for the matrix to fill out the columns of shorter rows so that the target column exists.
For example, appending a blank column (\`AppendColumns()\`) to the matrix above would yield:
~~~javascript
[	// Matrix fills columns with
	// default values as needed:
	[ 1, 2, 3, 4,    null, null ],
	[ 1, 2, 3, null, null, null ],
	[ 1, 2, 3, 4,    5,    null ],
]
~~~
You can change the value used to fill blank columns by changing \`Option.default_value\`.


***Cell Addressing***

When working with Matrix, you will usually need to identify a particular Row or Column to work with.
Matrix supports three types of addressing modes:

- 1) A zero-based index used as a row/column index.
This index must be greater than or equal to zero and less than the extent (i.e. the RowCount or ColumnCount).

- 2) A negative index that serves as an offset from the extent (e.g. -1 = RowCount - 1).
This type of index must be between -extent and -1, inclusive.

- 3) A spreadsheet style address (e.g. 'A1', 'B2', etc.).
This type of address has letters component which indicates a column.
This is followed by a digits component that is a one-based row number.


***Matrix Functions***

The Matrix object also has a number of functions which allow you to manipulate the Matrix object.

- Addressing Functions:
	These are utility functions that assist when working with the spreadsheet style of addressing.
	These functions are used internally by Matrix.
	They do not consider the validity of any particular address or index within the current Matrix.

	- \`IsValidAddress( Address )\`:
		Returns \`true\` if Address is a valid address, otherwise \`false\`.
		A valid address must contain a column component in letters ('AB') and a row component in digits ('12').
		This function determines only if the Address parameter is a properly formatted address,
		regardless if the address lies outside the bounds of this particular Matrix.

	- \`NumberToLetters( Number )\`:
		Returns the letters component of an address for any positive number (e.g. 1='A', 2='B', 28='AB', etc.).

	- \`LettersToNumber( Address )\`:
		Converts the letters component of an address to a positive number.
		Address is a string that starts with, or is entirely composed of, letters.

- Row Functions:
	
	- \`RowIndexOf( Address )\`:
	Will return a valid row index for this Matrix from the given Address.
	Address can represent any of the three addressing styles.

	- \`RowCount()\`:
	Returns the number of rows within the Matrix.

	- \`AppendRows( Values )\`:
	Appends one or more rows to the end of the Matrix.
	If Values is not supplied, then a blank row is appended.
	If Values is a one-dimensional array, then a single row is appended.
	If Values is a two-dimensional array, then multiple rows are appended.

	- \`InsertRows( Row, Values )\`:
	Inserts one or more rows within the Matrix, starting at the given Row address.
	If Values is not supplied, then a blank row is appended.
	If Values is a one-dimensional array, then a single row is appended.
	If Values is a two-dimensional array, then multiple rows are appended.
	Note that it is not possible to append a row to a Matrix by using this function.

	- \`DeleteRows( Row, Count )\`:
	Deletes one or more rows within the Matrix, starting at the given Row address.
	If Count is not supplied, then a single row is deleted.

	- \`GetRow( Row )\`:
	Returns a single row of values from the Matrix, at the given Row address.

	- \`SetRow( Row, Values )\`:
	Replaces a single row of values (a one-dimensional array) within the Matrix, at the given Row address.
	If Values is not supplied, then a blank row is set at that location.

- Column Functions:

	- \`ColumnIndexOf( Address )\`:
	Will return a valid column index for this Matrix from the given Address.
	Address can represent any of the three addressing styles.

	- \`ColumnCount()\`:
	Returns the number of columns within the Matrix.

	- \`AppendColumns( Values )\`:
	Appends one or more columns to the end of the Matrix.
	If Values is not supplied, then a blank column is appended.
	If Values is a one-dimensional array, then a single column is appended.
	If Values is a two-dimensional array, then multiple columns are appended.

	- \`InsertColumns( Column, Values )\`:
	Inserts one or more columns within the Matrix, starting at the given Column address.
	If Values is not supplied, then a blank column is appended.
	If Values is a one-dimensional array, then a single column is appended.
	If Values is a two-dimensional array, then multiple columns are appended.
	Note that it is not possible to append a column to a Matrix by using this function.

	- \`DeleteColumns( Column, Count )\`:
	Deletes one or more columns within the Matrix, starting at the given Column address.
	If Count is not supplied, then a single column is deleted.

	- \`GetColumn( Column )\`:
	Returns a single column of values from the Matrix, at the given Column address.

	- \`SetColumn( Column, Values )\`:
	Replaces a single column of values (a one-dimensional array) within the Matrix, at the given Column address.
	If Values is not supplied, then a blank column is set at that location.

- Value Functions:

	- \`GetValue( Row, Column )\`:
	Returns a single value located at Row and Column within the Matrix.
	Row can be a string address, in which case the Column parameter is omitted.

	- \`SetValue( Row, Column, Value )\`:
	Sets a single value located at Row and Column within the Matrix.
	Row can be a string address, in which case the Column parameter is omitted.
	
	- \`GetMatrix( Row, Column, RowCount, ColumnCount )\`:
	Constructs a new Matrix of values from within the called Matrix.
	Values are taken starting at the location described by Row and Column and extending for RowCount rows and ColumnCount columns.
		- You can call this using four parameters: \`GetMatrix( Row, Column, RowCount, ColumnCount )\`
		- You can call this using three parameters: \`GetMatrix( Address, RowCount, ColumnCount )\`
		- You can call this using two parameters: \`GetMatrix( Address, Size )\`

	- \`SetMatrix( Row, Column, Matrix )\`:
	Sets a matrix of values starting at Row and Column.

- Table Functions:

	- \`Clone()\`:
	Return a clone of this matrix.
	The clone will contain a copy of this matrix's data and options.

	- \`Transpose()\`:
	Return a copy of this matrix with its rows and column transposed.

	- \`Join( AtColumn, JoinType, JoinMatrix, MatrixColumn )\`:
	Return a new matrix by joining this matrix with another one.
	The join is produced by matching column values between the two matrices.
	The different supported join types are: 'inner', 'left', 'right', and 'full'.

`,
	Parameters: {
		Values: {
			name: 'Values',
			type: 'object',
			required: true,
			default: [ [] ],
			description: 'One of: a two-dimensional array of arrays, a one-dimensional array of values, or an integer.',
		},
		Options: {
			name: 'Options',
			type: 'object',
			required: false,
			default: {},
			description: 'Set of options controlling Matrix operation.',
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function Matrix
	 * @returns {object}
	 * @description
	 * 
A Matrix object is essentially a two-dimensional array (an array of arrays).
This function will create and return a new Matrix object.


***Values Parameter***

You can specify the initial contents of the Matrix with the Values parameter.
If Values is an array of arrays, then Matrix will contain those values.
If Values is a one-dimensional array, then Matrix will have a single row reflecting those values.
If Values is an integer, then Matrix will be created with that number of blank rows.

Note that the only way to create a new Matrix with no rows in it is: `Shapes.Matrix( 0, Options )`


***Options Parameter***

The Options parameter is an options object:
~~~javascript
Options = {
	default_value: null,    // A default value to use when no other value exists.
	clone_values: false,    // If true, any values read or written to the Matrix are cloned first.
}
~~~


***How It Works***

The Matrix object contains a `RowData` member which is an array of arrays that contains the values for the matrix.
This is maintained as a jagged array, meaning that each row of the matrix may be of different lengths.
~~~javascript
[	// Matrix maintains values in a jagged array:
	[ 1, 2, 3, 4 ],
	[ 1, 2, 3 ],
	[ 1, 2, 3, 4, 5 ],
]
~~~

When calling the `AppendColumns`, `InsertColumns`, `SetColumn`, or `SetValue` functions,
it may be necessary for the matrix to fill out the columns of shorter rows so that the target column exists.
For example, appending a blank column (`AppendColumns()`) to the matrix above would yield:
~~~javascript
[	// Matrix fills columns with
	// default values as needed:
	[ 1, 2, 3, 4,    null, null ],
	[ 1, 2, 3, null, null, null ],
	[ 1, 2, 3, 4,    5,    null ],
]
~~~
You can change the value used to fill blank columns by changing `Option.default_value`.


***Cell Addressing***

When working with Matrix, you will usually need to identify a particular Row or Column to work with.
Matrix supports three types addressing modes:

- 1) A zero-based index used as a row/column index.
This index must be greater than or equal to zero and less than the extent (i.e. the RowCount or ColumnCount).

- 2) A negative index that serves as an offset from the extent (e.g. -1 = RowCount - 1).
This type of index must be between -extent and -1, inclusive.

- 3) A spreadsheet style address (e.g. 'A1', 'B2', etc.).
This type of address has letters component which indicates a column.
This is followed by a digits component that is a one-based row number.


***Matrix Functions***

The Matrix object also has a number of functions which allow you to manipulate the Matrix object.

- Addressing Functions:
	These are utility functions that assist when working with the spreadsheet style of addressing.
	These functions are used internally by Matrix.
	They do not consider the validity of any particular address or index within the current Matrix.

	- `IsValidAddress( Address )`:
		Returns `true` if Address is a valid address, otherwise `false`.
		A valid address must contain a column component in letters ('AB') and a row component in digits ('12').
		This function determines only if the Address parameter is a properly formatted address,
		regardless if the address lies outside the bounds of this particular Matrix.

	- `NumberToLetters( Number )`:
		Returns the letters component of an address for any positive number (e.g. 1='A', 2='B', 28='AB', etc.).

	- `LettersToNumber( Address )`:
		Converts the letters component of an address to a positive number.
		Address is a string that starts with, or is entirely composed of, letters.

- Row Functions:
	
	- `RowIndexOf( Address )`:
	Will return a valid row index for this Matrix from the given Address.
	Address can represent any of the three addressing styles.

	- `RowCount()`:
	Returns the number of rows within the Matrix.

	- `AppendRows( Values )`:
	Appends one or more rows to the end of the Matrix.
	If Values is not supplied, then a blank row is appended.
	If Values is a one-dimensional array, then a single row is appended.
	If Values is a two-dimensional array, then multiple rows are appended.

	- `InsertRows( Row, Values )`:
	Inserts one or more rows within the Matrix, starting at the given Row address.
	If Values is not supplied, then a blank row is appended.
	If Values is a one-dimensional array, then a single row is appended.
	If Values is a two-dimensional array, then multiple rows are appended.
	Note that it is not possible to append a row to a Matrix by using this function.

	- `DeleteRows( Row, Count )`:
	Deletes one or more rows within the Matrix, starting at the given Row address.
	If Count is not supplied, then a single row is deleted.

	- `GetRow( Row )`:
	Returns a single row of values from the Matrix, at the given Row address.

	- `SetRow( Row, Values )`:
	Replaces a single row of values (a one-dimensional array) within the Matrix, at the given Row address.
	If Values is not supplied, then a blank row is set at that location.

- Column Functions:

	- `ColumnIndexOf( Address )`:
	Will return a valid column index for this Matrix from the given Address.
	Address can represent any of the three addressing styles.

	- `ColumnCount()`:
	Returns the number of columns within the Matrix.

	- `AppendColumns( Values )`:
	Appends one or more columns to the end of the Matrix.
	If Values is not supplied, then a blank column is appended.
	If Values is a one-dimensional array, then a single column is appended.
	If Values is a two-dimensional array, then multiple columns are appended.

	- `InsertColumns( Column, Values )`:
	Inserts one or more columns within the Matrix, starting at the given Column address.
	If Values is not supplied, then a blank column is appended.
	If Values is a one-dimensional array, then a single column is appended.
	If Values is a two-dimensional array, then multiple columns are appended.
	Note that it is not possible to append a column to a Matrix by using this function.

	- `DeleteColumns( Column, Count )`:
	Deletes one or more columns within the Matrix, starting at the given Column address.
	If Count is not supplied, then a single column is deleted.

	- `GetColumn( Column )`:
	Returns a single column of values from the Matrix, at the given Column address.

	- `SetColumn( Column, Values )`:
	Replaces a single column of values (a one-dimensional array) within the Matrix, at the given Column address.
	If Values is not supplied, then a blank column is set at that location.

- Value Functions:

	- `GetValue( Row, Column )`:
	Returns a single value located at Row and Column within the Matrix.
	Row can be a string address, in which case the Column parameter is omitted.

	- `SetValue( Row, Column, Value )`:
	Sets a single value located at Row and Column within the Matrix.
	Row can be a string address, in which case the Column parameter is omitted.
	
	- `GetMatrix( Row, Column, RowCount, ColumnCount )`:
	Constructs a new Matrix of values from within the called Matrix.
	Values are taken starting at the location described by Row and Column and extending for RowCount rows and ColumnCount columns.
		- You can call this using four parameters: `GetMatrix( Row, Column, RowCount, ColumnCount )`
		- You can call this using three parameters: `GetMatrix( Address, RowCount, ColumnCount )`
		- You can call this using two parameters: `GetMatrix( Address, Size )`

	- `SetMatrix( Row, Column, Matrix )`:
	Sets a matrix of values starting at Row and Column.


	 * @param {object} Values
	 * One of: a two-dimensional array of arrays, a one-dimensional array of values, or an integer.
	 * @param {object} [Options={}]
	 * Set of options controlling Matrix operation.
	*/
	//-end-jsdoc-----------------------------------------------------------


	function Matrix( Values, Options )
	{
		// Validate the Values.
		if ( Liquicode.Types.IsFormat( Values, 'number:integer' ) ) 
		{
			// Pass an integer as an initial row count for the Matrix.
			let row_count = Values;
			Values = [];
			for ( let row_index = 0; row_index < row_count; row_index++ )
			{
				Values.push( [] );
			}
		}
		else if ( Liquicode.Types.IsFormat( Values, 'object:array-array' ) ) 
		{
			// Pass an array of arrays as values in the Matrix.
			/* Do Nothing */
		}
		else if ( Liquicode.Types.IsFormat( Values, 'object:array' ) ) 
		{
			// Pass a one-dimensional array as a single row in the Matrix.
			Values = [ Values ];
		}
		else 
		{
			throw new Error( `The Values parameter must be one of: an array of arrays, a single row of values, or a row count.` );
		}

		// Validate the Options.
		if ( Options === undefined ) { Options = {}; }
		Options = Liquicode.Object.Merge(
			{
				default_value: null,
				clone_values: true,
			},
			Options );

		let matrix = {


			//---------------------------------------------------------------------
			RowData: JSON.parse( JSON.stringify( Values ) ),
			Options: JSON.parse( JSON.stringify( Options ) ),


			//=====================================================================
			//=====================================================================
			//
			//		ADDRESSING FUNCTIONS
			//
			//=====================================================================
			//=====================================================================


			//---------------------------------------------------------------------
			IsValidAddress: function ( Address )
			{
				if ( typeof Address !== 'string' ) { return false; }
				Address = Address.toUpperCase();
				let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
				let digits = '0123456789';
				let has_alpha = false;
				let has_numeric = false;
				for ( let index = 0; index < Address.length; index++ )
				{
					if ( !has_alpha )
					{
						if ( alphabet.indexOf( Address[ index ] ) < 0 ) { return false; } // Address must begin with an letter.
						has_alpha = true;
					}
					else
					{
						if ( alphabet.indexOf( Address[ index ] ) >= 0 )
						{
							if ( has_numeric ) { return false; } // Address can only have other digits after the first digit.
						}
						else if ( digits.indexOf( Address[ index ] ) >= 0 )
						{
							if ( !has_alpha ) { return false; } // Address must begin with a letter.
							has_numeric = true;
						}
						else
						{
							return false; // Address can only have letters and digits.
						}
					}
				}
				if ( !has_alpha ) { return false; }		// Address must contain letters followed by digits.
				if ( !has_numeric ) { return false; }	// Address must contain letters followed by digits.
				return true;
			},


			//---------------------------------------------------------------------
			NumberToLetters: function ( Number )
			{
				if ( !Liquicode.Types.IsFormat( Number, 'number:integer' ) ) { throw new Error( `The Number parameter must be a positive integer.` ); }
				if ( Number <= 0 ) { throw new Error( `The Number parameter must be a positive integer.` ); }
				// FROM: https://cwestblog.com/2013/09/05/javascript-snippet-convert-number-to-column-name/
				for ( var address = '', a = 1, b = 26; ( Number -= a ) >= 0; a = b, b *= 26 ) 
				{
					address = String.fromCharCode( parseInt( ( Number % b ) / a ) + 65 ) + address;
				}
				return address;
			},


			//---------------------------------------------------------------------
			LettersToNumber: function ( Address )
			{
				if ( !Liquicode.Types.IsFormat( Address, 'string:string' ) ) { throw new Error( `The Address parameter must be a string of letters.` ); }
				Address = Address.toUpperCase();
				let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
				let letters = '';
				let number = 0;
				for ( let index = 0; index < Address.length; index++ )
				{
					let ich = alphabet.indexOf( Address[ index ] );
					if ( ich < 0 ) { break; }
					letters += Address[ index ];
				}
				for ( let index = 0; index < letters.length; index++ )
				{
					let ich = alphabet.indexOf( Address[ index ] );
					if ( ich < 0 ) { break; }
					number += ( ich + 1 ) * ( alphabet.length ** ( letters.length - ( index + 1 ) ) );
				}
				return number;
			},


			//=====================================================================
			//=====================================================================
			//
			//		MATRIX ROW FUNCTIONS
			//
			//=====================================================================
			//=====================================================================


			//---------------------------------------------------------------------
			RowIndexOf: function ( AddressOrIndex )
			{
				let row_index = null;
				if ( typeof AddressOrIndex === 'string' )
				{
					row_index = Number( AddressOrIndex );
					if ( isNaN( row_index ) )
					{
						if ( !this.IsValidAddress( AddressOrIndex ) ) { throw new Error( `The value "${AddressOrIndex}" is not a valid address.` ); }
						for ( let char_index = 0; char_index < AddressOrIndex.length; char_index++ )
						{
							if ( '0123456789'.indexOf( AddressOrIndex[ char_index ] ) >= 0 )
							{
								row_index = Number( AddressOrIndex.substring( char_index ) );
								row_index--; // Convert from row number to row index.
								break;
							}
						}
					}
					if ( isNaN( row_index ) )
					{
						throw new Error( `Unable to determine the row index of "${AddressOrIndex}".` );
					}
				}
				else if ( typeof AddressOrIndex === 'number' )
				{
					row_index = Math.floor( AddressOrIndex );
				}
				else
				{
					throw new Error( `The AddressOrIndex parameter must be a string address (e.g. "C2") or an integer.` );
				}
				let row_count = this.RowData.length;
				if ( row_index >= row_count ) { throw new Error( `The row index cannot be greater than or equal to the row count.` ); }
				if ( row_index < 0 ) { row_index += row_count; }
				if ( row_index < 0 ) { throw new Error( `The row index cannot be less than zero.` ); }
				return row_index;
			},


			//---------------------------------------------------------------------
			RowCount: function ()
			{
				return this.RowData.length;
			},


			//---------------------------------------------------------------------
			AppendRows: function ( Values )
			{
				if ( Values === undefined ) { Values = []; }
				if ( !Liquicode.Types.IsFormat( Values, 'object:array' ) ) { throw new Error( `The Values parameter must be an array of values.` ); }
				if ( this.Options.clone_values )
				{
					Values = JSON.parse( JSON.stringify( Values ) );
				}
				if ( Liquicode.Types.IsFormat( Values, 'object:array-array' ) ) 
				{
					for ( let row_index = 0; row_index < Values.length; row_index++ )
					{
						this.RowData.push( Values[ row_index ] );
					}
				}
				else
				{
					this.RowData.push( Values );
				}
				return;
			},


			//---------------------------------------------------------------------
			InsertRows: function ( Row, Values )
			{
				if ( Values === undefined ) { Values = []; }
				if ( !Liquicode.Types.IsFormat( Values, 'object:array' ) ) { throw new Error( `The Values parameter must be an array of values.` ); }
				let at_row_index = this.RowIndexOf( Row );
				if ( this.Options.clone_values )
				{
					Values = JSON.parse( JSON.stringify( Values ) );
				}
				if ( Liquicode.Types.IsFormat( Values, 'object:array-array' ) ) 
				{
					for ( let row_index = 0; row_index < Values.length; row_index++ )
					{
						this.RowData.splice( at_row_index + row_index, 0, Values[ row_index ] );
					}
				}
				else
				{
					this.RowData.splice( at_row_index, 0, Values );
				}
				return;
			},


			//---------------------------------------------------------------------
			DeleteRows: function ( Row, Count ) 
			{
				if ( Count === undefined ) { Count = 1; }
				if ( !Liquicode.Types.IsFormat( Count, 'number:integer' ) ) { throw new Error( `The RowCount parameter must be a positive integer.` ); }
				if ( Count <= 0 ) { throw new Error( `The RowCount parameter must be a positive integer.` ); }
				let row_index = this.RowIndexOf( Row );
				this.RowData.splice( row_index, Count );
				return;
			},


			//---------------------------------------------------------------------
			GetRow: function ( Row ) 
			{
				let at_row_index = this.RowIndexOf( Row );
				let values = this.RowData[ at_row_index ];
				if ( this.Options.clone_values )
				{
					values = JSON.parse( JSON.stringify( values ) );
				}
				return values;
			},


			//---------------------------------------------------------------------
			SetRow: function ( Row, Values )
			{
				if ( Values === undefined ) { Values = []; }
				if ( !Liquicode.Types.IsFormat( Values, 'object:array' ) ) { throw new Error( `The Values parameter must be an array of values.` ); }
				let at_row_index = this.RowIndexOf( Row );
				if ( this.Options.clone_values )
				{
					Values = JSON.parse( JSON.stringify( Values ) );
				}
				this.RowData[ at_row_index ] = Values;
				return;
			},


			//=====================================================================
			//=====================================================================
			//
			//		MATRIX COLUMN FUNCTIONS
			//
			//=====================================================================
			//=====================================================================


			//---------------------------------------------------------------------
			ColumnIndexOf: function ( AddressOrIndex ) 
			{
				let column_index = null;
				if ( typeof AddressOrIndex === 'string' )
				{
					column_index = Number( AddressOrIndex );
					if ( isNaN( column_index ) )
					{
						if ( !this.IsValidAddress( AddressOrIndex ) ) { throw new Error( `The value "${AddressOrIndex}" is not a valid address.` ); }
						column_index = this.LettersToNumber( AddressOrIndex );
						if ( column_index === 0 ) { throw new Error( `The AddressOrIndex parameter must be a string address (e.g. "C2") or an integer.` ); }
						column_index--; // Convert from column number to column index.
					}
				}
				else if ( typeof AddressOrIndex === 'number' )
				{
					column_index = Math.floor( AddressOrIndex );
				}
				else
				{
					throw new Error( `The AddressOrIndex parameter must be a string address (e.g. "C2") or an integer.` );
				}
				let column_count = this.ColumnCount();
				if ( column_index >= column_count ) { throw new Error( `The column index cannot be greater than or equal to the column count.` ); }
				if ( column_index < 0 ) { column_index += column_count; }
				if ( column_index < 0 ) { throw new Error( `The column index cannot be less than zero.` ); }
				return column_index;
			},


			//---------------------------------------------------------------------
			ColumnCount: function () 
			{
				let column_count = 0;
				for ( let row_index = 0; row_index < this.RowData.length; row_index++ )
				{
					if ( column_count < this.RowData[ row_index ].length ) 
					{
						column_count = this.RowData[ row_index ].length;
					}
				}
				return column_count;
			},


			//---------------------------------------------------------------------
			AppendColumns: function ( Values )
			{
				if ( Values === undefined ) { Values = []; }
				if ( !Liquicode.Types.IsFormat( Values, 'object:array' ) ) { throw new Error( `The Values parameter must be an array of values.` ); }
				if ( !Liquicode.Types.IsFormat( Values, 'object:array-array' ) ) { Values = [ Values ]; }
				let column_count = this.ColumnCount();
				for ( let row_index = 0; row_index < this.RowData.length; row_index++ )
				{
					let row_values = this.RowData[ row_index ];
					while ( row_values.length < column_count )
					{
						row_values.push( this.Options.default_value );
					}
					for ( let column_index = 0; column_index < Values.length; column_index++ )
					{
						let column_values = Values[ column_index ];
						let value = this.Options.default_value;
						if ( row_index < column_values.length )
						{
							value = column_values[ row_index ];
							if ( this.Options.clone_values )
							{
								value = JSON.parse( JSON.stringify( value ) );
							}
						}
						row_values.push( value );
					}
				}
				return;
			},


			//---------------------------------------------------------------------
			InsertColumns: function ( Column, Values ) 
			{
				if ( Values === undefined ) { Values = []; }
				if ( !Liquicode.Types.IsFormat( Values, 'object:array' ) ) { throw new Error( `The Values parameter must be an array of values.` ); }
				if ( !Liquicode.Types.IsFormat( Values, 'object:array-array' ) ) { Values = [ Values ]; }
				let at_column_index = this.ColumnIndexOf( Column );
				for ( let row_index = 0; row_index < this.RowData.length; row_index++ )
				{
					let row_values = this.RowData[ row_index ];
					while ( row_values.length <= at_column_index )
					{
						row_values.push( this.Options.default_value );
					}
					for ( let column_index = 0; column_index < Values.length; column_index++ )
					{
						let column_values = Values[ column_index ];
						let value = this.Options.default_value;
						if ( row_index < column_values.length )
						{
							value = column_values[ row_index ];
							if ( this.Options.clone_values )
							{
								value = JSON.parse( JSON.stringify( value ) );
							}
						}
						row_values.splice( ( at_column_index + column_index ), 0, value );
					}
				}
				return;
			},


			//---------------------------------------------------------------------
			DeleteColumns: function ( Column, ColumnCount ) 
			{
				if ( ColumnCount === undefined ) { ColumnCount = 1; }
				if ( !Liquicode.Types.IsFormat( ColumnCount, 'number:integer' ) ) { throw new Error( `The ColumnCount parameter must be a positive integer.` ); }
				if ( ColumnCount <= 0 ) { throw new Error( `The ColumnCount parameter must be a positive integer.` ); }
				let at_column_index = this.ColumnIndexOf( Column );
				for ( let row_index = 0; row_index < this.RowData.length; row_index++ )
				{
					let row_values = this.RowData[ row_index ];
					if ( row_values.length > at_column_index )
					{
						row_values.splice( at_column_index, ColumnCount );
					}
				}
				return;
			},


			//---------------------------------------------------------------------
			GetColumn: function ( Column ) 
			{
				let values = [];
				let at_column_index = this.ColumnIndexOf( Column );
				for ( let row_index = 0; row_index < this.RowData.length; row_index++ )
				{
					let row_values = this.RowData[ row_index ];
					let value = this.Options.default_value;
					if ( at_column_index < row_values.length )
					{
						value = row_values[ at_column_index ];
						if ( this.Options.clone_values )
						{
							value = JSON.parse( JSON.stringify( value ) );
						}
					}
					values.push( value );
				}
				return values;
			},


			//---------------------------------------------------------------------
			SetColumn: function ( Column, Values ) 
			{
				if ( Values === undefined ) { Values = []; }
				if ( !Liquicode.Types.IsFormat( Values, 'object:array' ) ) { throw new Error( `The Values parameter must be an array of values.` ); }
				let at_column_index = this.ColumnIndexOf( Column );
				for ( let row_index = 0; row_index < this.RowData.length; row_index++ )
				{
					let row_values = this.RowData[ row_index ];
					while ( row_values.length <= at_column_index )
					{
						row_values.push( this.Options.default_value );
					}
					let value = this.Options.default_value;
					if ( row_index < Values.length )
					{
						value = Values[ row_index ];
						if ( this.Options.clone_values )
						{
							value = JSON.parse( JSON.stringify( value ) );
						}
					}
					row_values[ at_column_index ] = value;
				}
				return;
			},


			//=====================================================================
			//=====================================================================
			//
			//		MATRIX VALUE FUNCTIONS
			//
			//=====================================================================
			//=====================================================================


			//---------------------------------------------------------------------
			GetValue: function ( Row, Column ) 
			{
				let at_row_index = null;
				let at_column_index = null;
				if ( ( typeof Row === 'string' ) && ( Column === undefined ) )
				{
					at_row_index = this.RowIndexOf( Row );
					at_column_index = this.ColumnIndexOf( Row );
				}
				else
				{
					at_row_index = this.RowIndexOf( Row );
					at_column_index = this.ColumnIndexOf( Column );
				}
				let row_values = this.RowData[ at_row_index ];
				let value = this.Options.default_value;
				if ( at_column_index < row_values.length )
				{
					value = row_values[ at_column_index ];
					if ( this.Options.clone_values )
					{
						value = JSON.parse( JSON.stringify( value ) );
					}
				}
				return value;
			},


			//---------------------------------------------------------------------
			SetValue: function ( Row, Column, Value ) 
			{
				let at_row_index = null;
				let at_column_index = null;
				if ( ( typeof Row === 'string' ) && ( Value === undefined ) )
				{
					at_row_index = this.RowIndexOf( Row );
					at_column_index = this.ColumnIndexOf( Row );
					Value = Column;
				}
				else
				{
					at_row_index = this.RowIndexOf( Row );
					at_column_index = this.ColumnIndexOf( Column );
				}
				if ( Value === undefined ) { Value = this.Options.default_value; }
				let row_values = this.RowData[ at_row_index ];
				while ( at_column_index >= row_values.length )
				{
					row_values.push( this.Options.default_value );
				}
				let value = Value;
				if ( this.Options.clone_values )
				{
					value = JSON.parse( JSON.stringify( value ) );
				}
				row_values[ at_column_index ] = value;
				return;
			},


			//---------------------------------------------------------------------
			GetMatrix: function ( Row, Column, RowCount, ColumnCount ) 
			{
				let at_row_index = null;
				let at_column_index = null;
				if ( ( typeof Row === 'string' ) && ( ColumnCount === undefined ) )
				{
					at_row_index = this.RowIndexOf( Row );
					at_column_index = this.ColumnIndexOf( Row );
					ColumnCount = RowCount;
					RowCount = Column;
				}
				else
				{
					at_row_index = this.RowIndexOf( Row );
					at_column_index = this.ColumnIndexOf( Column );
				}
				if ( RowCount === undefined ) { throw new Error( `The RowCount parameter is required.` ); }
				if ( ColumnCount === undefined ) { ColumnCount = RowCount; }
				let target_matrix = Liquicode.Shapes.Matrix( 0, this.Options );
				for ( let row_index = 0; row_index < RowCount; row_index++ )
				{
					if ( ( at_row_index + row_index ) >= this.RowData.length ) { break; }
					let source_values = this.GetRow( at_row_index + row_index );
					let target_values = [];
					for ( let column_index = 0; column_index < ColumnCount; column_index++ )
					{
						if ( ( at_column_index + column_index ) >= source_values.length ) { break; }
						target_values.push( source_values[ at_column_index + column_index ] );
					}
					target_matrix.AppendRows( target_values );
				}
				return target_matrix;
			},


			//---------------------------------------------------------------------
			SetMatrix: function ( Row, Column, Matrix ) 
			{
				let at_row_index = null;
				let at_column_index = null;
				if ( ( typeof Row === 'string' ) && ( Matrix === undefined ) )
				{
					at_row_index = this.RowIndexOf( Row );
					at_column_index = this.ColumnIndexOf( Row );
					Matrix = Column;
				}
				else
				{
					at_row_index = this.RowIndexOf( Row );
					at_column_index = this.ColumnIndexOf( Column );
				}
				if ( Matrix === undefined ) { throw new Error( `The Matrix parameter is required.` ); }
				if ( Matrix === null ) { throw new Error( `The Matrix parameter is required.` ); }
				let source_row_count = Matrix.RowCount();
				let source_column_count = Matrix.ColumnCount();
				for ( let row_index = 0; row_index < source_row_count; row_index++ )
				{
					for ( let column_index = 0; column_index < source_column_count; column_index++ )
					{
						let value = Matrix.GetValue( row_index, column_index );
						value = JSON.parse( JSON.stringify( value ) );
						this.SetValue( at_row_index + row_index, at_column_index + column_index, value );
					}
				}
				return;
			},


			//=====================================================================
			//=====================================================================
			//
			//		TABLE FUNCTIONS
			//
			//=====================================================================
			//=====================================================================


			//---------------------------------------------------------------------
			Clone: function () 
			{
				return Liquicode.Shapes.Matrix(
					JSON.parse( JSON.stringify( this.RowData ) ),
					JSON.parse( JSON.stringify( this.Options ) ),
				);
			},


			//---------------------------------------------------------------------
			Transpose: function () 
			{
				let new_matrix = Liquicode.Shapes.Matrix( 0 );
				let column_count = this.ColumnCount();
				for ( let column_index = 0; column_index < column_count; column_index++ )
				{
					let values = this.GetColumn( column_index );
					new_matrix.AppendRows( values );
				}
				return new_matrix;
			},


			//---------------------------------------------------------------------
			Join: function ( AtColumn, JoinType, RightMatrix, RightColumn ) 
			{
				// Get the left and right column counts.
				let left_column_count = this.ColumnCount();
				let right_column_count = RightMatrix.ColumnCount();

				// Get the left join column.
				let left_join_column = this.GetColumn( AtColumn );

				// Get the right join column.
				let right_join_column = RightMatrix.GetColumn( RightColumn );

				// Get the left values.
				let left_values = this.RowData;

				// Get the right values.
				let right_values = RightMatrix.RowData;

				// Build the join map.
				let join_map = [];
				JoinType = JoinType.toLowerCase();
				if ( JoinType === 'inner' )
				{
					left_join_column.forEach(
						( left_join_value, left_join_index ) =>
						{
							right_join_column.forEach(
								( right_join_value, right_join_index ) =>
								{
									if ( right_join_value === left_join_value )
									{
										join_map.push( { left: left_join_index, right: right_join_index } );
									}
								} );
						} );
				}
				else if ( JoinType === 'left' )
				{
					left_join_column.forEach(
						( left_join_value, left_join_index ) =>
						{
							let join_count = 0;
							right_join_column.forEach(
								( right_join_value, right_join_index ) =>
								{
									if ( right_join_value === left_join_value )
									{
										join_map.push( { left: left_join_index, right: right_join_index } );
										join_count++;
									}
								} );
							if ( !join_count ) { join_map.push( { left: left_join_index, right: null } ); }
						} );
				}
				else if ( JoinType === 'right' )
				{
					right_join_column.forEach(
						( right_join_value, right_join_index ) =>
						{
							let join_count = 0;
							left_join_column.forEach(
								( left_join_value, left_join_index ) =>
								{
									if ( right_join_value === left_join_value )
									{
										join_map.push( { left: left_join_index, right: right_join_index } );
										join_count++;
									}
								} );
							if ( !join_count ) { join_map.push( { left: null, right: right_join_index } ); }
						} );
				}
				else if ( JoinType === 'full' )
				{
					left_join_column.forEach(
						( left_join_value, left_join_index ) =>
						{
							let join_count = 0;
							right_join_column.forEach(
								( right_join_value, right_join_index ) =>
								{
									if ( right_join_value === left_join_value )
									{
										join_map.push( { left: left_join_index, right: right_join_index } );
										join_count++;
									}
								} );
							if ( !join_count ) { join_map.push( { left: left_join_index, right: null } ); }
						} );
					right_join_column.forEach(
						( right_join_value, right_join_index ) =>
						{
							let join_count = 0;
							left_join_column.forEach(
								( left_join_value, left_join_index ) =>
								{
									if ( right_join_value === left_join_value )
									{
										join_count++;
									}
								} );
							if ( !join_count ) { join_map.push( { left: null, right: right_join_index } ); }
						} );
				}
				else
				{
					throw new Error( `The [JoinType] parameter has an unknown value "${JoinType}".` );
				}

				// Join the data.
				let join_matrix = [];
				join_map.forEach(
					join =>
					{
						// let row_index = this.RowCount();
						let join_row = [];
						let has_values = false;

						for ( let index = 0; index < left_column_count; index++ )
						{
							if ( ( join.left !== null ) && ( index < left_values[ join.left ].length ) )
							{
								// Append left data values.
								join_row.push( left_values[ join.left ][ index ] );
								has_values = true;
							}
							else
							{
								join_row.push( this.Options.default_value );
							}
						}
						for ( let index = 0; index < right_column_count; index++ )
						{
							if ( ( join.right !== null ) && ( index < right_values[ join.right ].length ) )
							{
								// Append left data values.
								join_row.push( right_values[ join.right ][ index ] );
								has_values = true;
							}
							else
							{
								join_row.push( this.Options.default_value );
							}
						}
						if ( has_values )
						{
							join_matrix.push( join_row );
						}
					}
				);
				if ( this.Options.clone_values )
				{
					join_matrix = JSON.parse( JSON.stringify( join_matrix ) );
				}

				return Liquicode.Shapes.Matrix( join_matrix, this.Options );
			},

		};

		//---------------------------------------------------------------------
		// Assign the initial matrix values.
		if ( Options.clone_values )
		{
			Values = JSON.parse( JSON.stringify( Values ) );
		}
		matrix.RowData = Values;

		//---------------------------------------------------------------------
		// Return the new Matrix.
		return matrix;
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		Matrix: Matrix,
	};
};
