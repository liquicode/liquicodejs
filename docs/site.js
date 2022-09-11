'use strict';


var app = angular.module(
	'Application_Module',
	[
		// 'ngCookies',
		// 'ngResource',
		'ngSanitize',
		// 'ngTouch',
	],
);


app.controller(
	'Home_Controller',
	function ( $scope )
	{


		//---------------------------------------------------------------------
		var Page = {
			VersionNumber: window.Locals.VersionNumber,
			Schemas: window.Locals.Schemas,
		};
		$scope.Page = Page;


		//---------------------------------------------------------------------
		Page.GetText = function ( String_or_Array )
		{
			if ( typeof String_or_Array === 'undefined' ) { return ''; }
			else if ( typeof String_or_Array === 'string' ) { return String_or_Array; }
			else if ( Array.isArray( String_or_Array ) ) { return String_or_Array.join( '\n<br>\n' ); }
			else { return String_or_Array.toString(); }
		};


		//---------------------------------------------------------------------
		Page.GetSlimey = function ()
		{
			let image_name = Math.floor( Math.random() * 125 ) + 1;
			image_name = 'slimey-' + ( '' + image_name ).padStart( 3, '0' ) + '.png';
			return 'components/Slimey/images/' + image_name;
		};


		console.log( "Loading LiquicodeJS (v" + Page.VersionNumber + ")" );
		console.log( "Loaded " + Page.Schemas.length + " schemas." );

		$( 'table' ).addClass( 'w3-table w3-border w3-bordered w3-centered' );
		$( 'details' ).addClass( 'w3-container w3-border w3-round-large w3-sand w3-padding' );
		$( 'summary' ).addClass( 'w3-large w3-round-large' );
		$( 'blockquote' ).addClass( 'w3-container w3-border w3-round-large w3-light-blue' );

		//---------------------------------------------------------------------
		// Exit Controller
		return;
	} );
