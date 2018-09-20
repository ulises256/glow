import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const app_routes: Routes = [
    {
        path: 'main',
        loadChildren: './modulos/main/main.module#MainModule'
     },
     {
        path: 'admin',
        loadChildren: './modulos/admin/admin.module#AdminModule'
     },
    { path: '',   redirectTo: 'main', pathMatch: 'full' },
    {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(app_routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
