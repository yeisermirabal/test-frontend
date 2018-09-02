import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatPaginatorIntl
} from '@angular/material';

import { ClienteService } from '../../../Services/Cliente/cliente.service';
import { Cliente } from '../../../Interfaces/cliente';

@Component({
  selector: 'app-list-cliente',
  templateUrl: './list-cliente.component.html',
  styleUrls: ['./list-cliente.component.css']
})
export class ListClienteComponent implements OnInit {
  dataSourceClientes = new MatTableDataSource<Cliente>();
  displayedColumns = ['id', 'index', 'nome', 'cep', 'cidade', 'grupo', 'actions'];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(private router: Router, private clienteService: ClienteService) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.paginator._changePageSize(this.paginator.pageSize);
    this.paginator._intl.itemsPerPageLabel = 'Itens por página:';
    this.paginator._intl.nextPageLabel = 'Página seguinte';
    this.paginator._intl.previousPageLabel = 'Página anterior';

    this.clienteService.getData().subscribe(data => {
      this.dataSourceClientes = new MatTableDataSource(data);
      this.dataSourceClientes.paginator = this.paginator;
      this.dataSourceClientes.sort = this.sort;
    });
  }

  showAdicionarCliente() {
    this.router.navigate(['clientes/adicionar']);
  }

  showEditarCliente(id: number) {
    this.router.navigate(['clientes/editar', id]);
  }

  deletarCliente(cliente): void {

    if (confirm(`¿Tem certeza de que deseja remover o cliente ${cliente.nome}?`) === true) {
      this.clienteService.deletarClienteService(cliente.id).subscribe(data => {
        this.loadData();
      });
    }
  }

  filterCliente(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.dataSourceClientes.filter = filterValue;
  }
}
