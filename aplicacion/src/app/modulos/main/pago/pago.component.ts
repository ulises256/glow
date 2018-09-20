import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OpenPayModel, Costumer } from '../../../models/openpay.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrdenService, AuthService, BoletoService, CarreraService } from '../../../services';
import { Orden, Usuario, Carrera, Boleto } from '../../../models';
import { MatDialog } from '@angular/material';
import { LoadingComponent } from '../../../extras/loading/loading.component';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Time, TimerService } from '../../../services/timer.service';
import * as moment from 'moment'
import { ConfirmDelDialogComponent } from '../../admin/fragments/confirm-del-dialog/confirm-del-dialog.component';

@Component({
	selector: 'app-pago',
	templateUrl: './pago.component.pug',
	styleUrls: ['./pago.component.styl'],
	providers: [TimerService]
})
export class PagoComponent implements OnInit {

	tarjetaForm: FormGroup;
	@ViewChild('form') fomrTarjeta: ElementRef;
	private openpay: OpenPayModel;
	iconsCards = []
	iconsDebit = []
	orden: Orden;
	usuario: Usuario;
	boleto: Boleto;
	sub: any;
	time1$: Observable<Time>;
	carrerasProximas: Carrera[] = [];
	paleta = [
		"#ff3377",
		"#00c900",
		"#1cccf4"
	]

	status = null;
	constructor(
		private formBuilder: FormBuilder,
		private ordenService: OrdenService,
		private router: Router,
		private auth: AuthService,
		private dialog: MatDialog,
		private timerService: TimerService,) {
	}

	cobrar(form: FormGroup) {
		const cobrarDialog = this.dialog.open(ConfirmDelDialogComponent, {
			data: {titulo: 'Confirmar Pago por:', body: this.orden.$cantidad + ' Boleto de la carrera: '+ this.orden.$nombre + ' por el precio de $' + this.orden.$monto +' ?'}
		}).afterClosed().subscribe(result => {
			if(result){
				if (form.valid) {
					let costumer: Costumer = {
						'holder_name': form.controls.nombre.value,
						'card_number': form.controls.tarjeta.value,
						'expiration_month': form.controls.mes.value,
						'expiration_year': form.controls.ano.value,
						'cvv2': form.controls.codigo.value
					}
					this.openpay.crearToken(costumer, this.orden, this.usuario);
		
					this.openpay.obtenerStatus().subscribe(status => {
						this.status = status
						this.cargar();
					})
		
				}
			}
		})

	}

	cargar() {

		this.status==0? this.dialog.open(LoadingComponent).afterClosed().subscribe(result => this.router.navigate(['/user'])) : null;
		this.status==1? this.dialog.closeAll() : null;
		if(typeof(this.status) == "string") {
			this.dialog.closeAll()
			alert(this.status)
			this.router.navigate(['/'])
		}

	}

	tarteja_mensajes_errores = {
		'nombre': [
			{ type: 'required', message: 'Es campo es requerido' },
		],
		'tarjeta': [
			{ type: 'required', message: 'Es campo es requerido' },
			{ type: 'pattern', message: 'Solo debe contener numeros' },
		],
		'mes': [
			{ type: 'required', message: 'Es campo es requerido' },
			{ type: 'minlength', message: 'Son 2 digitos como minimo' },
			{ type: 'maxlength', message: 'Son 2 digitos como maximo' },
			{ type: 'pattern', message: 'Solo debe contener numeros' },
		],
		'ano': [
			{ type: 'required', message: 'Es campo es requerido' },
			{ type: 'minlength', message: 'Son 2 digitos como minimo' },
			{ type: 'maxlength', message: 'Son 2 digitos como maximo' },
			{ type: 'pattern', message: 'Solo debe contener numeros' },
		],
		'codigo': [
			{ type: 'required', message: 'Es campo es requerido' },
			{ type: 'minlength', message: 'Son 3 digitos como minimo' },
			{ type: 'maxlength', message: 'Son de 3 a 4 digitos como maximo' },
			{ type: 'pattern', message: 'Solo debe contener numeros' },
		]
	}

	ngOnInit() {
		CarreraService.obtenerHome()
		.then(r => r && r.data ? this.carrerasProximas = r.data.map(c => new Carrera(c, 'bandera')) : null)
		this.openpay = new OpenPayModel(this.fomrTarjeta);

		this.ordenService.obtenerOrdenPendiente().subscribe(orden => {
			this.orden = orden;
			BoletoService.obtenerBoleto(this.orden.$id_boleto)
				.then(r => r && r.data? this.boleto = new Boleto(r.data): null)
				.then(boleto => this.time1$ = this.timerService.timer(new Date(moment(boleto.$fechafin).format('MMMM DD, YYYY HH:mm:ss'))))

		}).closed;

		this.auth.obtenerUsuario().subscribe(usuario => {
			this.usuario = usuario;
		})

		this.tarjetaForm = this.formBuilder.group({
			nombre: ['',
					Validators.compose([Validators.required])],
			tarjeta: [
					'',
					Validators.compose(this.validarCampo('numero', true))],
			mes: [
				'',
				Validators.compose(this.validarCampo('numero', true, 2, 2))],
			ano: [
				'',
				Validators.compose(this.validarCampo('numero', true, 2, 2))],
			codigo: [
				'',
				Validators.compose(this.validarCampo('numero', true, 3, 4))]
		});

	}

	validarCampo(tipo: string, req: boolean = true , min?: number, max?: number) {

		let validaciones = [];

		if(req)
			validaciones.push(Validators.required)
	
		switch (tipo) {
			case 'numero':
				validaciones.push(Validators.pattern(/^-?(0|[1-9]\d*)?$/))
				if(min)
					validaciones.push(Validators.minLength(min))
				if(max)
					validaciones.push(Validators.maxLength(max))
				break;
			case 'email':
				validaciones.push(Validators.email)
				break;
		}

		return validaciones;
	}	

}
