var fs = require("fs");

var modelos = [
    {   servicio : 'boleto', nombre : 'Boleto', singularM:'Boleto', singularn : 'boleto', pluralM : 'Boletos' },
    {   servicio : 'carrera', nombre : 'Carrera', singularM:'Carrera', singularn : 'carrera', pluralM : 'Carreras' },
    {   servicio : 'estado', nombre : 'Estado', singularM:'Estado', singularn : 'estado', pluralM : 'Estados' },
    {   servicio : 'municipio', nombre : 'Municipio', singularM:'Municipio', singularn : 'municipio', pluralM : 'Municipios' },
    {   servicio : 'orden', nombre : 'Orden', singularM:'Orden', singularn : 'orden', pluralM : 'Ordenes' },
    {   servicio : 'patrocinador', nombre : 'Patrocinador', singularM:'Patrocinador', singularn : 'patrocinador', pluralM : 'Patrocinadores' },
]

fs.mkdirSync('servicios')

modelos.forEach(modelo => {
    fs.createWriteStream("servicios/" + modelo.servicio  +".service"+ ".ts")
    .write
    (`
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import * as axios from 'axios'

@Injectable()

export class `+modelo.nombre+`Service {
    private static apiUrl: string = APILOCAL.url;

    public static obtener`+modelo.singularM+`(id`+modelo.singularM+`) {
        return axios.default.get(this.apiUrl + '/data/`+modelo.singularn+`/' + id`+modelo.singularM+`);
    }

    public static obtener`+modelo.pluralM+`() {
        return axios.default.get(this.apiUrl + '/data/`+modelo.singularn+`/');
    }

    public static crear`+modelo.singularM+`(`+modelo.singularn+`) {
        return axios.default.post(this.apiUrl + '/data/`+modelo.singularn+`/', `+modelo.singularn+`);
    }

    public static actualizar`+modelo.singularM+`(`+modelo.singularn+`) {
        return axios.default.put(this.apiUrl + '/data/`+modelo.singularn+`/' + `+modelo.singularn+`.id, `+modelo.singularn+`);
    }

    public static eliminar`+modelo.singularM+`(id`+modelo.singularM+`) {
        return axios.default.delete(this.apiUrl + '/data/`+modelo.singularn+`/' + id`+modelo.singularM+`);
    }
}
    `)
})