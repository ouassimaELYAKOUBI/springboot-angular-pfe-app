import { Component, OnInit } from '@angular/core';
import { ListeSujetsService } from '../liste-sujets.service';
import { Sujet } from '../sujet';
import { Router } from '@angular/router';
import { Etudiant } from '../etudiant';

@Component({
  selector: 'app-liste-sujets',
  templateUrl: './liste-sujets.component.html',
  styleUrls: ['./liste-sujets.component.css']
})
export class ListeSujetsComponent implements OnInit{

  sujets: Sujet[];
  public sessionStorage = sessionStorage;
  public pfeConfirmed:boolean;
  public idSujet:number;
  googleDrive:String;
  rdvConfirmed:boolean;
  dateRdv:string;

  pfeEnd:boolean;
  pfeRemarques:String;
  pfeNote:String;
  pfeDateSoutenance:String;
  pfeValidate:boolean;

  constructor(private listeSujetsService: ListeSujetsService,
    private router: Router) { 
      this.getPfeConfirmed();
    }

  ngOnInit(): void {
    this.getSujets();
    
  }

  public clear() {
    sessionStorage.clear();
  }
  
  private getSujets(){
    this.listeSujetsService.getSujetsList().subscribe(data => {
      this.sujets = data;
    });
  }

  private getPfeConfirmed(){
    let etudiant:Etudiant = new Etudiant();
    etudiant.firstName = this.sessionStorage.getItem('etudiantFirstName') as string;
    etudiant.secondName = this.sessionStorage.getItem('etudiantSecondName') as string;

    this.listeSujetsService.getIsPfeConfirmed(etudiant).subscribe(data => {
        this.pfeConfirmed = data as boolean;
        
        if(this.pfeConfirmed) {
          this.listeSujetsService.getPfeConfirmed(etudiant).subscribe(data => {
            this.idSujet = data as number;
          }, error => {
          alert("Erreur inconnue !1");
        });

        this.listeSujetsService.getGoogleDrive(etudiant).subscribe(data=>{
              this.googleDrive = data as String;
          }, error => {
              alert("Erreur inconnue !");
          });

      let fullName:String = this.sessionStorage.getItem('etudiantFirstName') + ' ' + this.sessionStorage.getItem('etudiantSecondName');
  
      this.listeSujetsService.getTerminerPfe(fullName).subscribe(data => {
        this.pfeEnd = data as boolean;
      }, error=>{
        alert("Erreur inconnue !");
      });
  
      this.listeSujetsService.getIsConfirmedRDVforGroup(etudiant).subscribe(data => {
        this.rdvConfirmed = data as boolean;
  
        this.listeSujetsService.getDateRdvforGroup(etudiant).subscribe(data => {
          this.dateRdv = data as string;
        }, error=>{
          alert("Erreur inconnue !");
        });
      }, error=>{
        alert("Erreur inconnue !");
      });
  
        this.listeSujetsService.getValidatePFEforGroup(fullName).subscribe(data => {
        this.pfeRemarques = JSON.parse(JSON.stringify(data)).remarques;
        this.pfeNote = JSON.parse(JSON.stringify(data)).note;
        this.pfeDateSoutenance = JSON.parse(JSON.stringify(data)).dateSoutenance.split("T")[0];
        this.pfeValidate = JSON.parse(JSON.stringify(data)).validate;
      }, error => {
        alert("Erreur inconnue !");
      }
      );




        }
        

      }, error => {
          alert("Erreur inconnue !");
    });
    
  }

  public postuler(idSujet:number) {
    let etudiant:Etudiant = new Etudiant();
    etudiant.firstName = this.sessionStorage.getItem('etudiantFirstName') as string;
    etudiant.secondName = this.sessionStorage.getItem('etudiantSecondName') as string;
    
    this.listeSujetsService.postuleSujet(idSujet, etudiant).subscribe(
        data=>{
            alert("Votre postulation a été prise en charge, demander au membre de groupe de postuler aussi au même sujet.");
        }, error => {
            alert("Impossible de postuler à ce sujet, vous avez droit à 3 sujets max par encadrant,  vous avez déjà postuler à ce sujet, ou vous n'avez pas le groupe adéquat pour y postuler !");
        }
    );
  }

  public view(idSujet:number) {
    this.listeSujetsService.viewGroup(idSujet).subscribe(
      data=>{
        this.router.navigate(['espace-etudiant/view-group'], {queryParams: {filters: encodeURIComponent(JSON.stringify(data))}});
      }, error => {
          alert("Erreur lors de l'affichage des groupes ayant postulés pour ce sujet !");
      }
  );
  }

  public setGoogleDrive() {
    let fullName:String = this.sessionStorage.getItem('etudiantFirstName') + ' ' + this.sessionStorage.getItem('etudiantSecondName');
    this.listeSujetsService.setGoogleDrive(this.googleDrive, fullName).subscribe(
      data=>{
          alert("Lien Google Drive crée avec succès");
      }, error => {
          alert("Erreur lors de l'ajout du lien Google Drive !");
      }
  );
  }

  public askRDV() {
    let etudiant:Etudiant = new Etudiant();
    etudiant.firstName = this.sessionStorage.getItem('etudiantFirstName') as string;
    etudiant.secondName = this.sessionStorage.getItem('etudiantSecondName') as string;

    this.listeSujetsService.askRDV(etudiant).subscribe(
      data=>{
        this.rdvConfirmed = JSON.parse(JSON.stringify(data)).rdvConfirmed;
        alert("Demande de RDV envoyé avec succès à votre encadrant.");
      }, error => {
          alert("Erreur lors de la demande du RDV !");
      }
  );
  }

  public terminerPfe() {
    let fullName:String = this.sessionStorage.getItem('etudiantFirstName') + ' ' + this.sessionStorage.getItem('etudiantSecondName');

    this.listeSujetsService.terminerPfe(fullName).subscribe(
      data=>{

      }, error => {
          alert("Erreur lors de l'exécution de la demande !");
      }
  );
  }

}

