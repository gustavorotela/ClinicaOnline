import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';

import { AngularFireDatabase } from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { AngularFireStorage } from 'angularfire2/storage';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { VisualesModule } from './modulos/visuales/visuales.module';
import { RegistroComponent } from './componentes/registro/registro.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { AltaComponent } from './componentes/turnos/alta/alta.component';
import { ModificacionComponent } from './componentes/turnos/modificacion/modificacion.component';
import { BajaComponent } from './componentes/turnos/baja/baja.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { TurnoComponent } from './componentes/turnos/turno/turno.component';
import { ProfesionalComponent } from './componentes/profesional/profesional.component';

const config = {
  apiKey: "AIzaSyAwnftqjnkgSl4_5LcoaAkU4mXryU5ORsQ",
  authDomain: "clinica-online-d81e0.firebaseapp.com",
  databaseURL: "https://clinica-online-d81e0.firebaseio.com",
  projectId: "clinica-online-d81e0",
  storageBucket: "clinica-online-d81e0.appspot.com",
  messagingSenderId: "833612795720",
  appId: "1:833612795720:web:4fdef7a3814709d1fc2d7d"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    PrincipalComponent,
    AltaComponent,
    ModificacionComponent,
    BajaComponent,
    MenuComponent,
    TurnoComponent,
    ProfesionalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(config),
    NgbModule,
    VisualesModule,
    FormsModule
  ],
  providers: [AngularFireDatabase,AngularFireStorage],
  bootstrap: [AppComponent]
})
export class AppModule { }
