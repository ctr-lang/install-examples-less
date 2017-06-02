# Webpack + React + css-modules + ctr

__NOTE__: Not included in the tests due the `ctr` and the less-plugin running into race errors from `@import`. Unfortunately, synchronous compilation was [removed](https://github.com/webpack-contrib/less-loader/issues/84) and it's needed for `ctr` to work properly. And while this example works I do not recommend you use the less-plugin in any type of production setting. Need be you could always use Stylus or the [ctr-loader](https://docs.ctr-lang.com/javascript/ctr-loader/) to get `ctr` to work with Webpack properly. In the future, after the rewrite, this example should work flawlessly.


This build example in an adoption of [Gajus Kuizinas's](https://github.com/gajus) [React CSS Modules Examples](https://github.com/gajus/react-css-modules-examples) project. I went ahead and tailored it to my liking, so it's not an exact copy, but it uses the same base `/src` code just with `ctr`. Additionally, it uses [React CSS Modules](https://github.com/gajus/react-css-modules) to demonstrate [CSS Modules](https://github.com/css-modules/css-modules), however, you could always use an alternative CSS module solution.

__`@import` Issue__

Remember, you need to use an "accumulator" file as demonstrated in both `/UsingStyleName` and `/UsingStylesProperty`

__Import Name Bug__

Typically, I append my `ctr` files as such `[file].ctr.less`, however this naming convention causes the `less-loader` to throw a `"Malformed import statement"` error. In addition, it seems like this error is thrown anytime there's a special character in the file name. It will even throw if there's a hyphen `-` in the file name. I personally, use Stylus and recommend you use it as well, but if you're a die hard Less fan I would investigate the issue, fix it, and pull an issue.


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
+ [react-css-modules](https://github.com/gajus/react-css-modules)
+ [react-dom](https://facebook.github.io/react/docs/react-dom.html)
+ [react](https://facebook.github.io/react/)
+ [webpack-dev-server](https://webpack.js.org/configuration/dev-server/)
+ [webpack](https://webpack.js.org/)
