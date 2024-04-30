import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Etudiant } from './etudiant';

@Injectable({
  providedIn: 'root'
})
export class LoginEtudiantServiceService {

  private baseUrl="http://localhost:8092/login-etudiant";
  private baseUrl2="http://localhost:8092/getAll-etudiant";
  private baseUrl3="http://localhost:8092/save-group";

  constructor(private httpClient:HttpClient) { }

  etudiantLogin(etudiant:Etudiant):Observable<object>{
    return this.httpClient.post(`${this.baseUrl}`, etudiant);
  }
  getEtudiantList(name:String): Observable<object>{
    return this.httpClient.post<Etudiant[]>(`${this.baseUrl2}`, name);
  }
  saveGroup(groupName:String): Observable<object>{
    return this.httpClient.post<String>(`${this.baseUrl3}`, groupName);
  }
}
