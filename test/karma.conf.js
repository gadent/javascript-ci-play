module.exports = function(config){
  config.set({

    basePath : '../',

    frameworks: ["jasmine", "requirejs"],

    files : [

      'app/libs/angular/angular.js',
      'app/libs/angular-mocks/angular-mocks.js',
      'app/libs/angular-resource/angular-resource.js',
      'app/libs/angular-route/angular-route.js',
      'app/libs/angular-animate/angular-animate.js',

      {pattern: 'app/libs/**/*.js', included: false},
      {pattern: 'app/js/**/*.js', included: false},
      {pattern: 'test/unit/**/*.js', included: false},

      

      {pattern: 'test/test-main.js', included: true}
    ],

    exclude: ['app/js/main.js'],

    autoWatch : true,

    browsers : ['Chrome'],

    reporters: ['progress','junit','coverage'],

    plugins : [
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-junit-reporter',
            'karma-jasmine',
            'karma-coverage',
	    'karma-requirejs'
            ],
    
    preprocessors: {
      'app/js/**/*.js'  : ['coverage'],
      'app/js/*.js'  : ['coverage']
    },

    junitReporter : {
      outputFile: 'output/unitTest/unit.xml',
      suite: 'unit'
    },
    
    coverageReporter: {
        type: 'cobertura',
        dir: 'output/coverage/'
    }

  });
};