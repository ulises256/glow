import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { APILOCAL } from '../../../../environments/environment';
import * as axios from 'axios';

@Component({
	selector: 'app-contacto',
	templateUrl: './contacto.component.pug',
	styleUrls: ['./contacto.component.styl'],
	encapsulation: ViewEncapsulation.None
})
export class ContactoComponent implements OnInit {

	form: FormGroup;
	enviado: any;
	private  apiUrl: string = APILOCAL.url;
	constructor(private formBuilder: FormBuilder) { }

	enviar(form: FormGroup) {
		if(form.controls.nombre.valid &&
			form.controls.asunto.valid &&
			form.controls.descripcion.valid &&
			form.controls.correo.valid 
		) {
			let data =  {
				nombre: form.controls.nombre.value,
				asunto: form.controls.asunto.value,
				descripcion: form.controls.descripcion.value,
				correo : form.controls.correo.value
			}
	
			axios.default.post(this.apiUrl + '/data/enviarcorreo', data)
			.then(r => r && r.data? this.enviado= true : this.enviado = false)
			.catch(err => this.enviado = false);
		}

	}

	ngOnInit() {
		this.form = this.formBuilder.group({
			nombre: ['', Validators.required],
			asunto: ['', Validators.required],
			descripcion: ['', Validators.required],
			correo:['', Validators.required],
		});		
	}

}