import { Imagen } from "./imagen.model";
import { PatrocinadorService, ImagenService } from "../services";
import { Marker } from "./google-maps.model";

export class Patrocinador {
    private id: number;
    private nombre: string;
	private tipo: string;
	private tipoApoyo: string
	private puntoVenta: string;
	private sitioWeb: string;
	public imagen : Imagen;
	private markers: Marker[] = [];

	constructor(arg, bandera?) {
		this.id = arg.id;
		this.nombre = arg.nombre;
		this.tipo = arg.tipo;
		this.tipoApoyo = arg.tipoApoyo;
		this.puntoVenta = arg.puntoVenta;
		this.sitioWeb = arg.sitioWeb;
        
		this.id ?
			(
				PatrocinadorService.obtenerImagen(this.id)
					.then(res => res && res.data[0] ? this.imagen = new Imagen(res.data[0].id, res.data[0].imagen, res.data[0].tipo) : null),
				PatrocinadorService.obtenerMarkers(this.id)
					.then(res => res && res.data ? this.markers = res.data.map(n => new Marker(n.id, {latitude: n.latitud, longitude: n.longitud})) : null)
			): null;
			
	}

	public get $id(): number {
		return this.id;
	}

	public get $nombre(): string {
		return this.nombre;
	}

	public get $tipo(): string {
		return this.tipo;
	}
	
	public get $tipoApoyo(): string {
		return this.tipoApoyo;
    }	

	public get $puntoVenta(): string {
		return this.puntoVenta;
	}

	public get $sitioweb(): string {
		return this.sitioWeb;
	}

	public get $imagen(): Imagen {
        return this.imagen;
	}
	
	public get $markers(): Marker[] {
		return this.markers;
	}

	public set $id(value: number) {
		this.id = value;
	}

	public set $nombre(value: string) {
		this.nombre = value;
	}

	public set $tipo(value: string) {
		this.tipo = value;
	}

	public set $tipoApoyo(value: string) {
		this.tipoApoyo = value;
	}

	public set $puntoVenta(value: string) {
		this.puntoVenta = value;
	}

	public set $sitioweb(value: string) {
		this.sitioWeb = value;
	}

    public set $imagen(value: Imagen) {
        value.getId() ? 
            ImagenService.actualizarImagen(value)
            :
            PatrocinadorService.agregarImagen(this.id, value)
                .then(res => res && res.data ? this.imagen = new Imagen(res.data.id, res.data.imagen, res.data.tipo): null)
	}
	
	public set $markers(value: Marker[]) {
		value.forEach(n => {
			if(n.$hasMap){
				n.$id ? 
					PatrocinadorService.actualizarMarker(n)
						.then(r => r && r.data ? this.markers[this.markers.findIndex(m => m.$id == n.$id)] = n : null)
				:
					PatrocinadorService.agregarMarker(this.id, n)
						.then(r => r && r.data ? this.markers.push(new Marker(r.data.id, {latitude: r.data.latitud, longitude: r.data.longitud})) : null)
				;
			}else{
				n.$id ?
					PatrocinadorService.quitarMArker(n.$id)
						.then(r => r && r.data ? this.markers.splice(this.markers.indexOf(n), 1): null)
				:
					null
				;
			}
		});
	}
}