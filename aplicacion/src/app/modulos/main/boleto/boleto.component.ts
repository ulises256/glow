import { Component, OnInit, OnDestroy, AfterViewChecked, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CarreraService, AuthService, OrdenService } from '../../../services';
import { Carrera, Boleto, Usuario, Orden } from '../../../models';
import { Observable } from 'rxjs';
import { Time, TimerService } from '../../../services/timer.service';
import * as moment from 'moment'
import { Cupon } from '../../../models/cupon.model';
import { CuponService } from '../../../services/cupon.service';
import * as _ from 'lodash';

@Component({
	selector: 'app-boleto',
	templateUrl: './boleto.component.pug',
	styleUrls: ['./boleto.component.styl'],
	providers: [TimerService]
})
export class BoletoComponent implements OnInit, OnDestroy, AfterViewInit{

	carrera: Carrera

	boletos: Boleto [];
	cupones: Cupon[];
	descuento: number;
	cuponValido: boolean;

	actual: Boleto = undefined;
	proximo: Boleto = undefined;
	time1$: Observable<Time>;
	precioCompra: number = 0;
	cantidadBoletos: number = 1;
	usuario: Usuario;
	sub: any;

	checket = {condiciones: false, privacidad: false};

	carrerasProximas: Carrera[] = [];

	paleta = [
		"#ff3377",
		"#00c900",
		"#1cccf4"
	]

	constructor(private auth: AuthService,private route: ActivatedRoute, private router:Router, public location: Location, private timerService: TimerService, private ordenService: OrdenService) { }

	ngOnInit() {
		this.route.params.subscribe(params => {

			CarreraService.obtenerCarrera(+params['id'])
				.then(r => r && r.data ? this.carrera = new Carrera(r.data, 'bandera') : null)
				.then(c => c.getBoletos().then(boletitos => this.boletos = boletitos))
				.then(b => {
					this.actual = this.boletos.find(n => n.getActivo() == true);
					this.precioCompra =  this.actual.$preciofin;
					this.proximo = this.boletos.find(n => n.$fechaini> this.actual.$fechafin);
				})
				.then(a => this.time1$ = this.timerService.timer(new Date(moment(this.actual.$fechafin).format('MMMM DD, YYYY HH:mm:ss'))))

				this.sub = this.auth.obtenerUsuario().subscribe(user => {
					this.auth.modificarRedirect('/comprar/' + params['id'])
					user ? this.usuario = user : this.router.navigate(['/login'])
				}).closed;

			CuponService.obtenerCuponesCarrera(+params['id']).then(r => r && r.data ? this.cupones = r.data.map(n => new Cupon(n)) : null)
		});
	}

	ramdon() {
		return Math.floor(Math.random() * (2 - 0 + 1) + 0);
	}

	verCarrera(id) {
		this.router.navigate(['/carreras/' + id]);
	}

	ngOnDestroy(){
	}

	cambiarPrecio(cantidad) {

		this.descuento ? null :  this.descuento = 0;

		this.precioCompra = this.actual.$precioini * cantidad.target.value - this.descuento;
		this.cantidadBoletos = cantidad.target.value;
	}

	ngAfterViewInit(): void {
		CarreraService.obtenerHome()
		.then(r => r && r.data ? this.carrerasProximas = r.data.map(c => new Carrera(c, 'bandera')) : null)
	}

	checarCupon(codigo) {

		let cupon = this.cupones.find(n => n.codigo == codigo.target.value)

		if(cupon){
			cupon.status == 'normal' ?  this.cuponValido = true : this.cuponValido = false;
			this.descuento = (this.precioCompra * (cupon.precio/100))
		}
		else{
			this.cuponValido = false;
			this.descuento = 0;
		}
	}

	irComprar(){

		if(this.checket.condiciones == true && this.checket.privacidad==true){
			let orden = {
				nombre: this.carrera.$nombre,
				id_usuario: this.usuario.getId(),
				id_boleto: this.actual.$id,
				monto: this.precioCompra,
				cantidad: this.cantidadBoletos,
				descuento: this.descuento ? this.descuento : 0,
		   }
   
		   OrdenService.crearOrden(orden)
			   .then(res => res && res.data ?  this.ordenService.modificarOrdenPendiente(new Orden(res.data)) : null)
			   .then(algo => this.router.navigate(['/pago']))
		}else {
			window.alert('Acepte los terminos y condiciones y las politicas de privacidad antes de comprar')
		}


	}

	private irse(){
		this.router.navigate(['/'])
	}
}
