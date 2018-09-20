import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Imagen } from '../../../../../models';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { ConfirmDelDialogComponent } from '../../../fragments/confirm-del-dialog/confirm-del-dialog.component';

@Component({
	selector: 'galeria',
	templateUrl: './galeria.component.pug',
	styleUrls: ['./galeria.component.styl']
})
export class GaleriaComponent implements OnInit {

	@Input() imagenes: Imagen[] = [];

	@Output() quitarImagen = new EventEmitter<Imagen>()
	@Output() agregarImagen = new  EventEmitter<Imagen>()

	newimagen: Imagen;

	constructor(private domSanitizer: DomSanitizer, private dialog: MatDialog) { }

	guardarImagen(imagen?: Imagen) {
		this.newimagen.setId(null)
		this.newimagen.setTipo('normal');
		this.agregarImagen.emit(imagen);
	}

	eliminarImagen(imagen?: Imagen) {
		const dialogRef = this.dialog.open(ConfirmDelDialogComponent, {
            width: '290px',
            height: '200px'
        });

        dialogRef.afterClosed().subscribe(result => {
            result?
				this.quitarImagen.emit(imagen)
            :
            null;
        })
		
	}

	ngOnInit() {
		this.newimagen = new Imagen(null, null, 'Normal');
	}

}
