import { Orden } from "./orden.model";
import { BoletoService } from "../services/boleto.service";

export class Boleto {
    private id: number;
    private precioini: number;
    private preciofin: number;
    private fechaini: Date;
	private fechafin: Date;
	private tipo: string;
	private activo: string;
    private ordens: Orden[] = [];

	constructor(arg) {
		this.id = arg.id;
		this.precioini = arg.precioini;
		this.preciofin = arg.preciofin;
		this.fechaini = arg.fechaini;
		this.fechafin = arg.fechafin;
		this.tipo = arg.tipo;
		this.activo = arg.activo;
        this.id ? BoletoService.obtenerOrdenes(this.id)
            .then(r => r && r.data ? this.ordens = r.data.map(n=> new Orden(n)) : null) : null;
	}

	public get $id(): number {
		return this.id;
	}

	public get $precioini(): number {
		return this.precioini;
	}

	public get $preciofin(): number {
		return this.preciofin;
	}

	public get $fechaini(): Date {
		return this.fechaini;
	}

	public get $fechafin(): Date {
		return this.fechafin;
	}
	
	public get $tipo(): string {
		return this.tipo;
	}
	
	public getActivo(): boolean {
		return this.activo == 'Si' ? true : false;
	}
    
    public getOrdenes(): Orden[] {
        return this.ordens;
    }

	public set $id(value: number) {
		this.id = value;
	}

	public set $precioini(value: number) {
		this.precioini = value;
	}

	public set $preciofin(value: number) {
		this.preciofin = value;
	}

	public set $fechaini(value: Date) {
		this.fechaini = value;
	}

	public set $fechafin(value: Date) {
		this.fechafin = value;
	}

	public set $tipo(value: string) {
		this.tipo = value;
	}

	public setActivo(value: boolean) {
		value ? this.activo = 'Si' : this.activo = 'No'
		BoletoService.actualizarBoleto(this)
	}

}