var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/Spec\.js$/.test(file)) {
      tests.push(file);
    }
  }
}

console.log(tests);

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/app/js',

    paths: {
      'angular' : '../libs/angular/angular',
      'angular-mocks' : '../libs/angular-mocks/angular-mocks',
      'ngRoute' : '../libs/angular-route/angular-route',
      'ngResource': '../libs/angular-resource/angular-resource',
      'ngAnimate' : '../libs/angular-animate/angular-animate',
      'jquery' : '../libs/jquery/jquery'
      
    },
    shim: {
        ngResource: {
            deps: ['angular'],
            exports: 'angular'
        },
        ngRoute: {
            deps: ['angular'],
            exports: 'angular'
        },
        ngAnimate: {
            deps: ['angular'],
            exports: 'angular'
        },
        angular: {
            exports : 'angular'
        }
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});