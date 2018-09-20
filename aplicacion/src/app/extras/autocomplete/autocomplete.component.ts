import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { startWith } from "rxjs/operators/startWith";
import { map } from "rxjs/operators/map";


@Component({
    selector: 'autocomplete',
    templateUrl: './autocomplete.component.pug',
    styleUrls: ['./autocomplete.component.styl']
})

export class AutocompleteComponent implements OnInit{
    @Input() array = [];
    @Input() label = 'Buscar ';
    @Output() selectItem = new EventEmitter();
    public filtroCtrl: FormControl;
    public filteredItems: Observable<any>;

    constructor() {
        this.filtroCtrl = new FormControl();
        this.filteredItems = this.filtroCtrl.valueChanges
        .pipe(
            startWith(''),
            map(nombre => nombre ? this.filterItems(nombre) : (this.array?this.array.slice():null))
        );
    }

    filterItems(nombre: string) {
        return this.array.filter(item => item.nombre.toLowerCase().indexOf(nombre.toLowerCase()) === 0);
    }

    eventClick(item) {
        this.selectItem.emit(item)
    }

    ngOnInit() {

    }
}