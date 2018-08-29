import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import{Cliente} from '../Interface/cliente';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import{Grupo} from '../Interface/grupo';


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

  private serviceUrl: string = this.baseUrl+"/clientes";


  constructor(private http: HttpClient) {   }
  
/*Get data from the server*/
  getData():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.serviceUrl);
  }
  /*Send data to the server*/
  addCliente(cliente: Cliente){
    return this.http.post<Cliente>(this.serviceUrl, cliente, httpOptions);
  }
}
