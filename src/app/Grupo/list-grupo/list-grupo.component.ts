import { Component, OnInit } from '@angular/core';
import { GrupoService } from '../../Service/grupo.service';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { Grupo } from '../../Interface/grupo';
import {Router,NavigationExtras} from "@angular/router";

@Component({
  selector: 'list-grupo',
  templateUrl: './list-grupo.component.html',
  styleUrls: ['./list-grupo.component.css']
})
export class ListGrupoComponent implements OnInit {

  dataSource: GrupoDataSource;
  displayedColumns = ['id','nome', 'actions'];

  constructor(private router: Router, private grupoService: GrupoService) {
  }

  ngOnInit() {
    this.dataSource = new GrupoDataSource(this.grupoService);
  }

  showEditGrupo(grupo){      
    let grupoParams: NavigationExtras = {
      queryParams: {
        id: grupo.id,
        nome: grupo.nome
      }
  }
  this.router.navigate(['editgrupo'], grupoParams);
  }

 /* updateUser() {
    this.userService.updateUser(this.userUpdated).subscribe(data => {
      console.log(data);
    })
  }*/

  deleteGrupo(grupo): void {
     this.grupoService.deleteGrupoService(grupo.id).subscribe(data => {
      console.log(data);
   //   this.dataSource.connect().splice(grupo.id);
    });
    
   } 
  

  


}

export class GrupoDataSource extends DataSource<any> {
  private grupos: Grupo[];

  constructor(private grupoService: GrupoService) {
    super();
  };

  connect(): Observable<Grupo[]> {
    return this.grupoService.getData();
  }
  disconnect() { }
  
}
