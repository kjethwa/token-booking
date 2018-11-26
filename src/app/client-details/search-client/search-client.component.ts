import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { ClientFormServiceService } from "app/service/client-form-service.service";
import { Router } from "@angular/router";
import * as _ from 'lodash';
import {ClientServiceService} from "../../service/client-service.service";
import {PropertySericeService} from "../../service/property-serice.service";
// import {a} from "@angular/core/src/render3";

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
      clientCategory : '',
      state : '',
      city : '',
      status : ''
  };
  clientRecords: any = [];
  clientCategory: any;

  constructor(private _formService : ClientFormServiceService,
              private _router : Router,
              private _clientService : ClientServiceService,
              private _propertyService : PropertySericeService) { }

  ngOnInit() {
    this.searchForm = this._formService.createSearchForm();
    this._propertyService.getAllClientCategory().subscribe(response => {
      this.clientCategory = response;
    });
  }

  onSearchClick(form) {
    this.clientRecords = [];
    if (_.isEmpty(form.value)) {
      alert('Please enter atleast one parameter to search');
      return;
    }
    const searchParam = this.searchForm.getRawValue();
    console.log(searchParam);
    this._clientService.getSearchResults("").subscribe((response) => {
      console.log(response);
      this.clientRecords = response;
    })
    console.log('form', form.value);
  }

  onResetClick() {
    this.searchForm.reset();
    this.searchForm.patchValue(this.originalRecord);
  }

  onEditClick(record) {
    this._router.navigate(['edit', record.clientId])
  }
}
