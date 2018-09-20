import * as _ from 'lodash';

import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ImagenService } from '../../services';
import { Imagen } from '../../models';
import { Observable } from 'rxjs';

@Component({
	selector: 'imagen',
	templateUrl: './imagen.component.pug',
	styleUrls: ['./imagen.component.styl'],
	providers: [/* ImagenesService */],
	encapsulation: ViewEncapsulation.None
})

export class ImagenComponent implements OnInit {

	@Input() id: number;
	idObserver: Observable<number>;

	imagen: Imagen;

	@Output() selectImagen = new EventEmitter();

	constructor(
		private _sanitizer: DomSanitizer
	) {
		
		this.idObserver = new Observable( observer => {
			setTimeout(() => {
				observer.next(this.id);
			}, 1500);
		})

		this.idObserver.subscribe(id => {
			ImagenService.obtenerImagen(id)
			.then(response => response && response.data ? this.imagen = new Imagen(response.data.id, response.data.imagen, response.data.tipo): null)
		})
	}

	getImage(imagen) {
		return this._sanitizer.bypassSecurityTrustStyle(`linear-gradient(rgba(29, 29, 29, 0), rgba(16, 16, 23, 0.5)), url(${imagen})`);
	}

	ngOnInit() {
		// console.log(this.id)
		// ImagenService.obtenerImagen(this.id)
		// 	.then(response => this.imagen = new Imagen(response.data.id, response.data.imagen, response.data.tipo))
		// 	.then(r => console.log(r))
	}

	eventClick(item) {
		this.selectImagen.emit(item)
	}
}
