import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginEncadrantComponent } from './login-encadrant/login-encadrant.component';
import { LoginEtudiantComponent } from './login-etudiant/login-etudiant.component';
import { RegisterEncadrantComponent } from './register-encadrant/register-encadrant.component';
import { RegisterEtudiantComponent } from './register-etudiant/register-etudiant.component';
import { EspaceEncadrantComponent } from './espace-encadrant/espace-encadrant.component';
import { EspaceEtudiantComponent } from './espace-etudiant/espace-etudiant.component';
import { ListeSujetsComponent } from './liste-sujets/liste-sujets.component';
import { SujetDetailsComponent } from './sujet-details/sujet-details.component';
import { CreateSujetComponent } from './create-sujet/create-sujet.component';
import { UpdateSujetComponent } from './update-sujet/update-sujet.component';
import { ListeSujetsEComponent } from './liste-sujets-e/liste-sujets-e.component';
import { ViewGroupSujetComponent } from './view-group-sujet/view-group-sujet.component';
import { ListSujetPublicComponent } from './list-sujet-public/list-sujet-public.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginEncadrantComponent,
    LoginEtudiantComponent,
    RegisterEncadrantComponent,
    RegisterEtudiantComponent,
    EspaceEncadrantComponent,
    EspaceEtudiantComponent,
    ListeSujetsComponent,
    SujetDetailsComponent,
    CreateSujetComponent,
    UpdateSujetComponent,
    ListeSujetsEComponent,
    ViewGroupSujetComponent,
    ListSujetPublicComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
