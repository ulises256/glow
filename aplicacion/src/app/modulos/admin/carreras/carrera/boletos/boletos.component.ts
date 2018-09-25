import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { Boleto } from '../../../../../models';
import { AnadirBoletoComponent } from '../../../fragments/anadirBoleto/anadirBoleto.component';
import { Router } from '@angular/router';
import { MatDialog, MatSelectionList, MatSelectionListChange, MatList } from '@angular/material';
import { ConfirmDelDialogComponent } from '../../../fragments/confirm-del-dialog/confirm-del-dialog.component';

@Component({
	selector: 'boletos',
	templateUrl: './boletos.component.pug',
	styleUrls: ['./boletos.component.styl']
})
export class BoletosComponent implements OnInit, AfterViewInit {

	boletitos: Boleto[] = [];
	@ViewChild('listBoletos') listBoletos: MatList;
	@Input() set boletos(boletos : Boleto[]) {
		this.boletitos = boletos;
	}
	
	@Output() quitarBoleto = new EventEmitter<Boleto>();
	@Output() agregarBoleto = new EventEmitter<Boleto>();
	
	constructor(private dialog: MatDialog) { }

	anadirBoleto(boleto?: Boleto) {
		boleto? null : boleto =  new Boleto({});
        
        const dialogRef = this.dialog.open(AnadirBoletoComponent, {
            width: '800px',
            data: boleto
        });

        dialogRef.afterClosed().subscribe(result => {
			result ?  this.agregarBoleto.emit(result) : null;
        });		
	}

	eliminarBoleto(boleto: Boleto) {
		let messaje = "Seguro de eliminar, algunos usuarios pueden estar relacionados con este boleto!";
		const dialogRef = this.dialog.open(ConfirmDelDialogComponent, {
            width: '300px',
			height: '250px',
			data: {body: messaje}
		})

		dialogRef.afterClosed().subscribe(result => {
			result ?  this.quitarBoleto.emit(boleto) : null;
        });
		
	}

	checar(event, id: number) {
		this.boletitos.forEach(boletito => {
			boletito.$id == id ? boletito.setActivo(event.checked) : boletito.setActivo(false);
		})
	}

	ngAfterViewInit(): void {

	}

	ngOnInit() {

	}

}
