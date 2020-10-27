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

  constructor(private miHttp:MiHttpService) {
    this.nuevoTurno = new Turno();
    this.listaEspecialidades =  [];
  }

  guardarTurno()
  {
    this.miHttp.cargarTurno(this.id,this.nuevoTurno);
  }

  checkFecha(){

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
  }

}
