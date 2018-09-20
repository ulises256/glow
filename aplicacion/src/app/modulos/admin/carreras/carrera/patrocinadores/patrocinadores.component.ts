import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { Patrocinador } from '../../../../../models';
import { PatrocinadorService } from '../../../../../services';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AnadirNuevoPatrocinadorComponent } from '../../../fragments/anadirNuevoPatrocinador/anadirNuevoPatrocinador.component';
@Component({
	selector: 'patrocinadores',
	templateUrl: './patrocinadores.component.pug',
	styleUrls: ['./patrocinadores.component.styl'],
	encapsulation: ViewEncapsulation.None
})
export class PatrocinadoresComponent implements OnInit {

	@Output() quitarPatro = new EventEmitter<Patrocinador>();
	@Output() agregarPatro = new EventEmitter<Patrocinador>();
	patrocinadores: any;
	ptcndCarrera: Patrocinador[] = []
    public filtroCtrl: FormControl;

	@Input() set patrocinadoresCarrea(value: Patrocinador[]) {
		this.filtroCtrl = new FormControl();
		this.filtroCtrl.valueChanges
			.subscribe(string => 
				this.patrocinadores = PatrocinadorService.filtro(string)
				.then(patros => patros.data.map(n => new Patrocinador(n)))
			)
		this.ptcndCarrera = value;
	}

	constructor(private dialog: MatDialog,) { 

	}

	quitarPatrocinador(patrocinador: Patrocinador) {
		this.quitarPatro.emit(patrocinador)
	}

	agregarPatrocinador(patrocinador: Patrocinador) {
		this.agregarPatro.emit(patrocinador);
	}

	eliminarPatrocinador(patrocinador: Patrocinador) {
		PatrocinadorService.eliminarPatrocinador(patrocinador.$id)
	}

	anadir() {
		let patrocinador =  new Patrocinador({})
        
        const dialogRef = this.dialog.open(AnadirNuevoPatrocinadorComponent, {
            width: '800px',
            height: '800px',
            data: patrocinador
        });

        dialogRef.afterClosed().subscribe(result => {
			result ?  PatrocinadorService.crearPatrocinador(result)
							.then(p => {
								if(p && p.data){
									let patro = new Patrocinador(p.data)
									patro.$imagen = result.imagen;
								}
							}) : null
        });
	}

	ngOnInit() {

	}

}
