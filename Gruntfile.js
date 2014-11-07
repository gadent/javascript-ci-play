module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //resolve bower dependencies and place in appropriate location
        clean: {
            cleanDist: ['dist']
        },
        copy: {
            copyUnoptimised: {
                files: [
                    {
                        expand: true,
                        src: ['app/partials/**', 'app/phones/**',  'app/img/**'],
                        dest: 'dist'
                    }
                ]
            }
        },
        bower: {
            install: {
                options: {
                    targetDir: 'dist/app/libs',
                    copy: true,
                    install: true
                }
            }
        },
        //Startup a shell and start the Xvfb server (provides display on :99)
        shell: {
            xvfb: {
                command: 'Xvfb :99 -ac -screen 0 1600x1200x24',
                options: {
                    async: true
                }
            }
        },
        //export the DISPLAY environment variable so headless tests can connect to display
        env: {
            xvfb: {
                DISPLAY: ':99'
            }
        },
        //Unit test run (Runs once as opposed to watch as its a CI build)
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                basePath: '../dist/',
                singleRun: true,
                options: {
                    files: [
                        'app/libs/jquery/*.js',
                        'app/libs/angular/*.js',
                        'app/libs/**/*.js',
                        'app/js/phonecat.min.js',
                        '../test/unit/**/*.js'
                    ]
                }
            }
        },
        //start a simple web server hosting the app to test
        //(Required for protractor to run against)
        connect: {
            deployForTest: {
                options: {
                    base: 'dist'
                }
            }
        },
        //Run E2E tests
        protractor: {
            options: {
                keepAlive: true, // If false, the grunt process stops when the test fails.
                args: {
                }
            },
            e2e: {// Grunt requires at least one target to run so you can simply put 'all: {}' here too.
                options: {
                    configFile: "test/protractor-conf.js", // Target-specific config file
                    args: {}
                }
            }
        },
        //Static Analysis
        jshint: {
            options: {
                jshintrc: true,
                force: true,
                //output using checkstyle format so results can be reported in
                //jenkins
                reporter: 'checkstyle',
                //Dont put within sub-folder otherwise jenkins-checkstyle plugin
                //cannot find source
                reporterOutput: 'jshint_checkstyle.xml'
            },
            all: ['app/js/*.js', 'app/js/**/*.js']
        },
        concat: {
            options: {
                stripBanners: false,
                banner: '/*! Enter own license data here */'
            },
            projectConcat: {
                src: ['app/js/*.js'],
                dest: 'dist/app/js/phonecat.min.js'
            },
            projectCssConcat: {
                src: ['app/css/*.css'],
                dest: 'dist/app/css/combined.min.css'
            }
        },
        uglify: {
            minifyProject: {
                options: {
                    preserveComments: 'some'
                },
                files: {
                    'dist/app/js/phonecat.min.js': ['dist/app/js/phonecat.min.js']
                }
            }
        },
        processhtml: {
            dist: {
                files: {
                    'dist/app/index.html': ['app/index.html']
                }
            }
        }

    });
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-shell-spawn');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-processhtml');

    grunt.registerTask('optimise', ['concat', 'uglify', 'processhtml']);

    grunt.registerTask('build', ['clean', 'bower', 'copy', 'optimise']);
    //For use in a CI environment (Start a shell and setup the environment)
    grunt.registerTask('headlessStart', ['shell:xvfb', 'env:xvfb']);
    grunt.registerTask('headlessFinish', ['shell:xvfb:kill']);
    grunt.registerTask('unitTest', ['karma']);
    grunt.registerTask('headless-unitTest', ['headlessStart', 'unitTest', 'headlessFinish']);
    grunt.registerTask('integrationTest', ['connect', 'protractor']);
    grunt.registerTask('headless-integrationTest', ['headlessStart', 'integrationTest', 'headlessFinish']);
    //Static analysis
    grunt.registerTask('analyse', ['jshint']);
    //build to run in dev environment (Windowing already setup)
    grunt.registerTask('devBuild', ['build', 'unitTest', 'integrationTest', 'analyse']);
    //build to run in headless environment (Jenkins)
    grunt.registerTask('ciBuild', ['build', 'headlessStart', 'unitTest', 'integrationTest', 'headlessFinish', 'analyse']);
    //leave default as non CI build so its easy for devs to run
    grunt.registerTask('default', ['devBuild']);
};


