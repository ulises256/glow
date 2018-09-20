import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Usuario } from '../../../../models';
import { UsuarioService } from '../../../../services';

@Component({
	selector: 'app-detalles-usuario',
	templateUrl: './detalles-usuario.component.pug',
	styleUrls: ['./detalles-usuario.component.styl']
})
export class DetallesUsuarioComponent implements OnInit {

	usuario: Usuario;

	constructor(
		public dialogRef: MatDialogRef<DetallesUsuarioComponent>,
		@Inject(MAT_DIALOG_DATA) public data: number,
		private formBuilder: FormBuilder,
		public domSanitizer: DomSanitizer, ) { }

	cancelar() {
		this.dialogRef.close()
	}

	submit(form: FormGroup) {

	}

	ngOnInit() {
		this.usuario = new Usuario({});

		UsuarioService.obtenerUsuario(this.data)
			.then(r => r && r.data? this.usuario = new Usuario(r.data) : null);
	}

}
