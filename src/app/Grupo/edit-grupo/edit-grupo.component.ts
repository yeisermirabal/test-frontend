import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { GrupoService } from '../../Service/grupo.service';
import { Grupo } from '../../Interface/grupo';

@Component({
  selector: 'app-edit-grupo',
  templateUrl: './edit-grupo.component.html',
  styleUrls: ['./edit-grupo.component.css']
})
export class EditGrupoComponent implements OnInit {
  grupo: Grupo;
  nome: string;
  id: number;

  constructor(private route: ActivatedRoute, private router: Router, private grupoService: GrupoService) {
    this.route.queryParams.subscribe(params => {
      this.id = params.id;
      this.nome = params.nome;
  });
  }

  ngOnInit() {
  }

  editarGrupo(): void {
    const newGrupo: Grupo = { id: this.id, nome: this.nome } as Grupo;
    this.grupoService.atualizarGrupoService(newGrupo).subscribe((data) => {
      this.router.navigate(['grupos']);
    });
  }

}
