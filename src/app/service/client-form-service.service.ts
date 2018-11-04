import { Injectable } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import {Client} from "../model/Client";
import { Validators } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ClientFormServiceService {

  constructor(private _fb : FormBuilder) { }

  createSearchForm() {
    return this._fb.group({
      clientName : [''],
      ownerName : '',
      clientCategory : '',
      state : '',
      city : '',
      status : ''
    });
  }
  createClientForm() {
    return this._fb.group({
      clientId : '',
      clientName : ['', Validators.required],
      ownerFirstName : '',
      ownerLastName : '',
      clientCategory : ['', Validators.required],
      status : '',
      prebookingHours : '',
      houseNo : '',
      street : '',
      street1 : '',
      street2 : '',
      street3 : '',
      street4 : '',
      pincode : '',
      country : '',
      state : '',
      city : '',
      latitude : '',
      longitude : '',
      daysOfOperation : this._fb.array([])
    });
  }

  createClientOperationForm() {
    return this._fb.group({
      day : [''],
      noOfTokens : '',
      fromTime : '',
      toTime : ''
    });
  }
}
