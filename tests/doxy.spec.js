
/**
 * Module dependencies.
 */

var doxy = require('../'),
    should = require('should'),
    Promise = require('bluebird');

function fixture(name) {
    var readFile = Promise.promisify(require('fs').readFile);

    return readFile(__dirname + '/fixtures/' + name, 'utf8')
        .catch(function(err) {
            throw err;
        });
}

function toLines(block) {
    return block.split('\n');
}

describe('doxy', function() {
    describe('parse', function() {

        it('should return an array of comment blocks', function() {
            fixture('styles.js').then(function(data) {
                doxy.parse(data).then(function(comments) {
                    comments.length.should.equal(8);
                });
            });
        });

        it('should be able to parse a single line css comment', function() {
            fixture('styles.js').then(function(data) {
                doxy.parse(data).then(function(comments) {
                    var lines = toLines(comments[0]);

                    lines.length.should.equal(1);
                    lines[0].should.equal('This is a single line css style comment');
                });
            });
        });

        it('should be able to parse a multiple line css comment block with content on the opening line', function() {
            fixture('styles.js').then(function(data) {
                doxy.parse(data).then(function(comments) {
                    var lines = toLines(comments[1]);

                    lines.length.should.equal(1);
                    lines[0].should.equal('This is a multiple line css comment with content on the opening line');
                });
            });
        });

        it('should be able to parse a multiple line css comment block with content on the opening and closing lines', function() {
            fixture('styles.js').then(function(data) {
                doxy.parse(data).then(function(comments) {
                    var lines = toLines(comments[2]);

                    lines.length.should.equal(2);
                    lines[0].should.equal('This is a multiple line css comment with content on the opening line');
                    lines[1].should.equal('and closing lines with equal indentation');
                });
            });
        });

        it('should be able to parse a css comment block', function() {
            fixture('styles.js').then(function(data) {
                doxy.parse(data).then(function(comments) {
                    var lines = toLines(comments[3]);

                      lines.length.should.equal(9);
                      lines[0].should.equal('This is a multiple');
                      lines[1].should.equal(' line css');
                      lines[2].should.equal('  style comment');
                      lines[4].should.equal('   with line');
                      lines[6].should.equal('  breaks');
                      lines[7].should.equal(' and');
                      lines[8].should.equal('indentation');
                });
            });
        });

        it('should be able to parse a non-standard comment block', function() {
            fixture('styles.js').then(function(data) {
                doxy.parse(data).then(function(comments) {
                    var lines = toLines(comments[4]);

                    lines.length.should.equal(9);
                    lines[0].should.equal('This is a non-standard multiple');
                    lines[1].should.equal(' line css');
                    lines[2].should.equal('  style comment');
                    lines[4].should.equal('   with line');
                    lines[6].should.equal('  breaks');
                    lines[7].should.equal(' and');
                    lines[8].should.equal('indentation');
                });
            });
        });

        it('should be able to compensate for leading indentation ', function() {
            fixture('styles.js').then(function(data) {
                doxy.parse(data).then(function(comments) {
                    var lines = toLines(comments[5]);

                    lines.length.should.equal(9);
                    lines[0].should.equal('This is a non-standard multiple');
                    lines[1].should.equal(' line css');
                    lines[2].should.equal('  style comment');
                    lines[4].should.equal('   with line');
                    lines[6].should.equal('  breaks');
                    lines[7].should.equal(' and');
                    lines[8].should.equal('indentation');
                });
            });
        });

        it('should be able to parse a single line less/sass style comment', function() {
            fixture('styles.js').then(function(data) {
                doxy.parse(data).then(function(comments) {
                    var lines = toLines(comments[6]);

                    lines.length.should.equal(1);
                    lines[0].should.equal('This is a single line less/sass style comment');
                });
            });
        });

        it('should be able to parse a less/sass style comment block', function() {
            fixture('styles.js').then(function(data) {
                doxy.parse(data).then(function(comments) {
                    var lines = toLines(comments[7]);

                    lines.length.should.equal(9);
                    lines[0].should.equal('This is a multiple');
                    lines[1].should.equal(' line less/sass');
                    lines[2].should.equal('  style comment');
                    lines[4].should.equal('   with line');
                    lines[6].should.equal('  breaks');
                    lines[7].should.equal(' and');
                    lines[8].should.equal('indentation');
                });
            });
        });

    });

    describe('fromFile', function() {
        var oldParse;

        beforeEach(function() {
            oldParse = doxy.parse;
        });

        afterEach(function() {
            doxy.parse = oldParse;
            oldParse = null;
        });

        it('should call doxy.parse with the file contents', function(done) {
            doxy.parse = function(contents) {
                fixture('styles.js').then(function(data) {
                    contents.should.equal(data);
                    done();
                });
            };

            doxy.fromFile(__dirname + '/fixtures/styles.js');
        });

    });
});
