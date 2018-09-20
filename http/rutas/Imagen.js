var route = require('express').Router();
var x = require('../controladores/Imagen');

route.route('/data/imagen')
        .get(x.read)
        .post(x.create);

route.route('/data/imagen/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = route;
