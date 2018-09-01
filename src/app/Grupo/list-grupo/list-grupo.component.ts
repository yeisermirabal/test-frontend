import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";


import { GrupoService } from '../../Service/grupo.service';
import { Grupo } from './../../Interface/grupo';

@Component({
  selector: 'app-list-grupo',
  templateUrl: './list-grupo.component.html',
  styleUrls: ['./list-grupo.component.css']
})
export class ListGrupoComponent implements OnInit {
  dataSourceGrupos: MatTableDataSource<Grupo>;
 // dataSource: GrupoDataSource;
  displayedColumns = ['id', 'nome', 'actions'];

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
  //  this.dataSource = new GrupoDataSource(this.grupoService);
  this.paginator._changePageSize(this.paginator.pageSize);
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
    this.grupoService.deletarGrupoService(grupo.id).subscribe(data => {
      this.loadData();
    });
  }
  filterGrupo(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.dataSourceGrupos.filter = filterValue;
  }
}


