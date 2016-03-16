module.exports = function(grunt) {
    'use strict';

    var globalConfig = {
        scripts: 'assets/js',
        css: 'assets/css',
        images: 'assets/img',
        scss: 'assets/scss'
    };

    grunt.initConfig({
        globalConfig: globalConfig,
        pkg: grunt.file.readJSON('package.json'),
        browserSync: {
            debug: {
                bsFiles: {
                    src: [
                        '<%= globalConfig.scripts %>/*.js',
                        '<%= globalConfig.css %>/*.css',
                        '<%= globalConfig.images %>/**/*.{jpg,gif,png,svg}'
                    ]
                },
                options: {
                    watchTask: true,
                    port: 1337,
                    server: './'
                }
            }
        },
        concat: {
            debug: {
                src: '<%= globalConfig.scripts %>/source/*.js',
                dest: '<%= globalConfig.scripts %>/main.js'
            }
        },
        imagemin: {
            debug: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    cwd: '<%= globalConfig.images %>/source/',
                    src: '**/*.{jpg,png,gif,svg}',
                    dest: '<%= globalConfig.images %>/'
                }]
            }
        },
        // Stops compiling when you write bad JavaScript
        jshint: {
            // options: {
            //  jshintrc: true
            // },
            all: ['<%= globalConfig.scripts %>/source/*.js']
        },
        postcss: {
            options: {
                map: false,
                processors: [
                    // Auto-prefixes CSS
                    require('autoprefixer')({expand: true, flatten: true, browsers: ['ie >= 9', '> 1%', 'last 2 versions']})
                ]
            },
            debug: {
                src: ['<%= globalConfig.css %>/main.css']
            }
        },
        sass: {
            debug: {
                options: {
                    sourceMap: false,
                    outputStyle: 'expanded',
                    precision: 3
                },
                files: {
                    '<%= globalConfig.css %>/main.css': '<%= globalConfig.scss %>/main.scss'

                }
            }
        },
        // Checks for specified changes and refreshes browser if plugin is installed
        watch: {
            options: {
                spawn: false
            },
            scripts: {
                files: '<%= globalConfig.scripts %>/source/*.js',
                tasks: ['js']
            },
            css: {
                files: ['<%= globalConfig.scss %>/**/*.scss'],
                tasks: ['css']
            },
            html: {
                files: '*.html',
                tasks: []
            }
        }
    });
    require('load-grunt-tasks')(grunt);
    grunt.registerTask('js', ['jshint', 'concat']);
    grunt.registerTask('css', ['sass', 'postcss']);
    grunt.registerTask('img', ['newer:imagemin']);
    grunt.registerTask('default', ['browserSync', 'watch']);
};
