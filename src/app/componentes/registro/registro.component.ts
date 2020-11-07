import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { MiHttpService } from 'src/app/servicios/mi-http.service';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  display: boolean = false;
  usuario : Usuario;
  pass2 : string;
  pass : string;
  errorMsg : string = "";
  imagen : any;
  id:number;
  
  public files: NgxFileDropEntry[] = [];
  public msgs : any = [];
  public imagenPreview : any[] = [];

  constructor(public miHttp : MiHttpService,private router : Router) {
    this.usuario = new Usuario('','','','',0,'','');
  }

  Registrar()
  {
    if(this.usuario.email == null || this.pass == null || this.pass2 == null)
    {
      this.error("Complete todos los campos !!!");

    }
    else
    {
      if(this.pass != this.pass2)
      {
        this.error("Las contraseñas no coinciden");
      }
      else
      {
        this.usuario.pass = this.pass;
        this.miHttp.cargarUsuario(this.id.toString(), this.usuario,this.imagen).then((res)=>{console.log("Bien"),console.log(res);
        this.router.navigate(['/Menu']);

        })
          .catch((err) => {
            console.log(err);
            if(err.code == "auth/invalid-email")
            {
              this.error("El email ingresado no tiene un formato valido");
            }
            else
            {
              if(err.code ==  "auth/weak-password")
              {
                this.error("La contraseña debe ser de al menos 6 caracteres");
              }
              else
              {
                if(err.code == "auth/email-already-in-use")
                {
                  this.error("El email ya esta en uso");
                }
                else
                {
                this.error("Error de conexion con el servidor");
                }
              }
            }
          });
      }
    }
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        const reader = new FileReader();
        fileEntry.file((file: File) => {
          reader.readAsDataURL(file);
          reader.onload = () => {
            this.imagenPreview.push(reader.result);
          }
          this.imagen = file;
          //console.log(this.imagen);
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }

  public fileOver(event){
  }
 
  public fileLeave(event){
  }

  error(Msg : string)
  {
    this.errorMsg = Msg;
    this.showDialog();
  }

  showDialog() {
    this.display = true;
  }

  ngOnInit() {
    this.miHttp.traerUltimoProfesional().subscribe( data => {
      if(data == "")
      {
        this.id = 1;
        console.log(this.id);
      }
      else
      {
        this.id = data[0].id;
        this.id++;
        console.log(this.id);
      }
    });
    
  }
}
