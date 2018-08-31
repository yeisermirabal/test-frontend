import { GrupoService } from './../../Service/grupo.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-grupo',
  templateUrl: './edit-grupo.component.html',
  styleUrls: ['./edit-grupo.component.css']
})
export class EditGrupoComponent implements OnInit {

  grupo: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private grupoService: GrupoService) {

    this.grupo = new FormGroup({
      id: new FormControl(''),
      nome: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(60)])
    });

    this.route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');
      this.grupoService.getGrupo(id).subscribe(data => {
        this.grupo.patchValue({
          id: data.id,
          nome: data.nome
        });

      });
    });
  }

  ngOnInit() {
  }

  onSubmit(): void {
    this.grupoService.criarGrupoService(this.grupo.value).subscribe((data) => {
      this.router.navigate(['/grupos']);
    });
  }

}
