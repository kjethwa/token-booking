import { Injectable } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import {Client} from "../../model/Client";

@Injectable({
  providedIn: 'root'
})
export class ClientFormServiceService {

  constructor(private _fb : FormBuilder) { }

  createSearchForm() {
    return this._fb.group({
      clientName : [''],
      ownerName : '',
      category : '',
      state : '',
      city : '',
      status : ''
    });
  }
  createClientForm() {
    return this._fb.group({
      clientName : '',
      ownerFirstName : '',
      ownerLastName : '',
      clientCategory : '',
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
      longitude : ''
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
