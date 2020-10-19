import { StringLiteral } from 'typescript';

export class Usuario {
    email:string;
    nombre:string;
    apellido:string;
    pass:string;
    tipo:number;
    usuario:string;
    imagen:any;
    
    constructor(mail:string, nombre:string, apellido:string, pass:string, tipo:number, usuario:string, imagen:any)
    {
        this.email = mail;
        this.nombre = nombre;
        this.apellido = apellido;
        this.pass = pass;
        this.tipo = tipo;
        this.usuario = usuario;
        this.imagen = imagen;
    }
}
