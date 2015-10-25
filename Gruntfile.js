module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    less: {
      development: {
        files: {
          './css/main.css': './less/index.less',
        }
      },
    },

    requirejs: {
      development: {
        options: {
          baseUrl: './js/dev/',
          include: 'index',
          mainConfigFile: './js/dev/index.js',
          name: '../../node_modules/almond/almond',
          optimize: 'none',
          out: './js/dist/main.js',
          wrap: true,
        },
      },
    },

    watch: {
      styles: {
        files: [
          './less/**/*.less',
        ],
        tasks: [
          'less',
        ],
        options: {
          atBegin: true,
          spawn: false,
        },
      },

      js: {
        files: [
          './js/dev/*.js',
        ],
        tasks: [
          'requirejs',
        ],
        options: {
          atBegin: true,
          spawn: false,
        },
      }
    },
  });

  grunt.registerTask('default', [
    'less',
    'requirejs',
  ]);
};
