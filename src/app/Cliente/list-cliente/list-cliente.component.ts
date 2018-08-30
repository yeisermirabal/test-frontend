import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../Service/cliente.service';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { Cliente } from '../../Interface/cliente';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-list-cliente',
  templateUrl: './list-cliente.component.html',
  styleUrls: ['./list-cliente.component.css']
})
export class ListClienteComponent implements OnInit {

  dataSource: ClienteDataSource;
  displayedColumns = ['id', 'nome', 'cep', 'cidade', 'grupo', 'actions'];
  // cliente: Cliente;

  constructor(private router: Router, private clienteService: ClienteService) {
  }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.dataSource = new ClienteDataSource(this.clienteService);
  }

  showEditCliente(cliente: Cliente) {
    let clienteParams: NavigationExtras = {
      queryParams: {
        id: cliente.id,
        nome: cliente.nome,
        cep: cliente.cep,
        cidade: cliente.cidade
      }
    };
    this.router.navigate(['editcliente'], clienteParams);
  }

  deleteCliente(cliente): void {
    console.log(cliente);
    this.clienteService.deleteClienteService(cliente.id).subscribe(data => {
     this.loadData();
    });
  }

}

export class ClienteDataSource extends DataSource<any> {
  constructor(private clienteService: ClienteService) {
    super();
  }
  connect(): Observable<Cliente[]> {
    return this.clienteService.getData();
  }
  disconnect() { }
}
