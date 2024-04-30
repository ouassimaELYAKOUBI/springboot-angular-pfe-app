import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspaceEncadrantComponent } from './espace-encadrant/espace-encadrant.component';
import { EspaceEtudiantComponent } from './espace-etudiant/espace-etudiant.component';
import { HomeComponent } from './home/home.component';
import { LoginEncadrantComponent } from './login-encadrant/login-encadrant.component';
import { LoginEtudiantComponent } from './login-etudiant/login-etudiant.component';
import { RegisterEncadrantComponent } from './register-encadrant/register-encadrant.component';
import { RegisterEtudiantComponent } from './register-etudiant/register-etudiant.component';
import {ListeSujetsComponent} from './liste-sujets/liste-sujets.component';
import { ListeSujetsEComponent } from './liste-sujets-e/liste-sujets-e.component';
import { SujetDetailsComponent } from './sujet-details/sujet-details.component';
import { UpdateSujetComponent } from './update-sujet/update-sujet.component';
import { CreateSujetComponent } from './create-sujet/create-sujet.component';
import { ViewGroupSujetComponent } from './view-group-sujet/view-group-sujet.component';
import { ListSujetPublicComponent } from './list-sujet-public/list-sujet-public.component';
const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'login-encadrant', component:LoginEncadrantComponent},
  {path:'login-etudiant', component:LoginEtudiantComponent},
  {path:'register-encadrant', component:RegisterEncadrantComponent},
  {path:'register-etudiant', component:RegisterEtudiantComponent},
  {path:'espace-encadrant', component:EspaceEncadrantComponent},
  {path:'espace-etudiant', component:EspaceEtudiantComponent},
  {path:'espace-etudiant/liste-sujets', component:ListeSujetsComponent},
  {path: 'espace-encadrant/liste-sujets-e', component:ListeSujetsEComponent},
  {path: 'espace-encadrant/liste-sujets-e/update-sujet/:idSujet', component:UpdateSujetComponent},
  {path: 'espace-encadrant/liste-sujets-e/create-sujet' , component:CreateSujetComponent},
  {path: 'espace-encadrant/liste-sujets-e/sujet-details/:idSujet', component:SujetDetailsComponent},
  {path: 'encadrant-deconnect', redirectTo: '', pathMatch: 'full'},
  {path: 'etudiant-deconnect', redirectTo: '', pathMatch: 'full'},
  {path:'list-sujet-public', component:ListSujetPublicComponent},
  {path: 'espace-etudiant/view-group', component:ViewGroupSujetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
