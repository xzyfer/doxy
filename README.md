# doxy

A basic comment extractor.

[![build status](https://secure.travis-ci.org/xzyfer/doxy.png)](http://travis-ci.org/xzyfer/doxy)

# example

```
var doxy = require('./lib/doxy');
console.log(doxy.parse(string));
```

# methods

``` js
var doxy = require('./lib/doxy')
```

### doxy.parse(string);

Returns an array of comments contained in the string.

### doxy.fromFile(pathToFile);

Returns a promise that resolves to the result of `doxy.parse(fileContents)`.

# install

With [npm](https://npmjs.org) do:

```
npm install findit
```

# license

MIT
