import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';

import { GrupoService } from '../../Service/grupo.service';
import { ClienteService } from '../../Service/cliente.service';
import { Grupo } from '../../Interface/grupo';
import { Cliente } from './../../Interface/cliente';
import { ViaCepService } from '../../Service/via-cep.service';
import { Address } from '../../Interface/address';

@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.component.html',
  styleUrls: ['./add-cliente.component.css']
})
export class AddClienteComponent implements OnInit {
  cliente: FormGroup;
  /*Client Attributes*/
  gruposDataSelect: Grupo[];
  cepMask = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  constructor(
    private router: Router,
    private clienteService: ClienteService,
    private grupoService: GrupoService,
   // private toastr: ToastrService,
    private viaCepService: ViaCepService
  ) {}

  ngOnInit() {
    this.cliente = new FormGroup({        
      nome: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]),
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

    if (this.verifyCepCode(cep)) {
      this.viaCepService.getAddressByCepCode(cep).subscribe(
        address => {
          if (address.erro === true) {
            this.cliente.patchValue({
              cidade: undefined
            });
            alert('ZIP Code not found.');
           // this.toastr.warning("ZIP Code not found.", "Ops...");
          } else {
            this.cliente.patchValue({
              cidade: address.localidade
            });            
          }
        },
        error => {
          alert('Error: ${error.message}.');
      //    this.toastr.error("Error: ${error.message}.", "Ops...");
      this.cliente.patchValue({
        cidade: undefined
      });
        }
      );
    } else {
      alert('Enter a valid ZIP Code.');
     // this.toastr.error("Enter a valid ZIP Code.", "Ops...");
     this.cliente.patchValue({
      cidade: undefined
    });
    }
  }

  verifyCepCode(cep: string): boolean {
    if (cep.length === 8) {
      return true;
    }
    return false;
  }
}
