import { Component, OnInit, Inject } from '@angular/core'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Proyecto } from '../../../../models/proyecto.model';

@Component({
	selector: 'app-anadir-proyecto-dialog',
	templateUrl: './anadir-proyecto-dialog.component.pug',
	styleUrls: ['./anadir-proyecto-dialog.component.styl']
})

export class AnadirProyectoDialog implements OnInit {
	public form: FormGroup;
	// public areas: Area[] = []
	// public programas: Programa[] = []

	public status = [
		{id: 1, nombre: "Pendiente"},
		{id: 2, nombre: "Progreso"},
		{id: 3, nombre: "Terminado"},
	]
	constructor(
		public dialogRef: MatDialogRef<AnadirProyectoDialog>,
		private formBuilder: FormBuilder,
		@Inject(MAT_DIALOG_DATA) public data: Proyecto) {
			// AreaService.getAreas()
			// .then(response => this.areas = response.data.map(n => new Area(n.id, n.nombre)));

			// CamapanaService.getCampanas()
			// .then(response => this.programas = response.data.map(n => new Programa(n.id, n.nombre, n.descripcion, n.logo)));
		}

	cancelar() {
		this.dialogRef.close()
	}

	submit(form: FormGroup) {
		if(form.controls.nombre.valid && 
			form.controls.descripcion.valid &&
			form.controls.area.valid &&
			form.controls.programa.valid &&
			form.controls.status.valid
		){
			this.data.setNombre(form.controls.nombre.value);
			this.data.setDescripcion(form.controls.descripcion.value);
			this.data.setId_Area(form.controls.area.value);
			this.data.setId_Programa(form.controls.programa.value);
			this.data.setStatus(form.controls.status.value)
			this.dialogRef.close(this.data)
		}
	}

	ngOnInit() {
		this.form = this.formBuilder.group({
			nombre: [this.data.getNombre(), Validators.required],
			descripcion: [this.data.getDescripcion(), Validators.required],
			area: [this.data.getId_Area(), Validators.required],
			programa: [this.data.getId_Programa(), Validators.required],
			status: [this.data.getStatus(), Validators.required]
		});
    }
}