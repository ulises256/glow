var route = require('express').Router();
var x = require('../controladores/Patrocinador');

route.route('/data/patrocinador')
        .get(x.read)
        .post(x.create);

route.route('/data/patrocinador/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

route.route('/data/patrocinador/imagenes/:id')
        .get(x.obtenerImagenes)
        .post(x.agregarImagen);
route.route('/data/patrocinador/filtro')
        .post(x.filtroPatrocinador);
        
route.route('/data/patrocinador/puntoventa/:id')
        .get(x.obtenerPuntoVentas)
        .post(x.agregarPuntoVenta);
module.exports = route;

