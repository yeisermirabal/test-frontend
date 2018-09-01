import { Address } from './../Interface/address';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {

  localidade = '';

  constructor(private http: HttpClient) { }

  getAddressByCepCode(cep: string): Observable<Address> {

    return this.http.get<Address>(`https://viacep.com.br/ws/${cep}/json/`);
  }

}
