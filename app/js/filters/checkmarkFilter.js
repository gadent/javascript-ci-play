'use strict';

/* Filters */


define([],function(){

	function checkmarkFilter(){
		return function (input){
			return input ? '\u2713' : '\u2718';
		};
	};

	checkmarkFilter.$inject=[];

	return checkmarkFilter;

});

