import { Component, OnInit, ElementRef, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationStart, NavigationCancel, NavigationEnd } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material';
import { transition, trigger, query, style, animate, group } from '@angular/animations';
import { Usuario } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import anime from 'animejs'
import { MatIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
	selector: 'app-main',
	templateUrl: './main.component.pug',
	styleUrls: ['./main.component.styl'],
	providers: [MediaMatcher],
	animations: [
		trigger('routerTransition', [
			transition('* <=> *', [
				group([
					query(':enter',
						[
							style({
								position: 'fixed',
								width: '100%',
								opacity: 0,
								transform: 'translateY(-100%)'
							}),
							animate(
								'0.5s cubic-bezier(0, 1.8, 1, 1.8)',
								style({ opacity: 1, transform: 'translateY(0) rotate(0)' })
							),
						],
						{ optional: true }
					),
					query(':leave',
						animate('0.5s  cubic-bezier(0.445, 0.050, 0.550, 0.950)',
							style({
								position: 'fixed',
								width: '100%',
								opacity: 0, transform: 'translateY(100%) rotate(0)'
							})
						),
						{ optional: true }
					),
				])
			])
		])
	]
})
export class MainComponent implements OnInit, AfterViewInit, OnDestroy {
	mobileQuery: MediaQueryList;
	private _mobileQueryListener: () => void;
	navLinks = [];
	mobile = true;
	loading = false;
	usuario: Usuario;
	subscription: Subscription;

	constructor(
		private router: Router,
		private dialog: MatDialog,
		changeDetectorRef: ChangeDetectorRef,
		media: MediaMatcher,
		private domSanitizer: DomSanitizer,
		public matIconRegistry: MatIconRegistry,
		private us: AuthService) {
		this.usuario = new Usuario({})
		this.mobileQuery = media.matchMedia('(max-width: 768px)');
		this._mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery.addListener(this._mobileQueryListener);
		this.navLinks = [
			{ path: '/', label: 'HOME', icon: 'home' },
			{ path: '/carreras', label: 'CARRERAS', icon: 'directions_run' },
			{ path: '/galerias', label: 'GALERIA', icon: 'collections' },
			{ path: '/contacto', label: 'CONTACTO', icon: 'contact_mail' },
			{ path: '/faq', label: 'FAQ', icon: 'question_answer' },
			{ path: '/login', label: 'INICIAR SESIÓN', icon: 'account_circle' },
		];

		matIconRegistry.addSvgIcon('facebook', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/facebook.svg'));
		matIconRegistry.addSvgIcon('instagram', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/instagram-gray.svg'));
		matIconRegistry.addSvgIcon('twitter', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/twitter_logo.svg'));
	}

	getState(outlet) {
		return outlet.isActivated ? outlet.activatedRoute : '';
	}

	salir() {
		this.us.modificarRedirect('/')
		this.us.salir();
	}

	ngAfterViewInit() {
		this.router.events
			.subscribe((event) => {
				if (event instanceof NavigationStart) {
					this.loading = true;
				}
				else if (
					event instanceof NavigationEnd ||
					event instanceof NavigationCancel
				) {
					this.loading = false;
				}
			});
	}

	ngOnDestroy(): void {
		this.mobileQuery.removeListener(this._mobileQueryListener);
	}
	ngOnInit() {
		this.subscription = this.us.obtenerUsuario().subscribe(user => this.usuario = user);
	}
	verProyecto(idProyecto) {
		this.router.navigate(['proyectos/' + idProyecto]);
	}

	// metodo() {


	// 	var canvasEl:HTMLCanvasElement = document.querySelector('.fireworks');
	// 	var ctx = canvasEl.getContext('2d');
	// 	var numberOfParticules = 5;
	// 	var pointerX = 0;
	// 	var pointerY = 0;
	// 	var tap = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown';
	// 	var colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'];

	// 	function setCanvasSize() {
	// 		canvasEl.width = window.innerWidth * 2;
	// 		canvasEl.height = window.innerHeight * 2;
	// 		canvasEl.style.width = window.innerWidth + 'px';
	// 		canvasEl.style.height = window.innerHeight + 'px';
	// 		canvasEl.getContext('2d').scale(2, 2);
	// 	}

	// 	function updateCoords(e) {
	// 		pointerX = e.clientX || e.touches[0].clientX;
	// 		pointerY = e.clientY || e.touches[0].clientY;
	// 	}

	// 	function setParticuleDirection(p) {
	// 		var angle = anime.random(0, 360) * Math.PI / 180;
	// 		var value = anime.random(50, 180);
	// 		var radius = [-1, 1][anime.random(0, 1)] * value;
	// 		return {
	// 			x: p.x + radius * Math.cos(angle),
	// 			y: p.y + radius * Math.sin(angle)
	// 		}
	// 	}

	// 	interface Point {
	// 		x?: number,
	// 		y?: number,
	// 		color?: any,
	// 		radius?: any,
	// 		endPos?: any,
	// 		draw?: any,
	// 		alpha?: any,
	// 		lineWidth?: any
	// 	}

	// 	function createParticule(x, y) {
	// 		var p: Point = {x: undefined, y: undefined};
	// 		p.x = x;
	// 		p.y = y;
	// 		p.color = colors[anime.random(0, colors.length - 1)];
	// 		p.radius = anime.random(16, 32);
	// 		p.endPos = setParticuleDirection(p);
	// 		p.draw = function () {
	// 			ctx.beginPath();
	// 			ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
	// 			ctx.fillStyle = p.color;
	// 			ctx.fill();
	// 		}
	// 		return p;
	// 	}

	// 	function createCircle(x, y) {
	// 		var p: Point = {};
	// 		p.x = x;
	// 		p.y = y;
	// 		p.color = '#FFF';
	// 		p.radius = 0.1;
	// 		p.alpha = .5;
	// 		p.lineWidth = 6;
	// 		p.draw = function () {
	// 			ctx.globalAlpha = p.alpha;
	// 			ctx.beginPath();
	// 			ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
	// 			ctx.lineWidth = p.lineWidth;
	// 			ctx.strokeStyle = p.color;
	// 			ctx.stroke();
	// 			ctx.globalAlpha = 1;
	// 		}
	// 		return p;
	// 	}

	// 	function renderParticule(anim) {
	// 		for (var i = 0; i < anim.animatables.length; i++) {
	// 			anim.animatables[i].target.draw();
	// 		}
	// 	}

	// 	function animateParticules(x, y) {
	// 		var circle = createCircle(x, y);
	// 		var particules = [];
	// 		for (var i = 0; i < numberOfParticules; i++) {
	// 			particules.push(createParticule(x, y));
	// 		}
	// 		anime.timeline().add({
	// 			targets: particules,
	// 			x: function (p) { return p.endPos.x; },
	// 			y: function (p) { return p.endPos.y; },
	// 			radius: 0.1,
	// 			duration: anime.random(1200, 1800),
	// 			easing: 'easeOutExpo',
	// 			update: renderParticule
	// 		})
	// 			.add({
	// 				targets: circle,
	// 				radius: anime.random(80, 160),
	// 				lineWidth: 0,
	// 				alpha: {
	// 					value: 0,
	// 					easing: 'linear',
	// 					duration: anime.random(600, 800),
	// 				},
	// 				duration: anime.random(1200, 1800),
	// 				easing: 'easeOutExpo',
	// 				update: renderParticule,
	// 				offset: 0
	// 			});
	// 	}

	// 	var render = anime({
	// 		duration: Infinity,
	// 		update: function () {
	// 			ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
	// 		}
	// 	});

	// 	document.addEventListener(tap, function (e) {

	// 		render.play();
	// 		updateCoords(e);
	// 		animateParticules(pointerX, pointerY);
	// 	}, false);

	// 	var centerX = window.innerWidth / 2;
	// 	var centerY = window.innerHeight / 2;

	// 	function autoClick() {

	// 		animateParticules(centerX, centerY);
	// 		anime({ duration: Infinity });
	// 	}
	// 	autoClick()
	// }
}
