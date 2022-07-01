import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CredentialsRestService } from '../credentialsRest/credentials-rest.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceRestService 
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
  getServices()
  {
    return this.http.get(environment.baseURI + 'service/getServices', { headers: this.httpOptions });
  }

  saveService(params : {})
  {
    return this.http.post(environment.baseURI + 'service/saveService', params, { headers: this.httpOptions });
  }

  getService(id : string)
  {
    return this.http.get(environment.baseURI + 'service/getService/' + id,  { headers: this.httpOptions });
  }

  updateService(id : string, params : {})
  {
    return this.http.put(environment.baseURI + 'service/updateService/' + id,  params,{ headers: this.httpOptions });
  }

  deleteService(id : string)
  {
    return this.http.delete(environment.baseURI + 'service/deleteService/' + id,  { headers: this.httpOptions });
  }

}
