var Duo = require('duo')
    , duoExports = require('../index')
    , test = require('tap').test
    ;

test('export without configuration', function(t) {
    new Duo(__dirname)
        .cache(false)
        .entry('./fixture/foo.js')
        .use(duoExports())
        .run(function(err, src) {
            t.notOk(/EXPORTS FROM duo-exports/.test(src), 'does not contain footer');
            t.end();
        });
});

test('export with 1 key configuration', function(t) {
    new Duo(__dirname)
        .cache(false)
        .entry('./fixture/foo.js')
        .use(duoExports([{ test: /foo/, query: 'bar' }]))
        .run(function(err, src) {
            t.ok(/EXPORTS FROM duo-exports/.test(src), 'contains footer');
            t.ok(/module\.exports = bar/.test(src), 'contains export');
            t.end();
        });
});

test('export with multiple key configuration', function(t) {
    new Duo(__dirname)
        .cache(false)
        .entry('./fixture/foo.js')
        .use(duoExports([{ test: /foo/, query: 'bar&baz' }]))
        .run(function(err, src) {
            t.ok(/exports\["bar"\] = \(bar\)/.test(src), 'contains first export');
            t.ok(/exports\["baz"\] = \(baz\)/.test(src), 'contains second export');
            t.end();
        });
});

test('export with key-value configuration', function(t) {
    new Duo(__dirname)
        .cache(false)
        .entry('./fixture/foo.js')
        .use(duoExports([{ test: /foo/, query: 'bar=baz' }]))
        .run(function(err, src) {
            t.ok(/exports\["bar"\] = \(baz\)/.test(src), 'contains export');
            t.end();
        });
});
