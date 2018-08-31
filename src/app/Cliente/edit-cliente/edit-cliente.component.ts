import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { ViaCepService } from "../../Service/via-cep.service";
import { ClienteService } from "../../Service/cliente.service";
import { GrupoService } from "../../Service/grupo.service";
import { Cliente } from "../../Interface/cliente";
import { Grupo } from "../../Interface/grupo";

@Component({
  selector: "app-edit-cliente",
  templateUrl: "./edit-cliente.component.html",
  styleUrls: ["./edit-cliente.component.css"]
})
export class EditClienteComponent implements OnInit {
  gruposDataSelect: Grupo[];
  cepMask = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/];
  cliente: FormGroup;
  // cliente: Cliente;
 /* id: number;
  nome: string;
  grupoId: number;
  cep: string;
  cidade: string;*/

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService,
    private grupoService: GrupoService,
    private viaCepService: ViaCepService
  ) {
    this.route.queryParams.subscribe(params => {
      this.cliente.patchValue({
        id: params.id,
        nome: params.nome,
        cep: params.cep,
        cidade: params.cidade,
        grupo: params.grupo
      });
    });
  }

  ngOnInit() {

    this.grupoService.getData().subscribe(data => {
      this.gruposDataSelect = data;
    });
  }

 /* editarCliente(): void {
    const newCliente: Cliente = {
      id: this.id,
      nome: this.nome,
      cep: this.cep,
      cidade: this.cidade,
      grupo: { id: this.grupoId }
    } as Cliente;
    this.clienteService.atualizarClienteService(newCliente).subscribe(data => {
      this.router.navigate(["clientes"]);
    });
  }*/
}
