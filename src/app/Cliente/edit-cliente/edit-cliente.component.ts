import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ViaCepService } from '../../Service/via-cep.service';
import { ClienteService } from '../../Service/cliente.service';
import { GrupoService } from '../../Service/grupo.service';
import { Grupo } from '../../Interface/grupo';

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent implements OnInit {
  gruposDataSelect: Grupo[];
  cepMask = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  cliente: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService,
    private grupoService: GrupoService,
    private viaCepService: ViaCepService
  ) {
    this.cliente = new FormGroup({
      nome: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(80),
        Validators.pattern('^[A-ZÄËÏÖÜÁÉÍÓÚÂÊÎÔÛÀÈÌÒÙ]{1}[ A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ.-]+$')]),
      grupo: new FormGroup({
        id: new FormControl('', [Validators.required])
      }),
      cep: new FormControl('',[Validators.required]),
      cidade: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(80)])
    });
    this.grupoService.getData().subscribe(data => {
      this.gruposDataSelect = data;
    });

    this.route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');
      this.clienteService.getCliente(id).subscribe(data => {
        this.cliente.patchValue({
          id: data.id,
          nome: data.nome,
          cep: data.cep,
          cidade: data.cidade,
          grupo: data.grupo
        });
      });
    });
  }

  ngOnInit() {
    this.grupoService.getData().subscribe(data => {
      this.gruposDataSelect = data;
    });
  }

  onSubmit(): void {
    console.log(this.cliente.value);
    this.clienteService.atualizarClienteService(this.cliente.value).subscribe((data) => {
      this.router.navigate(['/clientes']);
    });
  }

  pesquisaCEP() {
    const cep = this.cliente.value.cep.replace('-', '');



    const address = this.viaCepService.pesquisaCEP(cep);

    address.subscribe(data => {
      console.log(data.erro);
      if (data.erro !== true) {
        this.cliente.patchValue({
          cidade: data.localidade
        });
      }
    });
  }
}
