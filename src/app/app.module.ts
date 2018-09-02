import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TextMaskModule } from 'angular2-text-mask';

/*Components related to Clients*/
import { AddClienteComponent } from './Components/Cliente/add-cliente/add-cliente.component';
import { EditClienteComponent } from './Components/Cliente/edit-cliente/edit-cliente.component';
import { ListClienteComponent } from './Components/Cliente/list-cliente/list-cliente.component';
/*Components related to Groups*/
import { AddGrupoComponent } from './Components/Grupo/add-grupo/add-grupo.component';
import { EditGrupoComponent } from './Components/Grupo/edit-grupo/edit-grupo.component';
import { ListGrupoComponent } from './Components/Grupo/list-grupo/list-grupo.component';
/*File with routes*/
import { routing } from './routing';
/* Import material components */
import { MaterialModule } from './Modules/material';
/*Import Service*/
import { ClienteService } from './Services/Cliente/cliente.service';
import { GrupoService } from './Services/Grupo/grupo.service';
import { ViaCepService } from './Services/ViaCep/via-cep.service';

import { NavigationComponent } from './Components/Navigation/navigation.component';
import { DashboardComponent } from './Components/Dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    AddClienteComponent,
    EditClienteComponent,
    ListClienteComponent,
    AddGrupoComponent,
    EditGrupoComponent,
    ListGrupoComponent,
    NavigationComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    routing,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    LayoutModule,
    FormsModule,
    TextMaskModule
  ],
  providers: [ClienteService, GrupoService, ViaCepService],
  bootstrap: [AppComponent]
})
export class AppModule { }
