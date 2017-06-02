#!/usr/bin/env node
const shell  = require('shelljs');
const _      = require('lodash');
const colur  = require('colur');
const {dirs} = require('./helpers.js');


//cycle and install
_.forEach(dirs, function (dir) {
  const tmpl = `:::SCRIPT:install -> Dir: ${dir} -> Command: yarn run setup`;
  //signal start
  colur(`START${tmpl}`);
  //cd in, and run
  shell.cd(dir);
  shell.exec('yarn run setup', function(code, stdout, stderr) {
    if (code) {
      colur(`ERROR${tmpl}`, {error: true});
      console.error(stderr);
      colur(`ERROR${tmpl}`, {error: true});
    }else {
      colur(`END${tmpl}`, {end: true});
    }
  });
  //cd out for next install
  shell.cd('..');
});

