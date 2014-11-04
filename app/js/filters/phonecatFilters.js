'use strict';

define(['filters/checkmarkFilter'], function(checkmarkFilter){
    var filters = angular.module('phonecatFilters', []);
    filters.filter('checkmark', checkmarkFilter);
});

