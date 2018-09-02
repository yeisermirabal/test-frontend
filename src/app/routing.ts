import {RouterModule, Routes} from '@angular/router';
/*Components related to Clients*/
import { AddClienteComponent } from './Components/Cliente/add-cliente/add-cliente.component';
import { EditClienteComponent } from './Components/Cliente/edit-cliente/edit-cliente.component';
import { ListClienteComponent } from './Components/Cliente/list-cliente/list-cliente.component';
/*Components related to Groups*/
import { AddGrupoComponent } from './Components/Grupo/add-grupo/add-grupo.component';
import { EditGrupoComponent } from './Components/Grupo/edit-grupo/edit-grupo.component';
import { ListGrupoComponent } from './Components/Grupo/list-grupo/list-grupo.component';

import { DashboardComponent } from './Components/Dashboard/dashboard.component';


const routes: Routes = [
  {path: '', component: DashboardComponent},
    {path: 'clientes', component: ListClienteComponent},
    {path: 'clientes/editar/:id', component: EditClienteComponent},
    {path: 'clientes/adicionar', component: AddClienteComponent},
    {path: 'grupos', component: ListGrupoComponent},
    {path: 'grupos/editar/:id', component: EditGrupoComponent},
    {path: 'grupos/adicionar', component: AddGrupoComponent}
  ];

  export const routing = RouterModule.forRoot(routes);
