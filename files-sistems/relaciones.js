var conector = require('./conexion.js')
var estado  = require('./modelos/Estado')(conector);
var municipio  = require('./modelos/Municipio')(conector);
var carrera  = require('./modelos/Carrera')(conector);
var patrocinador  = require('./modelos/Patrocinador')(conector);
var orden  = require('./modelos/Orden')(conector);
var boleto  = require('./modelos/Boleto')(conector);



module.exports.estado = estado;
module.exports.municipio = municipio;
module.exports.carrera = carrera;
module.exports.patrocinador = patrocinador;
module.exports.orden = orden;
module.exports.boleto = boleto;