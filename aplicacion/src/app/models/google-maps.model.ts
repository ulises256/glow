import { ElementRef } from "@angular/core";
import { } from "google-maps";

/**
 * Clase personalizada para crear un mapa de google maps
 * e interactuar con este.
 * @example
 *
 * mapa: GoogleMaps;
 *
 * constructor(){
 * 	this.mapa = new GoogleMaps(this.gmapElement, {
 * 		latitude: 20.353102,
 * 		longitude: -87.6361036,
 * 		zoom: 8})
 * }
 */
export class GoogleMaps {
	private gmapElement: ElementRef;
	private centro: Centro;
	private zoom: number;
	private map: google.maps.Map;
	private editable: boolean;
	private markers: Marker[] = [];
	private tipoMapa: number;
	private PolyLine: Linea;
	private clickAdd: number = 1;

	/**
	 * @constructs GoogleMaps
	 * @param {ElementRef } gmapElement Propiedad tipo ElementRef o div donde ira el mapa.
	 * @param {Centro } centro Propiedad que indica el centro del mapa, implementa la interfaz.
	 * @param {number } tipoMapa Proiedad opcional que indica el tipo de mapa: 1 = ROADMAP, 2 = HYBRID, 3 = SATELLITE, 4 = TERRAIN, por defecto 2.
	 * @param {boolean } editable Proiedad opcional que indica si se puede añadir, eliminar o modificar marcadores  al mapa al hacer click sobre este.
	 * @param {number } clickAdd Proiedad opcional que indica que se añadirá al dar click en el mapa, si markers o puntos paracrear un Polyline, 1 = MARKERS, 2 = PUNTOS
	 */

	constructor(gmapElement: ElementRef, centro: Centro, tipoMapa: number = 2, editable: boolean = true, clickAdd?: number) {
		this.gmapElement = gmapElement;
		this.centro = centro
		this.zoom = centro.zoom;
		this.tipoMapa = tipoMapa;
		this.editable = editable;
		clickAdd ? this.clickAdd = clickAdd : null;
	}

	/**
	 * Método para iniciar el mapa y mostrarlo en la vista
	 */
	contruirMapa() {
		let mapProp = {
			center: new google.maps.LatLng(this.centro.latitude, this.centro.longitude),
			zoom: this.zoom,
			mapTypeId: 'roadmap',
			options : {
				styles: [
					{
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#1d2c4d"
							}
						]
					}, {
						"elementType": "labels",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					}, {
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#8ec3b9"
							}
						]
					}, {
						"elementType": "labels.text.stroke",
						"stylers": [
							{
								"color": "#1a3646"
							}
						]
					}, {
						"featureType": "administrative.country",
						"elementType": "geometry.stroke",
						"stylers": [
							{
								"color": "#4b6878"
							}
						]
					}, {
						"featureType": "administrative.land_parcel",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					}, {
						"featureType": "administrative.land_parcel",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#64779e"
							}
						]
					}, {
						"featureType": "administrative.neighborhood",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					}, {
						"featureType": "administrative.province",
						"elementType": "geometry.stroke",
						"stylers": [
							{
								"color": "#4b6878"
							}
						]
					}, {
						"featureType": "landscape.man_made",
						"elementType": "geometry.stroke",
						"stylers": [
							{
								"color": "#334e87"
							}
						]
					}, {
						"featureType": "landscape.natural",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#023e58"
							}
						]
					}, {
						"featureType": "poi",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#283d6a"
							}
						]
					}, {
						"featureType": "poi",
						"elementType": "labels.text",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					}, {
						"featureType": "poi",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#6f9ba5"
							}
						]
					}, {
						"featureType": "poi",
						"elementType": "labels.text.stroke",
						"stylers": [
							{
								"color": "#1d2c4d"
							}
						]
					}, {
						"featureType": "poi.business",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					}, {
						"featureType": "poi.park",
						"elementType": "geometry.fill",
						"stylers": [
							{
								"color": "#023e58"
							}
						]
					}, {
						"featureType": "poi.park",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#3C7680"
							}
						]
					}, {
						"featureType": "road",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					}, {
						"featureType": "road",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#304a7d"
							}
						]
					}, {
						"featureType": "road",
						"elementType": "labels.icon",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					}, {
						"featureType": "road",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#98a5be"
							}
						]
					}, {
						"featureType": "road",
						"elementType": "labels.text.stroke",
						"stylers": [
							{
								"color": "#1d2c4d"
							}
						]
					}, {
						"featureType": "road.highway",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#2c6675"
							}
						]
					}, {
						"featureType": "road.highway",
						"elementType": "geometry.stroke",
						"stylers": [
							{
								"color": "#255763"
							}
						]
					}, {
						"featureType": "road.highway",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#b0d5ce"
							}
						]
					}, {
						"featureType": "road.highway",
						"elementType": "labels.text.stroke",
						"stylers": [
							{
								"color": "#023e58"
							}
						]
					}, {
						"featureType": "transit",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					}, {
						"featureType": "transit",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#98a5be"
							}
						]
					}, {
						"featureType": "transit",
						"elementType": "labels.text.stroke",
						"stylers": [
							{
								"color": "#1d2c4d"
							}
						]
					}, {
						"featureType": "transit.line",
						"elementType": "geometry.fill",
						"stylers": [
							{
								"color": "#283d6a"
							}
						]
					}, {
						"featureType": "transit.station",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#3a4762"
							}
						]
					}, {
						"featureType": "water",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#0e1626"
							}
						]
					}, {
						"featureType": "water",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#4e6d70"
							}
						]
					}
				]
			}
		};

		this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

		this.editable ? this.map.addListener('click', (e) => {
			if(this.clickAdd == 1)
				this.agregarAlMapaMarkes(new Marker(null, { latitude: e.latLng.lat(), longitude: e.latLng.lng() }, true, true));
			if(this.clickAdd == 2){

				this.agregarAlMapaPuntos(new Punto(null, { latitude: e.latLng.lat(), longitude: e.latLng.lng() }));
			}

		}) : null

	}

	modificarZoom(zoom: number){
		this.map.setZoom(zoom)
	}

	modificarCentro(latitude, longitude){
		let center = new google.maps.LatLng(latitude,longitude)
		this.map.setCenter(center);
	}

	/**
	 * Método para añadir marcadores en el mapa, recibe un array
	 * @param {Marker[] } markers Array de markers que se añidarán en el mapa
	 */
	anadirMarkers(markers: Marker[]) {
		markers ? this.markers = markers : null;
		this.markers.forEach(m => {
			m.setMap(this.map);
			this.editable ? (m.$clickleable = true, m.$dragrabble = true) : null;
		});
	}

	/**
	 * Método para contruir un PolyLine en el mapa
	 * @param {Punto[] } puntos Array de puntos para contruir el PlyLine
	 */
	construirPolyLine(puntos: Punto[]) {
		this.PolyLine = new Linea(puntos)
		this.PolyLine.setMap(this.map);
	}

	/**
	 * Método para destruir el PolyLine
	 */
	recontruirPolyLine() {
		this.PolyLine.setMap(null);
		this.PolyLine = null;
		this.construirPolyLine([]);
	}

	obtenerPuntosPlyLine(): Punto[]{
		return this.PolyLine.obtenerPuntos()
	}

	/**
	 * Método para obtener los marcadores en el mapa
	 * @returns {Marker[] } Array de markers en el mapa, que si se creó un marker y despues se eliminó, este sigue estando ahi pero sin verse.
	 */
	obtenerMArkers(): Marker[] {
		return this.markers;
	}

	private agregarAlMapaMarkes(marker: Marker) {
		marker.setMap(this.map);
		this.markers.push(marker);
	}

	private agregarAlMapaPuntos(punto: Punto) {
		this.PolyLine.agregarPunto(punto);
	}

	private tipoDeMapa(): google.maps.MapTypeId {
		let tiposMapas = [
			google.maps.MapTypeId.ROADMAP,
			google.maps.MapTypeId.HYBRID,
			google.maps.MapTypeId.SATELLITE,
			google.maps.MapTypeId.TERRAIN
		];
		return tiposMapas[this.tipoMapa];
	}
}

export class Marker extends google.maps.Marker {
	private id: number;
	private centro: Centro;
	private hasMap: boolean;
	private clickleable: boolean;
	private dragrabble: boolean;

	constructor(id: number, centro: Centro, clickleable = false, dragrabble = false) {
		super();
		this.id = id;
		this.centro = centro;
		this.hasMap = true;
		this.clickleable = clickleable;
		this.dragrabble = dragrabble;

		this.contruirMarker();
		this.agregarListenerClick();
		this.agregarListenerDragEnd();
	}

	get $id(): number {
		return this.id
	}

	set $id(value: number) {
		this.id = value;
	}

	get $centro(): Centro {
		return this.centro;
	}

	set $centro(value: Centro) {
		this.centro = value;
	}
	get $hasMap(): boolean {
		return this.hasMap;
	}

	set $hasMap(value: boolean) {
		this.hasMap = value;
	}

	get $clickleable(): boolean {
		return this.clickleable;
	}

	set $clickleable(value: boolean) {
		this.clickleable = value;
		this.agregarListenerClick();
	}

	get $dragrabble(): boolean {
		return this.dragrabble
	}

	set $dragrabble(value: boolean) {
		this.dragrabble = value;
		this.agregarListenerDragEnd();
	}

	private contruirMarker() {
		this.setAnimation(google.maps.Animation.DROP)
		this.setPosition(new google.maps.LatLng(this.centro.latitude, this.centro.longitude));
	}

	private agregarListenerClick() {
		this.clickleable ? this.addListener('click', () => {
			this.setMap(null), this.hasMap = false
		}) : null;
	}

	private agregarListenerDragEnd() {
		this.dragrabble ? (
			this.setDraggable(true),
			this.addListener('dragend', (event) => {
				this.centro.latitude = event.latLng.lat();
				this.centro.longitude = event.latLng.lng();
			})
		) : (
				this.setDraggable(false)
			);
	}
}


export class Linea extends google.maps.Polyline {
	private clickleable: boolean;
	private dragrabble: boolean;
	private puntos: Punto[] = [];
	private strokeColor: string;
	private strokeOpacity: number;
	private strokeWeight: number;
	private hasMap: boolean;
	private path: google.maps.MVCArray<google.maps.LatLng>
	lineSymbol = {
		path: google.maps.SymbolPath.CIRCLE,
		scale: 8,
		strokeColor: '#393'
	  };
	constructor( puntos: Punto[], clickleable = false, dragrabble = false, strokeColor: string = '#000000', strokeOpacity: number = 1.0, strokeWeight: number = 3) {
		super();
		this.puntos = puntos;
		this.strokeColor = strokeColor;
		this.strokeOpacity = strokeOpacity;
		this.strokeWeight = strokeWeight;
		this.clickleable = clickleable;
		this.dragrabble = dragrabble;
		this.consturirLinea();
		this.animar();


	}


	agregarPunto(punto: Punto) {
		this.puntos.push(punto)
		let latLng = new google.maps.LatLng(punto.$y, punto.$x);
		this.path.push(latLng);
	}

	obtenerPuntos(){
		return this.puntos;
	}

	private consturirLinea() {
		this.setOptions({
			strokeColor: this.strokeColor,
			strokeOpacity: this.strokeOpacity,
			strokeWeight: this.strokeWeight,
			icons: [{
				icon: this.lineSymbol,
				offset: '100%'
			  }]
		});
		this.path = this.getPath()

		this.puntos.forEach(p => {
			let latLng = new google.maps.LatLng(p.$y, p.$x);
			this.path.push(latLng);
		})
	}
	private animar(){
		var count = 0;

		setTimeout(() => {
			count = (count + 1) % 200;

			var icons = this.get('icons');
			icons[0].offset = (count / 2) + '%';
			this.set('icons', icons);
		}, 1000);

	}

	private agregarListenerClick() {
		this.clickleable ? this.addListener('click', () => {
			this.setMap(null), this.hasMap = false
		}) : null;
	}

	private agregarListenerDragEnd() {
		this.dragrabble ? (
			this.setDraggable(true),
			this.addListener('dragend', (event) => {

			})
		) : (
				this.setDraggable(false)
			);
	}
}

export class Punto extends google.maps.Polyline {
	private id: number;
	private x: number;
	private y: number;
	constructor(id: number, centro: Centro, clickleable = false, dragrabble = false) {
		super();
		this.id = id;
		this.y = centro.latitude;
		this.x = centro.longitude;
	}

	get $id(): number {
		return this.id;
	}

	set $id(value: number) {
		this.id = value;
	}

	get $x(): number {
		return this.x;
	}

	set $x(value: number) {
		this.x = value
	}

	get $y(): number {
		return this.y
	}

	set $y(value: number) {
		this.y = value;
	}

}


export interface Centro {
	latitude: number,
	longitude: number,
	zoom?: number
}
