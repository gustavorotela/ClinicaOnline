import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/clases/turno';
import { MiHttpService } from 'src/app/servicios/mi-http.service';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.scss']
})
export class AltaComponent implements OnInit {

  fechasDisponibles:Date [] = [];
  nuevoTurno:Turno;
  id:number=0;
  listaEspecialidades:string[];
  espec:string;
  today:Date;
  fechaMaxima:Date;
  minimo:string;
  maximo:string;
  mes:number;
  listadoTurnos;
  listaProfesionales;
  listaMedicosElegidos:any[];
  medico:number;
  listaHorarios:string[];

  constructor(private miHttp:MiHttpService) {
    this.nuevoTurno = new Turno();
    this.listaEspecialidades =  [];
    this.today = new Date();
    this.fechaMaxima = new Date();

    this.mes = this.today.getMonth() + 1;
    this.minimo = this.today.getFullYear().toString() + '-' + this.mes.toString() + "-" + this.today.getDate().toString();

    this.fechaMaxima.setDate(this.today.getDate() + 15);
    this.mes = this.fechaMaxima.getMonth() + 1;
    this.maximo = this.fechaMaxima.getFullYear().toString() + '-' + this.mes.toString() + "-" + this.fechaMaxima.getDate().toString();
  }

  guardarTurno()
  {
    this.miHttp.cargarTurno(this.id,this.nuevoTurno);
  }

  checkFecha(){
    let hoy = new Date(this.minimo);
    let fechaLejana = new Date(this.maximo);
    let ahora = hoy.getTime();
    let ultima = fechaLejana.getTime();
    let hola = this.parseDate(this.nuevoTurno.fecha);
    let turnoElegido = hola.getTime();

    if(turnoElegido > ahora && turnoElegido < ultima)
    {
      console.log('turno perfecto');
    }
    else
      console.log("error, el turno no está dentro de los próximos 15 días");
  }

  traerMedicos()
  {
    this.listaMedicosElegidos = [];
    for (let i = 0; i < this.listaProfesionales.length; i++) {
      if(this.listaProfesionales.Especialidad == this.espec)
        this.listaMedicosElegidos.push(this.listaProfesionales);
    }
  }

  horarios()
  {
    let desde="8";
    let hasta="18";
    let hora;

    /*for (let i = 0; i < this.listaMedicosElegidos.length; i++) {
      if(this.listaMedicosElegidos[i].id == this.medico)
      {
        desde = this.listaMedicosElegidos[i].desde;
        hasta = this.listaMedicosElegidos[i].hasta;
      }
    }*/

    this.listaHorarios = [];
    

    for (let i = Number(desde); i < Number(hasta); i++) {
      hora = i + ":00";
      this.listaHorarios.push(hora);
      hora = i + ":30";
      this.listaHorarios.push(hora);
    }
  }

  ngOnInit(): void {
    this.miHttp.traerUltimoTurno().subscribe( data => {
      if(data == "")
        this.id = 1
      else
      {
        this.id = data[0].id;
        this.id++;
      }
    });
    this.miHttp.TraerEspecialidades().subscribe( data => {
      this.listaEspecialidades = data;
    });
    this.miHttp.traerTurnos().subscribe( data => {
      this.listadoTurnos = data;
    });
    this.miHttp.traerProfesionales().subscribe( data => {
      this.listaProfesionales = data;
    });
  }

  parseDate(input) {
    var parts = input.match(/(\d+)/g);
    return new Date(parts[0], parts[1]-1, parts[2]);
  }
}
