module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //resolve bower dependencies and place in appropriate location
        clean: {
            cleanDist: ['dist', 'output']
        },
        //Static Analysis
        jshint: {
            options: {
                jshintrc: true,
                force: true,
                reporter: 'checkstyle',
                //Dont put within sub-folder otherwise jenkins-checkstyle plugin
                //cannot find source
                reporterOutput: 'jshint_checkstyle.xml'
            },
            all: ['src/app/js/*.js', 'src/app/js/**/*.js']
        },
        copy: {
            copyUnoptimised: {
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: ['**', '!app/css/**', '!app/js/**', '!app/libs**', '!app/index.html'],
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
        concat: {
            options: {
                banner: '/*! Enter own license data here */'
            },
            projectConcat: {
                src: ['src/app/js/*.js'],
                dest: 'dist/app/js/phonecat.min.js'
            },
            projectCssConcat: {
                src: ['src/app/css/*.css'],
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
        cssmin: {
            minifyProjectCss: {
                options: {
                    banner: '/* Add own license Banne for CSS */'
                },
                files: {
                    'dist/app/css/combined.min.css': ['dist/app/css/combined.min.css']
                }
            }
        },
        processhtml: {
            dist: {
                files: {
                    'dist/app/index.html': ['src/app/index.html']
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
                configFile: 'dist/test/karma.conf.js',
                singleRun: true
            }
        },
        //start a simple web server hosting the app to test
        //(Required for protractor to run against)
        connect: {
            deployForTest: {
                options: {
                    base: 'dist/'
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
                    configFile: "dist/test/protractor-conf.js", // Target-specific config file
                    args: {}
                }
            }
        },
        yslow_test: {
            options: {
                info: "grade",
                format: "junit",
                urls: ['http://localhost:8000/app/index.html','http://localhost:8000/app/index.html#/phones/nexus-s'],
                reports: ['output/yslow/yslow.xml']
            },
            your_target: {
                files: []
            }
        },
        compress: {
            main: {
                options: {
                    archive: 'output/<%= pkg.name %>-<%= pkg.version %>.war',
                    mode: 'zip'
                },
                files: [
                    {expand: true, cwd: 'dist/app', src: ['**'], filter: 'isFile'}, // includes files in path
                ]
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
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-yslow-test');

    grunt.registerTask('optimise', ['concat', 'uglify', 'cssmin', 'processhtml']);
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
    grunt.registerTask('devBuild', ['build', 'unitTest', 'integrationTest', 'yslow_test', 'analyse']);
    //build to run in headless environment (Jenkins)
    grunt.registerTask('ciBuild', ['build', 'headlessStart', 'unitTest', 'integrationTest', 'yslow_test', 'headlessFinish', 'analyse']);
    //leave default as non CI build so its easy for devs to run
    grunt.registerTask('default', ['devBuild']);
    grunt.registerTask('package', ['compress']);
};


