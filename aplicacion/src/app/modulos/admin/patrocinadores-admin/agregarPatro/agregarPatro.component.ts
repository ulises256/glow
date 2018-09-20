import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { PatrocinadorService } from '../../../../services';
import { Patrocinador, Imagen, GoogleMaps, Marker } from '../../../../models';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'app-agregarPatro',
	templateUrl: './agregarPatro.component.pug',
	styleUrls: ['./agregarPatro.component.styl']
})
export class AgregarPatroComponent implements OnInit, AfterViewInit {
	patrocinador: Patrocinador;
	public form: FormGroup;
	public imagen: Imagen;
	public base64textString: string;
	@ViewChild('googleMap') gmapElement: ElementRef;
	mapa: GoogleMaps;
	markers: Marker[] = [];

	constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, public domSanitizer: DomSanitizer, ) { }


	guardar(form: FormGroup) {
		if (form.controls['nombre'].valid &&
			form.controls['tipo'].valid &&
			form.controls['tipoApoyo'].valid &&
			form.controls['puntoVenta'].valid) {

			this.patrocinador.$nombre = form.controls['nombre'].value
			this.patrocinador.$tipo = form.controls['tipo'].value
			this.patrocinador.$tipoApoyo = form.controls['tipoApoyo'].value
			this.patrocinador.$puntoVenta = form.controls['puntoVenta'].value
			this.patrocinador.$sitioweb = form.controls['sitioweb'].value

			this.patrocinador.$id ?
				PatrocinadorService.actualizarPatrocinador(this.patrocinador)
				:
				PatrocinadorService.crearPatrocinador(this.patrocinador)
					.then(r => r && r.data ? this.patrocinador = new Patrocinador(r.data) : null)
					.then(patro => patro.$imagen = this.imagen);

		}
	}


	guardarPuntosVenta() {
		this.patrocinador.$markers =  this.mapa.obtenerMArkers();
		this.mapa.anadirMarkers(this.patrocinador.$markers);
	}

	verPuntos() {
		this.mapa.anadirMarkers(this.patrocinador.$markers);
	}

	crearmapa() {
		this.mapa = new GoogleMaps(this.gmapElement, {
			latitude: 22.511883338637464,
			longitude: -100.80013833094642,
			zoom: 5
		}, 1, true);

		this.mapa.contruirMapa();
		this.mapa.anadirMarkers(this.patrocinador.$markers.map(m => {
			m.$clickleable = true;
			m.$dragrabble = true;
			return m;
		}));
	}	

	ngOnInit() {
		this.route.params.subscribe(async params => {
			params['id'] ?
				await PatrocinadorService.obtenerPatrocinador(+params['id'])
					.then( r => r && r.data ? this.patrocinador =  new Patrocinador(r.data) : null)
				:
				this.patrocinador = new Patrocinador({});

			this.crearmapa();
			this.form = this.formBuilder.group({
				nombre: [this.patrocinador.$nombre, Validators.required],
				tipo: [this.patrocinador.$tipo, Validators.required],
				tipoApoyo: [this.patrocinador.$tipoApoyo, Validators.required],
				puntoVenta: [this.patrocinador.$puntoVenta, Validators.required],
				sitioweb: [this.patrocinador.$sitioweb, Validators.required],
				logo: [this.patrocinador.imagen, Validators.required],
			});
		});
	}

	ngAfterViewInit() {

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
		this.patrocinador.$id ?
			(
				this.patrocinador.$imagen && this.patrocinador.$imagen.getId()?
					this.patrocinador.$imagen.setImagen(this.base64textString) : 
					this.patrocinador.$imagen = new Imagen(null, this.base64textString, 'normal') ,
				this.patrocinador.$imagen = this.patrocinador.$imagen
			)
			:
			(
				this.imagen = new Imagen(null, this.base64textString, 'normal')
			);
	}	

}
