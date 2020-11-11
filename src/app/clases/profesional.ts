import { analytics } from 'firebase';
import { HorarioProfesional } from './horario-profesional';

export class Profesional{
    email:string;
    nombre:string;
    apellido:string;
    pass:string;
    tipo:number;
    usuario:string;
    imagen:any;
    especialidades:string[];
    lunes:any;
    martes:any;
    miercoles:any;
    jueves:any;
    viernes:any;
    sabado:any;

    constructor(mail:string, nombre:string, apellido:string, pass:string, tipo:number, usuario:string, imagen:any, especialidad:string[], lunes, martes, miercoles, jueves, viernes, sabado)
    {
        this.email = mail;
        this.nombre = nombre;
        this.apellido = apellido;
        this.pass = pass;
        this.tipo = tipo;
        this.usuario = usuario;
        this.imagen = imagen;
        this.especialidades = especialidad;
        this.lunes = lunes;
        this.martes = martes;
        this.miercoles = miercoles;
        this.jueves = jueves;
        this.viernes = viernes;
        this.sabado = sabado;
    }
}
