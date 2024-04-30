import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Encadrant } from '../encadrant';
import { RegisterEncadrantService } from '../register-encadrant.service';

@Component({
  selector: 'app-register-encadrant',
  templateUrl: './register-encadrant.component.html',
  styleUrls: ['./register-encadrant.component.css']
})
export class RegisterEncadrantComponent {

  constructor(private registerEncadrantService:RegisterEncadrantService, private router:Router){}

  encadrant:Encadrant=new Encadrant();

  encadrantRegister() {
    this.registerEncadrantService.encadrantRegister(this.encadrant).subscribe(
      data=>{
        alert("Vous êtes inscrit avec succès !");

        sessionStorage.setItem('encadrantFirstName', JSON.parse(JSON.stringify(data)).firstName);
        sessionStorage.setItem('encadrantSecondName', JSON.parse(JSON.stringify(data)).secondName);
        sessionStorage.setItem('encadrantConfirmed', JSON.parse(JSON.stringify(data)).confirmed);

        this.router.navigate(['']);
      }, error=>alert("Problème lors de l'inscription ! Vérifiez les données entrées.")  );
  }
}
