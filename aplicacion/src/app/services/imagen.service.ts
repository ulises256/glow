
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import * as axios from 'axios'

@Injectable()

export class ImagenService {
    private static apiUrl: string = APILOCAL.url;

    public static obtenerImagen(idImagen) {
        return axios.default.get(this.apiUrl + '/data/imagen/' + idImagen);
    }

    public static obtenerImagenes() {
        return axios.default.get(this.apiUrl + '/data/imagen/');
    }

    public static crearImagen(imagen) {
        return axios.default.post(this.apiUrl + '/data/imagen/', imagen);
    }

    public static actualizarImagen(imagen) {
        return axios.default.put(this.apiUrl + '/data/imagen/' + imagen.id, imagen);
    }

    public static eliminarImagen(idImagen) {
        return axios.default.delete(this.apiUrl + '/data/imagen/' + idImagen);
    }
}
    