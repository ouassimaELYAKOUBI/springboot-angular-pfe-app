import { Component } from '@angular/core';
import { ListeSujetsService } from '../liste-sujets.service';
import { Router } from '@angular/router';
import { Sujet } from '../sujet';

@Component({
  selector: 'app-list-sujet-public',
  templateUrl: './list-sujet-public.component.html',
  styleUrls: ['./list-sujet-public.component.css']
})
export class ListSujetPublicComponent {

  sujets: Sujet[];
  
  constructor(private listeSujetsService: ListeSujetsService, private router: Router) { 

      this.listeSujetsService.getSujetsList().subscribe(data => {
        this.sujets = data;

      });    
  }

  

}
