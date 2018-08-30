import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { GrupoService } from '../../Service/grupo.service';
import { GrupoDataSource } from '../../grupo-data-source';
import { Grupo } from '../../Interface/grupo';

@Component({
  selector: 'app-list-grupo',
  templateUrl: './list-grupo.component.html',
  styleUrls: ['./list-grupo.component.css']
})
export class ListGrupoComponent implements OnInit {

  dataSource: GrupoDataSource;
  displayedColumns = ['id', 'nome', 'actions'];

  constructor(private router: Router, private grupoService: GrupoService) {
  }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.dataSource = new GrupoDataSource(this.grupoService);
  }

  showAdicionarGrupo() {
    this.router.navigate(['grupos/adicionar']);
  }

  showEditarGrupo(grupo: Grupo) {
    let grupoParams: NavigationExtras = {
      queryParams: {
        id: grupo.id,
        nome: grupo.nome
      },
      skipLocationChange: true
    };
    this.router.navigate(['grupos/editar'], grupoParams);
  }

  deletarGrupo(grupo): void {
    this.grupoService.deletarGrupoService(grupo.id).subscribe(data => {
     this.loadData();
    });
  }
}


