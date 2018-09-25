import { NgModule, LOCALE_ID} from '@angular/core';
import { CommonModule } from '@angular/common';
// import { registerLocaleData } from '@angular/common';
// import localeES from '@angular/common/locales/es-MX'
// registerLocaleData(localeES, 'es_MX')
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { SlickModule } from 'ngx-slick';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';

import { MaterialModule } from '../../extras/material.module';
import { ExtrasModule } from '../../extras/extras.module';


import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { CarrerasComponent } from './carreras/carreras.component';
import { ContactoComponent } from './contacto/contacto.component';
import { FaqComponent } from './faq/faq.component';
import { GaleriasComponent } from './galerias/galerias.component';
import { CarreraComponent } from './carreras/carrera/carrera.component';
import { PagoComponent } from './pago/pago.component';
import { ExplicacionComponent } from './partials/explicacion/explicacion.component';
import { BoletoComponent } from './boleto/boleto.component';
import { LoadingComponent } from '../../extras/loading/loading.component';
import { PrivacidadComponent } from './privacidad/privacidad.component';
import { CondicionesComponent } from './condiciones/condiciones.component';
import { DragScrollModule } from 'ngx-drag-scroll/lib';
import { ManchaComponent } from './partials/mancha/mancha.component';
import { ProximasComponent } from './partials/proximas/proximas.component';
import { ManchaStaticaComponent } from './partials/mancha-statica/mancha-statica.component';
import { PopupComponent } from './partials/popup/popup.component';


@NgModule({
	imports: [
	CommonModule,
	BrowserAnimationsModule,
	MainRoutingModule,
	FormsModule,  ReactiveFormsModule,
	MaterialModule,
	SlickModule.forRoot(),
	AgmCoreModule,
	AgmSnazzyInfoWindowModule,
	LoadingModule,
	ExtrasModule,
	DragScrollModule
	],
	declarations: [
		MainComponent,
		HomeComponent,
		LoginComponent,
		UsuarioComponent,
		CarrerasComponent,
		CarreraComponent,
		ContactoComponent,
		FaqComponent,
		GaleriasComponent,
		PagoComponent,
		ExplicacionComponent,
		BoletoComponent,
		LoadingComponent,
		PrivacidadComponent,
		CondicionesComponent,
		ManchaComponent,
		ProximasComponent,
		ManchaStaticaComponent,
		PopupComponent
	],
	entryComponents: [
		LoginComponent,
		LoadingComponent
	],
	// providers: [{ provide: LOCALE_ID, useValue: "es_MX" }]
})
export class MainModule { }
