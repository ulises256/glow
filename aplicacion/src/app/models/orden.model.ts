import { Usuario } from "./usuario.model";
import { OrdenService } from "../services";

export class Orden {
    private id: number;
    private nombre: string;
    private id_usuario: number;
	private id_boleto: number;
	private monto: number;
	private fechaCompra: Date;
	private cantidad: number;
	private descuento: number;
	private status: string;
	private impresos: any = []

	constructor(arg) {
		this.id = arg.id;
		this.nombre = arg.nombre;
		this.id_usuario = arg.id_usuario;
		this.id_boleto = arg.id_boleto;
		this.monto = arg.monto;
		this.fechaCompra = arg.fechaCompra;
		this.cantidad = arg.cantidad;
		this.descuento = arg.descuento;
		this.status = arg.status;
		OrdenService.obtenerImpresos(this.id).then(r => r && r.data ?  this.impresos =  r.data : this.impresos = [])
    }

	public get $id(): number {
		return this.id;
	}

	public get $nombre(): string {
		return this.nombre;
	}

	public get $id_usuario(): number {
		return this.id_usuario;
	}

	public get $id_boleto(): number {
		return this.id_boleto;
	}
	
	public get $fechaCompra(): Date {
		return this.fechaCompra;
	}
	
	public get $cantidad(): number {
		return this.cantidad
	}

	public get $descuento() : number {
		return this.descuento;
	}

	public get $monto(): number {
		return this.monto;
	}

	public get $status() : string {
		return this.status;
	}

	public get $impresos(): Array<any> {
		return this.impresos
	}
	
	public set $id(value: number) {
		this.id = value;
	}

	public set $nombre(value: string) {
		this.nombre = value;
	}

	public set $id_usuario(value: number) {
		this.id_usuario = value;
	}

	public set $id_boleto(value: number) {
		this.id_boleto = value;
	}

	public set $fechaCompra(value: Date) {
		this.fechaCompra = value;
	}

	public set $cantidad(value: number) {
		this.cantidad = value
	}

	public set $descuento(value: number) {
		this.descuento = value;
	}

	public set $monto(value: number) {
		this.monto = value;
	}

	public set $status(value: string) {
		this.status = value
	}
}