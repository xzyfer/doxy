#!/usr/bin/env node

var doxy = require('./lib/doxy'),
    argv = require('yargs')
        .usage('Usage: $0 [path/to/file]')
        .demand(1)
        .argv;

doxy.fromFile(argv._[0]).then(function(data) {
    console.log(data);
});
