import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarreraService, AuthService } from '../../../../services';
import { Carrera, GoogleMaps, Punto, Usuario, Boleto } from '../../../../models';
import { Observable } from 'rxjs';
import { Time, TimerService } from '../../../../services/timer.service';
import * as moment from 'moment'
import * as _ from 'lodash';
@Component({
	selector: 'app-carrera',
	templateUrl: './carrera.component.pug',
	styleUrls: ['./carrera.component.styl'],
	providers: [TimerService]
})
export class CarreraComponent implements OnInit, AfterViewInit{
	carrera: Carrera;
	imagenes = []
	colores = []
	@ViewChild('googleMap') gmapElement: ElementRef;
	mapa: GoogleMaps
	carrerasProximas: Carrera[] = []
	user: Usuario;
	slideConfig = {"slidesToShow": 1, "slidesToScroll": 1};
	boletos: Boleto [];
	actual: Boleto = undefined;
	proximo: Boleto = undefined;
	time1$: Observable<Time>;

	constructor(private route: ActivatedRoute, private router: Router, private auth: AuthService, private timerService: TimerService,) {
		this.carrera = new Carrera({}, 'bandera');
		this.imagenes = [
			'assets/images/cuadritos/glow_home_1.png',
			'assets/images/cuadritos/glow_home_2.png',
			'assets/images/cuadritos/glow_home_3.png'
		]
		this.colores = [
			'#f53277',
			'#45c900',
			'#40ccf4'
		]
		CarreraService.obtenerHome()
			.then(r => r && r.data ?
				this.carrerasProximas =
					r.data.map(c => new Carrera(c, 'bandera')) : null)
	}

	crearmapa(punto?: Punto) {
		this.mapa = new GoogleMaps(this.gmapElement, {
			latitude: 22.511883338637464,
			longitude: -100.80013833094642,
			zoom: 5,
			mapTypeId: 'satellite'
		}, 1, true, 2);

		this.mapa.contruirMapa();
	}

	irAComprar() {
		this.router.navigate(['/comprar/' + this.carrera.$id]);
	}

	ngAfterViewInit(): void {
		this.crearmapa()
	}

	afterChange(event){

	}

	verCarrera(id) {
		this.router.navigate(['carreras/' + id]);
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			CarreraService.obtenerCarrera(+params['id'])
				.then(r => r && r.data ? this.carrera = new Carrera(r.data) : null)
				.then(c => this.crearmapa())
				.then(c => this.carrera.getBoletos().then(boletitos => this.boletos = boletitos))
				.then(b => {
					console.log(this.boletos.length)
					this.boletos.length<=0 ? (alert('Lo sentimos, alparecer no hay boletos todavia para esta carrera'), this.router.navigate(['/'])):(
					this.actual = this.boletos.find(n => n.getActivo() == true),
					this.proximo = this.boletos.find(n => n.$fechaini> this.actual.$fechafin));
				})
				.then(a => this.time1$ = this.timerService.timer(new Date(moment(this.actual.$fechafin).format('MMMM DD, YYYY HH:mm:ss'))))
				.then(c => this.carrera.getRuta()
					.then(r => r.getPuntos().then((p: Punto[]) => {
						this.mapa.modificarZoom(10);
						this.mapa.modificarCentro(p[0].$y, p[0].$x);
						this.mapa.construirPolyLine(p)
				})).then(algo => {
					let markerss =  this.carrera.getPatrocinadores().map(patro => patro.$markers)
					let markers = _.flatten(markerss);
					console.log(markers)
					this.mapa.anadirMarkers(markers);
				}))
		});

		this.auth.obtenerUsuario().subscribe(user =>  this.user = user)
	}

}
