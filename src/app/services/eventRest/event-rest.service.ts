import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CredentialsRestService } from '../credentialsRest/credentials-rest.service';

@Injectable({
  providedIn: 'root'
})
export class EventRestService 
{
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.credentialReset.getToken(),
  });

  constructor
  (
    private credentialReset: CredentialsRestService,
    private http: HttpClient,
  ) { }

  //FUNCIONES DE ADMINISTRADOR//
  getEvents()
  {
    return this.http.get(environment.baseURI + 'event/getEvents', { headers: this.httpOptions });
  }

  saveEvent(params : {})
  {
    return this.http.post(environment.baseURI + 'event/saveEvent', params, { headers: this.httpOptions });
  }
}
