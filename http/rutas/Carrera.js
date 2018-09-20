var route = require('express').Router();
var x = require('../controladores/Carrera');

route.route('/data/carrera')
        .get(x.read)
        .post(x.create);

route.route('/data/carrera/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

route.route('/data/carrera/imagenes/:id')
        .get(x.obtenerImagenes)
        .post(x.agregarImagen);

route.route('/data/carrera/obtenerhome/home')
        .get(x.obtenerHome);       
        
route.route('/data/carrera/patrocinadores/:id')
        .get(x.obtenerPatrocinadores)
        .post(x.agregarPatrocinador);
route.route('/data/carrera/patrocinadores/:id/:idPatrocinador')        
        .delete(x.quitarPatrocinador);

route.route('/data/carrera/ciudades/:id')
        .get(x.obtenerCiudades)
        .post(x.unirCiudad);
route.route('/data/carrera/ciudades/:id/:idCiudad')        
        .delete(x.quitarCiudad);

route.route('/data/carrera/boletos/:id')
        .get(x.obtenerBoletos)
        .post(x.agregarBoleto);

route.route('/data/carrera/rutas/:id')
        .get(x.obtenerRuta)
        .post(x.anadirRuta);        

route.route('/data/carrera/galerias/galerias/')
        .get(x.obtenerCarrerasConGaleria);

route.route('/data/carrera/filtro')
        .post(x.filtroCarrera);

route.route('/data/carrera/paginacion/:Items/:Pagina')
        .post(x.paginacion)
route.route('/data/carrera/carrerasXestados/estados/muni/:idEstado')
        .post(x.carrerasXEstado)        
module.exports = route;

