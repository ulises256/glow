var db = require('../relaciones');
var nodeMailer = require('nodemailer');

var {usuario, carrera, orden} = db;

var ex = module.exports = {};


ex.create = (req, res, next) => usuario.create(req.body)
    .then(result  => res.status(200).jsonp(result));

ex.delete = (req, res, next) => usuario.findById(req.params.id)
    .then((usuario) => usuario.destroy().then((result) => res.status(200).jsonp(result)))

ex.update = (req, res, next) => usuario.update(req.body, { where: { id: req.params.id}})
    .then((result) => res.status(200).jsonp({msj: 'SUCCESS!'}));

ex.read = (req, res, next) => req.params.id ?
    usuario.findById(req.params.id )
        .then((usuario) => res.status(200).jsonp(usuario))
    :
    usuario.findAll()
        .then((usuarios) => res.status(200).jsonp(usuarios));

ex.obtenerCarreras = (req, res, next) => usuario.findById(req.params.id)
    .then(usuario => usuario.getCarreras({attributes: ['id', 'municipio']}))
    .then(carreras => res.status(200).jsonp(carreras))
    .catch(err => res.status(500).jsonp(err))

ex.unirCarrera = (req, res, next) => usuario.findById(req.params.id)
    .then(usuario => usuario.addCarreras(req.body.id)
                    .then(carreras => _.flatten(carreras))
                    .then(carreras => carreras.map(n => new Object({id: n.id_carrera})))
                    .then(carreras => carrera.findById(carreras[0].id).then(carrer => res.status(200).jsonp(carrer)))
                    .catch(err => res.status(500).jsonp(err))    
    );

ex.obtenerOrdenes = (req, res, next) => usuario.findById(req.params.id)
    .then(user => user.getOrdenes().then(ordenes => res.status(200).jsonp(ordenes)));

ex.enviarEmail = (req, res) => {
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'glowrunmx1@gmail.com',
            pass: '#1q2w3e4r'
        }
    });

    let mailOptions = {
        from: '"Desde la página web - Nombre: " '+req.body.nombre+'<glowrunmx1@gmail.com>', // sender address
        to: 'admin@glowrun5k.com.mx', // list of receivers
        subject: req.body.asunto, // Subject line
        text: req.body.descripcion, // plain text body
        html: '<p>'+req.body.descripcion+'</p><br>'+'Correo: '+req.body.correo // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
            res.render('index');
        }); 
}    