import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Etudiant } from '../etudiant';
import { LoginEtudiantServiceService } from '../login-etudiant-service.service';

@Component({
  selector: 'app-login-etudiant',
  templateUrl: './login-etudiant.component.html',
  styleUrls: ['./login-etudiant.component.css']
})
export class LoginEtudiantComponent {
  constructor(private loginEtudiantService:LoginEtudiantServiceService, private router:Router){}

  etudiant:Etudiant=new Etudiant();

  etudiantLogin() {
    this.loginEtudiantService.etudiantLogin(this.etudiant).subscribe(
      data=>{
        alert("Vous êtes connecté ! Bienvenue.");
       
        sessionStorage.setItem('etudiantFirstName', JSON.parse(JSON.stringify(data)).firstName);
        sessionStorage.setItem('etudiantSecondName', JSON.parse(JSON.stringify(data)).secondName);
        sessionStorage.setItem('etudiantConfirmed', JSON.parse(JSON.stringify(data)).confirmed);
        sessionStorage.setItem('etudiantGroupName', JSON.parse(JSON.stringify(data)).groupEtudiant);
        
        this.router.navigate(['/espace-etudiant']);
      }, error=>alert("Problème lors de la connexion ! Vérifiez les données entrées.")  );
  }

  
}
