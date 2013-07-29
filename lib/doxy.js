/* jshint -W084 */
/*!
 * Module dependencies.
 */
// var css = require('css-parse');

/**
 * Parse comments in the given string.
 *
 * @param {String} str
 * @param {Object} options
 * @return {Array}
 * @see exports.parseComment
 * @api public
 */

exports.parse = function(str) {
    var lines = str.split(/\n/)
      , comments = []
      , comment = []
      , match
      , inBlock = false
      , singleLine = false
    ;

    lines.forEach(function(line) {
        // /* single line */
        if(!inBlock && (match = line.match(/\/\*\s?(.*?)\s?\*\//))) {
            comments.push(match[1]);
            singleLine = false;
        }
        else
        // opening /*
        if(!inBlock && (match = line.match(/\/[*]+\s?(.*)/))) {
            // /* I should be part of the multiline comment
            if(match[1].length) {
                comment.push(match[1]);
            }

            inBlock = true;
            singleLine = false;
        }
        else
        // closing */
        if(inBlock && (match = line.match(/(.*?)\s?\*\//))) {
            // I should be part of the multiline comment */
            if(match[1].length) {
                comment.push(match[1]);
            }

            comments.push(comment.join('\n'));

            // reset state
            comment = [];
            inBlock = false;
        }
        else
        // lines between /* and */
        if(inBlock && (match = line.match(/(?:\s?\*\s?)?(.*)/))) {
            comment.push(match[1]);
        }
        else
        // single line // style comments
        if(!inBlock && (match = line.match(/\/\/\s?(.*)/))) {
            if(singleLine) {
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

    return comments;
};

