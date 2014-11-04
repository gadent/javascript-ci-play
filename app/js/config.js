define(['ngRoute'], function(){

  console.log("in config.js");

	function config($routeProvider) {
    $routeProvider.
      when('/phones', {
        templateUrl: 'partials/phone-list.html',
        controller: 'phoneListCtrl'
      }).
      when('/phones/:phoneId', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'phoneDetailCtrl'
      }).
      otherwise({
        redirectTo: '/phones'
      });
  }

  config.$inject=['$routeProvider'];
 
  return config;

});