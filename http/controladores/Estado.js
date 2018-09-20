const db = require('../relaciones');
var { estado } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => estado.create(req.body)
    .then(response => res.status(200).jsonp(response));

ex.delete = (req, res, next) => estado.findById(req.params.id)
    .then(estado => estado.destroy())
    .then(response => res.status(200).jsonp(response));

ex.update = (req, res, next) => estado.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response));

ex.read =  (req, res, next) => req.params.id ?
    estado.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    estado.findAll()
    .then(response => res.status(200).jsonp(response));

ex.obtenerCiudades = (req, res, next) => estado.findById(req.params.id)
    .then(estado => estado.getMunicipios({attributes: ['id' , 'municipio'], order: ['municipio']}))
    .then(municipios => municipios.map(n => new Object({id: n.id, municipio: n.municipio})))
    .then(municipios => res.status(200).jsonp(municipios));
