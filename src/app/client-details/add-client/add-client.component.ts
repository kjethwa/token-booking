import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {ClientFormServiceService} from "../client-form-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  addForm: FormGroup;

  constructor(private _formService : ClientFormServiceService,
              private _router : Router) { }

  ngOnInit() {
    this.addForm = this._formService.createSearchForm();
  }

}
