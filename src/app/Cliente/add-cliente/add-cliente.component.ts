import { Cliente } from './../../Interface/cliente';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';

import { GrupoService } from '../../Service/grupo.service';
import { ClienteService } from '../../Service/cliente.service';
import { Grupo } from '../../Interface/grupo';
import { ViaCepService } from '../../Service/via-cep.service';
import { Address } from '../../Interface/address';

/*import { Cliente } from '../../Interface/cliente';*/

@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.component.html',
  styleUrls: ['./add-cliente.component.css']
})
export class AddClienteComponent implements OnInit {
  cliente: FormGroup;
  /*Client Attributes*/
  nome: string;
  grupos: Grupo[];
  // cep: string;
  cidade: string;
  cepModel: string;
  cepMask = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  searchAddress: Address;

  constructor(
    private router: Router,
    private clienteService: ClienteService,
    private grupoService: GrupoService,
    private fb: FormBuilder,
   // private toastr: ToastrService,
    private viaCepService: ViaCepService
  ) {}

  ngOnInit() {
    this.clienteForm = new FormGroup({
      nome: new FormControl(''),
      grupo: new FormControl(''),
      cepModel: new FormControl(''),
      cidade: new FormControl('')
    });
    this.cliente = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      grupo: ['', [Validators.required]],
      cepModel: ['', [Validators.required]],
      cidade: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]]      
    });
    this.grupoService.getData().subscribe(data => {
      this.grupos = data;
    });
  }

  onSubmit({ value, valid }: { value: cliente, valid: boolean }) {
    console.log(value, valid);
  }

  /*Take data sended from view and send it to the service */
  criarCliente(idgrupo: number): void {
    alert('Los campos son requeridos1');
   if (!this.nome.trim() || !this.cepModel.trim() || !this.cidade.trim()) {
return alert('Los campos son requeridos2');
    }
    const newCliente: Cliente = {
      nome: this.nome,
      cep: this.cepModel,
      cidade: this.cidade
    } as Cliente;
    this.clienteService
      .criarClienteService(newCliente, idgrupo)
      .subscribe(data => {
        console.log(data);
        this.router.navigate(['/clientes']);
      });
  }

  pesquisaCEP(cep: string) {
    cep = cep.replace('-', '');

    if (this.verifyCepCode(cep)) {
      this.viaCepService.getAddressByCepCode(cep).subscribe(
        address => {
          if (address.erro === true) {
            this.cidade = undefined;
            alert('ZIP Code not found.');
           // this.toastr.warning("ZIP Code not found.", "Ops...");
          } else {
            this.cidade = address.localidade;
          }
        },
        error => {
          alert('Error: ${error.message}.');
      //    this.toastr.error("Error: ${error.message}.", "Ops...");
            this.cidade = undefined;
        }
      );
    } else {
      alert('Enter a valid ZIP Code.');
     // this.toastr.error("Enter a valid ZIP Code.", "Ops...");
     this.cidade = undefined;
    }
  }

  verifyCepCode(cep: string): boolean {
    if (cep.length === 8) {
      return true;
    }
    return false;
  }
}
