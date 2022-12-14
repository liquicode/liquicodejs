"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '831',
	member_of: 'System',
	name: 'RunContainer',
	type: 'function',
	returns: 'string',
	description: `
Runs a Docker Container.

Options Parameter:
~~~javascript
{
	name: '',           // Name of the container. Defaults to random name.
	hostname: '',       // Hostname for the container.
	network: '',        // Name of docker network for the container to use.
	ports: [],          // Array of port object { localhost: 80, container: 80 }
	volumes: [],        // Array of volume object { localhost: '/path', container: '/path' }
	environment: {},    // Environment variables and values.
}
~~~

Example:
~~~javascript
let container_id = Liquicode.RunContainer( 'mongo:latest',
	{
		name: 'mongo-server',
		ports: [ { localhost: 27017, container: 27017 } ],
	} );
~~~

`,
	Parameters: {
		ImageName: {
			name: 'ImageName',
			type: 'string',
			required: true,
		},
		Options: {
			name: 'Options',
			type: 'object',
			required: false,
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function RunContainer
	 * @returns {string}
	 * @description
	 * 
Runs a Docker Container.

Options Parameter:
~~~javascript
{
	name: '',           // Name of the container. Defaults to random name.
	hostname: '',       // Hostname for the container.
	network: '',        // Name of docker network for the container to use.
	ports: [],          // Array of port object { localhost: 80, container: 80 }
	volumes: [],        // Array of volume object { localhost: '/path', container: '/path' }
	environment: {},    // Environment variables and values.
}
~~~

Example:
~~~javascript
let container_id = Liquicode.RunContainer( 'mongo:latest',
	{
		name: 'mongo-server',
		ports: [ { localhost: 27017, container: 27017 } ],
	} );
~~~


	 * @param {string} ImageName
	 * @param {object} [Options]
	*/
	//-end-jsdoc-----------------------------------------------------------


	function RunContainer( ImageName, Options ) 
	{
		let command_line = `docker run --rm -d`;
		if ( Options )
		{
			// Container Name
			if ( Options.name )
			{
				if ( typeof Options.name !== 'string' ) { throw new Error( `Options.name must be a string.` ); }
				command_line += ` --name ${Options.name}`;
			}

			// Hostname
			if ( Options.hostname )
			{
				if ( typeof Options.hostname !== 'string' ) { throw new Error( `Options.hostname must be a string.` ); }
				command_line += ` --hostname ${Options.hostname}`;
			}

			// Network
			if ( Options.network )
			{
				if ( typeof Options.network !== 'string' ) { throw new Error( `Options.network must be a string.` ); }
				command_line += ` --network="${Options.network}"`;
			}

			// Publish Ports
			if ( Options.ports )
			{
				if ( !Array.isArray( Options.ports ) ) { throw new Error( `Options.ports must be an array of port definitions.` ); }
				for ( let index = 0; index < Options.ports.length; index++ )
				{
					let port = Options.ports[ index ];
					command_line += ` -p ${port.localhost}:${port.container}`;
				}
			}

			// Shared Volumes
			if ( Options.volumes )
			{
				if ( !Array.isArray( Options.volumes ) ) { throw new Error( `Options.volumes must be an array of volume definitions.` ); }
				for ( let index = 0; index < Options.volumes.length; index++ )
				{
					let volume = Options.volumes[ index ];
					command_line += ` -v ${volume.localhost}:${volume.container}`;
					if ( volume.readonly ) { command_line += `:ro`; }
				}
			}

			// Environment Variables
			if ( Options.environment )
			{
				if ( typeof Options.environment !== 'object' ) { throw new Error( `Options.environment must be an object.` ); }
				let keys = Object.keys( Options.environment );
				for ( let index = 0; index < keys.length; index++ )
				{
					let name = keys[ index ];
					command_line += ` -e "${name}=${Options.environment[ name ]}"`;
				}
			}

		}

		// Image Name
		command_line += ` ${ImageName}`;
		// Initial Command
		if ( Options && ( typeof Options.command === 'string' ) )
		{
			command_line += ` ${Options.command}`;
		}

		let result = Liquicode.System.ExecuteProcess( command_line );
		if ( result.error ) { throw new Error( result.error ); }
		let container_id = result.result.trim();
		return container_id;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		RunContainer: RunContainer,
	};
};
