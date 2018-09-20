export class Municipio {
    private id: number;
    private municipio: string;


	constructor(arg) {
		this.id = arg.id;
		this.municipio = arg.municipio;
	}


    /**
     * Getter $id
     * @return {number}
     */
	public get $id(): number {
		return this.id;
	}

    /**
     * Getter $municipio
     * @return {string}
     */
	public get $municipio(): string {
		return this.municipio;
	}

    /**
     * Setter $id
     * @param {number} value
     */
	public set $id(value: number) {
		this.id = value;
	}

    /**
     * Setter $municipio
     * @param {string} value
     */
	public set $municipio(value: string) {
		this.municipio = value;
	}

}   