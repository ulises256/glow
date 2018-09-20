const db = require('../relaciones');
var { boleto } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => boleto.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => boleto.findById(req.params.id)
    .then(boleto => boleto.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => boleto.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    boleto.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    boleto.findAll()
    .then(response => res.status(200).jsonp(response))

ex.obtenerOrdenes = (req, res, next) => boleto.findById(req.params.id)
    .then(boleto => boleto.getOrdenes())
    .then(ordenes => res.status(200).jsonp(ordenes))
    .catch(err => console.log(err));