
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import * as axios from 'axios'
import { Imagen, Municipio, Patrocinador, Boleto, Carrera, Punto } from '../models';

@Injectable()

export class CarreraService {
    private static apiUrl: string = APILOCAL.url;

    public static obtenerCarrera(idCarrera) {
        return axios.default.get(this.apiUrl + '/data/carrera/' + idCarrera);
    }

    public static obtenerCarreras() {
        return axios.default.get(this.apiUrl + '/data/carrera/');
    }

    public static obtenerHome() {
        return axios.default.get(this.apiUrl + '/data/carrera/obtenerhome/home');
    }

    public static crearCarrera(carrera) {
        return axios.default.post(this.apiUrl + '/data/carrera/', carrera);
    }

    public static actualizarCarrera(carrera: Carrera) {
        let carrer = {
            id: carrera.$id,
            nombre: carrera.$nombre,
            description: carrera.$description,
            fechaini: carrera.$fechaini,
            videoUrl: carrera.$videoUrl,
            status: carrera.$status

        }
        return axios.default.put(this.apiUrl + '/data/carrera/' + carrera.$id, carrer);
    }

    public static eliminarCarrera(idCarrera) {
        return axios.default.delete(this.apiUrl + '/data/carrera/' + idCarrera);
    }

    public static obtenerImagenes(idCarrera: number) {
        return axios.default.get(this.apiUrl + '/data/carrera/imagenes/' + idCarrera);
    }

    public static agregarImagen(idCarrera, imagen: Imagen) {
        return axios.default.post(this.apiUrl + '/data/carrera/imagenes/' + idCarrera, imagen);
    }

    public static obtenerPatrocinadores(idCarrera: number) {
        return axios.default.get(this.apiUrl + '/data/carrera/patrocinadores/' + idCarrera);
    }

    public static agregarPatrocinador(idCarrera: number, patrocinador: Patrocinador) {
        return axios.default.post(this.apiUrl + '/data/carrera/patrocinadores/' + idCarrera, patrocinador);
    }

    public static desunifrPatrocinador(idCarrera: number, patrocinador: Patrocinador) {
        return axios.default.delete(this.apiUrl + '/data/carrera/patrocinadores/'+idCarrera+'/'+patrocinador.$id);
    }

    public static obtenerCiudades(idCarrera: number) {
        return axios.default.get(this.apiUrl + '/data/carrera/ciudades/'+ idCarrera);
    }

    public static unirCiudad(idCarrera: number, ciudad: Municipio) {
        return axios.default.post(this.apiUrl + '/data/carrera/ciudades/' + idCarrera, ciudad);
    }

    public static desunirCiudad(idCarrera: number, idCiudad: number) {
        return axios.default.delete(this.apiUrl + '/data/carrera/ciudades/'+idCarrera+'/'+idCiudad);
    }

    public static obtenerBoletos(idCarrera: number) {
        return axios.default.get(this.apiUrl + '/data/carrera/boletos/'+ idCarrera);
    }

    public static agregarBoleto(idCarrera:number, boleto: Boleto) {
        return axios.default.post(this.apiUrl + '/data/carrera/boletos/'+ idCarrera, boleto);
    }

    public static obtenerCarrerasXUsuario(idUsuario) {
        return axios.default.get(this.apiUrl + '/data/usuario/carrea/' + idUsuario);
    }

    public static obtenerRuta(idCarrera: number){
        return axios.default.get(this.apiUrl + '/data/carrera/rutas/' + idCarrera);
    }

    public static crearRuta(idCarrera: number) {
        return axios.default.post(this.apiUrl + '/data/carrera/rutas/' + idCarrera);
    }

    public static obtenerPuntosRuta(idRuta: number){
        return axios.default.get(this.apiUrl + '/data/rutas/puntos/' + idRuta);
    }

    public static AgregarPuntosRuta(idRuta: number, puntos:Punto[]){
        let p =  puntos.map(p => {let t = {id: p.$id, latitud: p.$y, longitud: p.$x}; return t})
        return axios.default.post(this.apiUrl + '/data/rutas/puntos/' + idRuta, p);
    }

    public static paginacion(items, pagina) {
        return axios.default.post(this.apiUrl + '/data/carrera/paginacion/' + items +'/'+ pagina);
    } 

    public static obtenerGalerias() {
        return axios.default.get(this.apiUrl + '/data/carrera/galerias/galerias');
    }
}
    