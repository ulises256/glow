import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import * as axios from 'axios'
import { Orden, Carrera, Usuario } from '../models';

@Injectable()

export class UsuarioService {
    private static apiUrl: string = APILOCAL.url;

    public static obtenerUsuario(idUsuario) {
        return axios.default.get(this.apiUrl + '/data/usuario/' + idUsuario);
    }

    public static obtenerUsuarios() {
        return axios.default.get(this.apiUrl + '/data/usuario/');
    }

    public static actualizarUsuario(usuario) {
        console.log(usuario)
        return axios.default.put(this.apiUrl + '/data/usuario/' + usuario.id, usuario).catch(err => console.log('vergas we'));
    }

    public static materiales(idUsuario) {
        return axios.default.get(this.apiUrl + '/data/materialXusuario/' + idUsuario);
    }

    public static eventos(idUsuario) {
        return axios.default.get(this.apiUrl + '/data/eventosXusuario/' + idUsuario);
    }

    public static obtenerFoto(idUsuario) {
        return axios.default.get(this.apiUrl + '/data/usuario/avatar/' + idUsuario);
    }

    public static crearOrden(orden: Orden) {
        return axios.default.post(this.apiUrl + '/data/usuario/ordenes/' + orden.$id_usuario, orden);
    }

    public static obtenerOrdenes(idUsario) {
        return axios.default.get(this.apiUrl + '/data/usuario/ordenes/' + idUsario);
    }

    public static obtenerCarreras(idUsuario) {
        return axios.default.get(this.apiUrl + '/data/usuario/carrea/' + idUsuario);
    }

    public static unirCarrera(idUsuario, carrera: Carrera) {
        return axios.default.post(this.apiUrl + '/data/usuario/carrea/' + idUsuario, carrera);
    }

}
