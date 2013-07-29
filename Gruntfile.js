
module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            dev: {
                files: ['@(lib|tests)/{,*/}*.js'],
                tasks: ['default'],
                options: {
                    debounceDelay: 250
                }
            }
        },
        release: {
            options: {
                bump: true
              , file: 'package.json'
              , add: false
              , commit: true
              , tag: true
              , push: true
              , pushTags: true
              , npm: true
              , tagName: '<%= version %>'
              , commitMessage: 'release <%= version %>'
              , tagMessage: 'Bump version to <%= version %>'
            }
        },
        jshint: {
            all: ['@(lib|tests)/{,*/}*.js']
          , options: {
                jshintrc: '.jshintrc'
           }
        },
        jsvalidate: {
            all: ['@(lib|tests)/{,*/}*.js']
        },
        mocha: {
            src: 'tests/*.spec.js',
            options: {
                ui: 'tdd',
                reporter: 'spec'
            }
        }
    });

    require('matchdep').filterAll('grunt-!(cli)').forEach(grunt.loadNpmTasks);
    grunt.renameTask('cafemocha', 'mocha');

    grunt.registerTask('dev', ['watch:dev']);
    grunt.registerTask('default', ['jsvalidate', 'jshint', 'mocha']);
};
