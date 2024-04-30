import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Encadrant } from '../encadrant';
import { LoginEncadrantServiceService } from '../login-encadrant-service.service';
import { Etudiant } from '../etudiant';

@Component({
  selector: 'app-login-encadrant',
  templateUrl: './login-encadrant.component.html',
  styleUrls: ['./login-encadrant.component.css']
})
export class LoginEncadrantComponent {

  constructor(private loginEncadrantService:LoginEncadrantServiceService, private router:Router){}

  encadrant:Encadrant=new Encadrant();
  

  encadrantLogin() {
    this.loginEncadrantService.encadrantLogin(this.encadrant).subscribe(
      data=>{
        alert("Vous êtes connecté ! Bienvenue.");
        
        sessionStorage.setItem('encadrantFirstName', JSON.parse(JSON.stringify(data)).firstName);
        sessionStorage.setItem('encadrantSecondName', JSON.parse(JSON.stringify(data)).secondName);
        sessionStorage.setItem('encadrantConfirmed', JSON.parse(JSON.stringify(data)).confirmed);

        this.router.navigate(['/espace-encadrant']);
      }, error=>alert("Problème lors de la connexion ! Vérifiez les données entrées.")  );
  }
}
