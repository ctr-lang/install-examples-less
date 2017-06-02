#!/usr/bin/env node
const shell  = require('shelljs');
const _      = require('lodash');
const colur  = require('colur');
const {dirs} = require('./helpers.js');

//cycle and check, output to log
_.forEach(dirs, function (dir) {
  const tmpl = `:::SCRIPT:update -> Dir: ${dir} -> Command: npm update`;
  // //signal start
  colur(`START${tmpl}`);
  //cd in, and run
  shell.cd(dir);

  shell.exec('npm run update', function(code, stdout, stderr) {
    if (code) {
      colur(`ERROR${tmpl}`, {error: true});
      console.error(stderr);
      colur(`ERROR${tmpl}`, {error: true});
    }else {
      colur(`END${tmpl}`, {end: true});
    }
  });
  //cd out for next check
  shell.cd('..');
});

