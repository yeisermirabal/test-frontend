import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { GrupoService } from '../../../Services/Grupo/grupo.service';
import { Grupo } from './../../../Interfaces/grupo';

@Component({
  selector: 'app-list-grupo',
  templateUrl: './list-grupo.component.html',
  styleUrls: ['./list-grupo.component.css']
})

export class ListGrupoComponent implements OnInit {
  dataSourceGrupos: MatTableDataSource<Grupo>;
  displayedColumns = ['id', 'index', 'nome', 'actions'];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(private router: Router, private grupoService: GrupoService) {
  }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.paginator._changePageSize(this.paginator.pageSize);
    this.paginator._intl.itemsPerPageLabel = 'Itens por página:';
    this.paginator._intl.nextPageLabel = 'Página seguinte';
    this.paginator._intl.previousPageLabel = 'Página anterior';

    this.grupoService.getData().subscribe(data => {
      this.dataSourceGrupos = new MatTableDataSource(data);
      this.dataSourceGrupos.paginator = this.paginator;
      this.dataSourceGrupos.sort = this.sort;
    });
  }

  showAdicionarGrupo() {
    this.router.navigate(['grupos/adicionar']);
  }

  showEditarGrupo(id: number) {
    this.router.navigate(['grupos/editar', id]);
  }

  deletarGrupo(grupo): void {

    if (confirm(`¿Tem certeza de que deseja remover o grupo ${grupo.nome}?`) === true) {
      this.grupoService.deletarGrupoService(grupo.id).subscribe(data => {
        if (data === false) {
          alert('Não foi possível eliminar o grupo. Tem clientes associados.');
        }
        this.loadData();
      });
    }
  }

  filterGrupo(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.dataSourceGrupos.filter = filterValue;
  }
}
