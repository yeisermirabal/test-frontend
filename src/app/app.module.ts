import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { TextMaskModule } from 'angular2-text-mask';

/*Components related to Clients*/
import { AddClienteComponent } from './Cliente/add-cliente/add-cliente.component';
import { EditClienteComponent } from './Cliente/edit-cliente/edit-cliente.component';
import { ListClienteComponent } from './Cliente/list-cliente/list-cliente.component';
/*Components related to Groups*/
import { AddGrupoComponent } from './Grupo/add-grupo/add-grupo.component';
import { EditGrupoComponent } from './Grupo/edit-grupo/edit-grupo.component';
import { ListGrupoComponent } from './Grupo/list-grupo/list-grupo.component';
/*File with routes*/
import {routing} from './routing';
import {MaterialModule} from './Module/material';
/*Import Service*/
import {ClienteService} from './Service/cliente.service';
import {GrupoService} from './Service/grupo.service';
import {ViaCepService} from './Service/via-cep.service';
import { NavigationComponent } from './navigation/navigation.component';


@NgModule({
  declarations: [
    AppComponent,
    AddClienteComponent,
    EditClienteComponent,
    ListClienteComponent,
    AddGrupoComponent,
    EditGrupoComponent,
    ListGrupoComponent,
    NavigationComponent
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
