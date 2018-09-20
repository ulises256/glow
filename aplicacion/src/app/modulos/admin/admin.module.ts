import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { QuillEditorModule } from 'ngx-quill-editor';
import { NgQrScannerModule } from 'angular2-qrscanner';

import { AdminRoutingModule } from './admin-routing.module';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { MaterialModule } from '../../extras/material.module';
import { ExtrasModule } from '../../extras/extras.module';

import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component';
import { ConfirmDelDialogComponent } from './fragments/confirm-del-dialog/confirm-del-dialog.component'
import { AnadirProyectoDialog } from './fragments/anadir-proyecto-dialog/anadir-proyecto-dialog.component';
import { CarrerasComponent } from './carreras/carreras.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { OrdenesComponent } from './ordenes/ordenes.component'
import { AnadirCarreraComponent } from './fragments/anadirCarrera/anadirCarrera.component';
import { CarreraComponent } from './carreras/carrera/carrera.component';
import { PatrocinadoresComponent } from './carreras/carrera/patrocinadores/patrocinadores.component';
import { AnadirNuevoPatrocinadorComponent } from './fragments/anadirNuevoPatrocinador/anadirNuevoPatrocinador.component';
import { BoletosComponent } from './carreras/carrera/boletos/boletos.component';
import { AnadirBoletoComponent } from './fragments/anadirBoleto/anadirBoleto.component';
import { GaleriaComponent } from './carreras/carrera/galeria/galeria.component';
import { PatrocinadoresAdminComponent } from './patrocinadores-admin/patrocinadores-admin.component';
import { AgregarPatroComponent } from './patrocinadores-admin/agregarPatro/agregarPatro.component';
import { PatrocinadorService } from '../../services';
import { DetallesUsuarioComponent } from './fragments/detalles-usuario/detalles-usuario.component';
import { CuponesComponent } from './carreras/carrera/cupones/cupones.component';
import { AnadirCuponComponent } from './fragments/anadir-cupon/anadir-cupon.component';
import { VerificadorComponent } from './verificardor/verificador.component'



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    QuillEditorModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    MaterialModule,
    AgmCoreModule,
    ExtrasModule,
    FroalaEditorModule, FroalaViewModule,
    HttpClientModule,
    NgQrScannerModule
  ],
  exports: [],
  entryComponents: [
    ConfirmDelDialogComponent,
    AnadirProyectoDialog,
    AnadirCarreraComponent,
    AnadirNuevoPatrocinadorComponent,
    AnadirBoletoComponent,
    DetallesUsuarioComponent,
    AnadirCuponComponent
  ],
  declarations: [
    AdminComponent,
    HomeComponent,
    ConfirmDelDialogComponent,
    AnadirProyectoDialog,
    CarrerasComponent,
    UsuariosComponent,
    AnadirCarreraComponent,
    CarreraComponent,
    PatrocinadoresComponent,
    AnadirNuevoPatrocinadorComponent,
    BoletosComponent,
    AnadirBoletoComponent,
    GaleriaComponent,
    PatrocinadoresAdminComponent,
    AgregarPatroComponent,
    DetallesUsuarioComponent,
    OrdenesComponent,
    CuponesComponent,
    AnadirCuponComponent,
    VerificadorComponent
  ],
  providers: [PatrocinadorService]

})
export class AdminModule { }
