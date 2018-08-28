import { Component, OnInit } from '@angular/core';
import { GrupoService } from '../../Service/grupo.service';
import { Grupo } from '../../Interface/grupo';

@Component({
  selector: 'app-add-grupo',
  templateUrl: './add-grupo.component.html',
  styleUrls: ['./add-grupo.component.css']
})
export class AddGrupoComponent implements OnInit { 
  groups: Grupo[]; 
  nome:string;

  constructor( private grupoService: GrupoService) { }

  ngOnInit() {
  }

  criarGrupo(nome: string): void {
    this.nome = this.nome.trim();
    if (!this.nome) { return; }

    const nuevoGrupo: Grupo = { nome } as Grupo;
    this.grupoService.addGrupo(nuevoGrupo).subscribe(data => this.groups.push(group));
  }

}
