
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import * as axios from 'axios'

@Injectable()

export class MunicipioService {
    private static apiUrl: string = APILOCAL.url;

    public static obtenerMunicipio(idMunicipio) {
        return axios.default.get(this.apiUrl + '/data/municipio/' + idMunicipio);
    }

    public static obtenerMunicipios() {
        return axios.default.get(this.apiUrl + '/data/municipio/');
    }

    public static crearMunicipio(municipio) {
        return axios.default.post(this.apiUrl + '/data/municipio/', municipio);
    }

    public static actualizarMunicipio(municipio) {
        return axios.default.put(this.apiUrl + '/data/municipio/' + municipio.id, municipio);
    }

    public static eliminarMunicipio(idMunicipio) {
        return axios.default.delete(this.apiUrl + '/data/municipio/' + idMunicipio);
    }
}
    