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

  pesquisaCEP(cep: string): Observable<Address> {

     const address: Observable<Address> = this.getAddressByCepCode(cep);

      address.subscribe(data => {
        if (data.erro === true) {
          alert('CEP Code not found.');
          // this.toastr.warning("ZIP Code not found.", "Ops...");
        }},

      );
    return address;
  }
}
