var express = require('express');
var routeUsuario = express.Router();

var x = require("../controladores/Usuario");

routeUsuario.route('/data/usuario')
        .get(x.read)
        .post(x.create);

routeUsuario.route('/data/usuario/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

routeUsuario.route('/data/usuario/carrea/:id')
        .get(x.obtenerCarreras)
        .put(x.unirCarrera)

routeUsuario.route('/data/usuario/ordenes/:id')
        .get(x.obtenerOrdenes)

routeUsuario.route('/data/enviarcorreo')
        .post(x.enviarEmail);        

module.exports = routeUsuario;

