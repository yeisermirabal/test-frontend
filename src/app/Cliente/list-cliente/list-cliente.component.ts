import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource, MdPaginatorIntl } from '@angular/material';

import { ClienteService } from '../../Service/cliente.service';
import { Cliente } from '../../Interface/cliente';

@Component({
  selector: 'app-list-cliente',
  templateUrl: './list-cliente.component.html',
  styleUrls: ['./list-cliente.component.css']
})
export class ListClienteComponent implements OnInit {
  dataSourceClientes: MatTableDataSource<Cliente>;
  displayedColumns = ['id', 'nome', 'cep', 'cidade', 'grupo', 'actions'];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(private router: Router, private clienteService: ClienteService) {
  }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.paginator._changePageSize(this.paginator.pageSize);
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

  deletarCliente(id): void {
    this.clienteService.deletarClienteService(id).subscribe(data => {
      this.loadData();
    });
  }

  filterCliente(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.dataSourceClientes.filter = filterValue;
  }

  getPortuguesPaginatorIntl() {
    const paginatorIntl = new MdPaginatorIntl();
    paginatorIntl.itemsPerPageLabel = 'Itens por página:';
    paginatorIntl.nextPageLabel = 'Página seguinte';
    paginatorIntl.previousPageLabel = 'Página anterior';
    return paginatorIntl;
  }
}
