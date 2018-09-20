
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import * as axios from 'axios'

@Injectable()

export class BoletoService {
    private static apiUrl: string = APILOCAL.url;

    public static obtenerBoleto(idBoleto) {
        return axios.default.get(this.apiUrl + '/data/boleto/' + idBoleto);
    }

    public static obtenerBoletos() {
        return axios.default.get(this.apiUrl + '/data/boleto/');
    }

    public static crearBoleto(boleto) {
        return axios.default.post(this.apiUrl + '/data/boleto/', boleto);
    }

    public static actualizarBoleto(boleto) {
        return axios.default.put(this.apiUrl + '/data/boleto/' + boleto.id, boleto);
    }

    public static eliminarBoleto(idBoleto) {
        return axios.default.delete(this.apiUrl + '/data/boleto/' + idBoleto);
    }

    public static obtenerOrdenes(idBoleto) {
        return axios.default.get(this.apiUrl + '/data/boleto/ordenes/' + idBoleto);
    }
}
    