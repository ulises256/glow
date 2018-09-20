import { Component, OnInit, AfterViewInit, trigger, state, style, transition, animate,ViewChildren, ElementRef, ViewEncapsulation} from '@angular/core';
import { Carrera } from '../../../models';
import { CarreraService } from '../../../services';
import * as _ from 'lodash';

@Component({
	selector: 'app-galerias',
	templateUrl: './galerias.component.pug',
	styleUrls: ['./galerias.component.styl'],
	encapsulation: ViewEncapsulation.None,
	animations: [
        trigger('animateState', [
            state('active', style({
                backgroundColor: '#ff3377'
            })),
            state('inactive', style({
                backgroundColor: '#ef6100'
			})),
			state('inactive', style({
                backgroundColor: '#00c900'
			})),
			state('inactive', style({
                backgroundColor: '#1cccf4'
            })),
            transition('* <=> *', animate(2000))
        ])		
	]
})
export class GaleriasComponent implements OnInit, AfterViewInit{
	'scrollbar-hidden': boolean;
	carreras: Carrera[] = [];
	@ViewChildren('linea') linea: ElementRef;
	public state = "active";
	paleta = [
		"#ff3377",
		"#ef6100",
		"#00c900",
		"#1cccf4"
	]

	numberRamdon = this.getRamdon();

	constructor() {
		setTimeout(() => {
            this.state = "inactive";
        }, 100)
	 }

	getRamdon(){
		let index = _.random(0,3)

		return index;
	}

	ngAfterViewInit() {
		// console.log(this.linea)
		// var linea = $(this.linea)
		// setInterval(() => {
		// 	linea.animate({backgroundColor: this.paleta[Math.floor(Math.random() * (3 - 0 + 1)) + 0]});
		// 	console.log('cambiando de color')
		// 	console.log(linea)
		// }, 1000);
	}

	ngOnInit() {
		CarreraService.obtenerGalerias()
			.then(r => r && r.data ? this.carreras = r.data.map(n => new Carrera(n)) : null);
	}

}
