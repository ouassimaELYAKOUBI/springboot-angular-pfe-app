import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Etudiant } from '../etudiant';
import { LoginEtudiantServiceService } from '../login-etudiant-service.service';


@Component({
  selector: 'app-espace-etudiant',
  templateUrl: './espace-etudiant.component.html',
  styleUrls: ['./espace-etudiant.component.css']
})
export class EspaceEtudiantComponent implements OnInit{
  
  public sessionStorage = sessionStorage;

  public isConfirmed:boolean = false;

  public isAuthenticated:boolean = false;

  public isGroupFormed:boolean = false;

  public listEtudiant:Etudiant[];

  private fullName:String;

  public myGroup:string[]|undefined;

  public groupName:String = '';
  public etudiantName:String = '';

  constructor(private loginEtudiantService:LoginEtudiantServiceService, private router:Router) {
    
    if (this.sessionStorage.getItem('etudiantConfirmed') ===null) {
      this.isAuthenticated = false;
      this.router.navigate(['/login-etudiant']);
    }
    else
      this.isAuthenticated = true;

    if (sessionStorage.getItem('etudiantConfirmed') == "true")
      this.isConfirmed = true;
    else
      this.isConfirmed = false;
    
    if (sessionStorage.getItem('etudiantGroupName') == "null")
      this.isGroupFormed = false;
    else {
      this.isGroupFormed = true;
      this.myGroup = sessionStorage.getItem('etudiantGroupName')?.split("<br>");
    }
      
  }

  public clear() {
    sessionStorage.clear();
  }

  ngOnInit() {

      this.fullName = JSON.stringify(this.sessionStorage.getItem('etudiantFirstName')) + JSON.stringify(this.sessionStorage.getItem('etudiantSecondName'));
      
      this.loginEtudiantService.getEtudiantList(this.fullName).subscribe(
      data=>{
        this.listEtudiant = data as Etudiant[];
      }, error=>alert("Problème lors de la connexion a la base de donnees.")  );

      var temp:string = this.sessionStorage.getItem('etudiantSecondName') as string;
      this.groupName = this.sessionStorage.getItem('etudiantFirstName') as String;
      this.groupName = this.groupName.concat(" ", temp, "<br>");
  }

  public addToGroup() {
    this.groupName = this.groupName.concat(this.etudiantName as string, "<br>");
  }

  public removeToGroup(){
    let temp = this.groupName;
    this.groupName = "";

    for (let i = 0; i < temp.split("<br>").length - 2; i++) {
      this.groupName = this.groupName.concat(temp.split("<br>")[i] as string, "<br>");
    }    
  }

  public saveGroup() {
    this.loginEtudiantService.saveGroup(this.groupName).subscribe(
      data=>{
        alert("Groupe ajouté avec succès.");
        sessionStorage.setItem('etudiantGroupName', this.groupName as string);
        this.isGroupFormed = true;
        this.myGroup = sessionStorage.getItem('etudiantGroupName')?.split("<br>");
        this.router.navigate(['/espace-etudiant']);

      }, error=>{
        alert("Problème lors de l'ajout du groupe.");
        this.removeToGroup();
      });
  }

} 
