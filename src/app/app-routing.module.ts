import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from "@angular/router";


import { SearchClientComponent } from './client-details/search-client/search-client.component';
import { AppComponent } from './app.component';
import { LoginComponent } from "src/app/login/login.component";
import { AddClientComponent } from "src/app/client-details/add-client/add-client.component";
import { RegisterComponent } from "src/app/register";
import {ClientsessionComponent} from "./user-screen/clientsession/clientsession.component";

const routes: Routes = [
 { path: 'login', component: LoginComponent },
 { path: 'register', component: RegisterComponent },
 { path: 'search', component: SearchClientComponent },
 { path: 'add', component: AddClientComponent },
 { path: 'edit/:id', component: AddClientComponent },
 { path: 'view/:id', component: AddClientComponent },
 { path: 'user', component: ClientsessionComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }

