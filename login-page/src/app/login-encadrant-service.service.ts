import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Encadrant } from './encadrant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginEncadrantServiceService {

  private baseUrl="http://localhost:8092/login-encadrant"
  constructor(private httpClient:HttpClient) { }

  encadrantLogin(encadrant:Encadrant):Observable<object>{
    return this.httpClient.post(`${this.baseUrl}`, encadrant);
  }

}
