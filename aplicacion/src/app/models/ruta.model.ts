import { Punto } from "./google-maps.model";
import { CarreraService } from "../services";

export class Ruta {
    private id: number;
    private puntos: Punto[];

    constructor(arg){
        this.id = arg.id;
    }

    get $id() : number {
        return this.id
    }

    getPuntos() {
        return CarreraService.obtenerPuntosRuta(this.id)
        .then(r => r && r.data? this.puntos = r.data.map(n => new Punto(n.id, {latitude: n.latitud, longitude: n.longitud})) : null);
    }

    set $id(value: number) {
        this.id = value;
    }

    set $puntos(puntos: Punto[]) {
        CarreraService.AgregarPuntosRuta(this.id, puntos)
        .then(r => r && r.data? this.puntos = r.data : null);
    }
    
}