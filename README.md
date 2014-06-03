# doxy

Extracts single line `//` and multiline `/* */` comments from a string or file.
Has some added smarts for normalising indentation and aesthetic prefixing.

See the [test fixture](https://github.com/xzyfer/doxy/blob/new/tests/fixtures/styles.js)
for the currently supported comment styles.

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
