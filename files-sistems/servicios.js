
app.service('Evento', function() {

    this.crear = evento => axios.post('/data/evento', evento)
    this.obtener = () => axios('/data/evento')
    this.one = id => axios('/data/evento/' + id)
    this.editar = id => axios.put('/data/evento/' + id)
    this.eliminar = id => axios.delete('/data/evento/' + id)
    this.editar = evento => axios.put('/data/evento/' + evento.id, evento)

});

app.service('Imagen', function() {

    this.crear = imagen => axios.post('/data/imagen', imagen)
    this.obtener = () => axios('/data/imagen')
    this.one = id => axios('/data/imagen/' + id)
    this.editar = id => axios.put('/data/imagen/' + id)
    this.eliminar = id => axios.delete('/data/imagen/' + id)
    this.editar = imagen => axios.put('/data/imagen/' + imagen.id, imagen)

});

app.service('Instalacion', function() {

    this.crear = instalacion => axios.post('/data/instalacion', instalacion)
    this.obtener = () => axios('/data/instalacion')
    this.one = id => axios('/data/instalacion/' + id)
    this.editar = id => axios.put('/data/instalacion/' + id)
    this.eliminar = id => axios.delete('/data/instalacion/' + id)
    this.editar = instalacion => axios.put('/data/instalacion/' + instalacion.id, instalacion)

});

app.service('Servicio', function() {

    this.crear = servicio => axios.post('/data/servicio', servicio)
    this.obtener = () => axios('/data/servicio')
    this.one = id => axios('/data/servicio/' + id)
    this.editar = id => axios.put('/data/servicio/' + id)
    this.eliminar = id => axios.delete('/data/servicio/' + id)
    this.editar = servicio => axios.put('/data/servicio/' + servicio.id, servicio)

});

app.service('Salon', function() {

    this.crear = salon => axios.post('/data/salon', salon)
    this.obtener = () => axios('/data/salon')
    this.one = id => axios('/data/salon/' + id)
    this.editar = id => axios.put('/data/salon/' + id)
    this.eliminar = id => axios.delete('/data/salon/' + id)
    this.editar = salon => axios.put('/data/salon/' + salon.id, salon)

});

app.service('Prospecto', function() {

    this.crear = prospecto => axios.post('/data/prospecto', prospecto)
    this.obtener = () => axios('/data/prospecto')
    this.one = id => axios('/data/prospecto/' + id)
    this.editar = id => axios.put('/data/prospecto/' + id)
    this.eliminar = id => axios.delete('/data/prospecto/' + id)
    this.editar = prospecto => axios.put('/data/prospecto/' + prospecto.id, prospecto)

});

app.service('Noticia', function() {

    this.crear = noticia => axios.post('/data/noticia', noticia)
    this.obtener = () => axios('/data/noticia')
    this.one = id => axios('/data/noticia/' + id)
    this.editar = id => axios.put('/data/noticia/' + id)
    this.eliminar = id => axios.delete('/data/noticia/' + id)
    this.editar = noticia => axios.put('/data/noticia/' + noticia.id, noticia)

});

app.service('Instruccion', function() {

    this.crear = instruccion => axios.post('/data/instruccion', instruccion)
    this.obtener = () => axios('/data/instruccion')
    this.one = id => axios('/data/instruccion/' + id)
    this.editar = id => axios.put('/data/instruccion/' + id)
    this.eliminar = id => axios.delete('/data/instruccion/' + id)
    this.editar = instruccion => axios.put('/data/instruccion/' + instruccion.id, instruccion)

});
