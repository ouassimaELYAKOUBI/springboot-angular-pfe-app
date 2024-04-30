import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sujet } from '../sujet';
import { ListeSujetsService } from '../liste-sujets.service';

@Component({
  selector: 'app-update-sujet',
  templateUrl: './update-sujet.component.html',
  styleUrls: ['./update-sujet.component.css']
})
export class UpdateSujetComponent implements OnInit {
  idSujet: number;
  sujet: Sujet = new Sujet();
  constructor(private listeSujetsService: ListeSujetsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.idSujet = this.route.snapshot.params['idSujet'];

    this.listeSujetsService.getSujetById(this.idSujet).subscribe(data => {
      this.sujet = data;
    }, error => console.log(error));
  }

  onSubmit(){
    this.listeSujetsService.updateSujet(this.idSujet, this.sujet).subscribe( data =>{
      this.goToSujetList();
    }
    , error => console.log(error));
  }

  goToSujetList(){
    this.router.navigate(['/espace-encadrant/liste-sujets-e']);
  }
}
