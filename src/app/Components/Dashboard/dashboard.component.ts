import { ClienteService } from '../../Services/Cliente/cliente.service';
import { GrupoService } from '../../Services/Grupo/grupo.service';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  Breakpoints,
  BreakpointState,
  BreakpointObserver
} from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  cantidadGrupos = 0;
  cantidadClientes = 0;

  constructor(
    private grupoService: GrupoService,
    private clienteService: ClienteService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.grupoService.getCantidadGrupos().subscribe(data => {
      this.cantidadGrupos = data;
    });
    this.clienteService.getCantidadClientes().subscribe(data => {
      this.cantidadClientes = data;
    });
  }
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Grupos', cols: 2, rows: 1 }
        ];
      }

      return [
        { title: 'Grupos', cols: 1, rows: 1 }
      ];
    })
  );

  cards1 = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [{ title: 'Clientes', content: this.cantidadClientes, cols: 2, rows: 1 }];
      }

      return [{ title: 'Clientes', content: this.cantidadClientes, cols: 1, rows: 1 }];
    })
  );
}
