import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { ClienteService } from '../../Service/cliente.service';
import { GrupoService } from '../../Service/grupo.service';
import { Cliente } from '../../Interface/cliente';
import { Grupo } from '../../Interface/grupo';

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent implements OnInit {
  cliente: Cliente;
  id: number;
  nome: string;
  grupos: Grupo[];
  grupoId: number;
  cep: string;
  cidade: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService,
    private grupoService: GrupoService
  ) {
    this.route.queryParams.subscribe(params => {
      this.id = params.id;
      this.nome = params.nome;
      this.cep = params.cep;
      this.cidade = params.cidade;
      this.grupoId = params.grupo;
    });
  }

  ngOnInit() {
    this.grupoService.getData().subscribe(data => {
      this.grupos = data;
    });
  }

  editarCliente(): void {
    const newCliente: Cliente = {
      id: this.id,
      nome: this.nome,
      cep: this.cep,
      cidade: this.cidade,
      grupo: {id: this.grupoId}
    } as Cliente;
    this.clienteService.atualizarClienteService(newCliente).subscribe(data => {
      this.router.navigate(['clientes']);
    });
  }
}
