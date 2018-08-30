import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Cliente } from '../Interface/cliente';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})

export class ClienteService {
  private baseUrl = environment.baseUrl;

  private serviceUrl: string = this.baseUrl + '/grupos';

  constructor(private http: HttpClient) {}

  /* Get data from the server*/
  getData(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.baseUrl + '/clientes');
  }
  /*Create a client*/
  criarClienteService(cliente: Cliente, idGrupo: number): Observable<Cliente> {
    const url = `${this.serviceUrl}/${idGrupo}/clientes`;
    const newCliente = Object.assign({}, cliente);
    return this.http.post<Cliente>(url, newCliente, httpOptions);
  }
  /* Update a client*/
  atualizarClienteService (cliente: Cliente): Observable<Cliente> {
    const url = `${this.baseUrl}/clientes`;
    return this.http.put<Cliente>(url, cliente, httpOptions);
  }
  /* Delete a client*/
  deletarClienteService(id: number): Observable<Cliente> {
    const url = `${this.baseUrl}/clientes/${id}`;
    return this.http.delete<Cliente>(url, httpOptions);
  }
}
