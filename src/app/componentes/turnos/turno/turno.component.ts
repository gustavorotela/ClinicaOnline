import { Component, OnInit } from '@angular/core';
import { MiHttpService } from '../../../servicios/mi-http.service';

@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.scss']
})
export class TurnoComponent implements OnInit {

  constructor(private miHttp:MiHttpService) { }

  ngOnInit(): void {
  }

}
