import { Injectable } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ClientFormServiceService {

  constructor(private _fb : FormBuilder) { }

  createSearchForm() {
    return this._fb.group({
      clientName : '',
      ownerName : '',
      category : '',
      state : '',
      city : '',
      status : ''
    });
  }
}
