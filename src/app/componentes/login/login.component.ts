import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Subscription} from "rxjs";
import { MiHttpService } from 'src/app/servicios/mi-http.service';
import { Usuario } from "../../clases/usuario";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private subscription: Subscription;
  clave= '';
  progreso: number;
  progresoMensaje="esperando..."; 
  logeando=true;
  ProgresoDeAncho:string;
  email : string;
  pass : string;
  display: boolean = false;
  usuario : Usuario;
  errorMsg : string = "";

  clase="progress-bar progress-bar-info progress-bar-striped ";

  constructor(public auth : MiHttpService,
    private route: ActivatedRoute,
    private router: Router) {
      this.progreso=0;
      this.ProgresoDeAncho="0%";

  }

  ngOnInit() {
  }

  Entrar() {
    if(this.email == null || this.pass == null)
    {
        this.error("Complete todos los campos");
    }
    else
    {
      this.auth.logear(this.email,this.pass)
      .then((res) => {console.log('logeado');
      //this.router.navigate(['/Principal']);
        })
      .catch((err) => {
        this.error(err.message)
      })
    }
  }

  Rapido()
  {
    this.email = "gusrot2@gmail.com";
    this.pass = "38467819";
  }
  error(Msg : string)
  {
    this.errorMsg = Msg;
    this.showDialog();
  } 

  showDialog() {
    this.display = true;
  }

}
