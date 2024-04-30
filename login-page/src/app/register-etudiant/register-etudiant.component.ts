import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Etudiant } from '../etudiant';
import { RegisterEtudiantService } from '../register-etudiant.service';

@Component({
  selector: 'app-register-etudiant',
  templateUrl: './register-etudiant.component.html',
  styleUrls: ['./register-etudiant.component.css']
})
export class RegisterEtudiantComponent {
  constructor(private registerEtudiantService:RegisterEtudiantService, private router:Router){}

  etudiant:Etudiant=new Etudiant();

  etudiantRegister() {
    this.registerEtudiantService.etudiantRegister(this.etudiant).subscribe(
      data=>{
        alert("Vous êtes inscrit avec succès !");

        sessionStorage.setItem('etudiantFirstName', JSON.parse(JSON.stringify(data)).firstName);
        sessionStorage.setItem('etudiantSecondName', JSON.parse(JSON.stringify(data)).secondName);
        sessionStorage.setItem('etudiantConfirmed', JSON.parse(JSON.stringify(data)).confirmed);

        this.router.navigate(['']);
        alert("Vérifier votre email !");
      }, error=>alert("Problème lors de l'inscription ! Vérifiez les données entrées.")  );
  }
}
