import { Cliente } from './../../Interface/cliente';
import { Component, OnInit } from '@angular/core';
import { GrupoService } from '../../Service/grupo.service';
import { ClienteService } from '../../Service/cliente.service';
import { Grupo } from '../../Interface/grupo';
import { Router } from '@angular/router';
/*import { Cliente } from '../../Interface/cliente';*/

@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.component.html',
  styleUrls: ['./add-cliente.component.css']
})
export class AddClienteComponent implements OnInit {
  /*Client Attributes*/
  nome: string;
  grupos: Grupo[];
  cep: string;
  cidade: string;

  constructor(private router: Router, private clienteService: ClienteService, private grupoService: GrupoService) {
    this.grupoService.getData().subscribe(data => {
      this.grupos = data;
    });

  }

  ngOnInit() {
  }


  /*Take data sended from view and send it to the service */
  criarCliente(idgrupo: number): void {
  const newCliente: Cliente = { nome: this.nome, cep: this.cep, cidade: this.cidade } as Cliente;
    console.log(newCliente);
    this.clienteService.criarClienteService(newCliente, idgrupo).subscribe((data) => {
      console.log(data);
      this.router.navigate(['/clientes']);
    });

  }


}
