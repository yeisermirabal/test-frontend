import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { ClienteService } from '../../Service/cliente.service';
import { ClienteDataSource } from '../../cliente-data-source';
import { Cliente } from '../../Interface/cliente';

@Component({
  selector: 'app-list-cliente',
  templateUrl: './list-cliente.component.html',
  styleUrls: ['./list-cliente.component.css']
})
export class ListClienteComponent implements OnInit {

  dataSourceClientes: ClienteDataSource;
  displayedColumns = ['id', 'nome', 'cep', 'cidade', 'grupo', 'actions'];

  constructor(private router: Router, private clienteService: ClienteService) {  }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.dataSourceClientes = new ClienteDataSource(this.clienteService);
  }

  showAdicionarCliente() {
    this.router.navigate(['clientes/adicionar']);
  }

  showEditarCliente(cliente: Cliente) {
    const clienteParams: NavigationExtras = {
      queryParams: {
        id: cliente.id,
        nome: cliente.nome,
        cep: cliente.cep,
        cidade: cliente.cidade,
        grupo: cliente.grupo.id
      },
      skipLocationChange: true
    };
    this.router.navigate(['clientes/editar'], clienteParams);
  }

  deletarCliente(id): void {
    this.clienteService.deletarClienteService(id).subscribe(data => {
     this.loadData();
    });
  }

}

