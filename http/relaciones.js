
//*-*-*-CONEXION CON SEQUELIZE & MYSQL-*-*-*-*-*-*-*
var conector = require('./conexion');

//- Modelos

var usuario = require('./modelos/Usuario')(conector);
var imagenes = require('./modelos/Imagen')(conector);
var avatar = require('./modelos/Avatar')(conector);
var estado  = require('./modelos/Estado')(conector);
var municipio  = require('./modelos/Municipio')(conector);
var carrera  = require('./modelos/Carrera')(conector);
var patrocinador  = require('./modelos/Patrocinador')(conector);
var orden  = require('./modelos/Orden')(conector);
var boleto  = require('./modelos/Boleto')(conector);
var puntoVenta  = require('./modelos/PuntoVenta')(conector);
var cupon = require('./modelos/Cupon')(conector);
var ruta = require('./modelos/Ruta')(conector);
var punto = require('./modelos/Puntos')(conector);
var llaveSocial = require('./modelos/LlaveSocial')(conector);

var impreso = require('./modelos/Impresos')(conector);
//- Relations
usuario.hasOne(llaveSocial , {as: 'SocialKey', foreignKey: 'id_usuario', onDelete: 'CASCADE'});
llaveSocial.belongsTo(usuario, {as: 'Usuario', foreignKey: 'id_usuario'});
llaveSocial.hasOne(avatar, {as: 'Avatar', foreignKey: 'social_key', onDelete: 'CASCADE'});
avatar.belongsTo(llaveSocial , {as: 'SocialKey', foreignKey: 'social_key'});


carrera.belongsToMany(imagenes, {as: 'Imagenes', through: 'carrera_imagen', foreignKey: 'id_carrera', onDelete: 'CASCADE'});
imagenes.belongsToMany(carrera, {as: 'Carreras', through: 'carrera_imagen', foreignKey: 'id_imagen'});

carrera.belongsToMany(usuario, {as: 'Usuarios', through: 'carrera_usuario',foreignKey: 'id_carrera'});
usuario.belongsToMany(carrera, {as: 'Carreras', through: 'carrera_usuario',foreignKey: 'id_usuario' });

carrera.belongsToMany(patrocinador, {as: 'Patrocinadores', through: 'carrera_patrocinador',foreignKey: 'id_carrera'});
patrocinador.belongsToMany(carrera, {as: 'Carreras', through: 'carrera_patrocinador',foreignKey: 'id_patrocinador'});

carrera.hasMany(cupon, {as: 'Cupones', foreignKey: 'id_carrera'});
cupon.belongsTo(carrera, {as: 'Carrera', foreignKey: 'id_carrera'});

patrocinador.belongsToMany(imagenes, {as: 'Imagen', through: 'imagen_patrocinador',foreignKey: 'id_patrocinador', onDelete: 'CASCADE'});
imagenes.belongsToMany(patrocinador, {as: 'Patrocinador', through: 'imagen_patrocinador',foreignKey: 'id_imagen'});

estado.belongsToMany(municipio, {as: 'Municipios', through: 'estados_municipios', foreignKey: 'estados_id'} );
municipio.belongsToMany(estado, {as: 'Estado', through: 'estados_municipios', foreignKey: 'municipios_id'} );

carrera.belongsToMany(municipio, {as: 'Municipios', through: 'carrera_municipios', foreignKey: 'id_carrera'});
municipio.belongsToMany(carrera, {as: 'Carreras', through: 'carrera_municipios', foreignKey: 'id_municipio'});

usuario.hasMany(orden, {as: 'Ordenes', foreignKey: 'id_usuario'});
orden.belongsTo(usuario, {as: 'Usuario', foreignKey: 'id_usuario'});

carrera.hasMany(boleto, {as: 'Boletos', foreignKey: 'id_carrera'});
boleto.belongsTo(carrera, {as: 'Carrera', foreignKey: 'id_carrera'});

boleto.hasMany(orden, {as: 'Ordenes', foreignKey: 'id_boleto'});
orden.belongsTo(boleto, {as: 'Boleto', foreignKey: 'id_boleto'});

orden.hasMany(impreso, {as: 'Impresos', foreignKey: 'id_orden'})
impreso.belongsTo(orden, {as: 'Orden', foreignKey: 'id_orden'})

patrocinador.hasMany(puntoVenta, {as: 'PuntosVentas', foreignKey: 'id_patrocinador'});
puntoVenta.belongsTo(patrocinador, {as: 'Patrocinador', foreignKey: 'id_patrocinador'});

municipio.hasMany(puntoVenta, {as: 'PuntosVentas', foreignKey: 'id_municipio'});
puntoVenta.belongsTo(municipio, {as: 'Municipio', foreignKey: 'id_municipio'});

carrera.hasOne(ruta, {as: 'Ruta', foreignKey: 'id_carrera' , onDelete: 'CASCADE'});
ruta.belongsTo(carrera, {as: 'Carrera', foreignKey: 'id_carrera'});

ruta.hasMany(punto, {as: 'Puntos', foreignKey: 'id_ruta', onDelete: 'CASCADE'});
punto.belongsTo(ruta, {as: 'Ruta', foreignKey: 'id_ruta'})



module.exports.cupon = cupon;
module.exports.usuario = usuario;
module.exports.llaveSocial = llaveSocial;
module.exports.imagenes = imagenes;
module.exports.avatar = avatar;
module.exports.estado = estado;
module.exports.municipio = municipio;
module.exports.carrera = carrera;
module.exports.patrocinador = patrocinador;
module.exports.orden = orden;
module.exports.boleto = boleto;
module.exports.puntoVenta = puntoVenta;
module.exports.ruta = ruta;
module.exports.punto = punto;
module.exports.impreso = impreso;