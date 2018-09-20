
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import * as axios from 'axios'
import { BehaviorSubject } from 'rxjs';
import { Orden } from '../models';

@Injectable()

export class OrdenService {
    private static apiUrl: string = APILOCAL.url;

    private ordenPendienteSubject = new BehaviorSubject<Orden>(null);

    public static obtenerOrden(idOrden) {
        return axios.default.get(this.apiUrl + '/data/orden/' + idOrden);
    }

    public static obtenerOrdenes() {
        return axios.default.get(this.apiUrl + '/data/orden/');
    }

    public static crearOrden(orden) {
        return axios.default.post(this.apiUrl + '/data/orden/', orden);
    }

    public static actualizarOrden(orden) {
        return axios.default.put(this.apiUrl + '/data/orden/' + orden.id, orden);
    }

    public static eliminarOrden(idOrden) {
        return axios.default.delete(this.apiUrl + '/data/orden/' + idOrden);
    }

    public static obtenerUsuario(idOrden) {
        return axios.default.get(this.apiUrl + '/data/orden/usuario/' + idOrden);
    }

    public static pagar(id:number, datos) {
        return axios.default.post(this.apiUrl + '/data/orden/pagar/transaccion/pago/'+ id, datos);
    }

    public static obtenerCargos(peticion) {
        return axios.default.post(this.apiUrl + '/data/orden/pagar/transaccion/pagos', peticion);
    }

    public static obtenerImpresos(idOrden) {
        return axios.default.get(this.apiUrl + '/data/orden/impresos/' + idOrden)
    }

    modificarOrdenPendiente(orden: Orden) {
        this.ordenPendienteSubject.next(orden);
    }

    obtenerOrdenPendiente() {
        return this.ordenPendienteSubject;
    }
}
    