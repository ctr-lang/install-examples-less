#!/usr/bin/env node
const shell  = require('shelljs');
const _      = require('lodash');
const colur  = require('colur');
const {dirs} = require('./helpers.js');


//cycle and build test
_.forEach(dirs, function (dir) {
  const tmpl = `:::SCRIPT:install -> Dir: ${dir} -> Command: npm run build:test`;
  //signal start
  colur(`START${tmpl}`);
  //cd in, and run
  shell.cd(dir);
  shell.exec('npm run build:test', function(code, stdout, stderr) {
    if (code) {
      colur(`ERROR${tmpl}`, {error: true});
      console.error(stderr);
      colur(`ERROR${tmpl}`, {error: true});
    }else {
      colur(`END${tmpl}`, {end: true});
    }
  });
  //cd out for next build
  shell.cd('..');
});

