import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { ClientFormServiceService } from "src/app/client-details/client-form-service.service";

@Component({
  selector: 'app-search-client',
  templateUrl: './search-client.component.html',
  styleUrls: ['./search-client.component.css']
})
export class SearchClientComponent implements OnInit {
  searchForm: FormGroup;
  originalRecord = {
      clientName : '',
      ownerName : '',
      category : '',
      state : '',
      city : '',
      status : ''
  };
  clientRecords = [{
    clientName : 'Jethwa Clinic',
    ownerName : 'Dr. Kalpesh Jethwa',
    category : 'Clinic',
    state : 'Maharashtra',
    city : 'Mumbai',
    status : 'Active'
  },
  {
    clientName : 'DEF',
    ownerName : 'Dr. Ramesh Shah',
    category : 'Grocery',
    state : 'Maharashtra',
    city : 'Jalgaon',
    status : 'Active'
  }];
  constructor(private _formService : ClientFormServiceService) { }

  ngOnInit() {
    this.searchForm = this._formService.createSearchForm();
  }

  onSearchClick(form) {
    console.log('form', form.value);
  }

  onResetClick() {
    this.searchForm.reset();
    this.searchForm.patchValue(this.originalRecord);
  }
}
