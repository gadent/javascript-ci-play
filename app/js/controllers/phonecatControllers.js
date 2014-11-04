'use strict';

define(['controllers/phoneListCtrl', 'controllers/phoneDetailCtrl','services/phonecatServices'], function(phoneListCtrl, phoneDetailCtrl){
   var controllers = angular.module('phonecatControllers', ['phonecatServices','ngRoute']);
   controllers.controller('phoneListCtrl', phoneListCtrl);
   controllers.controller('phoneDetailCtrl', phoneDetailCtrl);
});

