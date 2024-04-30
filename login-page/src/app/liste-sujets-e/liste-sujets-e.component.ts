import { Component, OnInit } from '@angular/core';
import { ListeSujetsService } from '../liste-sujets.service';
import { Sujet } from '../sujet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-sujets-e',
  templateUrl: './liste-sujets-e.component.html',
  styleUrls: ['./liste-sujets-e.component.css']
})
export class ListeSujetsEComponent implements OnInit{
  sujets: Sujet[];
  public sessionStorage = sessionStorage;
  public encadrantName:String;

  constructor(private listeSujetsService: ListeSujetsService,
    private router: Router) { 
      this.encadrantName = sessionStorage.getItem('encadrantFirstName') + ' ' + sessionStorage.getItem('encadrantSecondName');
    }

  ngOnInit(): void {
    this.getSujets();
  }

  public clear() {
    sessionStorage.clear();
  }

  private getSujets(){
    this.listeSujetsService.getSujetsList1().subscribe(data => {
      this.sujets = data;
    });
  }
  sujetDetails(idSujet: number){
    
    this.listeSujetsService.viewGroup(idSujet).subscribe(
      data=>{
        this.router.navigate(['espace-encadrant/liste-sujets-e/sujet-details/' + idSujet], {queryParams: {filters: encodeURIComponent(JSON.stringify(data))}});
      }, error => {
          alert("Erreur lors de l'affichage des groupes ayant postulés pour ce sujet !");
      }
  );
  }

  updateSujet(idSujet: number){
    this.router.navigate(['espace-encadrant/liste-sujets-e/update-sujet', idSujet]);
  }
  createSujet(){
    this.router.navigate(['espace-encadrant/liste-sujets-e/create-sujet']);
  }

  deleteSujet(idSujet: number){
    this.listeSujetsService.deleteSujet(idSujet).subscribe( data => {
      this.getSujets();
    })
  }

}
