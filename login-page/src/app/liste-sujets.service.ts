import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sujet } from './sujet';
import { Etudiant } from './etudiant';
//const baseUrl = 'http://localhost:8092/liste-sujets';

@Injectable({
  providedIn: 'root'
})
export class ListeSujetsService {

  
  // constructor(private http: HttpClient) { }

  // getAll(): Observable<Sujet[]> {
  //   return this.http.get<Sujet[]>(baseUrl);
  // }

  // get(idSujet: any): Observable<Sujet> {
  //   return this.http.get<Sujet>(`${baseUrl}/${idSujet}`);
  // }

  // create(data: any): Observable<any> {
  //   return this.http.post(baseUrl, data);
  // }

  // update(idSujet: any, data: any): Observable<any> {
  //   return this.http.put(`${baseUrl}/${idSujet}`, data);
  // }

  // delete(idSujet: any): Observable<any> {
  //   return this.http.delete(`${baseUrl}/${idSujet}`);
  // }

  // deleteAll(): Observable<any> {
  //   return this.http.delete(baseUrl);
  // }

  // findByTitle(nomSujet: any): Observable<Sujet[]> {
  //   return this.http.get<Sujet[]>(`${baseUrl}?nomSujet=${nomSujet}`);
  // }
  private baseURL = "http://localhost:8092/liste-sujets";
  private baseURL1 = "http://localhost:8092/liste-sujetsE";
  private baseURL2 = "http://localhost:8092/postuler";
  private baseURL3 = "http://localhost:8092/espace-etudiant/view-group";
  private baseURL4 = "http://localhost:8092/espace-encadrant/accept-group";
  private baseURL5 = "http://localhost:8092/espace-etudiant/pfe-confirmed";
  private baseURL6 = "http://localhost:8092/espace-etudiant/pfe-sujet";
  private baseURL7 = "http://localhost:8092/espace-etudiant/pfe-confirmed2";
  private baseURL8 = "http://localhost:8092/espace-etudiant/list-sujet/google-drive";
  private baseURL9 = "http://localhost:8092/espace-etudiant/google-drive";
  private baseURL10 = "http://localhost:8092/espace-etudiant/google-drive2";
  private baseURL11 = "http://localhost:8092/espace-etudiant/ask-rdv";
  private baseURL12 = "http://localhost:8092/espace-encadrant/rdv";
  private baseURL13 = "http://localhost:8092/espace-encadrant/validate-rdv";
  private baseURL14 = "http://localhost:8092/espace-encadrant/rdv-confirmed";
  private baseURL15 = "http://localhost:8092/espace-encadrant/date-rdv";
  private baseURL16 = "http://localhost:8092/espace-etudiant/rdv-confirmed";
  private baseURL17 = "http://localhost:8092/espace-etudiant/date-rdv-group";
  private baseURL18 = "http://localhost:8092/espace-etudiant/end-pfe";
  private baseURL19 = "http://localhost:8092/espace-etudiant/ispfe-end";

  private baseURL20 = "http://localhost:8092/espace-encadrant/ispfe-end";
  private baseURL21 = "http://localhost:8092/espace-encadrant/validate-pfe";
  private baseURL22 = "http://localhost:8092/espace-encadrant/get-validate-pfe";
  private baseURL23 = "http://localhost:8092/espace-etudiant/get-validate-pfe-group";

  constructor(private httpClient: HttpClient) { }
  
  getSujetsList(): Observable<Sujet[]>{
    return this.httpClient.get<Sujet[]>(`${this.baseURL}`);
  }
  getSujetsList1(): Observable<Sujet[]>{
    return this.httpClient.get<Sujet[]>(`${this.baseURL1}`);
  }

  createSujet(sujet: Sujet): Observable<Object>{
    return this.httpClient.post(`${this.baseURL1}`, sujet);
  }

  getSujetById(idSujet: number): Observable<Sujet>{
    return this.httpClient.get<Sujet>(`${this.baseURL1}/${idSujet}`);
  }

  updateSujet(idSujet: number, sujet: Sujet): Observable<Object>{
    return this.httpClient.put(`${this.baseURL1}/${idSujet}`, sujet);
  }

  deleteSujet(idSujet: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL1}/${idSujet}`);
  }


  postuleSujet(idSujet: number, etudiant:Etudiant): Observable<Object>{
    return this.httpClient.post(`${this.baseURL2}/${idSujet}`, etudiant);
  }

  viewGroup(idSujet: number): Observable<Object>{
    return this.httpClient.get(`${this.baseURL3}/${idSujet}`);
  }

  acceptGroup(idSujet:number, group:String): Observable<Object>{
    return this.httpClient.post(`${this.baseURL4}/${idSujet}`, group);
  }

  getIsPfeConfirmed(etudiant:Etudiant): Observable<Object>{
    return this.httpClient.post(`${this.baseURL5}`, etudiant);
  }

  getIsPfeConfirmed2(fullName:String): Observable<Object>{
    return this.httpClient.post(`${this.baseURL7}`, fullName);
  }

  getPfeConfirmed(etudiant:Etudiant): Observable<Object>{
    return this.httpClient.post(`${this.baseURL6}`, etudiant);
  }

  setGoogleDrive(googleDrive:String, fullName:String): Observable<Object>{
    return this.httpClient.post(`${this.baseURL8}/${fullName}`, googleDrive, {responseType: 'text'});
  }

  getGoogleDrive(etudiant:Etudiant): Observable<Object>{
    return this.httpClient.post(`${this.baseURL9}`, etudiant, {responseType: 'text'});
  }

  getGoogleDrive2(group:String[]): Observable<Object>{
    return this.httpClient.post(`${this.baseURL10}`, group);
  }

  askRDV(etudiant:Etudiant): Observable<Object>{
    return this.httpClient.post(`${this.baseURL11}`, etudiant, {responseType: 'json'});
  }

  getGroupRDV(group:String[]): Observable<Object>{
    return this.httpClient.post(`${this.baseURL12}`, group);
  }

  validateRDV(group:String, date:String|null): Observable<Object>{
    return this.httpClient.post(`${this.baseURL13}/${group}`, date);
  }

  getIsConfirmedRDV(group:String[]): Observable<Object>{
    return this.httpClient.post(`${this.baseURL14}`, group);
  }

  getDateRDV(group:String[]): Observable<Object>{
    return this.httpClient.post(`${this.baseURL15}`, group);
  }

  getIsConfirmedRDVforGroup(etudiant:Etudiant): Observable<Object>{
    return this.httpClient.post(`${this.baseURL16}`, etudiant);
  }

  getDateRdvforGroup(etudiant:Etudiant): Observable<Object>{
    return this.httpClient.post(`${this.baseURL17}`, etudiant, {responseType: 'text'});
  }

  terminerPfe(fullName:String): Observable<Object>{
    return this.httpClient.post(`${this.baseURL18}`, fullName);
  }

  getTerminerPfe(fullName:String): Observable<Object>{
    return this.httpClient.post(`${this.baseURL19}`, fullName);
  }

  getTerminerPfeforAll(group:String[]): Observable<Object>{
    return this.httpClient.post(`${this.baseURL20}`, group);
  }

  validatePFE(group:String, remarque:String, note:String, date:String): Observable<Object>{
    const params = new HttpParams()
      .set('fullName', group as string)
      .set('remarque', remarque as string)
      .set('note', note as string)
      .set('date', date as string);

    return this.httpClient.post(`${this.baseURL21}`, params);
  }

  getValidatePFE(group:String[]): Observable<Object>{
    return this.httpClient.post(`${this.baseURL22}`, group, {responseType: 'json'});
  }

  getValidatePFEforGroup(group:String): Observable<Object>{
    return this.httpClient.post(`${this.baseURL23}`, group, {responseType: 'json'});
  }
  
}
