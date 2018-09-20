import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';

import { FiltroNombreProyecto } from '../pipes/filtroNombreProyecto.pipe';
import { SafeHtmlPipe } from '../pipes/safe-html.pipe';
import { SafeImagePipe } from '../pipes/safe-image.pipe';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { DropifyComponent } from './dropify/dropify.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { VideoJSComponent } from './videojs/videojs.component';;
import { SlickModule } from 'ngx-slick';
import { DragScrollModule } from 'ngx-drag-scroll/lib';
import { ImagenComponent } from './imagen/imagen.component';
import { PreviewImageComponent } from './preview-image/preview-image.component';
import { CaminoComponent } from '../modulos/admin/carreras/carrera/camino/camino.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        SlickModule,
        DragScrollModule,
        LoadingModule
    ],
    declarations: [
        SafeHtmlPipe,
        SafeImagePipe,
        AutocompleteComponent,
        DropifyComponent,
        FiltroNombreProyecto,
        FileUploadComponent,
        VideoJSComponent,
        ImagenComponent,
        PreviewImageComponent,
        CaminoComponent

    ],
    exports: [
        AutocompleteComponent,
        DropifyComponent,
        FiltroNombreProyecto,
        FileUploadComponent,
        VideoJSComponent,
        SafeHtmlPipe,
        ImagenComponent,
        PreviewImageComponent,
        CaminoComponent
    ],
    providers: [
      ],
      entryComponents: [
        PreviewImageComponent
      ]    
  })

  export class ExtrasModule {}
