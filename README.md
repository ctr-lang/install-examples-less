# `ctr` Less Install Examples

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ctr-lang/install-examples-Less/blob/master/LICENSE.txt)
[![wercker status](https://app.wercker.com/status/58d12afb5adcff80bdcd14f9aa4507a0/s/master "wercker status")](https://app.wercker.com/project/byKey/58d12afb5adcff80bdcd14f9aa4507a0)


## Info

Half the battle in web development when adopting a new tool into your workflow is getting the damn thing set up with your current workflow. I've spent far to much time doing the install/setup song and dance in my short career, so I decided I would spend the time for you since it is my song and I want you to [dance](https://www.youtube.com/watch?v=N4d7Wp9kKjA). All the build examples use the [Less](http://lesscss.org/) flavor of `ctr` not the JavaScript flavor. If you're interested in using the JavaScript flavor of `ctr` head on over to the [ctr-loader docs](https://docs.ctr-lang.com/javascript/ctr-loader/).

All the build examples are bare-bone setups intended to get you rockin' and rollin' as fast as possible or to act as a template to help you plug `ctr` in your personal build tool. Having said that, the build examples are not configured for production, although, you could easily configure them for production purposes. In addition, each build example has a README in which I give a little description, list the commands, and list the tech it employs.

If you want to checkout the actual code for the Less plugin it's currently located in the ctr repository [here](https://github.com/ctr-lang/ctr/blob/master/lib/ctr-less.js).

## Warning

I'll repeat what I said in the documentation.

Everything `ctr` _should_ work in the Less plugin, and I've ensured the Less plugin passes all the same tests both Stylus and YAML pass. But, and here's the big but, this Less plugin is at the bottom of my list. Or put another way, friend L (Less) whose a friend, but not a "bestie" is all like "hey, can you please give me a hand". Simultaneously my "bestie" friend S (Stylus) is like "ey, killer this couch ain't moving itself." Even though friend L asked more politely I'm still going to help friend S first, and I can't make any promises I'll find time in my scheduled to even help friend L. Don't judge me, I'll still bring beer over to friend L's house _after_ the move. On the other hand, the Less plugin operates through Stylus, so there should be no problem. I'm just giving you a heads up like a good friend.



## Commands

__Prerequisites__

+ Make sure you have [yarn](https://yarnpkg.com) [installed](https://yarnpkg.com/en/docs/install).
    * Why `yarn`, and not why `npm`? There's a slew of reasons, but for me it's consistency.
    * Technically, if you want, you _should_ be able to replace `npm` with `yarn` and everything will work as expected

__Install__

+ `yarn install`

__Install All Examples__

+ `yarn run install:all`

__Scripts__

+ `yarn run script:build`
    * Builds all the examples
+ `yarn run script:clean`
    * Cleans out all the `/build` directories of examples
    * `yarn run script:clean-all` -> removes `/build` and `/node_modules`
+ `yarn run script:update-check`
    * Checks for any `package.json` updates
+ `yarn run script:update`
    * Updates all `package.json` files

__Test__

+ `yarn test`
   * Installs, builds, and tests all the examples




## Configuration

The configuration of `ctr` for any build tool is dead simple as long as the build tool has a Less plugin, loader, or adapter given that `ctr` is a Less plugin. The following process is universal among all build tools.

1. Install and set up Less with the build tool.
    + Brunch: [less-brunch](https://github.com/brunch/less-brunch)
    + Grunt: [grunt-contrib-less](https://github.com/gruntjs/grunt-contrib-less)
    + Gulp: [gulp-less](https://github.com/plus3network/gulp-less)
    + Webpack: [less-loader](https://github.com/webpack-contrib/less-loader)
2. Install [`ctr`](https://www.npmjs.com/package/ctr).
4. `require` `ctr`, and use the `less` property to get the `ctr` plugin Function for Less. If you want you can pass the resulting `ctr` plugin Function an option Object, although, I recommend you use the [`.ctrrc`](https://docs.ctr-lang.com/helpers/dot-ctrrc/).
```js
const ctr = require('ctr').less;
// plugin ctr in the "plugin" location for buildtool
// ex. plugnis: [ctr()]
```
5. Plug-in the `ctr` plugin Function.
6. Profit.



## Limitations

The main limitation for this plugin is the inability to use it with various Less logic Functions to a large extent. That is, you can't use custom Less mixins within `ctr` instances and various types of complex loop logic, although, at the same time Less is not made for complex logic, and you can, and should, be performing said login in Javascript. Additionally, you can only use the declarative form of invocation, ie `ctr('.test', { /*code*/ })`. Outside of these two limitations everything _should_ work as expected (fingers crossed).

p.s. You should be able to use Less variables within `ctr` instances.



## Syntax

The Less plugin offers both "Stylus" syntax and YAML syntax. However, I'm not sure how I feel about the YAML syntax and it was/is more or less of an experiment at this stage of the game. That's to say, if you want to use the YAML syntax you should probably ditch Less and migrate to a pure YAML based project.

__Default Stylus Syntax__

```less
// Stylus Syntax (what you should use)
ctr('.test', {
  font-size: 2em
  hover-on: {
    option: {
      duration: 2s
    }
    color: blue
  }
})
```

__YAML Syntax__

To use YAML syntax on the "fly" you can do so by declaring `// SYNTAX_YAML` in your `ctr` instance. Otherwise in the Less `ctr` plugin Function pass an option Object with the value of `syntaxStylus: flase`, although, in doing so you can only use YAML syntax and not Stylus syntax. Use at you're own risk.

```less
// on the "fly"
ctr('.test', {
  // SYNTAX_YAML
  font-size: 2em
  hover-on:
    option:
      duration: 2s
    color: blue
})
```



## `@import` Mode of Action

It’s important that you understand how the `ctr` Less plugin works so that you understand how to set up you’re `@import` statements. In a nutshell, the `ctr` plugin receives the Less file before Less has processed the file and it extracts, compiles, and replaces all `ctr` related instances with their respected CSS output. What this means is, if you want to use `ctr` specific variables or classes you must use an accumulator file. Or in other words, you __cannot__ `@import` Less files containing `ctr` specific variables and then use those variables in the same file. Furthermore, this is what an “accumulator” file looks like:

```less
// Base/global styles
@import 'base.less';
// Class styles to use in other Less files
@import 'classes/My-Kool-Class.less';
// You can now use the "My-Kool-Class" in both of the below Less files
@import 'components/money-maker.less';
@import 'components/open-source-your-shit.less';
```

__BAD - WONT WORK__

```less
// File: open-source-your-shit.less

@import 'classes/My-Kool-Class.less';

// ctr instance
ctr('#but-really', {
  size: 200px
  color: red
  // WILL NOT WORK!
  extend: 'My-Kool-Class'
})

```

__`@import` Sync Options__

To ensure your Less `@import` statements are processed in the proper order I recommend you use the following options for Less.

```js
{
  // @important, needed to ensure proper variable and class import loading
  syncImport: true,
  async: false,
  fileAsync: false
}
```



---

Best, te
