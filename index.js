#!/usr/bin/env node

var fs = require('fs'),
    doxy = require('./lib/doxy'),
    argv = require('yargs')
        .usage('Usage: $0 [path/to/file]')
        .demand(1)
        .argv;

fs.readFile(argv._[0], function(err, data) {
    if (err) throw err;
    console.log(doxy.parse(data.toString()));
});
