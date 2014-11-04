'use strict'

define(['services/phoneDataService'], function(phoneDataService){
    var services = angular.module('phonecatServices', ['ngResource']);
    services.factory('phoneDataService', phoneDataService);
})


