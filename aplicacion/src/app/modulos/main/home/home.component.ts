import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TimerService, Time } from '../../../services/timer.service';
import { Carrera } from '../../../models';
import { CarreraService } from '../../../services';
import * as moment from 'moment'

@Component({
	selector: 'app-home',
	templateUrl: './home.component.pug',
	styleUrls: ['./home.component.styl'],
	providers: [TimerService]
})
export class HomeComponent implements OnInit {
	time1$: Observable<Time>;
	carrerasProximas: Carrera[] = [];
	url = 'https://www.youtube.com/watch?v=OVw3XMi0FcA&feature=';

	constructor(private router: Router, private timerService: TimerService) {
		CarreraService.obtenerHome()
			.then(r => r && r.data ? this.carrerasProximas = r.data.map(c => new Carrera(c, 'bandera')) : null)
			.then(carreras => carreras.length > 0 ? carreras[0] : null)
			.then(carrera => moment(carrera.$fechaini).format('MMMM DD, YYYY HH:mm:ss'))
			.then(fecha => this.time1$ = this.timerService.timer(new Date(fecha)))
	}

	verCarrera(id) {
		this.router.navigate(['carreras/' + id]);

	}

	irGaleria() {
		this.router.navigate(['galerias']);

	}

	irAComprar(idCarrera) {
		this.router.navigate(['/comprar/' + idCarrera]);
	}

	ngOnInit() {

		// $("#btn-comprar").hover(function () {
		// 	$(this).removeClass("shake-opacity");
		// }, function () {
		// 	$(this).addClass("shake-opacity");
		// });

		// $("#carrera1").hover(function () {
		// 	$(this).addClass("shake-slow");
		// 	setTimeout(function() {
		// 		$(this).removeClass("shake-slow");
		// 	}, 500);
		// }, function () {
		// 	$(this).removeClass("shake-slow");
		// });

		// $("#carrera2").hover(function () {
		// 	$(this).addClass("shake-slow");
		// }, function () {
		// 	$(this).removeClass("shake-slow");
		// });

		// $("#carrera3").hover(function () {
		// 	$(this).addClass("shake-slow");
		// }, function () {
		// 	$(this).removeClass("shake-slow");
		// });
	}

}
