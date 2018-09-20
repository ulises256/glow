var route = require('express').Router();
var x = require('../controladores/Ruta');

route.route('/data/rutas')
        .get(x.read)
        .post(x.create);

route.route('/data/rutas/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);


route.route('/data/rutas/puntos/:id')
        .get(x.obtenerPuntos)
        .post(x.modificarPuntos);


module.exports = route;        