const db = require('../relaciones');
var { impreso } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => impreso.create(req.body)
    .then(response => res.status(200).jsonp(response));

ex.delete = (req, res, next) => impreso.findById(req.params.id)
    .then(impreso => impreso.destroy())
    .then(response => res.status(200).jsonp(response));

ex.update = (req, res, next) => impreso.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response));

ex.read =  (req, res, next) => req.params.id ?
    impreso.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    impreso.findAll()
    .then(response => res.status(200).jsonp(response));