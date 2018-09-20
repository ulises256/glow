const db = require('../relaciones');
const _ = require('lodash')
var { carrera, imagenes, patrocinador, municipio, estado} = db;

var ex = module.exports = {};

ex.create = (req, res, next) => carrera.create(req.body)
    .then(response => {
        response.createRuta();
        res.status(200).jsonp(response)
    })

ex.delete = (req, res, next) => carrera.findById(req.params.id)
    .then(carrera => carrera.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => carrera.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    carrera.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    carrera.findAll()
    .then(response => res.status(200).jsonp(response))

ex.obtenerImagenes = (req, res, next) => carrera.findById(req.params.id)
    .then(carrera => carrera? carrera.getImagenes({attributes: ['id', 'tipo']}): null )
    .then(imagenes => imagenes.map(n => new Object({id: n.id, tipo: n.tipo})))
    .then(imagenes => res.status(200).jsonp(imagenes))
    .catch(err => res.status(500).jsonp(err));

ex.agregarImagen = (req, res, next) => carrera.findById(req.params.id)
    .then(carrera => imagenes.create(req.body)
                        .then(imagen => carrera.addImagenes(imagen, {attributes: ['id_imagen']}))
                        .then(imagenes => _.flatten(imagenes))
                        .then(imagenes => imagenes.map(n => new Object({id: n.id_imagen})))
                        .then(idimagen => imagenes.findById(idimagen[0].id, {attributes: ['id', 'tipo']})
                                    .then(imagen => res.status(200).jsonp(imagen))
                        )
    )
    .catch(err => res.status(500).jsonp(err));

ex.obtenerPatrocinadores = (req, res, next) => carrera.findById(req.params.id)
    .then(carrera => carrera? carrera.getPatrocinadores({attributes: ['id', 'nombre', 'tipo']}): null)
    .then(patrocinadores =>patrocinadores ?  patrocinadores.map(n => new Object({id: n.id, nombre: n.nombre, tipo: n.tipo})): null)
    .then(patrocinadores => res.status(200).jsonp(patrocinadores))
    .catch(err => console.log(err));

ex.agregarPatrocinador = (req, res, next) => carrera.findById(req.params.id)
    .then(carrera => {
        req.body.id ?
            patrocinador.findById(req.body.id)
                .then(patro => agregar(patro))
            :
            patrocinador.create(req.body)
                .then(patro => agregar(patro))

        agregar = (patro) => {
            carrera.addPatrocinadores(patro)
            .then(patros => _.flatten(patros))
            .then(patro => patro.map(n => new Object({id: n.id_patrocinador})))
            .then(patro => patrocinador.findById(patro[0].id, {attributes: ['id', 'nombre', 'tipo']})
                            .then(patro => res.status(200).jsonp(patro))
            )
        }
    })
    .catch(err => res.status(500).jsonp(err));
    

ex.quitarPatrocinador = (req, res, next) => carrera.findById(req.params.id)
    .then(carrera => carrera.removePatrocinadores(req.params.idPatrocinador).
                        then(response => res.status(200).jsonp(response))
                        .catch(err => res.status(500).jsonp(err))
    );

ex.obtenerCiudades = (req, res, next) => carrera.findById(req.params.id) 
        .then(carrera => carrera.getMunicipios({attributes: ['id', 'municipio']}))
        .then(ciudades => res.status(200).jsonp(ciudades))
        .catch(err => console.log(err))

ex.unirCiudad = (req, res, next) => carrera.findById(req.params.id) 
    .then(carrera => carrera.addMunicipio(req.body.id)
                        .then(ciudades => _.flatten(ciudades))
                        .then(ciudades => ciudades.map(n => new Object({id: n.id_municipio})))
                        .then(ciudades => municipio.findById(ciudades[0].id, {attributes: ['id', 'municipio']})
                                            .then(ciudad => {ciudad.getEstado().then(estadito => estadito[0].update({tiene_carrera: 'Si'}));res.status(200).jsonp(ciudad)})
                        )
                        .catch(err => res.status(500).jsonp(err))
    );

ex.quitarCiudad = (req, res, next) => carrera.findById(req.params.id)
    .then(carrera => carrera.removeMunicipio(req.params.idCiudad)
                        .then(municipio => res.status(200).jsonp(municipio))
                        .catch(err => res.status(500).jsonp(err))
    );

ex.obtenerBoletos = (req, res, next) => carrera.findById(req.params.id)
    .then(carrera => carrera? carrera.getBoletos({attributes: ['id', 'nombre', 'precioini', 'preciofin', 'fechaini', 'fechafin', 'tipo', 'activo'] }): null)
    .then(boletos => res.status(200).jsonp(boletos))
    .catch(err => console.log(err));


ex.obtenerCarrerasConGaleria = (req, res, next) => carrera.findAll({where: { status: 'realizado' }})
    .then(carreras =>  res.status(200).jsonp(carreras));

ex.agregarBoleto = (req, res, next) => carrera.findById(req.params.id)
    .then(carrera => carrera.createBoleto(req.body, {attributes: ['id', 'nombre', 'precioini', 'preciofin', 'fechaini', 'fechafin', 'tipo', 'activo'] }))
    .then(boleto => res.status(200).jsonp(boleto))
    .catch(err => console.log(err));   

ex.obtenerRuta = (req, res, next) => carrera.findById(req.params.id)
    .then(carrera => carrera.getRuta({attributes: ['id'] }))
    .then(ruta => res.status(200).jsonp(ruta));

ex.anadirRuta = (req, res, next) => carrera.findById(req.params.id)
    .then(carrera => carrera.createRuta())
    .then(ruta => res.status(200).jsonp(ruta));

ex.obtenerHome =  (req, res, next) => carrera.findAll({
    where: {status: 'proximo'},
    order: [['fechaini', 'ASC']],
    limit: 4
}).then(response => res.status(200).jsonp(response))

ex.filtroCarrera =  (req, res, next) =>{
    req.body.busqueda =="" ? res.status(200).jsonp([])
    :
    carrera.findAll({
        where : {
            nombre: {
                $like: '%'+req.body.busqueda+'%'
            }
        },
        attributes: ['id', 'nombre','description', 'fechaini', 'status']
    })
    .then(patrocinadores => res.status(200).jsonp(patrocinadores))
    .catch(err => console.log(err));
}

ex.paginacion = function(req, res, next) {

    carrera.findAndCountAll(
            {
                where: {status: 'realizado'},
                order:[
                    ['fechaini', 'DESC'],
                ],
            })
        .then(result=> {
            let response =  new Object(
                                {
                                    pagina:Math.round(result.count/req.params.Items),
                                    items: _.chunk(result.rows, req.params.Items)[req.params.Pagina],
                                    totalPaginas: _.chunk(result.rows, req.params.Items).length
                                });
            res.status(200).jsonp(response);
        })

};

ex.carrerasXEstado = (req, res, next) => {
    estado.findById(req.params.idEstado)
        .then(estadito => estadito.getMunicipios())
        .then(municipios => Promise.all(
            municipios.map ( async (municipio) =>
                await municipio.getCarreras()
            )))
        .then(response => response.filter(n => n.length > 0))
        .then(response => _.flatten(response))
        .then(response =>  res.status(200).jsonp(response))
}