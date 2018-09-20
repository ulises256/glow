import { Component, OnInit, Input, AfterViewInit, ViewEncapsulation } from '@angular/core'


@Component({
    selector: 'mancha-statica',
    templateUrl: './mancha-statica.component.pug',
    styleUrls: ['./mancha-statica.component.styl'],
    encapsulation: ViewEncapsulation.None
})

export class ManchaStaticaComponent implements OnInit {

    @Input() color;

    rotate = this.getRandom()

    constructor() {

    }

    getRandom() {
        let giro = 0;

        giro = Math.floor(Math.random() * 360);

        return giro;
    }

    ngOnInit() {

    }

}