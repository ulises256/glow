const db = require('../relaciones');
var { ruta, punto } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => ruta.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => ruta.findById(req.params.id)
    .then(ruta => ruta.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => ruta.update(req.body, { where: { id: req.params.id } })
    .then(response => res.status(200).jsonp(response))

ex.read = (req, res, next) => req.params.id ?
    ruta.findById(req.params.id)
        .then(response => res.status(200).jsonp(response))
    :
    ruta.findAll()
        .then(response => res.status(200).jsonp(response))

ex.obtenerPuntos = (req, res, next) => ruta.findById(req.params.id)
    .then(ruta => ruta.getPuntos({ attributes: ['id', 'latitud', 'longitud'] }))
    .then(puntos => res.status(200).jsonp(puntos));

ex.modificarPuntos = (req, res, next) => {
    console.log(req.body)
    ruta.findById(req.params.id)
        .then(rutas => {
            rutas.getPuntos()
                .then(async p => {
                    p.map(async p => await p.destroy())
                    req.body.map(async p => await punto.create(p).then(async pp => await rutas.addPuntos(pp)))
                });
            rutas.getPuntos().then(p => res.status(200).jsonp(p))
        })
}


// await rutas.removePuntos(p)
// .then( async p => await req.body.map(async p => await punto.create(p)
//                                 .then(async p => await rutas.addPuntos(p))
//                         )
//     )
// }