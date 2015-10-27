module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    less: {
      development: {
        files: {
          'css/main.css': 'less/index.less',
        }
      },
    },

    requirejs: {
      development: {
        options: {
          baseUrl: 'js/dev/',
          include: [
            'api',
            'data/birthday',
            'data/book',
            'data/checkin',
            'data/friendlist',
            'data/money',
            'data/movie',
            'data/music',
            'data/sport',
            'data/place',
            'data/place-location-image',
            'data/political-view',
            'data/time',
            'data/with',
            'debug',
            'frame',
            'frame-1',
            'frame-2',
            'frame-3',
            'index',
            'questions',
          ],
          mainConfigFile: 'js/dev/index.js',
          name: '../../node_modules/requirejs/require',
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
