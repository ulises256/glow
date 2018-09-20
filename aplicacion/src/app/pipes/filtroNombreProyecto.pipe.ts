import { Pipe, PipeTransform } from '@angular/core';
import { Proyecto } from '../models/proyecto.model';
@Pipe({
  name: 'filtroNombreProyecto'
})
export class FiltroNombreProyecto implements PipeTransform {

  transform(proyectos: Proyecto[], searchText: string): Proyecto[] {
    return searchText ?
    proyectos.filter((proyectos: Proyecto) =>
        proyectos.getNombre().toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) !== -1)
      :
      proyectos;
  }
}