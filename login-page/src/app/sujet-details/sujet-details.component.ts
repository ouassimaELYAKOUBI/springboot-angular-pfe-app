import { Component, Input, OnInit } from '@angular/core';
import { ListeSujetsService } from '../liste-sujets.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Sujet } from '../sujet';
import { Etudiant } from '../etudiant';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sujet-details',
  templateUrl: './sujet-details.component.html',
  styleUrls: ['./sujet-details.component.css']
})
export class SujetDetailsComponent implements OnInit{

  idSujet: number;
  sujet: Sujet;
  public sessionStorage = sessionStorage;
  group:String[];
  public isGroupEmpty:boolean = false;
  public pfeConfirmed:Array<boolean> = new Array<boolean>();
  googleDrive:String[];
  rdvDemand:Boolean[];
  rdvConfirm:Boolean[];
  datePicker:string|null;
  dateRDV:string[];

  pfeEnd:Boolean[];

  pfeRemarques:Array<String> = new Array<String>();
  pfeNote:Array<String> = new Array<String>();
  pfeDateSoutenance:Array<String> = new Array<String>();
  pfeValidate:Array<boolean> = new Array<boolean>();

  constructor(private route: ActivatedRoute, private listeSujetsService: ListeSujetsService) { 
  }

  ngOnInit(): void {
    this.idSujet = this.route.snapshot.params['idSujet'];

    this.sujet = new Sujet();
    this.listeSujetsService.getSujetById(this.idSujet).subscribe( data => {
      this.sujet = data;
    });

    this.route.queryParamMap.subscribe((queryParams) => {
      const serializedFilters = queryParams.get('filters');
			this.group = JSON.parse(decodeURIComponent(serializedFilters as string));
    });
    
    if(this.group.length == 0)
      this.isGroupEmpty = true;
    else
    {

      for(let i = 0;  i < this.group.length; i++) {
        this.listeSujetsService.getIsPfeConfirmed2(this.split(this.group[i])[0]).subscribe(data => {
          this.pfeConfirmed.push(data as boolean);
        }, error=>{
          alert("Erreur inconnue !");
        });
      }

      this.listeSujetsService.getGoogleDrive2(this.group).subscribe(data=>{
        this.googleDrive = data as String[];
      }, error => {
            alert("Erreur inconnue !");
      });

      this.listeSujetsService.getGroupRDV(this.group).subscribe(data=>{
        this.rdvDemand = data as Boolean[];
      }, error => {
            alert("Erreur inconnue !");
      });

      this.listeSujetsService.getDateRDV(this.group).subscribe(data=>{
        this.dateRDV = data as string[];
      }, error => {
            alert("Erreur inconnue !");
      });

      this.listeSujetsService.getIsConfirmedRDV(this.group).subscribe(data => {
        this.rdvConfirm = data as Boolean[];
      }, error=>{
        alert("Erreur inconnue !");
      });

      this.listeSujetsService.getTerminerPfeforAll(this.group).subscribe(data => {
        this.pfeEnd = data as Boolean[];
      }, error=>{
        alert("Erreur inconnue !");
      });

      this.listeSujetsService.getValidatePFE(this.group).subscribe(data => {

        for(let i = 0;  i < this.group.length; i++) {
            this.pfeRemarques.push(JSON.parse(JSON.stringify(data))[i].remarques);
            this.pfeNote.push(JSON.parse(JSON.stringify(data))[i].note);
            this.pfeDateSoutenance.push(JSON.parse(JSON.stringify(data))[i].dateSoutenance.split("T")[0]);
            this.pfeValidate.push(JSON.parse(JSON.stringify(data))[i].validate);
        }
        
      }, error => {
        alert("Erreur inconnue !");
      });
      
    }
  }

  public clear() {
    sessionStorage.clear();
  }

  public split(text:String){
    return text.split("<br>");
  }

  public acceptGroup(groupIndex:number) {
    this.listeSujetsService.acceptGroup(this.idSujet, this.group[groupIndex]).subscribe(
      data=>{
        alert("La postulation pour ce groupe a été accepté.");
      }, error => {
          alert("Erreur inconnu !");
      }
  );
  }

  public validRDV(etudiantGroup:String, groupIndex:number) {
    this.listeSujetsService.validateRDV(etudiantGroup, this.dateRDV[groupIndex]).subscribe(
      data=>{
        
      }, error => {
          alert("Erreur inconnu !");
      }
  );
  }

  public validatePFE(etudiantGroup:String, i:number) {
    if (this.pfeRemarques[i] != undefined && this.pfeNote[i] != undefined && this.pfeDateSoutenance[i] != undefined) {
      this.listeSujetsService.validatePFE(etudiantGroup, this.pfeRemarques[i], this.pfeNote[i], this.pfeDateSoutenance[i]).subscribe(
        data=>{
          
        }, error => {
          alert(error.message + "Erreur inconnu !");
        }
      );
    }
    else
    {
      alert("Veuillez remplir les champs obligatoires !");
    }
    
  }

}
