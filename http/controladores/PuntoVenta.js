const db = require('../relaciones');
var { puntoVenta } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => puntoVenta.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => puntoVenta.findById(req.params.id)
    .then(puntoVenta => puntoVenta.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => puntoVenta.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    puntoVenta.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    puntoVenta.findAll()
    .then(response => res.status(200).jsonp(response))
