var querystring = require('querystring')
    , FOOTER = '/*** EXPORTS FROM duo-exports ***/\n'
    ;

module.exports = function(opts) {
    var options;
    if (Array.isArray(opts)) {
        options = opts;
    } else if (typeof opts == 'undefined' || opts === null) {
        options = [];
    } else {
        throw new Error('opts should be an array');
    }
    return function exports(file, entry) {
        options.forEach(function(opt) {
            var query, exports, keys, mod;
            if (opt.test.test(file.path)) {
                query = querystring.parse(opt.query);
                exports = [];
                keys = Object.keys(query);
                if (keys.length == 1 && query[keys[0]] == '') {
                    exports.push('module.exports = ' + keys[0] + ';');
                } else {
                    keys.forEach(function(name) {
                        mod = name;
                        if (typeof query[name] == 'string' && query[name] != '') {
                             mod = query[name];
                        }
                        exports.push('exports[' + JSON.stringify(name) + '] = (' + mod + ');');
                    });
                }
                file.src += '\n' + FOOTER + exports.join('\n');
            }
        });
    };
};
