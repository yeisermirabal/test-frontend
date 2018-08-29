import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


import { environment } from '../../environments/environment';
import{Grupo} from '../Interface/grupo';

//Header for json
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({
  providedIn: 'root'
})
export class GrupoService {
//Take the url from the api and save it in a constant
  private baseUrl = environment.baseUrl;
  private serviceUrl: string = this.baseUrl+"/grupos";

  constructor(private http: HttpClient) {   }
  
/*Get data from the api*/
  getData(): Observable<Grupo[]>{
    return this.http.get<Grupo[]>(this.serviceUrl);
  }

/*Create a group*/
  criarGrupoService(grupo: Grupo): Observable<Grupo> {
  const newGrupo = Object.assign({}, grupo);
  return this.http.post<Grupo>(this.serviceUrl, newGrupo, httpOptions);
 }

 updateGrupoService (grupo: Grupo): Observable<Grupo> {
 // const editGrupo = Object.assign({}, grupo);
  return this.http.put<Grupo>(this.serviceUrl, grupo, httpOptions);
}

deleteGrupoService (id: number): Observable<Grupo> {
  const url = `${this.serviceUrl}/${id}`; 
  return this.http.delete<Grupo>(url, httpOptions).pipe(
    tap(_ => this.log(`deleted grupo id=${id}`)),
    catchError(this.handleError<Grupo>('deleteGrupoService'))
  );
}
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error);
    return of(result as T);
  };
}

private log(message: string) {
  console.log('GrupoService: ' + message);
}

}
