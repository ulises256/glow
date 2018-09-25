import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from "@angular/forms";
import {DndModule} from 'ng2-dnd';
import { AgmCoreModule } from '@agm/core';
import { NgQrScannerModule } from 'angular2-qrscanner';
import { MaterialModule } from './extras/material.module';

import { ChartsModule } from 'ng2-charts/ng2-charts';
// import "angular2-navigate-with-data";
import { AppComponent } from './app.component';
// importando  Rutas
import {AppRoutingModule} from './app.routers';

// Importando modulos de los componentes principales

import { MainModule } from './modulos/main/main.module';
import { AdminModule } from './modulos/admin/admin.module';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { SlickModule } from 'ngx-slick';
import { PatrocinadorService, OrdenService, AuthService, CarreraService } from './services';
import { AuthGuard } from './guards/auth.guard';
import { DragScrollModule } from 'ngx-drag-scroll';




@NgModule({
   declarations: [
      AppComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      MaterialModule,
      ChartsModule,
      MainModule,
      AdminModule,
      MaterialModule,
      DndModule.forRoot(),
      NgQrScannerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCvjxrAegekcCef-gLjHfdIS0V9KUVMqg4',
    }),
    AppRoutingModule,
    FormsModule,
    DragScrollModule,
    LoadingModule.forRoot({
        animationType: ANIMATION_TYPES.wanderingCubes,
        backdropBackgroundColour: 'rgba(0,0,0,1)',
        backdropBorderRadius: '4px',
        primaryColour: '#87bdd8',
        secondaryColour: '#b7d7e8',
        tertiaryColour: '#cfe0e8'
    }),
    SlickModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot()
  ],
  exports: [],
  providers: [PatrocinadorService, OrdenService, AuthService, AuthGuard, CarreraService],
  bootstrap: [AppComponent]
})
export class AppModule { }
