import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';

import { GrupoService } from '../../../Services/Grupo/grupo.service';
import { ClienteService } from '../../../Services/Cliente/cliente.service';
import { Grupo } from '../../../Interfaces/grupo';
import { ViaCepService } from '../../../Services/ViaCep/via-cep.service';

@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.component.html',
  styleUrls: ['./add-cliente.component.css']
})
export class AddClienteComponent implements OnInit {
  cliente: FormGroup;
  gruposDataSelect: Grupo[];
  cepMask = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  procesando = false;

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
      cep: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      cidade: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(80)])
    });
    this.grupoService.getData().subscribe(data => {
      this.gruposDataSelect = data;
    });
  }

  /*Take data sended from view and send it to the service */
  criarCliente(): void {
    this.procesando = true;
    this.clienteService
      .criarClienteService(this.cliente.value)
      .subscribe(data => {
         this.procesando = false;
         this.router.navigate(['/clientes']);
      });
  }

  pesquisaCEP() {
    const cep: string = this.cliente.value.cep.replace('-', '');

    if (cep.length === 8) {
      this.viaCepService.getAddressByCepCode(cep).subscribe(data => {
        if (data.erro !== true) {
          this.cliente.patchValue({
            cidade: data.localidade
          });
        }
      });
    }
  }

  disableSubmit() {
    return (this.cliente.invalid || this.procesando);
  }

}
