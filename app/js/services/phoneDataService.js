'use strict';

/* Services */

console.log("in phoneDataService.js");

define(['ngResource'],function(){

	function phoneDataService($resource){

		var phone = $resource('phones/:phoneId.json', {}, {
      		query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    	})

		return phone;
	};

	phoneDataService.$inject=['$resource']

	return phoneDataService;

});

