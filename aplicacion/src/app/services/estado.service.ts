
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import * as axios from 'axios'

@Injectable()

export class EstadoService {
    private static apiUrl: string = APILOCAL.url;

    public static obtenerEstado(idEstado) {
        return axios.default.get(this.apiUrl + '/data/estado/' + idEstado);
    }

    public static obtenerEstados() {
        return axios.default.get(this.apiUrl + '/data/estado/');
    }

    public static crearEstado(estado) {
        return axios.default.post(this.apiUrl + '/data/estado/', estado);
    }

    public static actualizarEstado(estado) {
        return axios.default.put(this.apiUrl + '/data/estado/' + estado.id, estado);
    }

    public static eliminarEstado(idEstado) {
        return axios.default.delete(this.apiUrl + '/data/estado/' + idEstado);
    }

    public static obtenerMunicipios(idEstado) {
        return axios.default.get(this.apiUrl + '/data/estado/municipio/' + idEstado);
    }

    public static obtenerCarrerasEnEsteEstado(idEstado) {
        return axios.default.post(this.apiUrl + '/data/carrera/carrerasXestados/estados/muni/' + idEstado)
    }
}
    