import { Component, OnInit } from '@angular/core';
import { ListeSujetsService } from '../liste-sujets.service';
import { Sujet } from '../sujet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-sujet',
  templateUrl: './create-sujet.component.html',
  styleUrls: ['./create-sujet.component.css']
})
export class CreateSujetComponent  implements OnInit {
  sujet: Sujet = new Sujet();
  public sessionStorage = sessionStorage;

  constructor(private listeSujetsService: ListeSujetsService,
    private router: Router) { 
      this.sujet.encadrant = this.sessionStorage.getItem('encadrantFirstName') + ' ' + this.sessionStorage.getItem('encadrantSecondName') ;
    }

  ngOnInit(): void {
  }

  saveSujet(){
    this.listeSujetsService.createSujet(this.sujet).subscribe( data =>{
      console.log(data);
      this.goToSujetList();
    },
    error => console.log(error));
  }

  goToSujetList(){
    this.router.navigate(['/espace-encadrant/liste-sujets-e']);
  }
  
  onSubmit(){
    console.log(this.sujet);
    this.saveSujet();
  }
}
