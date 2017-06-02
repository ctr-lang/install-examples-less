const should = require('should');
const fs     = require('fs');
const path   = require('path');

const normalizeContent = function (str) {
  return str.replace(/\r/g, '').trim();
};

const readFile = function (_path) {
  return normalizeContent(fs.readFileSync(_path, 'utf-8'));
};

const compiledCSS = readFile(path.join(__dirname, '../build/styles.css'));
const expectedCSS = readFile(path.join(__dirname, '/expected.css'));

describe('Webpack + ccs-modules + React Test', function() {
  it('ctr should compile to css with css-modules plus autopre-fixed', function() {
    should.equal(normalizeContent(compiledCSS), normalizeContent(expectedCSS));
  });
});

