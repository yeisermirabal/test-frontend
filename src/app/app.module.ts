// dependencies
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

// components
import { AppComponent } from './app.component';
import { AddClienteComponent } from './Components/Cliente/add-cliente/add-cliente.component';
import { EditClienteComponent } from './Components/Cliente/edit-cliente/edit-cliente.component';
import { ListClienteComponent } from './Components/Cliente/list-cliente/list-cliente.component';
import { AddGrupoComponent } from './Components/Grupo/add-grupo/add-grupo.component';
import { EditGrupoComponent } from './Components/Grupo/edit-grupo/edit-grupo.component';
import { ListGrupoComponent } from './Components/Grupo/list-grupo/list-grupo.component';
import { NavigationComponent } from './Components/Navigation/navigation.component';
import { DashboardComponent } from './Components/Dashboard/dashboard.component';

// services
import { ClienteService } from './Services/Cliente/cliente.service';
import { GrupoService } from './Services/Grupo/grupo.service';
import { ViaCepService } from './Services/ViaCep/via-cep.service';

// routing
import { routing } from './routing';

// UI
import { MaterialModule } from './Modules/material';

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
    TextMaskModule,
    ModalDialogModule.forRoot()
  ],
  providers: [ClienteService, GrupoService, ViaCepService],
  bootstrap: [AppComponent]
})
export class AppModule { }
