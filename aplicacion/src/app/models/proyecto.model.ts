import { ProyectosService } from '../services/proyectos.service';
// import { ObejtivosService } from '../services/objetivos.service';
// import { EventoService } from '../services/evento.service';
// import { MaterialService } from '../services/material.service';
// import { ImagenService } from '../services/imagen.service';
// import { UbicacionService } from '../services/ubicacion.service';
// import { Imagen } from './imagen.model';
// import { Evento } from './evento.model';
// import { Material } from './material.model';


export class Proyecto {
    private id: number;
    private nombre: string;
    private descripcion: string;
    private status_actual: number;
    private area_actual: number;
    private campana_actual: number;
    private objetivos = [];
    // private imagenes: Imagen[] = [];
    // private eventos: Evento[] = [];
	private materiales = [];
	private ubicaciones = [];
	// private portada: Imagen;

	constructor($id: number, $nombre: string, $descripcion: string, $status_actual: number, $area_actual: number, $campana_actual: number, $bandera?) {
		this.id = $id;
		this.nombre = $nombre;
		this.descripcion = $descripcion;
		this.status_actual = $status_actual;
		this.area_actual = $area_actual;
		this.campana_actual = $campana_actual;
		
		// ImagenService.obtenerPortada(this.id)
		// .then(response => response.data ? this.portada = new Imagen(response.data.id,response.data.imagen, response.data.status, response.data.id_proyecto) : null);
		// $bandera == undefined ? 
		// (
		// 	ObejtivosService.getObjetivosOfProyecto(this.id)
		// 	.then(response => this.objetivos =  response.data),
			
		// 	EventoService.getEventoXProyecto(this.id)
		// 	.then(response => this.eventos = response.data.map(n => new Evento(n.id, n.nombre, n.descripcion, n.fecha, n.status, n.id_proyecto))),

		// 	MaterialService.getMaterialesXProyecto(this.id)
		// 	.then(response => this.materiales = response.data.map(n => new Material(n.id, n.nombre, n.cantidad, n.tipo, n.id_proyecto))),

		// 	UbicacionService.obetenerUbicacionProyecto(this.id)
		// 	.then(response => this.ubicaciones = response.data),

		// 	ImagenService.getImagenOfProyecto(this.id)
		// 	.then(response => this.imagenes = response.data.map(n => new Imagen(n.id, n.imagen, n.status, n.id_proyecto)))
		// ) : null

	}
    
    // public actualizarDatos() {
    //     ProyectosService.updateProyecto(this);
    // }

    // public getObjetivos() {
    //     return this.objetivos;
	// }

    // public setObjetivos(objetivo) {
	// 	objetivo.id ?
	// 		ObejtivosService.updateObjetivo(objetivo)
	// 		:
	// 		ObejtivosService.createObjetivo(objetivo)
	// 		 	.then(respose => this.objetivos.push(respose.data));
	// }

	// public deleteObjetivo(objetivo) {
	// 	ObejtivosService.deletObjetivo(objetivo)
	// 	.then(response => this.objetivos.splice(this.objetivos.indexOf(objetivo), 1));
	// }
	
	// public getEventos() {
	// 	return this.eventos;
	// }

	// public setEventos(evento: Evento) {
	// 	evento.getId()  ?
	// 		EventoService.updateEvento(evento)
	// 		:
	// 		EventoService.crearEvento(evento)
	// 			.then(response => this.eventos.push(new Evento( response.data.id,
	// 															response.data.nombre,
	// 															response.data.descripcion,
	// 															response.data.fecha,
	// 															response.data.status,
	// 															response.data.id_proyecto)));
	// }

	// public deleteEvento(evento: Evento) {
	// 	EventoService.deleteEvento(evento.getId())
	// 	.then(response => this.eventos.splice(this.eventos.indexOf(evento), 1));
	// }

	// public getMateriales() {
	// 	return this.materiales;
	// }

	// public setMateriales(material: Material) {
	// 	material.getId() ?
	// 		MaterialService.updateMaterial(material)
	// 		:
	// 		MaterialService.createMaterial(material)
	// 			.then(response => this.materiales.push(new Material(response.data.id,
	// 																response.data.nombre,
	// 																response.data.cantidad,
	// 																response.data.tipo,
	// 																response.data.id_proyecto)));
	// }

	// public deleteMaterial(material: Material) {
	// 	MaterialService.deleteMaterial(material.getId())
	// 	.then(response => this.materiales.splice(this.materiales.indexOf(material), 1));
	// }

	// public getImagenes() {
	// 	return this.imagenes
	// }

	// public setImagenes(imagen: Imagen) {
	// 	imagen.getId() ? 
	// 		ImagenService.deleteImagen(imagen.getId())
	// 			.then(response => this.imagenes.splice(this.imagenes.indexOf(imagen), 1))
	// 		:
	// 		ImagenService.createImagen(imagen)
	// 			.then(response => this.imagenes.push(new Imagen(response.data.id,
	// 															response.data.imagen,
	// 															response.data.status,
	// 															response.data.id_proyecto)));
	// }

	// public getPortada(): Imagen {
	// 	return this.portada;
	// }

	// public setPortada(portada: Imagen) {
	// 	portada.getId() == null ? portada.setId(this.portada? this.portada.getId() : null) : null;
	// 	ImagenService.crearPortada(portada)
	// 	.then(response => this.portada = new Imagen(response.data.id,
	// 												response.data.imagen,
	// 												response.data.status,
	// 												response.data.id_proyecto));
	// }

	// public getUbicaciones() {
	// 	return this.ubicaciones;
	// }

	// public setUbicaciones(ubicacion) {
	// 	ubicacion.id? 
	// 		(UbicacionService.updateUbicacion(ubicacion))
	// 		:
	// 		(UbicacionService.createUbicacion(ubicacion, this.id)
	// 			.then(response => this.ubicaciones.push(response.data)));
	// }

	// public deleteUbicacion(ubicacion) {
	// 	UbicacionService.deleteUbicacion(ubicacion.id)
	// 	.then(response => this.ubicaciones.splice(this.ubicaciones.indexOf(ubicacion, 1)));
	// }

	public getId(): number {
		return this.id;
	}

	public getNombre(): string {
		return this.nombre;
	}

	public getDescripcion(): string {
		return this.descripcion;
	}

	public getStatus(): number {
		return this.status_actual;
	}

	public getId_Area(): number {
		return this.area_actual;
	}

	public getId_Programa(): number {
		return this.campana_actual;
	}

	public setId(value: number) {
		this.id = value;
	}

	public setNombre(value: string) {
		this.nombre = value;
	}

	public setDescripcion(value: string) {
		this.descripcion = value;
	}

	public setStatus(value: number) {
		this.status_actual = value;
	}

	public setId_Area(value: number) {
		this.area_actual = value;
	}

	public setId_Programa(value: number) {
		this.campana_actual = value;
	}
}