import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {Cliente} from '../Interface/cliente';
import { Observable} from 'rxjs';
import { environment } from '../../environments/environment';
import {Grupo} from '../Interface/grupo';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class ClienteService {
  private grupo: Grupo;
  private baseUrl = environment.baseUrl;

  private serviceUrl: string = this.baseUrl + '/grupos';


  constructor(private http: HttpClient) {   }

/* Get data from the server*/
  getData(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.baseUrl + '/clientes');
  }
  /*Create a group*/
  criarClienteService(cliente: Cliente, idGrupo: number): Observable<Cliente> {
    const url = `${this.serviceUrl}/${idGrupo}/clientes`;
    const newCliente = Object.assign({}, cliente);
    return this.http.post<Cliente>(url, newCliente, httpOptions);
   }

   deleteClienteService (id: number): Observable<Cliente> {
    const url = `${this.serviceUrl}/${id}/clientes`;
    return this.http.delete<Cliente>(url, httpOptions);
  }
 }
