import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Grupo } from '../Interface/grupo';

// Header for json
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class GrupoService {
  // Take the url from the api and save it in a constant
  private baseUrl = environment.baseUrl;
  private serviceUrl: string = this.baseUrl + '/grupos';

  constructor(private http: HttpClient) {}

  /* Get data from the api */
  getData(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(this.serviceUrl);
  }

  /* Get data from the api */
  getGrupo(id: number): Observable<Grupo> {
    return this.http.get<Grupo>(this.serviceUrl + '/' + id );
  }

  /*Create a group*/
  criarGrupoService(grupo: Grupo): Observable<Grupo> {
    const newGrupo = Object.assign({}, grupo);
    return this.http.post<Grupo>(this.serviceUrl, newGrupo, httpOptions);
  }

  atualizarGrupoService(grupo: Grupo): Observable<Grupo> {
    return this.http.put<Grupo>(this.serviceUrl, grupo, httpOptions);
  }

  deletarGrupoService(id: number): Observable<Grupo> {
    const url = `${this.baseUrl}/grupos/${id}`;
    return this.http.delete<Grupo>(url, httpOptions);
  }

  getCantidadGrupos(): Observable<any> {
    return this.http.get(this.serviceUrl + '/count');
  }
}
