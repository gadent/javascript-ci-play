module.exports = function (config) {
    config.set({
        basePath: '../',
        frameworks: ["jasmine"],
        files: [
            'app/libs/angular/angular.js',
            'app/libs/angular-route/angular-route.js',
            'app/libs/angular-resource/angular-resource.js',
            'app/libs/angular-animate/angular-animate.js',
            'app/libs/angular-mocks/angular-mocks.js',
            'app/js/*.js',
            'test/unit/**/*.js'
        ],
        autoWatch: true,
        browsers: ['Chrome'],
        reporters: ['progress', 'junit', 'coverage'],
        plugins: [
            'karma-chrome-launcher',
            'karma-junit-reporter',
            'karma-jasmine',
            'karma-coverage'
        ],
        preprocessors: {
            'app/js/*.js': ['coverage']
        },
        junitReporter: {
            outputFile: 'output/unitTest/unit.xml',
            suite: 'unit'
        },
        coverageReporter: {
            type: 'cobertura',
            dir: 'output/coverage/'
        }

    });
};