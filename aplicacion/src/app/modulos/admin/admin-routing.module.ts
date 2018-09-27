import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


/* Importamos los componentes que se usarán en las rutas
 */

 import { AuthGuard } from '../../guards/auth.guard';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component';
import { CarrerasComponent } from './carreras/carreras.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CarreraComponent } from './carreras/carrera/carrera.component';
import { OrdenesComponent } from './ordenes/ordenes.component'
import { PatrocinadoresAdminComponent } from './patrocinadores-admin/patrocinadores-admin.component';
import { AgregarPatroComponent } from './patrocinadores-admin/agregarPatro/agregarPatro.component';
import { VerificadorComponent } from './verificardor/verificador.component'

const admin_routers: Routes = [
	{
		path: 'admin',
		component: AdminComponent,
		canActivate: [AuthGuard],
		canActivateChild: [AuthGuard],
		children: [
			{
				path: '',
				component: HomeComponent
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
				path: 'patrocinadores',
				component: PatrocinadoresAdminComponent
			},
			{
				path: 'patrocinadores/anadir',
				component: AgregarPatroComponent
			},
			{
				path: 'patrocinadores/:id',
				component: AgregarPatroComponent
			},
			{
				path: 'ordenes',
				component: OrdenesComponent
			},
			{
				path: 'usuarios',
				component: UsuariosComponent
			},
            {
				path: 'verificador',
				component: VerificadorComponent
			}
		]
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(admin_routers),
		CommonModule
	],
	exports: [
		RouterModule
	],
})
export class AdminRoutingModule { }
