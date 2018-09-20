import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Usuario, Orden, Estado } from '../../../models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, EstadoService, OrdenService } from '../../../services';
import { Subscription } from 'rxjs/Subscription';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
// import * as jsPDF from 'jspdf';
import * as html2canvas from "html2canvas"

@Component({
	selector: 'usuario',
	templateUrl: './usuario.component.pug',
	styleUrls: ['./usuario.component.styl']
})
export class UsuarioComponent implements OnInit, OnDestroy {
	usuarioForm: FormGroup;
	estados: Estado;
	municipios: any;
	columns_ordenes = [];
	editable = { disiabled: true, icon: 'edit', tooltip: 'Editar Datos' };
	usuario: Usuario;
	subscription: Subscription;
	dataSourceOrdenes: MatTableDataSource<Orden>;
	ordenes: Orden[] = [];
	@ViewChild('qrcode') qrImage: ElementRef;
	impresiones = [];
	columnsOrdenes = [
		{
			id: "nombre",
			value: "Nombre"
		},
		{
			id: "monto",
			value: "Monto"
		},
		{
			id: "fechaCompra",
			value: "Fecha compra"
		},
		{
			id: "cantidad",
			value: "Cantidad de boletos"
		},
		{
			id: "status",
			value: "Estatus"
		},
		{
			id: "descuento",
			value: "Descuento"
		},
		{
			id: "opciones",
			value: "Opciones"
		},								
	];
	constructor(private formBuilder: FormBuilder,  private router:Router,private ordenService: OrdenService, private auth: AuthService) {
		this.subscription = this.auth.obtenerUsuario().subscribe(user => {
			this.usuario = user
			if(user) {
				this.usuarioForm = this.formBuilder.group({
					nombre: this.formBuilder.control({ value: this.usuario.getNombre(), disabled: this.editable.disiabled }, Validators.required),
					correo: this.formBuilder.control({ value: this.usuario.getCorreo(), disabled: true }, Validators.required),
					edad: this.formBuilder.control({ value: this.usuario.getEdad(), disabled: this.editable.disiabled }, Validators.required),
					sexo: this.formBuilder.control({ value: this.usuario.getSexo(), disabled: this.editable.disiabled }, Validators.required),
					ciudad: this.formBuilder.control({ value: this.usuario.getCiudad(), disabled: this.editable.disiabled }, Validators.required),
					entero: this.formBuilder.control({ value: this.usuario.getEntero(), disabled: this.editable.disiabled }, Validators.required),
					gustos: this.formBuilder.control({ value: this.usuario.getGustos(), disabled: this.editable.disiabled }, Validators.required),
				});

				this.columns_ordenes = this.columnsOrdenes.map(n => n.id);
				this.dataSourceOrdenes = new MatTableDataSource(this.ordenes);

				this.usuario.getOrdenes()
				.then(ordens => this.ordenes = ordens)
				.then(ordens => this.dataSourceOrdenes = new MatTableDataSource(this.ordenes));
			}

		});
	}	

	imprimirBoleto(orden: Orden) {
		var doc = new jsPDF()
		this.impresiones = orden.$impresos;
		this.impresiones
		.forEach((impreso, index)=> {
			let qrcodjs = new QRCode(''+impreso.id+'', {
				text: impreso.codigo,
				width: 128,
				height: 128,
				colorDark: "#000000",
				colorLight: "#ffffff",
				correctLevel: QRCode.CorrectLevel.H
			});


			html2canvas(qrcodjs._el).then(canvas => {
				var img = canvas.toDataURL("img/png");
				doc.addImage(img, 'JPGE', 10, 10)
			}).then(algo => doc.save('Boleto'+(index+1)+'.pdf'))
		});

		
	}

	irAPagar(orden) {

		this.ordenService.modificarOrdenPendiente(orden);
		this.router.navigate(['/pago'])
	}

	eliminarOrden(orden) {

		OrdenService.eliminarOrden(orden.$id)
			.then(r => r && r.data ? this.ordenes.splice(this.ordenes.indexOf(orden), 1) : null)
			.then(r => this.dataSourceOrdenes.data = this.ordenes);
	}

	editar(form: FormGroup) {
		this.editable.disiabled ?
			(Object.keys(form.controls).forEach(key => form.get(key).enable()), this.editable.icon = 'save', this.editable.tooltip = 'Guardar Datos')
			:
			(Object.keys(form.controls).forEach(key => form.get(key).disable()), this.editable.icon = 'edit', this.editable.tooltip = 'Editar Datos', this.usuario.actualizarDatos())

		this.editable.disiabled = !this.editable.disiabled

	}

	selecionarMunicipio(estado: Estado) {
		this.municipios = estado.getMunicipios()
	}

	ngOnInit() {
		EstadoService.obtenerEstados()
			.then(r => r && r.data ? this.estados = r.data.map(n => new Estado(n, '')) : null);
	}

	ngOnDestroy() {
		// this.subscription.unsubscribe();
	}
}
