import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Patrocinador, Imagen } from '../../../../models';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'app-anadirNuevoPatrocinador',
	templateUrl: './anadirNuevoPatrocinador.component.pug',
	styleUrls: ['./anadirNuevoPatrocinador.component.styl']
})
export class AnadirNuevoPatrocinadorComponent implements OnInit {

	public form: FormGroup;
	public imagen;
	public base64textString: string;
	constructor(
		public dialogRef: MatDialogRef<AnadirNuevoPatrocinadorComponent>,
		private formBuilder: FormBuilder,
		public domSanitizer: DomSanitizer,
		@Inject(MAT_DIALOG_DATA) public data: Patrocinador
	) { }

	cancelar() {
		this.dialogRef.close()
	}

	submit(form: FormGroup) {
		if(form.controls.nombre.valid && 
			form.controls.tipo.valid &&
			form.controls.logo.valid
		){
			this.data.$nombre = form.controls.nombre.value;
			this.data.$tipo = form.controls.tipo.value;

			this.dialogRef.close(this.data);
		}
	}

	handleFileSelect(evt) {
		var files = evt.target.files;
		var file = files[0];

		if (files && file) {
			var reader = new FileReader();

			reader.onload = this._handleReaderLoaded.bind(this);

			reader.readAsBinaryString(file);
		}
	}

	_handleReaderLoaded(readerEvt) {
		var binaryString = readerEvt.target.result;
		this.base64textString = "data:image/jpeg;base64," + btoa(binaryString);
		this.data.imagen ? (
			this.data.imagen.setImagen(this.base64textString),
			this.data.$imagen = this.data.imagen
			)
			:
			this.data.imagen = new Imagen(null, this.base64textString, 'normal');
	}	

	ngOnInit() {
		this.form =  this.formBuilder.group({
			nombre: [this.data.$nombre, Validators.required],
			tipo: [this.data.$tipo, Validators.required],
			tipoApoyo: [this.data.$tipoApoyo, Validators.required],
			puntoVenta: [this.data.$puntoVenta, Validators.required],
			sitioweb: [this.data.$sitioweb, Validators.required],
			logo: [this.data.imagen, Validators.required],
		});
    }

}
