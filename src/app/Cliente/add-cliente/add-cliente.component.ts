import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';

import { GrupoService } from '../../Service/grupo.service';
import { ClienteService } from '../../Service/cliente.service';
import { Grupo } from '../../Interface/grupo';
import { ViaCepService } from '../../Service/via-cep.service';

@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.component.html',
  styleUrls: ['./add-cliente.component.css']
})
export class AddClienteComponent implements OnInit {
  cliente: FormGroup;
  gruposDataSelect: Grupo[];
  cepMask = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  constructor(
    private router: Router,
    private clienteService: ClienteService,
    private grupoService: GrupoService,
    // private toastr: ToastrService,
    private viaCepService: ViaCepService
  ) { }

  ngOnInit() {
    this.cliente = new FormGroup({
      nome: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(80),
        Validators.pattern('^[A-ZÄËÏÖÜÁÉÍÓÚÂÊÎÔÛÀÈÌÒÙ]{1}[ A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ.-]+$')]),
      grupo: new FormGroup({
        id: new FormControl('', [Validators.required])
      }),
      cep: new FormControl(''),
      cidade: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(80)])
    });
    this.grupoService.getData().subscribe(data => {
      this.gruposDataSelect = data;
    });
  }

  /*Take data sended from view and send it to the service */
  criarCliente(): void {
    this.clienteService
      .criarClienteService(this.cliente.value)
      .subscribe(data => {
        this.router.navigate(['/clientes']);
      });
  }

  pesquisaCEP() {
    const cep = this.cliente.value.cep.replace('-', '');

    const localidade = this.viaCepService.pesquisaCEP(cep);

    this.cliente.patchValue({
      cidade: localidade
    });
  }

}
