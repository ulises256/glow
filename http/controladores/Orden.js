const db = require('../relaciones');
var { orden, impreso } = db;
var isProduction = false;
var resource_name = 'https://sandbox-api.openpay.mx'
//class
var Openpay = require('openpay');
//instantiation
var openpay = new Openpay('m6guc0dqh2k6d0vvqdgx', 'sk_a01368db5be24c55b0e8b0dab5c71fe8', [isProduction]);

openpay.setMerchantId('m6guc0dqh2k6d0vvqdgx');
openpay.setPrivateKey('sk_a01368db5be24c55b0e8b0dab5c71fe8');
openpay.setProductionReady(false);
//use the api

var ex = module.exports = {};

ex.create = (req, res, next) => orden.create(req.body).then(response => res.status(200).jsonp(response))


ex.crearTransaccionPagar = (req, res, next) =>
	openpay.charges.create(req.body, (error, body) => {
		console.log(body)
		if (body) {
			let ordensita = {
				status: body.status,
				fechaCompra: body.operation_date
			}

			orden.findById(req.params.idOrden)
				.then(orden => {

					orden.update(ordensita)
						.then(response => response.status == 'completed'? res.status(200).jsonp(1) : res.status(200).jsonp(0) );

					for (i = 0; i < orden.cantidad; i++) {
						crearBoleto();
					}

					function crearBoleto() {
						impreso.create({ codigo: Math.floor(Math.random() * 16777215).toString(16), id_orden: orden.id })
							.then(impresionsita => console.log('impreso creado'))
							.catch(err => crearBoleto())
					}					
				});
		}

		if (error) {
			res.status(200).jsonp({ error_code: error.error_code })
		}

	});

ex.verCargos = (req, res, next) => {
	let offset = 0
	let limit = 0;

	req.body.limit ? limit = req.body.limit : limit = 5;
	req.body.offset ? offset += req.body.offset : null;
	openpay.charges.list({ 'offset': offset, limit: limit }, (error, lista) => {
		res.status(200).jsonp({ lista: lista, offset: offset });
	});
}

ex.delete = (req, res, next) => orden.findById(req.params.id)
	.then(orden => orden.destroy())
	.then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => orden.update(req.body, { where: { id: req.params.id } })
	.then(response => res.status(200).jsonp(response))

ex.read = (req, res, next) => req.params.id ?
	orden.findById(req.params.id)
		.then(response => res.status(200).jsonp(response))
	:
	orden.findAll()
		.then(response => res.status(200).jsonp(response))

ex.obtenerUsuario = (req, res, next) => orden.findById(req.params.id)
	.then(orden => orden.getUsuario())
	.then(response => res.status(200).jsonp(response))


ex.obtenerImpresos = (req, res, next) => orden.findById(req.params.id)
	.then(orden => orden.getImpresos())
	.then(response => res.status(200).jsonp(response))
