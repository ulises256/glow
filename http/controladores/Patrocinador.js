const db = require('../relaciones');
const _ = require('lodash')
var { patrocinador, imagenes, puntoVenta, municipio } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => patrocinador.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => patrocinador.findById(req.params.id)
    .then(patrocinador => patrocinador.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => patrocinador.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    patrocinador.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    patrocinador.findAll()
    .then(response => res.status(200).jsonp(response))

ex.obtenerImagenes = (req, res, next) => patrocinador.findById(req.params.id)
    .then(patrocinador => patrocinador.getImagen({attributes: ['id', 'imagen', 'tipo']}))
    .then(imagenes => imagenes.map(n => new Object({id: n.id, tipo: n.tipo, imagen: n.imagen})))
    .then(imagenes => res.status(200).jsonp(imagenes))
    .catch(err => console.log(err));

ex.agregarImagen = (req, res, next) => patrocinador.findById(req.params.id)
    .then(patrocinado => imagenes.create(req.body)
                        .then(imagen => patrocinado.addImagen(imagen, {attributes: ['id_imagen']}))
                        .then(imagenes => _.flatten(imagenes))
                        .then(imagenes => imagenes.map(n => new Object({id: n.id_imagen})))
                        .then(idimagen => imagenes.findById(idimagen[0].id, {attributes: ['id', 'tipo']})
                                    .then(imagen => res.status(200).jsonp(imagen))
                        )
    )
    .catch(err => console.log(err));

ex.agregarPuntoVenta = (req, res, next) => {
    patrocinador.findById(req.params.id)
    .then(patro => puntoVenta.create(req.body).then(pv => patro.addPuntosVentas(pv).then(pv2 => res.status(200).jsonp(pv))))
    .catch(err => console.log(err))
}

ex.obtenerPuntoVentas = (req, res, next) => {
    patrocinador.findById(req.params.id)
    .then(patro => patro.getPuntosVentas().then(pvs=> res.status(200).jsonp(pvs)));
}

ex.filtroPatrocinador =  (req, res, next) => {
    req.body.busqueda =="" ? res.status(200).jsonp([])
    :
    patrocinador.findAll({
        where : {
            nombre: {
                $like: '%'+req.body.busqueda+'%'
            }
        },
        attributes: ['id', 'nombre','tipo']
    })
    .then(patrocinadores => res.status(200).jsonp(patrocinadores))
    .catch(err => console.log(err));
}