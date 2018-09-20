const db = require('../relaciones');
var { cupon } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => cupon.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => cupon.findById(req.params.id)
    .then(cupon => cupon.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => cupon.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ? 
    cupon.findById(req.params.id)
        .then(response => res.status(200).jsonp(response))
    :
    cupon.findAll()
        .then(response => res.status(200).jsonp(response));

ex.carreras = (req, res, next) => cupon.findAll({
    where : {
        id_carrera: req.params.idCarrera
    }
})
.then(response => res.status(200).jsonp(response));