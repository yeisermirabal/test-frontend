import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { ClienteService } from './Service/cliente.service';
import { Cliente } from './Interface/cliente';

export class ClienteDataSource extends DataSource<any> {

  constructor(private clienteService: ClienteService) {
    super();
  }
  connect(): Observable<Cliente[]> {
    return this.clienteService.getData();
  }
  disconnect() { }
}
