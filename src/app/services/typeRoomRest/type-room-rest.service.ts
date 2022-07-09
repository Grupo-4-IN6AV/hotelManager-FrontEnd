import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CredentialsRestService } from '../credentialsRest/credentials-rest.service';

@Injectable({
  providedIn: 'root'
})
export class TypeRoomRestService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.credentialReset.getToken(),
  });

  constructor
  (
    private credentialReset: CredentialsRestService,
    private http: HttpClient,
  ) { }

  getTypeRooms(id:string){
    return this.http.get(environment.baseURI + 'typeRoom/getTypeRooms/' + id, {headers: this.httpOptions});
  }

  getTypeRoom(id:string){
    return this.http.get(environment.baseURI + 'typeRoom/getTypeRoom/' + id, {headers: this.httpOptions});
  }
  
  saveTypeRoom(params: {}){
    return this.http.post(environment.baseURI + 'typeRoom/createTypeRoom', params ,{headers: this.httpOptions});
  }

  deleteTypeRoom(id: string){
    return this.http.delete(environment.baseURI + 'typeRoom/deleteTypeRoom/' + id, {headers: this.httpOptions});
  }
  
  updateTypeRoom(id: string, params: {}){
    return this.http.put(environment.baseURI + 'typeRoom/updateTypeRoom/' + id, params, {headers: this.httpOptions});
  }
  
  
}
