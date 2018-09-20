import { Component, OnInit, Input, AfterViewInit, ViewEncapsulation } from '@angular/core'
import { Carrera } from '../../../../models';
import { Router } from '@angular/router';
import { CarreraService } from '../../../../services';
import * as _ from 'lodash';

@Component({
    selector: 'proximas',
    templateUrl: './proximas.component.pug',
    styleUrls: ['./proximas.component.styl'],
    encapsulation: ViewEncapsulation.None
})

export class ProximasComponent implements OnInit, AfterViewInit{
    @Input() carrerasProximas: Carrera[];
    carreras  = [];

	paleta = [
		"#ff3377",
		"#00c900",
		"#1cccf4"
	]

    constructor(private router: Router,) {  
        !this.carrerasProximas ? 
            CarreraService.obtenerHome()
                .then(r => r && r.data ? this.carrerasProximas = r.data.map(c => new Carrera(c, 'bandera')) : null)
                .then(carreras => {
                    if(carreras)
                        this.carreras =  carreras.map(n => {
                            return {
                                id: n.$id, fechaini: n.$fechaini, nombre: n.$nombre, color: this.paleta[_.random(0, 2)]
                            };
                        });
                    
                })

        : null;


      }

    ngAfterViewInit(): void {

    }

    ramdomizarEntreRangos(minimo: number, maximo: number) {
        return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
    }

	verCarrera(id) {
		this.router.navigate(['carreras/' + id]);

	}    

    ngOnInit(): void {

        

    }


}
