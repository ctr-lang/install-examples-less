# Webpack + ctr

__NOTE__: Not included in the tests due the `ctr` and the less-plugin running into race errors from `@import`. Unfortunately, synchronous compilation was [removed](https://github.com/webpack-contrib/less-loader/issues/84) and it's needed for `ctr` to work properly. And while this example works I do not recommend you use the less-plugin in any type of production setting. Need be you could always use Stylus or the [ctr-loader](https://docs.ctr-lang.com/javascript/ctr-loader/) to get `ctr` to work with Webpack properly. In the future, after the rewrite, this example should work flawlessly.


This build example is a typical run of the mill Webpack setup, and centers around the big three: HTML, CSS, and JavaScript - the most righteous of paths. :pray:

## Commands

__Install__

+ `yarn install`

__Getting Started/Dev__

+ `yarn run dev`
    * Served on: `http://localhost:3000/`

__Production Build__

+ `yarn run build`

__Test__

+ `yarn test`


## Tech Highlights

+ [autoprefixer](https://github.com/postcss/autoprefixer)
+ [babel](https://babeljs.io/)
+ [browser-sync](https://www.browsersync.io/)
+ [ctr](https://ctr-lang.com)
+ [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)
+ [imagemin](https://github.com/imagemin/imagemin)
+ [less](http://lesscss.org/)
+ [webpack-dev-server](https://webpack.js.org/configuration/dev-server/)
+ [webpack](https://webpack.js.org/)
