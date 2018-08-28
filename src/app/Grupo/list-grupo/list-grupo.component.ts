import { Component, OnInit } from '@angular/core';
import { GrupoService } from '../../Service/grupo.service';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { Grupo } from '../../Interface/grupo';

@Component({
  selector: 'list-grupo',
  templateUrl: './list-grupo.component.html',
  styleUrls: ['./list-grupo.component.css']
})
export class ListGrupoComponent implements OnInit {

  dataSource = new GrupoDataSource(this.grupoService);
  displayedColumns = ['nome'];

  constructor(private grupoService: GrupoService) {
  }


  ngOnInit() {
  }

}

export class GrupoDataSource extends DataSource<any> {
  constructor(private grupoService: GrupoService) {
    super();
  };

  connect(): Observable<Grupo[]> {
    return this.grupoService.getData();
  }
  disconnect() { }
}
