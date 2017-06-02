const should = require('should');
const fs     = require('fs');
const path   = require('path');

const normalizeContent = function (str) {
  return str.replace(/\r/g, '').trim();
};

const readFile = function (_path) {
  return normalizeContent(fs.readFileSync(_path, 'utf-8'));
};

const compiledCSS = readFile(path.join(__dirname, '../build/css/app.min.css'));
const expectedCSS = readFile(path.join(__dirname, '/expected.css'));

describe('Gulp Test', function() {
  it('ctr should compile to css and be autopre-fixed', function() {
    should.equal(normalizeContent(compiledCSS), normalizeContent(expectedCSS));
  });
});

