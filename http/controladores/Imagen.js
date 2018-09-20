const db = require('../relaciones');
var { imagenes } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => imagenes.create(req.body)
    .then(response => res.status(200).jsonp(response));

ex.delete = (req, res, next) => imagenes.findById(req.params.id)
    .then(imagen => imagen.destroy())
    .then(response => res.status(200).jsonp(response));

ex.update = (req, res, next) => imagenes.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response));

ex.read =  (req, res, next) => {
    req.params.id ?
    imagenes.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    .catch(err => console.log(err))
    :
    imagenes.findAll()
    .then(response => res.status(200).jsonp(response))
    .catch(err => console.log(err));;
}