import { Component, OnInit } from '@angular/core';
import { GrupoService } from '../../Service/grupo.service';
import { Grupo } from '../../Interface/grupo';
/*import { Cliente } from '../../Interface/cliente';*/

@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.component.html',
  styleUrls: ['./add-cliente.component.css']
})
export class AddClienteComponent implements OnInit {
  /*Client Attributes*/

  nome:string;
  grupos: Grupo[] = [];
  cep:string;
  cidade:string;

  constructor(private grupoService: GrupoService) {
    this.grupoService.getData().subscribe(data => {
      this.grupos = data;
    });

  }

  ngOnInit() {
  }

  public criarCliente() {
    console.log(this.nome);

   /* nome:string;
    grupos: Grupo[] = [];
    cep:string;
    cidade:string;
    this.grupoService.postData();*/
    /* logic to create a customer from the form information*/

  }

}
