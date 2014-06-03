
module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        files: '@(lib|tests)/{,*/}*.js',
        watch: {
            dev: {
                files: ['<%= files %>'],
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
            all: ['<%= files %>']
          , options: {
                jshintrc: '.jshintrc'
           }
        },
        jsvalidate: {
            all: ['<%= files %>']
        },
        test: {
            src: 'tests/*.spec.js',
            options: {
                ui: 'tdd',
                reporter: 'spec'
            }
        }
    });

    require('matchdep').filterAll('grunt-!(cli)').forEach(grunt.loadNpmTasks);
    grunt.renameTask('cafemocha', 'test');

    grunt.registerTask('dev', ['watch:dev']);
    grunt.registerTask('default', ['jsvalidate', 'jshint', 'test']);
};
