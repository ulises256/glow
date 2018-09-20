var fs = require("fs");

var modelos = [
    {   servicio : 'Evento', nombre : 'Eventos',    singular : 'evento',      plural : 'eventos'},
    {   servicio : 'Imagen', nombre : 'Imagenes',    singular : 'imagen',      plural : 'imagenes'},
    {   servicio : 'Instalacion', nombre : 'Instalaciones',    singular : 'instalacion',      plural : 'instalaciones'},
    {   servicio : 'Servicio', nombre : 'Servicios',    singular : 'servicio',      plural : 'servicios'},
    {   servicio : 'Salon', nombre : 'Salones',    singular : 'salon',      plural : 'salones'},
    {   servicio : 'Prospecto', nombre : 'Prospectos',    singular : 'prospecto',      plural : 'prospectos'},
    {   servicio : 'Noticia', nombre : 'Noticias',    singular : 'noticia',      plural : 'noticias'},
    {   servicio : 'Instruccion', nombre : 'Instrucciones',    singular : 'instruccion',      plural : 'instrucciones'}
]


var relaciones = fs.createWriteStream("servicios.js")

modelos.forEach(modelo =>
relaciones.write(
`
app.service('` + modelo.servicio +  `', function() {

    this.crear = ` + modelo.singular +  ` => axios.post('/data/` + modelo.singular +  `', ` + modelo.singular +  `)
    this.obtener = () => axios('/data/` + modelo.singular +  `')
    this.one = id => axios('/data/` + modelo.singular +  `/' + id)
    this.editar = id => axios.put('/data/` + modelo.singular +  `/' + id)
    this.eliminar = id => axios.delete('/data/` + modelo.singular +  `/' + id)
    this.editar = ` + modelo.singular +  ` => axios.put('/data/` + modelo.singular +  `/' + ` + modelo.singular +  `.id, ` + modelo.singular +  `)

});
`)
)

relaciones.end()
