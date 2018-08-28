import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../Service/cliente.service';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { Cliente } from '../../Interface/cliente';

@Component({
  selector: 'list-cliente',
  templateUrl: './list-cliente.component.html',
  styleUrls: ['./list-cliente.component.css']
})
export class ListClienteComponent implements OnInit {
  dataSource = new ClienteDataSource(this.clienteService);
  displayedColumns = ['nome','cep','cidade','grupo'];

  constructor(private clienteService: ClienteService) {
  }

  ngOnInit() {
  }

}

export class ClienteDataSource extends DataSource<any> {
  constructor(private clienteService: ClienteService) {
    super();
  };

  connect(): Observable<Cliente[]> {
    return this.clienteService.getData();
  }
  disconnect() { }
}
