module.exports = function(grunt) {
    'use strict';

    var globalConfig = {
        scripts: 'assets/js',
        css: 'assets/css',
        images: 'assets/img',
        scss: 'assets/scss',
        grunticon: 'assets/grunticon'
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
        copy: {
            grunticon: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['<%= globalConfig.grunticon %>/dist/grunticon.js'],
                    dest: '<%= globalConfig.scripts %>/libraries/', filter: 'isFile'
                }],
                options: {
                    timestamp: true
                }
            }
        },
        grunticon: {
            debug: {
                files: [{
                    expand: true,
                    cwd: '<%= globalConfig.grunticon %>/source',
                    src: ['*.svg'],
                    dest: '<%= globalConfig.grunticon %>/dist'
                }],
                options: {
                    compress: true,
                    corsEmbed: true,
                    cssprefix: '.icon-',
                    defaultHeight: '32px',
                    defaultWidth: '32px',
                    enhanceSVG: true,
                    loadersnippet: 'grunticon.js'
                }
            }
        },
        imagemin: {
            grunticon: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    cwd: '<%= globalConfig.grunticon %>/source/raw/',
                    src: '*.svg',
                    dest: '<%= globalConfig.grunticon %>/source/'
                }]
            }
        },
        jshint: {
            all: ['<%= globalConfig.scripts %>/source/*.js']
        },
        postcss: {
            options: {
                map: false,
                processors: [
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
            grunt: {
                files: ['Gruntfile.js']
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
    grunt.registerTask('icons', ['newer:imagemin:grunticon', 'grunticon', 'copy:grunticon']);
    grunt.registerTask('default', ['browserSync', 'watch']);
};
