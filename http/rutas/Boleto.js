var route = require('express').Router();
var x = require('../controladores/Boleto');

route.route('/data/boleto')
        .get(x.read)
        .post(x.create);

route.route('/data/boleto/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);
route.route('/data/boleto/ordenes/:id')
        .get(x.obtenerOrdenes)        

module.exports = route;

