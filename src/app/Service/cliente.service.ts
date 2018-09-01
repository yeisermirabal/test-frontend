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

  private serviceUrl = `${this.baseUrl}/clientes`;

  constructor(private http: HttpClient) {}

  /* Get data from the server*/
  getData(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.serviceUrl);
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(this.serviceUrl + '/' + id);
  }

  /*Create a client*/
  criarClienteService(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.serviceUrl, cliente, httpOptions);
  }
  /* Update a client*/
  atualizarClienteService (cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(this.serviceUrl, cliente, httpOptions);
  }
  /* Delete a client*/
  deletarClienteService(id: number): Observable<Cliente> {
    const url = this.serviceUrl + `/${id}`;
    return this.http.delete<Cliente>(url, httpOptions);
  }
}
