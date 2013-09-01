/*
 * AmalgamationOfCats
 * https://github.com/Pawel Szymczykowski/AmalgamationOfCats
 * Copyright (c) 2013
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  grunt.util._.mixin(require('./src/helpers/mixins.js').init(grunt));

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    vendor: grunt.file.readJSON('.bowerrc').directory,

    // Lint JavaScript
    jshint: {
      all: ['Gruntfile.js', 'src/helpers/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Build HTML from templates and data
    assemble: {
      options: {
        // Change stylesheet to "assemble" or "bootstrap"
        stylesheet: 'assemble',
        flatten: true,
        assets: 'site/assets',
        partials: ['src/includes/*.hbs'],
        helpers: ['src/helpers/helper-*.js'],
        layout: 'src/layouts/default.hbs',
        data: ['src/data/*.{json,yml}', 'package.json']
      },
      pages: {
        src: 'src/*.hbs',
        dest: 'site/'
      }
    },

    // Prettify test HTML pages from Assemble task.
    prettify: {
      options: {
        prettifyrc: '.prettifyrc'
      },
      all: {
        expand: true,
        cwd: '<%= assemble.pages.src %>/',
        src: ['*.html'],
        dest: '<%= assemble.pages.src %>/',
        ext: '.html'
      }
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: {
      example: ['docs/*.html']
    },

    watch: {
      all: {
        files: ['<%= jshint.all %>'],
        tasks: ['jshint', 'nodeunit']
      },
      design: {
        files: ['Gruntfile.js', 'src/**/*.hbs'],
        tasks: ['design']
      }
    }
  });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-prettify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default tasks to be run.
  grunt.registerTask('default', [
    'clean',
    'jshint',
    'assemble',
    'prettify'
  ]);

  // Build HTML, and watch for changes.
  // You must first run "bower install" or install
  // Bootstrap to the "vendor" directory before running
  // this command.
  grunt.registerTask('design', [
    'clean',
    'assemble',
    'watch:design'
  ]);
};
