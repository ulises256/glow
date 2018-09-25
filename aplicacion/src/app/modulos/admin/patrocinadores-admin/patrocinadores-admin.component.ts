import { Component, OnInit } from '@angular/core';
import { Patrocinador } from '../../../models';
import { Router, ActivatedRoute } from '@angular/router';
import { PatrocinadorService } from '../../../services';
import { MatDialog } from '@angular/material';
import { ConfirmDelDialogComponent } from '../fragments/confirm-del-dialog/confirm-del-dialog.component';
import { AnadirNuevoPatrocinadorComponent } from '../fragments/anadirNuevoPatrocinador/anadirNuevoPatrocinador.component';

@Component({
	selector: 'app-patrocinadores-admin',
	templateUrl: './patrocinadores-admin.component.pug',
	styleUrls: ['./patrocinadores-admin.component.styl']
})
export class PatrocinadoresAdminComponent implements OnInit {

	patrocinadores: Patrocinador[] = [];
	private dimensionesMoviles = { altura: '600px', anchura: '1250px' }
	constructor(private dialog: MatDialog, private router: Router) { }

	agregar() {
		let patrocinador = new Patrocinador({})

		const dialogRef = this.dialog.open(AnadirNuevoPatrocinadorComponent, {
			width: '800px',
			data: patrocinador
		});

		dialogRef.afterClosed().subscribe(result => {
			result ? PatrocinadorService.crearPatrocinador(result)
				.then(p => {
					if (p && p.data) {
						let patro = new Patrocinador(p.data)
						patro.$imagen = result.imagen;
						this.patrocinadores.push(patro);
					}
				}) : null
		});
	}

	ver(idPatro) {
		this.router.navigate(['admin/patrocinadores/' + idPatro])
	}

	eliminarCarrera(patro: Patrocinador) {
		const dialogRef = this.dialog.open(ConfirmDelDialogComponent, {
			width: '290px',
			height: '200px'
		});

		dialogRef.afterClosed().subscribe(result => {
			result ?
				PatrocinadorService.eliminarPatrocinador(patro.$id)
					.then(response => this.patrocinadores.splice(this.patrocinadores.indexOf(patro), 1))
				:
				null;
		})
	}

	

	ngOnInit() {
		PatrocinadorService.obtenerPatrocinadores()
			.then(r => r && r.data ? this.patrocinadores = r.data.map(n => new Patrocinador(n)) : null)



		// this.route.params.subscribe(params => {
		// 	CarreraService.obtenerCarrera(+params['id'])
		// 		.then(r => r && r.data ? this.carrera = new Carrera(r.data): null)
		// });			
	}

}
