"use strict";


var Liquicode = {};

Liquicode.version = 'v0.0.20';
Liquicode.environment = 'node-min';

Liquicode.Types = require( './000-Types/000-Types.js' )( Liquicode );
Liquicode.Object = require( './100-Object/100-Object.js' )( Liquicode );
Liquicode.Text = require( './200-Text/200-Text.js' )( Liquicode );
Liquicode.Shapes = require( './300-Shapes/300-Shapes.js' )( Liquicode );
Liquicode.Parse = require( './500-Parse/500-Parse.js' )( Liquicode );
Liquicode.System = require( './800-System/800-System.js' )( Liquicode );
Liquicode.Network = require( './900-Network/900-Network.js' )( Liquicode );

delete Liquicode.Types._Schema;
delete Liquicode.Object._Schema;
delete Liquicode.Text._Schema;
delete Liquicode.Shapes._Schema;
delete Liquicode.Parse._Schema;
delete Liquicode.System._Schema;
delete Liquicode.Network._Schema;


module.exports = Liquicode;

