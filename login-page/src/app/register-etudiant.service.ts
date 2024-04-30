import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Etudiant } from './etudiant';

@Injectable({
  providedIn: 'root'
})
export class RegisterEtudiantService {

  private baseUrl="http://localhost:8092/register-etudiant"
  constructor(private httpClient:HttpClient) { }

  etudiantRegister(etudiant:Etudiant):Observable<object>{
    return this.httpClient.post(`${this.baseUrl}`, etudiant);
  }
}
