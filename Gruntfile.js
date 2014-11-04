module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower: {
            install: {
                options: {
                    targetDir: 'app/libs'
                }
            }
        },
        shell: {
            xvfb: {
                command: 'Xvfb :99 -ac -screen 0 1600x1200x24',
                options: {
                    async: true
                }
            }
        },
        env: {
            xvfb: {
                DISPLAY: ':99'
            }
        },
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: true
            }
        },
        connect: {
            deployForTest: {
                options: {
                }
            }
        },
        protractor: {
            options: {
                configFile: "node_modules/protractor/example/conf.js", // Default config file
                keepAlive: true, // If false, the grunt process stops when the test fails.
                noColor: false, // If true, protractor will not use colors in its output.
                args: {
                }
            },
            e2e: {// Grunt requires at least one target to run so you can simply put 'all: {}' here too.
                options: {
                    configFile: "test/protractor-conf.js", // Target-specific config file
                    args: {}
                }
            },
        },
        jshint: {
            options: {
                jshintrc: true,
                force: true,
                reporter: 'checkstyle',
                reporterOutput: 'output/analysis/jshint_checkstyle.xml'
            },
            all: ['app/js/*.js', 'app/js/**/*.js'],
            //afterconcat: ['dist/output.js']
        }
    });

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-shell-spawn');

    grunt.registerTask('build', 'bower');
    
    grunt.registerTask('unitTest', ['build','karma']);
    grunt.registerTask('headless-unitTest', ['shell:xvfb','env:xvfb','unitTest','shell:xvfb:kill']);
    
    grunt.registerTask('integrationTest', ['build','connect', 'protractor']);
    grunt.registerTask('headless-integrationTest',['shell:xvfb','env:xvfb','integrationTest','shell:xvfb:kill']);
 
    grunt.registerTask('analyse', ['build','jshint']);
    
    grunt.registerTask('devBuild', ['build','unitTest', 'integrationTest', 'analyse']);
    
    grunt.registerTask('ciBuild', ['build','headless-unitTest', 'headless-integrationTest', 'analyse']);

    grunt.registerTask('default', ['devBuild']);
};


