import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { GrupoService } from '../../Service/grupo.service';
import { Grupo } from '../../Interface/grupo';

@Component({
  selector: 'app-add-grupo',
  templateUrl: './add-grupo.component.html',
  providers: [ GrupoService ],
  styleUrls: ['./add-grupo.component.css']
})
export class AddGrupoComponent implements OnInit { 
  grupo: Grupo; 

  constructor(private router: Router, private grupoService: GrupoService) { 
  }

  ngOnInit() {
  }
 
  /*Take data sended from view and send it to the service */
  criarGrupo(nome: string): void {
    nome = nome.trim();
    if (!nome) { return; }

    const newGrupo: Grupo = { nome } as Grupo;
    this.grupoService.criarGrupoService(newGrupo).subscribe((data) => {
      console.log(data);
      this.router.navigate(['/grupos']);
    });

  } 

}
