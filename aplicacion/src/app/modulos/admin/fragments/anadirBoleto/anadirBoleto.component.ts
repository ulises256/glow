import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { Boleto } from '../../../../models';

@Component({
	selector: 'app-anadirBoleto',
	templateUrl: './anadirBoleto.component.pug',
	styleUrls: ['./anadirBoleto.component.styl']
})
export class AnadirBoletoComponent implements OnInit {

	public form: FormGroup;
	fechaactual = new Date();
	constructor(
		public dialogRef: MatDialogRef<AnadirBoletoComponent>,
		private formBuilder: FormBuilder,
		@Inject(MAT_DIALOG_DATA) public data: Boleto
	) { }

	cancelar() {
		this.dialogRef.close()
	}

	submit(form: FormGroup) {
		if(form.controls.precioini.valid && 
			form.controls.preciofin.valid &&
			form.controls.fechaini.valid &&
			form.controls.fechafin.valid &&
			form.controls.tipo.valid 
		){
			this.data.$precioini = form.controls.precioini.value;
			this.data.$preciofin = form.controls.preciofin.value;
			this.data.$fechaini = form.controls.fechaini.value;
			this.data.$fechafin = form.controls.fechafin.value;
			this.data.$tipo = form.controls.tipo.value;
			this.dialogRef.close(this.data);
		}
	}

	dateLessThan(from: string, to: string) {
		return (group: FormGroup): {[key: string]: any} => {
		 let f = group.controls[from];
		 let t = group.controls[to];
		 if (f.value > t.value) {
		   return {
			 dates: "Date from should be less than Date to"
		   };
		 }
		 return {};
		}
	  }

	ngOnInit() {
		this.form = this.formBuilder.group({
			precioini: [this.data.$preciofin, [Validators.required, Validators.pattern("[0-9]*")]],
			preciofin: [this.data.$preciofin, [Validators.required, Validators.pattern("[0-9]*")]],
			fechaini: [this.data.$fechaini, Validators.required],
			fechafin: [this.data.$fechafin, Validators.required],
			tipo: [this.data.$tipo, Validators.required],
		},{validator: this.dateLessThan('fechafin', 'fechaini')});
    }

}
