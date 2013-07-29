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
    ;

    lines.forEach(function(line) {
        if(!inBlock && (match = line.match(/\/\*\s?(.*?)\s?\*\//))) {
            comments.push(match[1]);
        }
        else
        if(!inBlock && (match = line.match(/\/[*]+\s?(.*)/))) {
            inBlock = true;
        }
        else
        if(inBlock && (match = line.match(/\*\//))) {
            comments.push(comment.join('\n'));
            comment = [];
            inBlock = false;
        }
        else
        if(inBlock && (match = line.match(/\s?\*\s?(.*)/))) {
            comment.push(match[1]);
        }
        else
        if(!inBlock && (match = line.match(/\/\/\s?(.*)/))) {
            comments.push(match[1]);
        }
    });

    return comments;
};

