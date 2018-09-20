import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarreraService, AuthService } from '../../../../services';
import { Carrera, GoogleMaps, Punto, Usuario } from '../../../../models';

@Component({
	selector: 'app-carrera',
	templateUrl: './carrera.component.pug',
	styleUrls: ['./carrera.component.styl']
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

	constructor(private route: ActivatedRoute, private router: Router, private auth: AuthService) {
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
			zoom: 5
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
				.then(c => this.carrera.getRuta()
					.then(r => r.getPuntos().then((p: Punto[]) => {
						this.mapa.modificarZoom(14);
						this.mapa.modificarCentro(p[0].$y, p[0].$x);
						this.mapa.construirPolyLine(p)
				})))
		});

		this.auth.obtenerUsuario().subscribe(user =>  this.user = user)
	}

}
