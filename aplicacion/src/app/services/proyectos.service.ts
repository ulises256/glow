import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import * as axios from 'axios'

@Injectable()

export class ProyectosService {
    private static apiUrl: string = APILOCAL.url;

    public static getProyecto(idProyecto){
        return axios.default.get(this.apiUrl + '/data/proyectos/' + idProyecto);
    }

    public static getProyectos() {
        return axios.default.get(this.apiUrl + '/data/proyectos/');
    }

    public static getProyectosLite(){
        return axios.default.get(this.apiUrl + '/data/proyectosLite');
    }

    public static getProyectoStatus(idProyecto) {
        return axios.default.get(this.apiUrl + '/data/ProyectoStatus/' + idProyecto);
    }

    public static createProyecto(proyecto) {
        return axios.default.post(this.apiUrl + '/data/proyectos', proyecto);
    }

    public static updateProyecto(proyecto) {
        return axios.default.put(this.apiUrl + '/data/proyectos/' + proyecto.id, proyecto);
    }

    public static deleteProyecto(idProyecto) {
        return axios.default.delete(this.apiUrl + '/data/proyectos/' + idProyecto);
    }

    public static paginacion(items, pagina, status) {
        return axios.default.get(this.apiUrl + '/data/proyectos/paginacion/' + items + '/' + pagina + '/' + status);
    }

    public static getProyectoPendiente(idProyecto) {
        return axios.default.get(this.apiUrl + '/data/proyecto/pendiente/' + idProyecto)
    }

    public static getProyectosProgreso(idProyecto) {
        return axios.default.get(this.apiUrl + '/data/proyecto/progreso/' + idProyecto)
    }

    public static getProyectoTerminado(idProyecto) {
        return axios.default.get(this.apiUrl + '/data/proyecto/terminado/' + idProyecto)
    }
}