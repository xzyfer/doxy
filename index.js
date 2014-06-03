/* jshint -W084 */
/*!
 * Module dependencies.
 */
var fs = require('q-io/fs');

/**
 * Parse comments in the given string.
 *
 * @param {String} str
 * @param {Object} options
 * @return {Array}
 * @see exports.parseComment
 * @api public
 */

 module.exports = doxy = {};

 doxy.parse = function(str) {
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
        if(!inBlock && (match = line.match(/\/\*\s?(.*?)\s?\*\//))) {
            comments.push(match[1]);
            singleLine = false;
        }
        else
        // opening /*
        if(!inBlock && (match = line.match(/\/[*]+(\s*)(.*)/))) {
            // /* I should be part of the multiline comment
            if(match[2].length) {
                comment.push(match[2]);
                if(match[1].length) {
                    multilineIndent = match[1].length + 2;
                }
            }

            inBlock = true;
            singleLine = false;
        }
        else
        // closing */
        if(inBlock && (match = line.match(new RegExp("(?:\\s{0,"+Math.max(0, multilineIndent)+"})(\\s*)(.*?)\\s?\\*\\/")))) {
            if(multilineIndent < 0) {
                multilineIndent = match[1].length;
            }

            // I should be part of the multiline comment */
            if(match[2].length) {
                comment.push(match[2]);
            }

            comments.push(comment.join('\n'));

            // reset state
            comment = [];
            inBlock = false;
            multilineIndent = -1;
        }
        else
        // lines between /* and */
        if(inBlock && (match = line.match(new RegExp("(?:\\s*\\*)?(?:\\s{0,"+Math.max(0, multilineIndent)+"})(\\s*)(.*)")))) {
            if(multilineIndent < 0) {
                multilineIndent = match[1].length;
                comment.push(match[2]);
            } else {
                comment.push(match[1] + match[2]);
            }

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

doxy.fromFile = function(file) {
    return fs.read(file)
        .then(function(content) {
            return doxy.parse(content);
        }, function(err) {
            throw err;
        });
};
