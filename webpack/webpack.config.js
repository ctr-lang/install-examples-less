const path              = require('path');
const autoprefixer      = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const HtmlPlugin        = require('html-webpack-plugin');
const CleanWebpack      = require('clean-webpack-plugin');
const ctr               = require('ctr').less;
const outputPath        = './build';

/**
 * Webpack 2.X config, if this is confusing you should read-up about
 * the configs at https://webpack.js.org
 * @type {Object}
 */
module.exports = {
  context: path.resolve(__dirname),
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, outputPath),
    filename: 'index.js'
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.html', '.css', '.less']
  },
  devServer: {
    port: 8080
  },
  module: {
    rules: [{
      /**
       * Javascript, compile via babel
       */
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /(node_modules|bower_components)/
    }, {
      /**
       * Image handler + compresses images
       */
      test: /.*\.(gif|png|jpe?g|svg)$/i,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      }, {
        loader: 'image-webpack-loader',
        options: {
          mozjpeg: {
            quality: 65
          },
          pngquant: {
            quality: '65-90',
            speed: 4
          },
          svgo: {
            plugins: [
              {
                removeViewBox: false
              },
              {
                removeEmptyAttrs: false
              }
            ]
          },
          gifsicle: {
            optimizationLevel: 7,
            interlaced: false
          },
          optipng: {
            optimizationLevel: 7,
            interlaced: false
          }
        }
      }]
    }, {
      /**
       * Less, autoprefixer + ctr
       */
      test: /\.less$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            importLoaders: 2,
            root: '.'
          }
        }, {
          loader: 'postcss-loader',
          // @important the "last 99 versions" if for testing purposes
          options: { plugins: () => [autoprefixer({ browsers: ['last 99 versions'] })] }
        }, {
          /**
           * Load up the less-loader, and tell it we gotz a plugin called
           * ctr we want to use to make some magic
           * @type {String}
           */
          loader: 'less-loader',
          options: {
            // @important, needed to ensure proper variable and class import loading
            syncImport: true,
            async: false,
            fileAsync: false,
            plugins: [
              ctr()
            ]
          }
        }]
      })
    }]
  },
  plugins: [
    /**
     * Compiles ours styles in a seperate stylesheet
     */
    new ExtractTextPlugin({
      filename: 'styles.css',
      allChunks: true
    }),
    /**
     * Handles out html assets, injects scripts, this plugin has a
     * fair amount of power, you should check it out
     */
    new HtmlPlugin({
      title: 'My Kool Webpack App',
      filename: 'index.html',
      template: './src/html/index.html'
    }),
    /**
     * Browser sync on dev
     */
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      proxy: 'http://localhost:8080/'
    }, {reload: false}),
    /**
     * cleans our output dir before building
     */
    new CleanWebpack(outputPath)
  ]
};
