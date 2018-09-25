import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

/* Importamos los componentes que se usarán en las rutas
 */
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../../guards/auth.guard';
import { UsuarioComponent } from './usuario/usuario.component';
import { GaleriasComponent } from './galerias/galerias.component';
import { CarrerasComponent } from './carreras/carreras.component';
import { ContactoComponent } from './contacto/contacto.component';
import { FaqComponent } from './faq/faq.component';
import { CarreraComponent } from './carreras/carrera/carrera.component';
import { PagoComponent } from './pago/pago.component';
import { BoletoComponent } from './boleto/boleto.component';
import { PrivacidadComponent } from './privacidad/privacidad.component';
import { CondicionesComponent } from './condiciones/condiciones.component';

const main_routers: Routes = [
	{
		path: '',
		component: MainComponent,
		children: [
			{
				path: '',
				component: HomeComponent
			},
			{
				path: 'galerias',
				component: GaleriasComponent
			},
			{
				path: 'carreras',
				component: CarrerasComponent
			},
			{
				path: 'carreras/:id',
				component: CarreraComponent
			},
			{
				path: 'contacto',
				component: ContactoComponent
			},
			{
				path: 'faq',
				component: FaqComponent
			},
			{
				path: 'comprar/:id',
				component: BoletoComponent
			},
			{
				path: 'pago',
				component: PagoComponent
			},
			{
				path: 'login',
				component: LoginComponent
			},
			{
				path: 'user',
				component: UsuarioComponent,
				// canActivate: [AuthGuard]
			},
			{
				path: 'user/:token',
				component: LoginComponent
			},
			{
				path: 'privacidad',
				component: PrivacidadComponent
			},
			{
				path: 'condiciones',
				component: CondicionesComponent
			},
		]
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(main_routers),
		CommonModule,
	],
	exports: [
		RouterModule
	],
})
export class MainRoutingModule { }
