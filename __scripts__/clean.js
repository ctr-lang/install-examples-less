const fs      = require('fs-extra');
const path    = require('path');
const _       = require('lodash');
const colur   = require('colur');
const MODULES = process.env.MODULES;

/**
 * Cleans out public in each test dir after tests run
 */
const files = MODULES ? '/build && /node_modules' : '/build';
colur(`START:::SCRIPT:clean -> cleaning test dir, removing ${files} dir`);
const rmPublicDirectories = function (srcpath) {
  const isDir = function (file) {
    try {
      return fs.statSync(file).isDirectory();
    }catch (err) {
      return false;
    }
  };
  const srcDir = fs.readdirSync('.').filter(function (file) {
    return !file.includes('webpack') && isDir(path.join(srcpath, file));
  });
  _.forEach(srcDir, function (p) {
    const publicDir = path.join(p, '/build');
    if (publicDir) { fs.removeSync(publicDir); }
    if (MODULES) {
      const nodeDir = path.join(p, '/node_modules');
      if (nodeDir) { fs.removeSync(nodeDir); }
    }
  });
};

rmPublicDirectories('.');

colur(`END:::SCRIPT:clean -> cleaned test dir, removed ${files} dir`, {end: true});
