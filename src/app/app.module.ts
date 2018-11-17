import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SearchClientComponent } from './client-details/search-client/search-client.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddClientComponent } from './client-details/add-client/add-client.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { RegisterComponent } from './register/register.component';
import { ValidationDirective } from './directive/validation.directive';
import { ClientsessionComponent } from './user-screen/clientsession/clientsession.component';
import { IndexComponent } from './index/index.component';
import { CurrentSessionComponent } from './user-screen/clientsession/partials/current-session/current-session.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchClientComponent,
    LoginComponent,
    AddClientComponent,
    RegisterComponent,
    ValidationDirective,
    ClientsessionComponent,
    IndexComponent,
    CurrentSessionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
