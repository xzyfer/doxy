
/**
 * Module dependencies.
 */

var doxy = require('../'),
    should = require('should'),
    fs = require('fs');

function fixture(name, fn) {
    fs.readFile(__dirname + '/fixtures/' + name, 'utf8', fn);
}

function toLines(block) {
    return block.split('\n');
}

describe('doxy', function() {
    describe('parse', function() {

        it('should return an array of comment blocks', function() {
            fixture('styles.js', function(err, file) {
                var comments = doxy.parse(file);

                comments.length.should.equal(6);
            });
        });

        it('should respect indention of comment blocks', function() {
            fixture('styles.js', function(err, file) {
                var comments = doxy.parse(file)
                  , lines = toLines(comments[3]);

                lines[0].should.match(/^\s{0}/);
                lines[1].should.match(/^\s{1}/);
                lines[2].should.match(/^\s{2}/);
                lines[4].should.match(/^\s{3}/);
                lines[6].should.match(/^\s{2}/);
                lines[7].should.match(/^\s{1}/);
                lines[8].should.match(/^\s{0}/);
            });
        });

        it('should respect indention of non-standard comment blocks', function() {
            fixture('styles.js', function(err, file) {
                var comments = doxy.parse(file)
                  , lines = toLines(comments[4]);

                lines[0].should.match(/^\s{0}/);
                lines[1].should.match(/^\s{1}/);
                lines[2].should.match(/^\s{2}/);
                lines[4].should.match(/^\s{3}/);
                lines[6].should.match(/^\s{2}/);
                lines[7].should.match(/^\s{1}/);
                lines[8].should.match(/^\s{0}/);
            });
        });

    });
});
