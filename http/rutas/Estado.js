var route = require('express').Router();
var x = require('../controladores/Estado');

route.route('/data/estado')
        .get(x.read)
        .post(x.create);

route.route('/data/estado/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);
route.route('/data/estado/municipio/:id')
        .get(x.obtenerCiudades)
module.exports = route;

