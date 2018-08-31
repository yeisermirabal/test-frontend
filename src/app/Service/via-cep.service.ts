import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Address } from '../Interface/address';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {

constructor(private httpClient: HttpClient) { }

getAddressByZipCode(zipcode: string): Observable<Address> {
return this.httpClient.get<Address>(`https://viacep.com.br/ws/${zipcode}/json/`);
}

}
