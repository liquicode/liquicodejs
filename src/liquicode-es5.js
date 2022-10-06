"use strict";

var Liquicode = {};

Liquicode.version = 'v0.0.21';
Liquicode.environment = 'es5';

function build_library( Group, Filename )
{
	Liquicode[ Group ] = {};
	let members = require( Filename )( Liquicode );
	let member_keys = Object.keys( members );
	for ( let index = 0; index < member_keys.length; index++ )
	{
		let member_key = member_keys[ index ];
		if ( member_key === '_Schema' ) { continue; }
		Liquicode[ member_key ] = members[ member_key ];
		Liquicode[ Group ][ member_key ] = members[ member_key ];
	}
	Liquicode.Types = require( './000-Types/000-Types.js' )( Liquicode );
	return;
}

build_library( 'Types', './000-Types/000-Types.js' );
build_library( 'Object', './100-Object/100-Object.js' );
build_library( 'Text', './200-Text/200-Text.js' );
build_library( 'Shapes', './300-Shapes/300-Shapes.js' );
build_library( 'Parse', './500-Parse/500-Parse.js' );
// build_library( 'System', './800-System/800-System.js' );
// build_library( 'Network', './900-Network/900-Network.js' );

// Liquicode.Types = require( './000-Types/000-Types.js' )( Liquicode );
// Liquicode.Object = require( './100-Object/100-Object.js' )( Liquicode );
// Liquicode.Text = require( './200-Text/200-Text.js' )( Liquicode );
// Liquicode.Shapes = require( './300-Shapes/300-Shapes.js' )( Liquicode );
// Liquicode.Parse = require( './500-Parse/500-Parse.js' )( Liquicode );
// // Liquicode.System = require( './800-System/800-System.js' )( Liquicode );
// // Liquicode.Network = require( './900-Network/900-Network.js' )( Liquicode );

// delete Liquicode.Types._Schema;
// delete Liquicode.Object._Schema;
// delete Liquicode.Text._Schema;
// delete Liquicode.Shapes._Schema;
// delete Liquicode.Parse._Schema;
// // delete Liquicode.System._Schema;
// // delete Liquicode.Network._Schema;

if ( typeof window !== 'undefined' ) { window.Liquicode = Liquicode; }
if ( typeof module !== 'undefined' ) { module.exports = Liquicode; }

