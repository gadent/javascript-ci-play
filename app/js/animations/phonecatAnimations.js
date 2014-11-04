'use strict';

define(['animations/phoneAnimation'], function(phoneAnimation){
   var animations = angular.module('phonecatAnimations', ['ngAnimate']);
   animations.animation('.phone', phoneAnimation);
});


