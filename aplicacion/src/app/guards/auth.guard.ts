import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { AuthService } from '../services/auth.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild  {
    constructor(private router: Router, private auth: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		let hayUsuario: boolean;
		this.auth.obtenerUsuario().asObservable().subscribe(user => {
			user && user.getId() ? hayUsuario = true : hayUsuario = false;
		}).closed
		return hayUsuario;
	}
	
	canActivateChild() {

		let tienePermisos: boolean;
		this.auth.obtenerUsuario().asObservable().subscribe(user => user.getTipo() == 'admin'? tienePermisos = true : tienePermisos = false).closed
		return tienePermisos;
	  }
}
