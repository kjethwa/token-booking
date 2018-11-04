import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {
  clientURL = 'http://localhost:8080';

  constructor(private _http : HttpClient) { }

  getClients() {
    return this._http.get(this.clientURL + '/clients');
  }

  getClientById(id) {
    return this._http.get(this.clientURL + '/clients/' + id);
  }

  addClients(data) {
    return this._http.post(this.clientURL  + '/clients', data);
  }

  updateClient(data) {
    return this._http.put(this.clientURL  + '/clients', data);
  }

  getSearchResults(parameter) {
    return this._http.get(this.clientURL + '/searchClients?search=' + parameter);
  }
}
