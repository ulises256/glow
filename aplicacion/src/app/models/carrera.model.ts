import { Imagen } from "./imagen.model";
import { CarreraService, ImagenService, BoletoService } from "../services";
import { Patrocinador } from "./patrocinador.model";
import { Municipio } from "./municipios.model";
import { Boleto } from "./boleto.model";
import { Ruta } from "./ruta.model";

enum Status {
	PROXIMO = 'proximo',
	REALIZADO =  'realizado'
}

export class Carrera {
	private id: number;
	private nombre: string;
	private fechaini: Date;
	private description: string;
	private status: string;
	private videoUrl: string;
	private imagenes: Imagen[] = []
	private imagenMapa: Imagen;
	private patrocinadores: Patrocinador[] = [];
	private ciudades: Municipio[] = [];
	private boletos: Boleto[] = [];
	private ruta: Ruta;

	constructor(arg, bandera?) {
		this.id = arg.id;
		this.nombre = arg.nombre;
		this.fechaini = arg.fechaini;
		this.description = arg.description;
		this.status = arg.status;
		this.videoUrl = arg.videoUrl;

		!(bandera) ?
		(
			CarreraService.obtenerImagenes(this.id)
			.then(res => res && res.data ? res.data.map(n => {
				n.tipo == 'mapa' ? this.imagenMapa = new Imagen(n.id, n.n, n.tipo) : this.imagenes.push(new Imagen(n.id, n.n, n.tipo))
			}) : null),

			CarreraService.obtenerPatrocinadores(this.id)
				.then(res => res && res.data ? res.data.map(n => this.patrocinadores.push(new Patrocinador(n))) : null),

			CarreraService.obtenerCiudades(this.id)
				.then(res => res && res.data ? res.data.map(n => this.ciudades.push(new Municipio(n))) : null),

			CarreraService.obtenerBoletos(this.id)
				.then(res => res && res.data ? res.data.map(n => this.boletos.push(new Boleto(n))) : null)

		) : null;
	}

	public actualizarDatos() {
		CarreraService.actualizarCarrera(this);
	}

	public get $id(): number {
		return this.id;
	}

	public get $nombre(): string {
		return this.nombre;
	}

	public get $fechaini(): Date {
		return this.fechaini;
	}

	public get $description(): string {
		return this.description;
	}

	public get $status(): string {
		return this.status;
	}

	public get $videoUrl(): string {
		return this.videoUrl;
	}
	
	public getRuta(){
		return CarreraService.obtenerRuta(this.id).then(r => r && r.data ? this.ruta = new Ruta(r.data) : null);
	}

	public geImagenes(): Imagen[] {
		return this.imagenes;
	}

	public getImagenMapa(): Imagen {
		return this.imagenMapa;
	}

	public getPatrocinadores(): Patrocinador[] {
		return this.patrocinadores;
	}

	public getCiudades(): Municipio[] {
		return this.ciudades;
	}

	public getBoletos(){
		return CarreraService.obtenerBoletos(this.id)
			.then(r => r && r.data ? this.boletos = r.data.map(b => new Boleto(b)) : null);
	}

	public set $id(value: number) {
		this.id = value;
	}

	public set $nombre(value: string) {
		this.nombre = value;
	}

	public set $fechaini(value: Date) {
		this.fechaini = value;
	}

	public set $description(value: string) {
		this.description = value;
	}

	public set $status(value: string) {
		this.status = value;
	}

	public set $videoUrl(value: string) {
		this.videoUrl = value
	}

	public set $ruta(value: Ruta) {
		this.ruta = value;
	}

	public seImagenes(value: Imagen) {
		value.getId()?
			ImagenService.eliminarImagen(value.getId())
				.then(res => res? this.imagenes.splice(this.imagenes.indexOf(value),1): null)
			:
			CarreraService.agregarImagen(this.id, value)	
				.then(res => res && res.data ? this.imagenes.push(new Imagen(res.data.id, res.data.n, res.data.tipo)): null);
	}

	public setImagenMapa(value: Imagen) {
		value.getId()?
			ImagenService.actualizarImagen(value).then(r => r && r.data ? this.imagenMapa = value : null)
			:
			CarreraService.agregarImagen(this.id, value)
				.then(res => res && res.data? this.imagenMapa = new Imagen(res.data.id, res.data.n, res.data.tipo): null);
	}

	public setPatrocinadores(value: Patrocinador) {
		CarreraService.agregarPatrocinador(this.id, value)
			.then(res => res && res.data ? this.patrocinadores.push(new Patrocinador(res.data)) : null);
	}

	public setCiudades(value: Municipio) {
		CarreraService.unirCiudad(this.id, value)
			.then(res=> res && res.data? this.ciudades.push(new Municipio(res.data)):null);
	}

	public setBoletos(value: Boleto) {
		value.$id?
		BoletoService.actualizarBoleto(value)
		:
		CarreraService.agregarBoleto(this.id, value)
			.then(r => r && r.data? this.boletos.push(new Boleto(r.data)): null);
	}

	public deleteCiudad(value: Municipio) {
		CarreraService.desunirCiudad(this.id, value.$id)
			.then(res => res && res.data ? this.ciudades.splice(this.ciudades.indexOf(value), 1): null);
	}

	public deletePatrocinadores(value: Patrocinador) {
		CarreraService.desunifrPatrocinador(this.id, value)
			.then(res => res && res.data ? this.patrocinadores.splice(this.patrocinadores.indexOf(value), 1) : null);
	}

	public deleteBoleto(value: Boleto) {
		BoletoService.eliminarBoleto(value.$id)
			.then(r => r && r.data ? this.boletos.splice(this.boletos.indexOf(value), 1) : null);

	}
}