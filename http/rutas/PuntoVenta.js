var route = require('express').Router();
var x = require('../controladores/PuntoVenta');

route.route('/data/puntoventa')
        .get(x.read)
        .post(x.create);

route.route('/data/puntoventa/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = route;        