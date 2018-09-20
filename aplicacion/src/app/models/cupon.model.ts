import * as moment from 'moment'
export class Cupon {
    private _id: number;
    private _codigo: string;
    private _precio: number;
    private _status: string;
    private _fechaini: Date;
    private _fechafin: Date;
    private _id_carrera: number;

    constructor(arg) {

        this._id = arg.id;
        this._codigo = arg.codigo;
        this._precio = arg.precio;
        this._status = arg.status;
        this._id_carrera = arg.id_carrera;
        this._fechaini = arg.fechaini;
        this._fechafin = arg.fechafin;
        this._validarCupon();
    }


    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get codigo(): string {
        return this._codigo;
    }

    set codigo(value: string) {
        this._codigo = value;
    }

    get precio(): number {
        return this._precio;
    }

    set precio(value: number) {
        this._precio = value;
    }

    get status(): string {
        return this._status;
    }

    set status(value: string) {
        this._status = value;
    }

    get fechaini(): Date {
        return this._fechaini;
    }

    set fechaini(value: Date) {
        this._fechaini = value;
    }

    get fechafin(): Date {
        return this._fechafin;
    }

    set fechafin(value: Date) {
        this._fechafin = value;
    }    

    get id_carrera(): number {
        return this._id_carrera;
    }

    set id_carrera(value: number) {
        this._id_carrera = value;
    }

    private _validarCupon() {

        if(moment(new Date()).isBetween(this._fechaini, this._fechafin))
            this._status = 'normal';
        else
            this._status = 'vencido';
        
    }
}