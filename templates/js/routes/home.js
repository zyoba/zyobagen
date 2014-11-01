'use strict';

var home = {
    index: function indexfn(req, res, next) {
        res.locals.title = 'Express';
        res.render('index');
    }
};


module.exports = home;
