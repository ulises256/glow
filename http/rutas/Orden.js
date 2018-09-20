var route = require('express').Router();
var x = require('../controladores/Orden');

route.route('/data/orden')
        .get(x.read)
        .post(x.create);

route.route('/data/orden/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

route.route('/data/orden/usuario/:id')
        .get(x.obtenerUsuario);


route.route('/data/orden/impresos/:id')
        .get(x.obtenerImpresos);        
route.route('/data/orden/pagar/transaccion/pagos')
        .post(x.verCargos)
route.route('/data/orden/pagar/transaccion/pago/:idOrden')
        .post(x.crearTransaccionPagar);
module.exports = route;
