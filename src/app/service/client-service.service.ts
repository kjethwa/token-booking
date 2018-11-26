import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConstant} from "../app-constant";

@Injectable()
export class ClientServiceService {
  serverURL = AppConstant.serverURL;

  constructor(private _http : HttpClient) { }

  getClients() {
    return this._http.get(this.serverURL + '/clients');
  }

  getClientById(id) {
    return this._http.get(this.serverURL + '/clients/' + id);
  }

  addClients(data) {
    return this._http.post(this.serverURL  + '/clients', data);
  }

  updateClient(data) {
    return this._http.put(this.serverURL  + '/clients', data);
  }

  getSearchResults(parameter) {
    return this._http.get(this.serverURL + '/searchClients?search=' + parameter);
  }
}
