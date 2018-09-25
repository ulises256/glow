import { Component, OnInit } from '@angular/core';
import { Carrera } from '../../../models';
import { CarreraService } from '../../../services';
import { AnadirCarreraComponent } from '../fragments/anadirCarrera/anadirCarrera.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ConfirmDelDialogComponent } from '../fragments/confirm-del-dialog/confirm-del-dialog.component';
@Component({
	selector: 'app-carreras',
	templateUrl: './carreras.component.pug',
	styleUrls: ['./carreras.component.styl']
})
export class CarrerasComponent implements OnInit {
	carreras: Carrera[] = [];
	constructor(private dialog: MatDialog, private _router: Router) { }

	agregarCarrera() {
		let carrera = new Carrera({}, 'bandera');
        
        const dialogRef = this.dialog.open(AnadirCarreraComponent, {
            width: '600px',
            data: carrera
        });

        dialogRef.afterClosed().subscribe(result => {
			result ?  CarreraService.crearCarrera(result)
						.then(r => r && r.data? this.carreras.push(new Carrera(r.data, 'bandera')): null) : null
        });
	}

	eliminarCarrera(carrea: Carrera) {
		const dialogRef = this.dialog.open(ConfirmDelDialogComponent, {
            width: '290px',
        });

        dialogRef.afterClosed().subscribe(result => {
            result?
            CarreraService.eliminarCarrera(carrea.$id)
            .then(response => this.carreras.splice(this.carreras.indexOf(carrea), 1))
            :
            null;
        })
	}

	verCarrera(idCarrea) {
		this._router.navigate(['admin/carreras/' + idCarrea])
	}

	ngOnInit() {
		CarreraService.obtenerCarreras()
			.then(r => r && r.data? this.carreras = r.data.map(n => new Carrera(n, 'bandera')): null);
	}

}
