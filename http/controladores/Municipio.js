const db = require('../relaciones');
var { municipio } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => municipio.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => municipio.findById(req.params.id)
    .then(municipio => municipio.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => municipio.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    municipio.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    municipio.findAll()
    .then(response => res.status(200).jsonp(response))
