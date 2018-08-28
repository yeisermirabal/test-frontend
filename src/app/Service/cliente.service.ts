import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import{Cliente} from '../Interface/cliente';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class ClienteService {
  private serviceUrl: string = "http://10.0.0.10:8081/grupos/1/clientes";


  constructor(private http: HttpClient) {   }
  
/*Get data from the server*/
  getData():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.serviceUrl);
  }
  /*Send data to the server*/
  addCliente(cliente: Cliente){
    return this.http.post<Cliente>(this.serviceUrl, cliente, httpOptions)
  }
}
