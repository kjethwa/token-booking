import { Component, OnInit } from '@angular/core';
import {FormArray, FormGroup} from "@angular/forms";
import {ClientFormServiceService} from "../service/client-form-service.service";
import {Router} from "@angular/router";
import {Client} from "../../model/Client";
import {ClientOperation} from "../../model/ClientOperaion";
import {ClientServiceService} from "../service/client-service.service";

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  editIndex = -1;
  clientAddForm: FormGroup;
  clientOperationForm: FormGroup;
  client: Client;

  constructor(private _formService: ClientFormServiceService,
              private _router: Router,
              private _clientService : ClientServiceService) {
  }

  ngOnInit() {
    this.client = new Client();
    this.clientAddForm = this._formService.createClientForm();
    this.clientOperationForm = this._formService.createClientOperationForm();
  }

  onAddClick(form){

    if (this.editIndex > -1) {
      ((<FormArray>this.clientAddForm.get('daysOfOperation')).at(this.editIndex)).patchValue(form.value);
      this.editIndex = -1;
    } else {
      const instance = this._formService.createClientOperationForm();
      instance.patchValue(form.value);
      (<FormArray>this.clientAddForm.get('daysOfOperation')).push(instance);
    }
    this.clientOperationForm.reset();
    // this.clientOperationForm = this._formService.createClientOperationForm();
    console.log('form', this.clientAddForm);
  }

  onEditDaysOfOperations(daysOfOperation, _index) {
    this.clientOperationForm.patchValue(daysOfOperation);
    this.editIndex = _index;
  }

  onDeleteDaysOfOperations(_index) {
    (<FormArray>this.clientAddForm.get('daysOfOperation')).removeAt((_index));
  }

  onSaveClientClick() {
    const clientDetails = this.clientAddForm.getRawValue();
    console.log('clientDetails', clientDetails);

    this._clientService.addClients(clientDetails).subscribe((res) => {
      console.log(res);
    })
  }

}
