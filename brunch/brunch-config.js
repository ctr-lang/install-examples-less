const ctr = require('ctr').less;

module.exports = {
  /**
   * Public is build output path
   * Watched out dev dir
   * @type {Object}
   */
  paths: {
    public: 'build',
    watched: ['src']
  },
  /**
   * Watch/build asset loc
   * @type {Object}
   */
  files: {
    javascripts: {
      joinTo: {
        'vendor.js': /^(?!app)/,
        'app.js': /^app/
      }
    },
    stylesheets: {
      joinTo: 'app.css'
    }
  },
  /**
   * Plugin set up for js and less
   * @type {Object}
   */
  plugins: {
    less: {
      // @important, needed to ensure proper variable and class import loading
      syncImport: true,
      // needs to be a sub to specify we want to
      // pull in the less export
      plugins: [
        ctr()
      ]
    },
    babel: {
      presets: ['es2015']
    },
    // @bug -> Not working,
    postcss: {
      processors: [
        require('autoprefixer')({browsers: 'last 99 versions'})
      ]
    }
  }
};
