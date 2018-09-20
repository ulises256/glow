import { Component, OnInit, ViewChildren, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import { Estado, Carrera } from '../../../models';
import { EstadoService } from '../../../services';
import { Router } from '@angular/router';

@Component({
	selector: 'app-faq',
	templateUrl: './faq.component.pug',
	styleUrls: ['./faq.component.styl']
})
export class FaqComponent implements OnInit, AfterViewInit {
	estados: Estado[] =[]
	estado: Estado;
	carrerasEnElEstado: Carrera[] = [];
	@ViewChildren('someName') someDivs;
	paleta = [
		"#ff3377",
		"#ef6100",
		"#00c900",
		"#1cccf4"
	]

	cargando = false;
	constructor(private router: Router) {
		EstadoService.obtenerEstados()
			.then(r => r && r.data ? this.estados = r.data.map(estado => new Estado(estado)): null)
			.then(estados => {
				estados.forEach(estado => {
					estado.$tiene_carrera == 'Si' ? $("#" + estado.$id).css({ fill:this.paleta[Math.floor(Math.random() * (3 - 0 + 1)) + 0]}) : null;
				})
			});
	}

	ngAfterViewInit() {

	}

	verCarrera(id) {
		this.router.navigate(['carreras/' + id]);

	}

	mostrarCarreras(id){
		let buscarCarreras = () => {
			if(this.estado.$tiene_carrera=="Si")
				this.cargando = true;
				EstadoService.obtenerCarrerasEnEsteEstado(id)
					.then(r => r && r.data ? this.carrerasEnElEstado = r.data.map(n=> new Carrera(n)): null)
					.then(algo => this.cargando = false);
		}

		if(this.estado){
			(this.estado.$id) ?
				(this.estado.$id == id ? (null) : (this.estado =  this.estados.find(estado => estado.$id == id), buscarCarreras()))
				:
				(this.estado =  this.estados.find(estado => estado.$id == id), buscarCarreras());
			}
		else{
			this.estado =  this.estados.find(estado => estado.$id == id); buscarCarreras();
		}

	}

	ngOnInit() {

		$("path").hover(function() {
			$(this).css('cursor','pointer');
		}, function() {
			$(this).css('cursor','auto');
		});


		 $('path').on("click", event => {
			 this.mostrarCarreras(+event.target.id);
		 })

	}

}
