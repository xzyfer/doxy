/* jshint -W084 */
/*!
 * Module dependencies.
 */
var Promise = require('bluebird');

/**
 * Parse comments out of in the given string.
 *
 * @param {String} str      A stirng of text to parse comments out of
 * @return {Promise}        The fulfilled promise retuns an array of comment lines
 * @api public
 */

module.exports = doxy = {};

doxy.parse = function (str) {
    return new Promise(function (resolve, reject) {
        var lines = str.split(/\n/)
          , comments = []
          , comment = []
          , match
          , inBlock = false
          , singleLine = false
          , multilineIndent = -1
        ;

        lines.forEach(function(line) {
            // /* single line */
            if (!inBlock && (match = line.match(/\/\*\s?(.*?)\s?\*\//))) {
                comments.push(match[1]);
                singleLine = false;
            }
            // opening /*
            else if (!inBlock && (match = line.match(/\/[*]+(\s*)(.*)/))) {
                // /* I should be part of the multiline comment
                if (match[2].length) {
                    comment.push(match[2]);
                    if (match[1].length) {
                        multilineIndent = match[1].length + 2;
                    }
                }

                inBlock = true;
                singleLine = false;
            }
            // closing */
            else if (inBlock && (match = line.match(new RegExp("(?:\\s{0,"+Math.max(0, multilineIndent)+"})(\\s*)(.*?)\\s?\\*\\/")))) {
                if (multilineIndent < 0) {
                    multilineIndent = match[1].length;
                }

                // I should be part of the multiline comment */
                if (match[2].length) {
                    comment.push(match[2]);
                }

                comments.push(comment.join('\n'));

                // reset state
                comment = [];
                inBlock = false;
                multilineIndent = -1;
            }
            // lines between /* and */
            else if (inBlock && (match = line.match(new RegExp("(?:\\s*\\*)?(?:\\s{0,"+Math.max(0, multilineIndent)+"})(\\s*)(.*)")))) {
                if (multilineIndent < 0) {
                    multilineIndent = match[1].length;
                    comment.push(match[2]);
                } else {
                    comment.push(match[1] + match[2]);
                }
            }
            // single line // style comments
            else if (!inBlock && (match = line.match(/\/\/\s?(.*)/))) {
                if (singleLine) {
                    comments[comments.length - 1] += '\n' + match[1];
                } else {
                    comments.push(match[1]);
                }

                singleLine = true;
            }
            // not a comment
            else {
                singleLine = false;
            }
        });

        resolve(comments);
    });
};

/**
 * Parse comments out of in the given file.
 *
 * @param {String} file     The path to the file to extract comments from
 * @return {Promise}        The fulfilled promise retuns an array of comment lines
 * @api public
 */

doxy.fromFile = function(file) {
    var readFile = Promise.promisify(require('fs').readFile);

    return readFile(file, 'utf8')
        .then(function(content) {
            return doxy.parse(content);
        }).catch(function(err) {
            throw err;
        });
};
