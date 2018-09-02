import {RouterModule, Routes} from '@angular/router';
import { AddClienteComponent } from './Components/Cliente/add-cliente/add-cliente.component';
import { EditClienteComponent } from './Components/Cliente/edit-cliente/edit-cliente.component';
import { ListClienteComponent } from './Components/Cliente/list-cliente/list-cliente.component';
import { AddGrupoComponent } from './Components/Grupo/add-grupo/add-grupo.component';
import { EditGrupoComponent } from './Components/Grupo/edit-grupo/edit-grupo.component';
import { ListGrupoComponent } from './Components/Grupo/list-grupo/list-grupo.component';

import { DashboardComponent } from './Components/Dashboard/dashboard.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
    {path: 'clientes', component: ListClienteComponent},
    {path: 'clientes/adicionar', component: AddClienteComponent},
    {path: 'clientes/editar/:id', component: EditClienteComponent},
    {path: 'grupos', component: ListGrupoComponent},
    {path: 'grupos/adicionar', component: AddGrupoComponent},
    {path: 'grupos/editar/:id', component: EditGrupoComponent}
  ];

  export const routing = RouterModule.forRoot(routes);
