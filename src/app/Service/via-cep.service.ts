import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Address } from '../Interface/address';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {

constructor(private http: HttpClient) { }

getAddressByCepCode(cep: string): Observable<Address> {
return this.http.get<Address>(`https://viacep.com.br/ws/${cep}/json/`);
}

}
