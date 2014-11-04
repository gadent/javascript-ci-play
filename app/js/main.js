'use strict'
console.log("in main.js");

//the require library is configuring paths
require.config({
  paths: {
      'angular' : '../libs/angular/angular',
      'ngRoute' : '../libs/angular-route/angular-route',
      'ngResource': '../libs/angular-resource/angular-resource',
      'ngAnimate' : '../libs/angular-animate/angular-animate',
      'jquery' : '../libs/jquery/jquery'
      
  },
  shim: {
      ngResource: {
          deps: ['angular'],
          exports: 'angular'
      },
      ngRoute: {
          deps: ['angular'],
          exports: 'angular'
      },
      ngAnimate: {
          deps: ['angular'],
          exports: 'angular'
      },
      angular: {
          exports : 'angular'
      },
      app: {
          deps: ['ngResource','ngRoute','ngAnimate']
      }
  },
  baseUrl: 'js'
});

require(['app'],
	function() {
		angular.bootstrap(document, ['phonecatApp'])
	}
);