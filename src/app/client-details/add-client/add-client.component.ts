import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {ClientFormServiceService} from "../service/client-form-service.service";
import {Router} from "@angular/router";
import {Client} from "../../model/Client";
import {ClientOperation} from "../../model/ClientOperaion";

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  clientAddForm: FormGroup;
  clientOperationForm: FormGroup;
  client: Client;
  clientOperation: ClientOperation[];

  constructor(private _formService: ClientFormServiceService,
              private _router: Router) {
  }

  ngOnInit() {
    this.client = new Client();
    this.clientAddForm = this._formService.createClientForm();
    this.clientOperationForm = this._formService.createClientOperationForm();
  }

  onAddClick(form){
    alert("Cool");
    this.clientOperation.push(form.value);
    console.log('form', this.clientOperation);
  }

}
