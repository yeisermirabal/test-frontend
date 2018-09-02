import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GrupoService } from '../../../Services/Grupo/grupo.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-grupo',
  templateUrl: './add-grupo.component.html',
  providers: [GrupoService],
  styleUrls: ['./add-grupo.component.css']
})

export class AddGrupoComponent implements OnInit {

  grupo: FormGroup;

  constructor(private router: Router, private grupoService: GrupoService) {
    this.grupo = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(60)])
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.grupoService.criarGrupoService(this.grupo.value).subscribe((data) => {
      this.router.navigate(['/grupos']);
    });
  }
}
