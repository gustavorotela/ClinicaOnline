import { Component, OnInit } from '@angular/core';
import { MiHttpService } from '../../servicios/mi-http.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { Usuario } from 'src/app/clases/usuario';
import { Profesional } from 'src/app/clases/profesional';

@Component({
  selector: 'app-profesional',
  templateUrl: './profesional.component.html',
  styleUrls: ['./profesional.component.scss']
})
export class ProfesionalComponent implements OnInit {

  dias:string[][]=[];
  lunesDesde:number;
  martesDesde:number;
  miercolesDesde:number;
  juevesDesde:number;
  viernesDesde:number;
  sabadoDesde:number;
  lunesHasta:number;
  martesHasta:number;
  miercolesHasta:number;
  juevesHasta:number;
  viernesHasta:number;
  sabadoHasta:number;
  listaEspecialidades:string[];
  profesionalEspecialidades:string[] = [];
  email:any;
  usuario:Profesional;
  id:number;

  constructor(private miHttp:MiHttpService, public afAuth : AngularFireAuth) { 
  }

  checkEspecialidad(especialidad:string)
  {
    if(this.profesionalEspecialidades.indexOf(especialidad) < 0)
    {
      this.profesionalEspecialidades.push(especialidad);
      const index: number = this.listaEspecialidades.indexOf(especialidad);
      this.listaEspecialidades.splice(index, 1);
    }
    else
    {
      this.listaEspecialidades.push(especialidad);
      const index: number = this.profesionalEspecialidades.indexOf(especialidad);
      this.profesionalEspecialidades.splice(index, 1);
    }
    this.listaEspecialidades.sort();
    this.profesionalEspecialidades.sort();
  }

  checkDia(dia)
  {
    console.log(this.usuario);
  }

  Prueba()
  {
    this.usuario.especialidades = this.profesionalEspecialidades;
    if(this.usuario.lunes == true)
      this.usuario.lunes = this.lunesDesde + ' ' + this.lunesHasta;
    if(this.usuario.martes == true)
      this.usuario.martes = this.martesDesde + ' ' + this.martesHasta;
    if(this.usuario.miercoles == true)
      this.usuario.miercoles = this.miercolesDesde + ' ' + this.miercolesHasta;
    if(this.usuario.jueves == true)
      this.usuario.jueves = this.juevesDesde + ' ' + this.juevesHasta;
    if(this.usuario.viernes == true)
      this.usuario.viernes = this.viernesDesde + ' ' + this.viernesHasta;
    if(this.usuario.sabado == true)
      this.usuario.sabado = this.sabadoDesde + ' ' + this.sabadoHasta;

    this.miHttp.modificarProfesional(this.id.toString(),this.usuario);
  }

  ngOnInit(): void {
    this.miHttp.TraerEspecialidades().subscribe( data => {
      this.listaEspecialidades = data;
    });
    this.afAuth.auth.onAuthStateChanged(user =>{
      if (user) {
        this.email = user.email;
      } else {
        console.log('nada');
      }
    });
    this.miHttp.traerProfesionales().subscribe( profesionales => {
      for (let i = 0; i < profesionales.length; i++) {
        if(this.email == profesionales[i].email){
          this.usuario = profesionales[i];
          this.id = i;
          this.id++;
          if(this.usuario.lunes != false)
          {
            let lunes = this.usuario.lunes.split(" ");
            this.lunesDesde = lunes[0];
            this.lunesHasta = lunes[1];
          }
          if(this.usuario.martes != false)
          {
            let martes = this.usuario.martes.split(" ");
            this.martesDesde = martes[0];
            this.martesHasta = martes[1];
          }
          if(this.usuario.miercoles != false)
          {
            let miercoles = this.usuario.miercoles.split(" ");
            this.miercolesDesde = miercoles[0];
            this.miercolesHasta = miercoles[1];
          }
          if(this.usuario.jueves != false)
          {
            let jueves = this.usuario.jueves.split(" ");
            this.juevesDesde = jueves[0];
            this.juevesHasta = jueves[1];
          }
          if(this.usuario.viernes != false)
          {
            let viernes = this.usuario.viernes.split(" ");
            this.viernesDesde = viernes[0];
            this.viernesHasta = viernes[1];
          }
          if(this.usuario.sabado != false)
          {
            let sabado = this.usuario.sabado.split(" ");
            this.sabadoDesde = sabado[0];
            this.sabadoHasta = sabado[1];
          }
          break;
        }
      }
      for (let i = 0; i < this.usuario.especialidades.length; i++) {
        this.checkEspecialidad(this.usuario.especialidades[i]);
      }
    });
  }

}
