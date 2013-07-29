
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

                comments.length.should.equal(9);
            });
        });

        it('should be able to parse a multiple line css comment with content on the opening line', function() {
            fixture('styles.js', function(err, file) {
                var comments = doxy.parse(file)
                  , lines = toLines(comments[1]);

                lines.length.should.equal(1);
                lines[0].should.equal('This is a multiple line css comment with content on the opening line');
            });
        });

        it('should be able to parse a multiple line css comment with content on the opening and closing lines', function() {
            fixture('styles.js', function(err, file) {
                var comments = doxy.parse(file)
                  , lines = toLines(comments[2]);

                lines.length.should.equal(2);
                lines[0].should.equal('This is a multiple line css comment with content on the opening line');
                lines[1].should.equal('   and closing lines with equal indentation');
            });
        });

        it('should respect indention of comment blocks', function() {
            fixture('styles.js', function(err, file) {
                var comments = doxy.parse(file)
                  , lines = toLines(comments[5]);

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
                  , lines = toLines(comments[6]);

                lines[0].should.match(/^\s{0}/);
                lines[1].should.match(/^\s{1}/);
                lines[2].should.match(/^\s{2}/);
                lines[4].should.match(/^\s{3}/);
                lines[6].should.match(/^\s{2}/);
                lines[7].should.match(/^\s{1}/);
                lines[8].should.match(/^\s{0}/);
            });
        });

        it('should treat sequential less/sass style comments as a single blocks', function() {
            fixture('styles.js', function(err, file) {
                var comments = doxy.parse(file)
                  , lines = toLines(comments[8]);

                lines.length.should.equal(9);
            });
        });

        it('should respect indention of less/sass style comment blocks', function() {
            fixture('styles.js', function(err, file) {
                var comments = doxy.parse(file)
                  , lines = toLines(comments[8]);

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
