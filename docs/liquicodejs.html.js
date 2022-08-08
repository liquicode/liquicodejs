'use strict';


var app = angular.module(
	'Application_Module',
	[
		// 'ngCookies',
		// 'ngResource',
		// 'ngSanitize',
		// 'ngTouch',
	],
);


app.controller(
	'Home_Controller',
	function ( $scope, $http, $window, $location, $cookies )
	{


		//---------------------------------------------------------------------
		var Page = {
			VersionNumber: window.Locals.VersionNumber,
			Schemas: window.Locals.Schemas,
		};
		$scope.Page = Page;


		//---------------------------------------------------------------------
		// Exit Controller
		return;
	} );
