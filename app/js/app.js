'use strict';

console.log("in app.js");

/* App Module */
define(['config', 'filters/phonecatFilters',
	'controllers/phonecatControllers','animations/phonecatAnimations'],
 
  function(config){
    var app = angular.module('phonecatApp', ['ngRoute', 'phonecatControllers', 'phonecatFilters', 'phonecatAnimations']);
    app.config(config);

 
});
