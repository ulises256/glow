import { Component, OnInit, Input, AfterViewInit } from '@angular/core'
import * as _ from 'lodash';
@Component({
    selector: 'mancha',
    templateUrl: './mancha.component.pug',
    styleUrls: ['./mancha.component.styl']
})

export class ManchaComponent implements OnInit, AfterViewInit{

    @Input() ancho: number;
    @Input() alto: number;
    @Input() color;
    top: any= '0%';
    left: any = '0%';
    width: number = 84;
    estilos : any;

    constructor() {    }


    calcularRango(){

        let atributos = [ [ 'left', 'right' ] , [  'top', 'bottom' ] ]

        let x = atributos[0][  _.random(0, 1)  ]
        let y = atributos[1][  _.random(0, 1)  ]
        this.estilos = { [ y ] : _.random(1, 3) + '%' , [ x ] :  _.random(20, 80 ) + '%' }


    }

    ngAfterViewInit(): void {
        // this.top = this.ramdomizarEntreRangos(1, this.alto)
        // this.left = this.ramdomizarEntreRangos(1, this.ancho)

    }

    ramdomizarEntreRangos(minimo: number, maximo: number) {
        return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
    }

    ngOnInit(): void {
        this.calcularRango()
    }


}
