duo-exports [![Build Status](https://travis-ci.org/MisumiRize/duo-exports.svg)](https://travis-ci.org/MisumiRize/duo-exports)
===========

Duo plugin to export variable

## Install

```shell
$ npm install duo-exports
```

## Usage

Using the API:

```javascript
var Duo = require('duo');
var duoExports = require('duo-exports');

var duo = new Duo(__dirname)
    .entry('index.js')
    .use(duoExports([
        { test: /index/, query: 'Foo' }
    ]);

duo.run(function(err, file) {
    if (err) {
        throw err;
    }

    console.log(file);
    //=> module.exports = Foo;
});
```
