
export class Imagen {
    private id: number;
	public imagen: any;
	private tipo: string;
	constructor($id: number, $imagen: any, $tipo: string){
		this.id = $id;
		this.imagen = $imagen;
		this.tipo = $tipo;
	}

	public getId(): number {
		return this.id;
	}

	public getImagen(): any {
		return this.imagen;
	}
	public getTipo(): string {
		return this.tipo;
	}

	public setId(value: number) {
		this.id = value;
	}

	public setImagen(value: any) {
		this.imagen = value;
	}

	public setTipo(value: string) {
		this.tipo = value;
	}

}