"use strict";


const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LQC = require( LIB_PATH.resolve( __dirname, '../liquicode-node.js' ) );


//---------------------------------------------------------------------
describe( `510) Parse.DateParse Tests`, function ()
{

	// //---------------------------------------------------------------------
	// it( `Date Test`, function ()
	// {
	// 	let date = new Date();
	// 	LIB_ASSERT.ok( typeof date === 'object' );

	// 	date = new Date( '2022-08-07 GMT+0000' );
	// 	LIB_ASSERT.ok( date.getUTCFullYear() === 2022 );
	// 	LIB_ASSERT.ok( date.getUTCMonth() === 7 );
	// 	LIB_ASSERT.ok( date.getUTCDate() === 7 );
	// 	LIB_ASSERT.ok( date.getUTCHours() === 0 );
	// 	LIB_ASSERT.ok( date.getUTCMinutes() === 0 );
	// 	LIB_ASSERT.ok( date.getUTCSeconds() === 0 );
	// 	LIB_ASSERT.ok( date.getUTCMilliseconds() === 0 );

	// 	date = new Date( '0101-01-01 20:00:00 GMT+0000' );
	// 	LIB_ASSERT.ok( isNaN( date.getTime() ) === false );
	// 	LIB_ASSERT.ok( date.getUTCFullYear() === 101 );
	// 	LIB_ASSERT.ok( date.getUTCMonth() === 0 );
	// 	LIB_ASSERT.ok( date.getUTCDate() === 1 );

	// 	date = new Date( '0101-01-01 abc GMT+0000' );
	// 	LIB_ASSERT.ok( isNaN( date.getTime() ) === true );

	// 	date = new Date( '0101-01-01 0101-01-01 18:00 GMT+0000' );
	// 	LIB_ASSERT.ok( isNaN( date.getTime() ) === true );

	// 	date = new Date( '0101-01-01 18:00 abc GMT+0000' );
	// 	LIB_ASSERT.ok( isNaN( date.getTime() ) === true );

	// 	return;
	// } );

	//---------------------------------------------------------------------
	describe( `Various Date Formats`, function ()
	{

		//---------------------------------------------------------------------
		it( `handle: mm/dd/yyyy`, function ()
		{
			let parts = LQC.Parse.DateParse( '05/01/2005' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T00:00:00.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: m/d/yyyy`, function ()
		{
			let parts = LQC.Parse.DateParse( '5/1/2005' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T00:00:00.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: mm-dd-yyyy`, function ()
		{
			let parts = LQC.Parse.DateParse( '05-01-2005' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T00:00:00.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: m-d-yyyy`, function ()
		{
			let parts = LQC.Parse.DateParse( '5-1-2005' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T00:00:00.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: yyyy-mm-dd`, function ()
		{
			let parts = LQC.Parse.DateParse( '2005-05-01' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T00:00:00.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: yyyy-m-d`, function ()
		{
			let parts = LQC.Parse.DateParse( '2005-5-1' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T00:00:00.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: month d, yyyy`, function ()
		{
			let parts = LQC.Parse.DateParse( 'May 1, 2005' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T00:00:00.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: month-d-yyyy`, function ()
		{
			let parts = LQC.Parse.DateParse( 'May-1-2005' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T00:00:00.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: month/d/yyyy`, function ()
		{
			let parts = LQC.Parse.DateParse( 'May/1/2005' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T00:00:00.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: d month yyyy`, function ()
		{
			let parts = LQC.Parse.DateParse( '1 May 2005' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T00:00:00.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: d-month-yyyy`, function ()
		{
			let parts = LQC.Parse.DateParse( '1 May 2005' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T00:00:00.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: d/month/yyyy`, function ()
		{
			let parts = LQC.Parse.DateParse( '1/May/2005' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T00:00:00.000Z' );
		} );

	} );


	//---------------------------------------------------------------------
	describe( `Parse Day of week`, function ()
	{

		//---------------------------------------------------------------------
		it( `handle: dow, dd month yyyy`, function ()
		{
			let parts = LQC.Parse.DateParse( 'Wed, 29 Jul 2020' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2020-07-29T00:00:00.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: dow,dd month yyyy hh:mm:ss zone+offset`, function ()
		{
			let parts = LQC.Parse.DateParse( 'Wed,29 Jul 2020' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2020-07-29T00:00:00.000Z' );
		} );

	} );


	//---------------------------------------------------------------------
	describe( `Parse Date and Time`, function ()
	{

		//---------------------------------------------------------------------
		it( `handle: mm/dd/yyyy hh:mm:ss`, function ()
		{
			let parts = LQC.Parse.DateParse( '05/01/2005 09:05:23' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T09:05:23.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: mm/dd/yyyy hh:mm:ss.nnn`, function ()
		{
			let parts = LQC.Parse.DateParse( '05/01/2005 09:05:23.421' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T09:05:23.421Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: mm/dd/yyyy h:mm:ss`, function ()
		{
			let parts = LQC.Parse.DateParse( '05/01/2005 9:05:23' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T09:05:23.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: mm/dd/yyyy - h:mm`, function ()
		{
			let parts = LQC.Parse.DateParse( '05/01/2005 - 9:05' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T09:05:00.000Z' );
		} );

	} );


	//---------------------------------------------------------------------
	describe( `Parse Time Zones`, function ()
	{

		//---------------------------------------------------------------------
		it( `handle: ISO Format`, function ()
		{
			let parts = LQC.Parse.DateParse( '2005-05-01T14:05:23.000Z' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T14:05:23.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: ISO Format (short)`, function ()
		{
			let parts = LQC.Parse.DateParse( '2005-05-01T14:05:23Z' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T14:05:23.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: mm/dd/yyyy hh:mm:ss zone`, function ()
		{
			let parts = LQC.Parse.DateParse( '05/01/2005 14:05:23 GMT' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T14:05:23.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: mm/dd/yyyy hh:mm:ss +offset`, function ()
		{
			let parts = LQC.Parse.DateParse( '05/01/2005 14:05:23 +0100' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T13:05:23.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: mm/dd/yyyy hh:mm:ss +offset (no zeros)`, function ()
		{
			let parts = LQC.Parse.DateParse( '05/01/2005 14:05:23 +1' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T13:05:23.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: mm/dd/yyyy hh:mm:ss +offset (as time)`, function ()
		{
			let parts = LQC.Parse.DateParse( '05/01/2005 14:05:23 +01:00' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T13:05:23.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: mm/dd/yyyy hh:mm:ss -offset`, function ()
		{
			let parts = LQC.Parse.DateParse( '05/01/2005 14:05:23 -0100' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T15:05:23.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: mm/dd/yyyy hh:mm:ss zone+offset`, function ()
		{
			let parts = LQC.Parse.DateParse( '05/01/2005 14:05:23 GMT+0100' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T13:05:23.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: mm/dd/yyyy hh:mm:ss zone-offset`, function ()
		{
			let parts = LQC.Parse.DateParse( '05/01/2005 14:05:23 GMT-0100' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T15:05:23.000Z' );
		} );

	} );


	//---------------------------------------------------------------------
	describe( `Compressed date strings`, function ()
	{

		//---------------------------------------------------------------------
		it( `handle: compressed date`, function ()
		{
			let parts = LQC.Parse.DateParse( '20050501' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T00:00:00.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: compressed date and time`, function ()
		{
			let parts = LQC.Parse.DateParse( '20050501150523' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2005-05-01T15:05:23.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: number of seconds since whenever`, function ()
		{
			let parts = LQC.Parse.DateParse( '1465241631' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2016-06-06T19:33:51.000Z' );
		} );

		//---------------------------------------------------------------------
		it( `handle: number of milliseconds since whenever`, function ()
		{
			let parts = LQC.Parse.DateParse( '1465241631421' );
			LIB_ASSERT.ok( parts.date, 'Invalid date.' );
			LIB_ASSERT.strictEqual( parts.date.toISOString(), '2016-06-06T19:33:51.421Z' );
		} );

	} );


	//---------------------------------------------------------------------
	describe( `Reject invalid dates`, function ()
	{

		//---------------------------------------------------------------------
		it( `reject: empty string`, function ()
		{
			let parts = LQC.Parse.DateParse( '' );
			LIB_ASSERT.strictEqual( parts.date, null, 'Invalid date.' );
		} );

		//---------------------------------------------------------------------
		it( `reject: garbage`, function ()
		{
			let parts = LQC.Parse.DateParse( 'Hello, World!' );
			LIB_ASSERT.strictEqual( parts.date, null, 'Invalid date.' );
		} );

	} );


} );
