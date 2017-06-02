const ctr = require('ctr').less;

/**
 * Grunt config
 * @param  {---} grunt -> instance
 * @return {---}       -> watch/build config
 */
module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  /**
   * Grunt config
   */
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    app: 'src',
    dist: 'build',
    /**
     * Less
     * @type {Object}
     */
    less: {
      style: {
        files: {
          '<%= app %>/css/styles.css': '<%= app %>/less/styles.less'
        }
      },
      options: {
        // @important, needed to ensure proper variable and class import loading
        syncImport: true,
        plugins: [
          new (require('less-plugin-autoprefix'))({browsers: ['last 99 versions']}),
          new (ctr)
        ]
      }
    },
    /**
     * Build clean
     * @type {Object}
     */
    clean: {
      dist: {
        src: ['<%= dist %>/*']
      }
    },
    /**
     * Assets build copy
     * @type {Object}
     */
    copy: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= app %>/',
          src: ['fonts/**', '**/*.html', '!**/*.less', '!bower_components/**'],
          dest: '<%= dist %>/'
        }]
      }
    },
    /**
     * Image build compression
     * @type {Object}
     */
    imagemin: {
      target: {
        files: [{
          expand: true,
          cwd: '<%= app %>/images/',
          src: ['**/*.{jpg,gif,svg,jpeg,png}'],
          dest: '<%= dist %>/images/'
        }]
      }
    },
    /**
     * Js minify
     * @type {Object}
     */
    uglify: {
      options: {
        preserveComments: 'some',
        mangle: false
      }
    },
    /**
     * Asset build rev
     * @type {Object}
     */
    useminPrepare: {
      html: ['<%= app %>/index.html'],
      options: {
        dest: '<%= dist %>'
      }
    },
    /**
     * Asset build rev-replace
     * @type {Object}
     */
    usemin: {
      html: ['<%= dist %>/**/*.html', '!<%= app %>/bower_components/**'],
      css: ['<%= dist %>/css/**/*.css'],
      options: {
        dirs: ['<%= dist %>']
      }
    },
    /**
     * Watch dir's
     * @type {Object}
     */
    watch: {
      grunt: {
        files: ['Gruntfile.js'],
        tasks: ['less']
      },
      less: {
        files: '<%= app %>/less/**/*.less',
        tasks: ['less']
      },
      assemble: {
        files: '<%= app %>/templates/**/*.hbs',
        tasks: ['assemble']
      },
      livereload: {
        files: ['<%= app %>/**/*.html', '!<%= app %>/bower_components/**', '<%= app %>/js/**/*.js', '<%= app %>/css/**/*.css', '<%= app %>/images/**/*.{jpg,gif,svg,jpeg,png}'],
        options: {
          livereload: true
        }
      }
    },
    /**
     * Live reload opts
     * @type {Object}
     */
    connect: {
      app: {
        options: {
          port: 9000,
          base: '<%= app %>/',
          open: true,
          livereload: true,
          hostname: '127.0.0.1'
        }
      },
      dist: {
        options: {
          port: 9001,
          base: '<%= dist %>/',
          open: true,
          keepalive: true,
          livereload: false,
          hostname: '127.0.0.1'
        }
      }
    },
    /**
     * hbs opt's
     * @type {Object}
     */
    assemble: {
      options: {
        flatten: true,
        plugins: ['permalinks'],
        partials: ['<%= app %>/templates/partials/*.hbs'],
        layoutdir: '<%= app %>/templates/layouts/',
        data: ['<%= app %>/templates/data/*.{json,yml}']
      },
      pages: {
        src: '<%= app %>/templates/pages/*.hbs',
        dest: '<%= app %>/'
      }
    }
  });

  /**
   * Grunt run tasks
   */
  grunt.registerTask('compile-less', ['less']);
  grunt.registerTask('default', ['assemble', 'compile-less', 'connect:app', 'watch']);
  grunt.registerTask('server-dist', ['connect:dist']);
  grunt.registerTask('publish', ['assemble', 'compile-less', 'clean:dist', 'useminPrepare', 'copy:dist', 'newer:imagemin', 'concat', 'cssmin', 'uglify', 'usemin']);
};
