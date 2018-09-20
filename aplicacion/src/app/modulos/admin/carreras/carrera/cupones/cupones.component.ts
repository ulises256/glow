import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Cupon } from '../../../../../models/cupon.model';
import { MatList, MatDialog } from '@angular/material';
import { ConfirmDelDialogComponent } from '../../../fragments/confirm-del-dialog/confirm-del-dialog.component';
import { AnadirCuponComponent } from '../../../fragments/anadir-cupon/anadir-cupon.component';
import { CuponService } from '../../../../../services/cupon.service';

@Component({
	selector: 'cupones',
	templateUrl: './cupones.component.pug',
	styleUrls: ['./cupones.component.styl']
})
export class CuponesComponent implements OnInit {

	cupones: Cupon[] = [];
	idcarrera: any;
	@Input() set idCarrera(id_carrera: number) {
		this.idcarrera = id_carrera;
		CuponService.obtenerCuponesCarrera(id_carrera)
			.then(r => r && r.data ? this.cupones = r.data.map(c => new Cupon(c)) : null);
	}

	constructor(private dialog: MatDialog) { }

	anadirBoleto(boleto?: Cupon) {
		boleto? null : boleto =  new Cupon({});
        
        const dialogRef = this.dialog.open(AnadirCuponComponent, {
            width: '800px',
            height: '300px',
            data: boleto
        });

        dialogRef.afterClosed().subscribe(result => {
			if(result){
				result.id_carrera = this.idcarrera;		
				result.id ?
					CuponService.actualizarCupon(result).then(r => this.cupones[this.cupones.indexOf(boleto)] = result)
					:
					CuponService.crearCupon(result).then(r => this.cupones.push(new Cupon(r.data))) ;
			}
        });		
	}

	eliminarBoleto(boleto: Cupon) {
		let messaje = "Seguro de eliminar?";
		const dialogRef = this.dialog.open(ConfirmDelDialogComponent, {
            width: '300px',
			height: '250px',
			data: messaje
		})

		dialogRef.afterClosed().subscribe(result => {
			result ?  CuponService.eliminarCupon(boleto.id).then(r => r && r.data ? this.cupones.splice(this.cupones.indexOf(boleto), 1) : null) : null
        });
		
	}	

	ngOnInit() {
	}

}
