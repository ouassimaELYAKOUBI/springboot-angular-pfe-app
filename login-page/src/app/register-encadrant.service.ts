import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Encadrant } from './encadrant';

@Injectable({
  providedIn: 'root'
})
export class RegisterEncadrantService {

  private baseUrl="http://localhost:8092/register-encadrant"
  constructor(private httpClient:HttpClient) { }

  encadrantRegister(encadrant:Encadrant):Observable<object>{
    return this.httpClient.post(`${this.baseUrl}`, encadrant);
  }
}
