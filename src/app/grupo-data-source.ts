import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { Grupo } from './Interface/grupo';
import { GrupoService } from './Service/grupo.service';

export class GrupoDataSource extends DataSource<any> {

  constructor(private grupoService: GrupoService) {
    super();
  }

  connect(): Observable<Grupo[]> {
    return this.grupoService.getData();
  }
  disconnect() { }

}
