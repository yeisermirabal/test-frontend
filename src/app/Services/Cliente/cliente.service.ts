import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Cliente } from '../../Interfaces/cliente';

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

  constructor(private http: HttpClient) { }

  getData(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.serviceUrl);
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(this.serviceUrl + '/' + id);
  }

  criarClienteService(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.serviceUrl, cliente, httpOptions);
  }

  atualizarClienteService(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(this.serviceUrl, cliente, httpOptions);
  }

  deletarClienteService(id: number): Observable<Cliente> {
    const url = this.serviceUrl + `/${id}`;
    return this.http.delete<Cliente>(url, httpOptions);
  }

  getCantidadClientes(): Observable<any> {
    return this.http.get(this.serviceUrl + '/count');
  }
}
