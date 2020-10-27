import { Component, OnInit } from '@angular/core';
import { MiHttpService } from '../../servicios/mi-http.service';

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

  constructor(private miHttp:MiHttpService) { 
    this.dias["Lunes"] = {"Desde":-1,"Hasta":-1};
    this.dias["Martes"] = {"Desde":-1,"Hasta":-1};
    this.dias["Miercoles"] = {"Desde":-1,"Hasta":-1};
    this.dias["Jueves"] = {"Desde":-1,"Hasta":-1};
    this.dias["Viernes"] = {"Desde":-1,"Hasta":-1};
    this.dias["Sabado"] = {"Desde":-1,"Hasta":-1};  
  }


  checkDia(dia:string)
  {
    
  }

  Prueba()
  {
    console.log(this.dias);
    this.dias["Lunes"]["Desde"] = this.lunesDesde;
    this.dias["Lunes"]["Hasta"] = this.lunesHasta;
    this.dias["Martes"]["Desde"] = this.martesDesde;
    this.dias["Martes"]["Hasta"] = this.martesHasta;
    this.dias["Miercoles"]["Desde"] = this.miercolesDesde;
    this.dias["Miercoles"]["Hasta"] = this.miercolesHasta;
    this.dias["Jueves"]["Desde"] = this.juevesDesde;
    this.dias["Jueves"]["Hasta"] = this.juevesHasta;
    this.dias["Viernes"]["Desde"] = this.viernesDesde;
    this.dias["Viernes"]["Hasta"] = this.viernesHasta;
    this.dias["Sabado"]["Desde"] = this.sabadoDesde;
    this.dias["Sabado"]["Hasta"] = this.sabadoHasta;
    
    this.miHttp.guardarHorario(this.dias);
  }

  ngOnInit(): void {
  }

}
