"use strict";


const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LQC = require( LIB_PATH.resolve( __dirname, '../liquicode-node.js' ) );


//---------------------------------------------------------------------
describe( `103) Object.Merge Tests`, function ()
{

	//---------------------------------------------------------------------
	it( `should merge simple objects`, function ()
	{
		let A = { one: 1, two: 0 };
		let B = { two: 2 };
		let C = LQC.Object.Merge( A, B );
		// C = { one: 1, two: 2 };
		LIB_ASSERT.ok( C );
		LIB_ASSERT.ok( C.one === 1 );
		LIB_ASSERT.ok( C.two === 2 );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should merge nested objects`, function ()
	{
		let A = { misc: { foo: 'bar' }, numbers: { one: 1, two: 0 } };
		let B = { numbers: { two: 2 } };
		let C = LQC.Object.Merge( A, B );
		// C = {
		// 	misc: { foo: 'bar' },
		// 	numbers: { one: 1, two: 2 }
		// };
		LIB_ASSERT.ok( C );
		LIB_ASSERT.ok( C.misc );
		LIB_ASSERT.ok( C.misc.foo === 'bar' );
		LIB_ASSERT.ok( C.numbers );
		LIB_ASSERT.ok( C.numbers.one === 1 );
		LIB_ASSERT.ok( C.numbers.two === 2 );
		return;
	} );

	//---------------------------------------------------------------------
	it( `should merge nested array`, function ()
	{
		let A = { misc: { foo: 'bar' }, numbers: { fib: 'fab' } };
		let B = {
			numbers: [
				{ value: 1 },
				{ value: 2 }
			]
		};
		let C = LQC.Object.Merge( A, B );
		// C = {
		// 	misc: { foo: 'bar' },
		// 	numbers: [
		// 		{ value: 1 },
		// 		{ value: 2 }
		// 	]
		// };
		LIB_ASSERT.ok( C );
		LIB_ASSERT.ok( C.misc );
		LIB_ASSERT.ok( C.misc.foo === 'bar' );
		LIB_ASSERT.ok( C.numbers );
		LIB_ASSERT.ok( Array.isArray( C.numbers ) );
		LIB_ASSERT.ok( C.numbers.length === 2 );
		LIB_ASSERT.ok( C.numbers[ 0 ].value === 1 );
		LIB_ASSERT.ok( C.numbers[ 1 ].value === 2 );
		return;
	} );

	//---------------------------------------------------------------------
	return;
} );
