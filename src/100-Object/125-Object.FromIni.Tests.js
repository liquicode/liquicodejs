"use strict";


const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LQC = require( LIB_PATH.resolve( __dirname, '../liquicode-node.js' ) );


//---------------------------------------------------------------------
describe( `125) Object.FromIni Tests`, function ()
{

	//---------------------------------------------------------------------
	it( `should handle simple cases`, function ()
	{
		let data1 =
		{
			Section1: { Entry1: 'one', Entry2: 2 },
			Section2: { Entry1: 1, Entry2: true },
		};
		let text = LQC.Object.ToIni( data1 );
		let data2 = LQC.Object.FromIni( text );
		LIB_ASSERT.strictEqual( data2.Section1.Entry1, 'one' );
		LIB_ASSERT.strictEqual( data2.Section1.Entry2, '2' );
		LIB_ASSERT.strictEqual( data2.Section2.Entry1, '1' );
		LIB_ASSERT.strictEqual( data2.Section2.Entry2, 'true' );
	} );

	//---------------------------------------------------------------------
	it( `should ignore invalid sections and entries`, function ()
	{
		let data1 =
		{
			Section1: { Entry1: 'one', Entry2: 2 },
			Section2: { Entry1: 1, Entry2: true, Entry3: { foo: 'bar' } }, // Invalid Entry: Entries must be primitive types.
			InvalidSection1: 'foo',			// Invalid Section: An INI section must be represented by an object.
			InvalidSection2: [ 1, 2, 3 ],	// Invalid Section: An INI section must be represented by an object.
		};
		let text = LQC.Object.ToIni( data1 );
		let data2 = LQC.Object.FromIni( text );
		LIB_ASSERT.strictEqual( data2.Section1.Entry1, 'one' );
		LIB_ASSERT.strictEqual( data2.Section1.Entry2, '2' );
		LIB_ASSERT.strictEqual( data2.Section2.Entry1, '1' );
		LIB_ASSERT.strictEqual( data2.Section2.Entry2, 'true' );
		LIB_ASSERT.strictEqual( data2.InvalidSection1, undefined );
		LIB_ASSERT.strictEqual( data2.InvalidSection2, undefined );
		LIB_ASSERT.strictEqual( data2.Section2.Entry3, undefined );
	} );

	//---------------------------------------------------------------------
	return;
} );
