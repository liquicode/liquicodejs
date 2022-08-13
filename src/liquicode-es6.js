"use strict";


var Liquicode = {};

Liquicode.version = 'v0.0.1';
Liquicode.environment = 'es6';

Liquicode.Types = require( './000-Types/000-Types.js' )( Liquicode );
Liquicode.Object = require( './100-Object/100-Object.js' )( Liquicode );
Liquicode.Text = require( './200-Text/200-Text.js' )( Liquicode );
Liquicode.Parse = require( './500-Parse/500-Parse.js' )( Liquicode );
// Liquicode.File = require( './800-File/800-File.js' )( Liquicode );
// Liquicode.Net = require( './900-Net/900-Net.js' )( Liquicode );

delete Liquicode.Types._Schema;
delete Liquicode.Object._Schema;
delete Liquicode.Text._Schema;
delete Liquicode.Parse._Schema;
// delete Liquicode.File._Schema;
// delete Liquicode.Net._Schema;


module.exports = Liquicode;

