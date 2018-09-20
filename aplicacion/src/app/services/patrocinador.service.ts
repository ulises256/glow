
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import * as axios from 'axios'
import { Imagen, Marker, Patrocinador } from '../models';

interface markerNormal {
    id: number,
    nombre: string,
    latitud: number,
    longitud: number,
    id_municipio: number
}

interface patrocinadorNormal {
    id: number,
    nombre: string,
    tipo: string,
    tipoApoyo: string,
    sitioWeb: string,
    puntoVenta: string
}

@Injectable()

export class PatrocinadorService {
    private static apiUrl: string = APILOCAL.url;

    public static obtenerPatrocinador(idPatrocinador) {
        return axios.default.get(this.apiUrl + '/data/patrocinador/' + idPatrocinador);
    }

    public static obtenerPatrocinadores() {
        return axios.default.get(this.apiUrl + '/data/patrocinador/');
    }

    public static crearPatrocinador(patrocinador) {
        return axios.default.post(this.apiUrl + '/data/patrocinador/', patrocinador);
    }

    public static actualizarPatrocinador(patrocinador: Patrocinador) {
        let patro: patrocinadorNormal = {
            id:patrocinador.$id,
            nombre: patrocinador.$nombre,
            tipo: patrocinador.$tipo,
            tipoApoyo: patrocinador.$tipoApoyo,
            sitioWeb: patrocinador.$sitioweb,
            puntoVenta: patrocinador.$puntoVenta
        }
        return axios.default.put(this.apiUrl + '/data/patrocinador/' + patrocinador.$id, patro)
    }

    public static eliminarPatrocinador(idPatrocinador) {
        return axios.default.delete(this.apiUrl + '/data/patrocinador/' + idPatrocinador);
    }

    public static obtenerImagen(idPatrocinador) {
        return axios.default.get(this.apiUrl + '/data/patrocinador/imagenes/' + idPatrocinador);
    }

    public static agregarImagen(idPatrocinador, imagen: Imagen) {
        return axios.default.post(this.apiUrl + '/data/patrocinador/imagenes/' + idPatrocinador, imagen);
    }

    public static filtro(busqueda){
        return axios.default.post(this.apiUrl + '/data/patrocinador/filtro', {busqueda: busqueda});
    }

    public static obtenerMarkers(idPatrocinador) {
        return axios.default.get(this.apiUrl + '/data/patrocinador/puntoventa/' + idPatrocinador);
    }

    public static agregarMarker(idPatrocinador, marker: Marker) {

        let marke: markerNormal = {
            id: marker.$id,
            nombre: null,
            latitud: marker.$centro.latitude,
            longitud: marker.$centro.longitude,
            id_municipio: null
        }

        return axios.default.post(this.apiUrl + '/data/patrocinador/puntoventa/' + idPatrocinador, marke);
    }

    public static actualizarMarker(marker: Marker) {

        let marke: markerNormal = {
            id: marker.$id,
            nombre: null,
            latitud: marker.$centro.latitude,
            longitud: marker.$centro.longitude,
            id_municipio: null
        }

        return axios.default.put(this.apiUrl + '/data/puntoventa/' + marker.$id, marke)
    }

    public static quitarMArker(idMarker) {
        return axios.default.delete(this.apiUrl + '/data/puntoventa/' + idMarker);
    }
}
    