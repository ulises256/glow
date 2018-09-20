import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarreraService, EstadoService } from '../../../../services';
import { Carrera, Estado, Municipio, Patrocinador, Boleto } from '../../../../models';
import { Ruta } from '../../../../models/ruta.model';

@Component({
	selector: 'app-carrera',
	templateUrl: './carrera.component.pug',
	styleUrls: ['./carrera.component.styl']
})
export class CarreraComponent implements OnInit {
	carrera: Carrera = null;
	estados: Estado;
	municipios: any;
	formMunicipio: FormGroup
	fecha = new Date();
	boletos: Boleto[] = [];
	ruta: Ruta = new Ruta({});
	public editable = {disiabled: true, icon: 'edit', tooltip: 'Editar Campos'};
	constructor(private domSanitizer: DomSanitizer, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) { }

	editar() {
		this.editable.disiabled = !this.editable.disiabled
		this.editable.disiabled?
			(this.editable.disiabled = true, this.editable.icon = 'edit', this.editable.tooltip = 'Editar Campos', this.carrera.actualizarDatos() ) 
			: 
			(this.editable.disiabled = false, this.editable.icon = 'save', this.editable.tooltip = 'Guardar cambios');
	}

	selecionarMunicipio(estado: Estado) {
		this.municipios =  estado.getMunicipios()
	}

	anadirCiudad(form: FormGroup) {
		this.carrera.setCiudades(form.controls.municipio.value);
	}

	quitarCiudad(ciudad: Municipio) {
		this.carrera.deleteCiudad(ciudad);
	}

	quitarPatrocinador(patrocinador: Patrocinador) {
		this.carrera.deletePatrocinadores(patrocinador)
	}

	agregarPatrocinador(patrocinador: Patrocinador) {
		this.carrera.setPatrocinadores(patrocinador);
	}

	quitarBoleto(boleto: Boleto) {
		this.carrera.deleteBoleto(boleto);
	}

	agregarBoleto(boleto: Boleto) {
		this.carrera.setBoletos(boleto);
	}

	ngOnInit() {
		EstadoService.obtenerEstados()
			.then(r => r && r.data ? this.estados = r.data.map(n=> new Estado(n, '')): null);

		this.route.params.subscribe(params => {
			CarreraService.obtenerCarrera(+params['id'])
				.then(r => r && r.data ? this.carrera = new Carrera(r.data): null)
				.then(c => this.carrera.getBoletos().then(b => this.boletos = b))
				.then(r => this.carrera.getRuta().then(r => this.ruta = r));
		});

		this.formMunicipio = this.formBuilder.group({
			estado: ['', Validators.required],
			municipio: ['', Validators.required],
		});
	}

}
