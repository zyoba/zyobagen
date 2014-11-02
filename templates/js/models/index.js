'use strict';

var modelgen = require('model-gen');

var config = require('../config');

var config = {
    dir: __dirname,
    ext: '.json',

    db: config.db
};

module.exports = modelgen(config);

//-- Test Code ----------------------------------------------------------
if (require.main === module) {
    (function () {
        console.log(module.exports);
    })();
}
