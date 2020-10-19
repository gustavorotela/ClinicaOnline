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

  registrar(usuario : Usuario, image:any)
  {
    return new Promise( (resolve , reject) =>
      {
        this.afStorage.upload('prueba/1',image)
        this.afAuth.auth.createUserWithEmailAndPassword(usuario.email,usuario.pass)
        .then( userData => {resolve(userData);this.SendVerificationMail();}, err => reject(err));
        this.guardarUsuario(usuario);
      }    
    );
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

  guardarUsuario(usuario)
  {
    const resultadosUsuarios = this.afDB.list("/usuarios");
    resultadosUsuarios.push(usuario);
  }

  /*SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['<!-- enter your route name here -->']);
    })
  }

  // Sign up with email/password
  SignUp(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail(); // Sending email verification notification, when new user registers
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user.emailVerified !== true) {
          this.SendVerificationMail();
          window.alert('Please validate your email address. Kindly check your inbox.');
        } else {
          this.ngZone.run(() => {
            this.router.navigate(['<!-- enter your route name here -->']);
          });
        }
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }*/
}
