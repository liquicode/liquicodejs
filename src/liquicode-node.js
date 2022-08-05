"use strict";


var Liquicode = {};

Liquicode.version = 'v0.0.1';
Liquicode.environment = 'node';

Liquicode.Core = require( './000-Core/000-Core.js' )( Liquicode );
Liquicode.Object = require( './100-Object/100-Object.js' )( Liquicode );
Liquicode.Text = require( './200-Text/200-Text.js' )( Liquicode );
Liquicode.Json = require( './300-Json/300-Json.js' )( Liquicode );
Liquicode.Date = require( './400-Date/400-Date.js' )( Liquicode );
Liquicode.Token = require( './500-Token/500-Token.js' )( Liquicode );
Liquicode.File = require( './800-File/800-File.js' )( Liquicode );

module.exports = Liquicode;

