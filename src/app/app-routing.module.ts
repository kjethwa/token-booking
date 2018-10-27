import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from "@angular/router";


import { SearchClientComponent } from './client-details/search-client/search-client.component';
import { AppComponent } from './app.component';
import { LoginComponent } from "src/app/login/login.component";

const routes: Routes = [
 { path: 'login', component: LoginComponent },
 { path: 'search', component: SearchClientComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }

