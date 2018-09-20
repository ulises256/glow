import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Imagen } from '../../models';

@Component({
	selector: 'app-preview-image',
	templateUrl: './preview-image.component.pug',
	styleUrls: ['./preview-image.component.styl'],
	encapsulation: ViewEncapsulation.None
})
export class PreviewImageComponent implements OnInit {

	constructor(
		public dialogRef: MatDialogRef<PreviewImageComponent>,
		public domSanitizer: DomSanitizer,
		@Inject(MAT_DIALOG_DATA) public data: Imagen) { }

	cancelar() {
		this.dialogRef.close()
	}

	ngOnInit() {
		
	}

}
