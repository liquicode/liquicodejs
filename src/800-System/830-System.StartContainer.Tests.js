"use strict";


const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LQC = require( LIB_PATH.resolve( __dirname, '../liquicode-node.js' ) );
const TEST_DATA_FOLDER = LIB_PATH.resolve( __dirname, '../../tests/_test-data' );


//---------------------------------------------------------------------
describe( `830) System.StartContainer Tests`, function ()
{

	//---------------------------------------------------------------------
	it( `should start and stop a container`, function ()
	{
		let container_id = LQC.System.StartContainer( 'nginx', {
			hostname: 'test-nginx',
			network: 'bridge',
			environment: {
				test: 'true',
			},
			ports: [
				{
					container: 80,
					localhost: 8080,
				},
			],
			volumes: [
				{
					container: '/usr/share/nginx/html',
					localhost: TEST_DATA_FOLDER,
					readonly: true,
				},
			],
		} );
		LIB_ASSERT.ok( container_id );
		let status = LQC.System.ContainerStatus( container_id );
		LIB_ASSERT.ok( status.State.Running );
		LQC.System.StopContainer( container_id );
		return;
	} );

	//---------------------------------------------------------------------
	return;
} );
