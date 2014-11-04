'use strict';

define(['services/phonecatServices'], function(){

    describe('service', function() {

      // load modules
      beforeEach(module('phonecatServices'));
	
      // Test service availability
      it('check the existence of Phone factory', inject(function(phoneDataService) {
        expect(phoneDataService).toBeDefined();
      }));
    });
})

