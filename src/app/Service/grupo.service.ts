import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import{Grupo} from '../Interface/grupo';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  private baseUrl = environment.baseUrl;

  private serviceUrl: string = this.baseUrl+"/grupos";

  constructor(private http: HttpClient) {   }
  
/*Get data from the service*/
  getData(): Observable<Grupo[]>{
    return this.http.get<Grupo[]>(this.serviceUrl);
  }

  /*Create a group*/
  addGrupo(){
    return ;
  }
}
