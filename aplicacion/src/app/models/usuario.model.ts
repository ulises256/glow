import { UsuarioService } from "../services/usuario.service";
import { Carrera } from "./carrera.model";
import { Orden } from "./orden.model";
import { OrdenService } from "../services";

export class Usuario {
    private id: number;
    private nombre: string;
    private apellidos: string;
    private correo: string
    private edad: number;
    private tipo: string;
    private sexo: string;
    private ciudad: string;
    private entero: string;
    private gustos: string;
    private id_open: number;
    private foto;
    // private carreras: Carrera[];
    private ordenes: Orden[];

    constructor(arg, $foto?){
        this.id = arg.id;
        this.nombre = arg.nombre;
        this.apellidos = arg.apellidos;
        this.correo = arg.correo;
        this.edad = arg.edad;
        this.tipo = arg.tipo;
        this.sexo = arg.sexo;
        this.ciudad = arg.ciudad;
        this.entero = arg.entero;
        this.gustos = arg.gustos;
        this.id_open = arg.id_open;
        $foto ? this.foto = $foto : UsuarioService.obtenerFoto(this.id).then(responde =>{
            responde && responde.data? this.foto = responde.data.fb_avatar : null;
        }) ;

        // UsuarioService.obtenerCarreras(this.id)
        //     .then(res => res && res.data ? res.data.map(n=> this.carreras.push(new Carrera(n))): null)
        
    }

    public actualizarDatos() {
        UsuarioService.actualizarUsuario(this);
    }

/*     public getCarreras(): Carrera[] {
        return this.carreras;
    }

    public setCarrera(value: Carrera) {
        UsuarioService.unirCarrera(this.id, value)
            .then(res => res && res.data ? this.carreras.push(new Carrera(res.data)): null)
    } */

    public getId(): number {
        return this.id;
    }

    public setId(value: number) {
        this.id = value;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public setNombre(value: string) {
        this.nombre = value;
    }
    public getApellidos(): string {
        return this.apellidos;
    }

    public setApellidos(value: string) {
        this.apellidos = value;
    }
    public getCorreo(): string {
        return this.correo;
    }

    public setCorreo(value: string) {
        this.correo = value;
    }
    public getEdad(): number {
        return this.edad;
    }

    public setEdad(value: number) {
        this.edad = value;
    }
    public getTipo(): string {
        return this.tipo;
    }

    public setTipo(value: string) {
        this.tipo = value;
    }

    public getSexo() {
        return this.sexo;
    }

    public setSexo(value) {
        this.sexo = value;
    }

    public getFoto() {
        return this.foto;
    }

    public setFoto(value) {
        this.foto = value;
    }

    public getCiudad(): string {
        return this.ciudad;
    }

    public setCiudad(value: string) {
        this.ciudad = value;
    }
    
    public getEntero(): string {
        return this.entero;
    }

    public setEntero(value: string) {
        this.entero = value;
    }
    
    public getGustos(): string {
        return this.gustos;
    }

    public setGustos(value: string) {
        this.gustos = value;
    }

    public getOrdenes() {
        return UsuarioService.obtenerOrdenes(this.id).then(r => r && r.data ? this.ordenes =  r.data.map(orden => new Orden(orden)) : []);
    }
}
