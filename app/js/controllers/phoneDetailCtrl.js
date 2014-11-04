'use strict';

console.log("in phoneDetailCtrl.js");

define(['services/phoneDataService'], function(){

  function phoneDetailCtrl($scope, $routeParams, phoneDataService) {
    $scope.phone = phoneDataService.get({phoneId: $routeParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }

  phoneDetailCtrl.$inject=['$scope', '$routeParams', 'phoneDataService'];

  return phoneDetailCtrl;
});
