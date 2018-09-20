
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import * as axios from 'axios'
import { Cupon } from '../models/cupon.model';

@Injectable()

export class CuponService {
    private static apiUrl: string = APILOCAL.url;

    public static obtenerCupon(idBoleto) {
        return axios.default.get(this.apiUrl + '/data/cupon/' + idBoleto);
    }

    public static obtenerCupones() {
        return axios.default.get(this.apiUrl + '/data/cupon/');
    }

    public static crearCupon(cupon: Cupon) {
        let cuponsito = {
            id: cupon.id,
            codigo: cupon.codigo,
            precio: cupon.precio,
            status: cupon.status,
            fechaini: cupon.fechaini,
            fechafin: cupon.fechafin,
            id_carrera: cupon.id_carrera
        }
        return axios.default.post(this.apiUrl + '/data/cupon/', cuponsito);
    }

    public static actualizarCupon(cupon: Cupon) {
        let cuponsito = {
            id: cupon.id,
            codigo: cupon.codigo,
            precio: cupon.precio,
            status: cupon.status,
            fechaini: cupon.fechaini,
            fechafin: cupon.fechafin,
            id_carrera: cupon.id_carrera
        }
        return axios.default.put(this.apiUrl + '/data/cupon/' + cupon.id, cuponsito);
    }

    public static eliminarCupon(idCupon) {
        return axios.default.delete(this.apiUrl + '/data/cupon/' + idCupon);
    }

    public static obtenerCuponesCarrera(idCarrera) {
        return axios.default.get(this.apiUrl + '/data/cupon/carrera/' + idCarrera);
    }

    public static agregarCuponesCarrera(idCarrera) {
        return axios.default.post(this.apiUrl + '/data/cupon/carrera/' + idCarrera);
    }
}