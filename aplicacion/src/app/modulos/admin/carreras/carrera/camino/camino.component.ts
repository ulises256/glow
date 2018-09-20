import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { GoogleMaps, Punto } from '../../../../../models';
import { Ruta } from '../../../../../models/ruta.model';

@Component({
	selector: 'camino',
	templateUrl: './camino.component.pug',
	styleUrls: ['./camino.component.styl']
})
export class CaminoComponent implements OnInit, AfterViewInit{

	ruta: Ruta;
	@Input() set rutas(ruta) {
		this.ruta = ruta
	}

	puntos: Punto[] = [];
	@ViewChild('googleMap') gmapElement: ElementRef;
	mapa: GoogleMaps

	constructor() { }

	crearmapa() {
		this.mapa = new GoogleMaps(this.gmapElement, {
			latitude: 22.511883338637464,
			longitude: -100.80013833094642,
			zoom: 5
		}, 1, true, 2);

		this.mapa.contruirMapa();
		
	}

	mostrarRuta(){
		this.ruta.getPuntos().then(ps => this.mapa.construirPolyLine(ps))
	}

	borarRuta() {
		this.mapa.recontruirPolyLine();
	}

	guardarPuntos() {
		this.ruta.$puntos = this.mapa.obtenerPuntosPlyLine();
	}

	ngAfterViewInit(): void {
		this.crearmapa();
	}

	ngOnInit() {

	}

}
