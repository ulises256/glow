var route = require('express').Router();
var x = require('../controladores/Impresos');

route.route('/data/impresos')
        .get(x.read)
        .post(x.create);

route.route('/data/impresos/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = route;