import { Injectable, NgZone } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Usuario } from '../clases/usuario';
import "rxjs";
import { Observable } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { AngularFireStorage} from 'angularfire2/storage';

@Injectable({
  providedIn: 'root'
})
export class MiHttpService {

  respuestasAFL : AngularFireList<any>;
  respuestasObservable : Observable<any>;
  
  constructor(
    public afAuth : AngularFireAuth,
    public afDB : AngularFireDatabase,
    public router: Router,
    public ngZone: NgZone,
    public afStorage : AngularFireStorage
  ) { }

  logOut()
  {
    return this.afAuth.auth.signOut();
  }

  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['/']);
    })
  }

  logear(email:string, pass:string)
  {
    return new Promise( (resolve , reject) =>
      {
        this.afAuth.auth.signInWithEmailAndPassword(email, pass)
        .then( userData => {resolve(userData);
          if (userData.user.emailVerified !== true) {
            this.SendVerificationMail();
            window.alert('Please validate your email address. Kindly check your inbox.');
          } else {
            this.ngZone.run(() => {
              this.router.navigate(['/']);
            });
          }
        }, err => reject(err));
      }    
    );
  }

  guardarHorario(horario)
  {
    const listadoPeliculas = this.afDB.list("/Horarios");
    listadoPeliculas.push(horario);
  }

  TraerEspecialidades()
  {
    this.respuestasAFL = this.afDB.list("/Especialidades");
    this.respuestasObservable = this.respuestasAFL.valueChanges();
    return this.respuestasObservable;
  }

  TraerUltimaEspecialidad()
  {
    this.respuestasAFL = this.afDB.list("/Especialidades",ref => ref.limitToLast(1));
    this.respuestasObservable = this.respuestasAFL.valueChanges();
    return this.respuestasObservable;
  }

  CargarEspecialidad(id,especialidad)
  {
    const nuevaEspecialidad = this.afDB.list("/Especialidades");
    nuevaEspecialidad.set(id, especialidad);
  }

  cargarTurno(id,turno)
  {
    const nuevoTurno = this.afDB.list("/Turnos");
    nuevoTurno.set(id, turno);
  }

  traerTurnos()
  {
    this.respuestasAFL = this.afDB.list("/Turnos");
    this.respuestasObservable = this.respuestasAFL.valueChanges();
    return this.respuestasObservable;
  }

  traerUltimoTurno()
  {
    this.respuestasAFL = this.afDB.list("/Turnos",ref => ref.limitToLast(1));
    this.respuestasObservable = this.respuestasAFL.valueChanges();
    return this.respuestasObservable;
  }

  traerProfesionales()
  {
    this.respuestasAFL = this.afDB.list("/Profesionales");
    this.respuestasObservable = this.respuestasAFL.valueChanges();
    return this.respuestasObservable;
  }

  traerUltimoProfesional()
  {
    this.respuestasAFL = this.afDB.list("/Profesionales",ref => ref.limitToLast(1));
    this.respuestasObservable = this.respuestasAFL.valueChanges();
    return this.respuestasObservable;
  }

  cargarUsuario(id, usuario, image)
  {
    return new Promise( (resolve , reject) =>
      {
        this.afStorage.upload('prueba/1',image)
        this.afAuth.auth.createUserWithEmailAndPassword(usuario.email,usuario.pass)
        .then( userData => {resolve(userData);this.SendVerificationMail();}, err => reject(err));
        if(usuario.tipo == 1){
          const nuevoTurno = this.afDB.list("/Clientes");
          nuevoTurno.set(id, usuario);
        }
        else{
          const nuevoTurno = this.afDB.list("/Profesionales");
          nuevoTurno.set(id, usuario);
        }
      }    
    );
  }

  traerClientes()
  {
    this.respuestasAFL = this.afDB.list("/Clientes");
    this.respuestasObservable = this.respuestasAFL.valueChanges();
    return this.respuestasObservable;
  }

  /*registrar(usuario : Usuario, image:any)
  {
    return new Promise( (resolve , reject) =>
      {
        this.afStorage.upload('prueba/1',image)
        this.afAuth.auth.createUserWithEmailAndPassword(usuario.email,usuario.pass)
        .then( userData => {resolve(userData);this.SendVerificationMail();}, err => reject(err));
        //this.guardarUsuario(usuario);
      }    
    );
  }*/

  traerUltimoCliente()
  {
    this.respuestasAFL = this.afDB.list("/Clientes",ref => ref.limitToLast(1));
    this.respuestasObservable = this.respuestasAFL.valueChanges();
    return this.respuestasObservable;
  }
}
