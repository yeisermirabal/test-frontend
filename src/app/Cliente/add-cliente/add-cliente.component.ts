import { Cliente } from './../../Interface/cliente';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  /*Client Attributes*/
  nome: string;
  grupos: Grupo[];
  cep: string;
  cidade: string;
  zipcodeModel = '';
  zipcodeMask = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/];
  searchAddress: Address;

  constructor(
    private router: Router,
    private clienteService: ClienteService,
    private grupoService: GrupoService,
    private toastr: ToastrService,
    private viaCepService: ViaCepService
  ) {}

  ngOnInit() {
    this.grupoService.getData().subscribe(data => {
      this.grupos = data;
    });
  }

  /*Take data sended from view and send it to the service */
  criarCliente(idgrupo: number): void {
    const newCliente: Cliente = {
      nome: this.nome,
      cep: this.cep,
      cidade: this.cidade
    } as Cliente;
    console.log(newCliente);
    this.clienteService
      .criarClienteService(newCliente, idgrupo)
      .subscribe(data => {
        console.log(data);
        this.router.navigate(['/clientes']);
      });
  }

  limpaFormularioCEP(): void {
    // Limpa valores do formulário de cep.
    this.cidade = null;
  }
  meuCallback(conteudo): void {
    if (!('erro' in conteudo)) {
      // Atualiza os campos com os valores.
      this.cidade = conteudo.localidade;
    } else {
      // CEP não Encontrado.
      this.limpaFormularioCEP();
      alert('CEP não encontrado.');
    }
  }
  pesquisaCEP(cepValor: string) {
    // Nova variável "cep" somente com dígitos.
    const cep = cepValor.replace(/\D/g, '');

    // Verifica se campo cep possui valor informado.
    if (cep !== '') {
      // Expressão regular para validar o CEP.
      const validaCEP = /^[0-9]{8}$/;
      // Valida o formato do CEP.
      if (validaCEP.test(cep)) {
        // Preenche os campos com "..." enquanto consulta webservice.
        this.cidade = '...';
        // Cria um elemento javascript.
        const script = document.createElement('script');

        // Sincroniza com o callback.
        script.src =
          'https://viacep.com.br/ws/' +
          cep +
          '/json/?callback=this.meuCallback()';

        // Insere script no documento e carrega o conteúdo.
        document.body.appendChild(script);
      } else {
        // cep é inválido.
        this.limpaFormularioCEP();
        alert('Formato de CEP inválido.');
      }
    } else {
      // cep sem valor, limpa formulário.
      this.limpaFormularioCEP();
    }
  }

  onClickZipcode(zipcode: string) {
    zipcode = zipcode.replace('-', '');

    if (this.verifyZipcode(zipcode)) {
      this.viaCepService.getAddressByZipCode(zipcode).subscribe(
        address => {
          if (address.erro === true) {
            this.searchAddress = undefined;
            this.toastr.warning("ZIP Code not found.", "Ops...");
          } else {
            this.searchAddress = address;
          }
        },
        error => {
          this.toastr.error("Error: ${error.message}.", "Ops...");
          this.searchAddress = undefined;
        }
      );
    } else {
      this.toastr.error("Enter a valid ZIP Code.", "Ops...");
      this.searchAddress = undefined;
    }
  }

  verifyZipcode(zipcode: string): boolean {
    if (zipcode.length === 8) {
      return true;
    }
    return false;
  }
}
