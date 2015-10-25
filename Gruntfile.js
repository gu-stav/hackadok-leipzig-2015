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

    watch: {
      stlyes: {
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
    },
  });

  grunt.registerTask('default', [
    'less',
  ]);

  grunt.registerTask('watch', [
    'watch',
  ]);
};
