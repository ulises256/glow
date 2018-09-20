var route = require('express').Router();
var x = require('../controladores/Municipio');

route.route('/data/municipio')
        .get(x.read)
        .post(x.create);

route.route('/data/municipio/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = route;

