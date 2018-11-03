import { Component, OnInit } from '@angular/core';
import {FormArray, FormGroup} from "@angular/forms";
import {ClientFormServiceService} from "../../service/client-form-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Client} from "../../model/Client";
import {ClientServiceService} from "../../service/client-service.service";
import {ClientOperation} from "../../model/ClientOperaion";
import {forEach} from "@angular/router/src/utils/collection";
import {PropertySericeService} from "../../service/property-serice.service";

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
  clientCategory: any;

  constructor(private _formService: ClientFormServiceService,
              private _router: Router,
              private _clientService: ClientServiceService,
              private _activatedRoute: ActivatedRoute,
              private _propertyService : PropertySericeService) {

  }

  ngOnInit() {
    this.clientAddForm = this._formService.createClientForm();
    this.clientOperationForm = this._formService.createClientOperationForm();
    this._activatedRoute.params.subscribe( params => this.getClient(params['id']));
    this._propertyService.getAllClientCategory().subscribe(response => {
      this.clientCategory = response;
    });
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

  private getClient(id: string) {
    if (id != undefined && id != "") {
      this._clientService.getClientById(id).subscribe(response => {
        this.clientAddForm.patchValue(response);
        this.client = <Client> response;

        for (let i = 0; i < this.client.daysOfOperation.length; i++) {
          this.addDaysOfOperation(this.client.daysOfOperation[i]);
        }
      });
    }
  }

  private addDaysOfOperation(value){
    const instance = this._formService.createClientOperationForm();
    instance.patchValue(value);
    (<FormArray>this.clientAddForm.get('daysOfOperation')).push(instance);
  }

  onUpdateClientClick() {
    const clientDetails = this.clientAddForm.getRawValue();

    this._clientService.updateClient(clientDetails).subscribe((res) => {
      console.log(res);
    })
  }
}
