import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { LoginComponent } from "app/login/login.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ValidationDirective } from "app/directive/validation.directive";

@NgModule({
    imports: [ RouterModule, CommonModule, ReactiveFormsModule],
    declarations: [ NavbarComponent, LoginComponent, ValidationDirective],
    exports: [ NavbarComponent ]
})

export class NavbarModule {}
