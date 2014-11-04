'use strict'

define(['services/phoneDataService'], function(){

	function phoneListCtrl($scope, phoneDataService){
		$scope.phones = phoneDataService.query();
    	$scope.orderProp = 'age';
	};

	phoneListCtrl.$inject=['$scope', 'phoneDataService'];

	return phoneListCtrl;

});
