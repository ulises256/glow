import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Carrera } from '../../../models';
import { CarreraService } from '../../../services';
import { Router } from '@angular/router';

@Component({
	selector: 'app-carreras',
	templateUrl: './carreras.component.pug',
	styleUrls: ['./carreras.component.styl'],
	encapsulation : ViewEncapsulation.None
})
export class CarrerasComponent implements OnInit {
	carrerasProximas: Carrera[] = [];
	carrerasFiltro: Carrera[] = [];
	paginacion = {
		pagina: 0,
		items: 3,
		totalPaginas: undefined
	}
	imagenes = [
		{color: '#f53277', image: 'assets/images/cuadritos/glow_home_1.png'},
		{color: '#45c900', image: 'assets/images/cuadritos/glow_home_2.png'},
		{color: '#40ccf4', image: 'assets/images/cuadritos/glow_home_3.png'},
	]
	
	constructor(private router: Router,) { 
		CarreraService.obtenerHome()
		.then(r => r && r.data ? this.carrerasProximas = r.data.map(c => new Carrera(c, 'bandera')) : null);
		
		this.paginar()
	}

	verCarrera(id) {
		this.router.navigate(['carreras/' + id]);
	}

	anterior() {
		this.paginacion.pagina==0? null : (this.paginacion.pagina--, this.paginar()) ;
	}

	siguiente() {
		this.paginacion.pagina == (this.paginacion.totalPaginas - 1) ? null : (this.paginacion.pagina++, this.paginar());
	}

	paginar() {
		CarreraService.paginacion(this.paginacion.items, this.paginacion.pagina)
		.then(response => {
			if(response && response.data && response.data.items){
				this.paginacion.totalPaginas = response.data.totalPaginas;
				return response.data.items.map(n => new Carrera(n, ''))
			}
		})
		.then(pelis => pelis ? this.carrerasFiltro = pelis : null)
	}	

	ngOnInit() {

	}

}
