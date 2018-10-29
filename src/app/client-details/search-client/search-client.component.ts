import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { ClientFormServiceService } from "src/app/client-details/service/client-form-service.service";
import { Router } from "@angular/router";
import * as _ from 'lodash';
import {ClientServiceService} from "../service/client-service.service";

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
  clientRecords: any = [];
  // clientRecords = [{
  //   clientId : 1,
  //   clientName : 'Jethwa Clinic',
  //   ownerName : 'Dr. Kalpesh Jethwa',
  //   category : 'Clinic',
  //   state : 'Maharashtra',
  //   city : 'Mumbai',
  //   status : 'Active'
  // },
  // {
  //   clientId : 2,
  //   clientName : 'Jethwa Clinic',
  //   ownerName : 'Dr. Kalpesh Jethwa',
  //   category : 'Clinic',
  //   state : 'Maharashtra',
  //   city : 'Mumbai',
  //   status : 'Active'
  // },
  // {
  //   clientId : 3,
  //   clientName : 'DEF',
  //   ownerName : 'Dr. Ramesh Shah',
  //   category : 'Grocery',
  //   state : 'Maharashtra',
  //   city : 'Jalgaon',
  //   status : 'Active'
  // }];
  constructor(private _formService : ClientFormServiceService,
              private _router : Router,
              private _clientService : ClientServiceService) { }

  ngOnInit() {
    this.searchForm = this._formService.createSearchForm();
  }

  onSearchClick(form) {
    this.clientRecords = [];
    if (_.isEmpty(form.value)) {
      alert('Please enter atleast one parameter to search');
      return;
    }
    this._clientService.getSearchResults().subscribe((response) => {
        console.log(response);
        this.clientRecords = response;
    })
    console.log('form', form.value);
  }

  onResetClick() {
    this.searchForm.reset();
    this.searchForm.patchValue(this.originalRecord);
  }

  onViewClick(record) {
    this._router.navigate(['view', record.clientId])
  }
}
