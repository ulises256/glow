import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { Cupon } from '../../../../models/cupon.model';

@Component({
	selector: 'app-anadir-cupon',
	templateUrl: './anadir-cupon.component.pug',
	styleUrls: ['./anadir-cupon.component.styl']
})
export class AnadirCuponComponent implements OnInit {
	public form: FormGroup;
	fechaactual = new Date
	constructor(public dialogRef: MatDialogRef<AnadirCuponComponent>,
		private formBuilder: FormBuilder,
		@Inject(MAT_DIALOG_DATA) public data: Cupon) { }

	cancelar() {
		this.dialogRef.close()
	}

	submit(form: FormGroup) {
		if (form.valid) {
			let id = this.data.id;
			let id_carrera = this.data.id_carrera;
			let codigo = this.data.codigo;

			let campos = {precio: [], fechaini: [], fechafin: []}
			let resultado = Object.keys(campos)
            .map(n => new Object({ [ n ] :  form.controls[n].value  }))
			.reduce((ac, v) => Object.assign(ac, v), {})
			
			this.data = new Cupon(resultado)
			this.data.id= id;
			this.data.id_carrera = id_carrera;

			this.data.codigo? this.data.codigo = this.crearCodigo() : this.data.codigo = codigo;

			this.dialogRef.close(this.data);
		}
	}

	crearCodigo() {
		return Math.floor(Math.random()*16777215).toString(16);
	}

	ngOnInit() {

		this.form = this.formBuilder.group({
			precio : [this.data.precio, [Validators.required, Validators.pattern("[0-9]*")]],
			fechaini: [this.data.fechaini, Validators.required],
			fechafin: [this.data.fechafin, Validators.required],
		});
	}

}
