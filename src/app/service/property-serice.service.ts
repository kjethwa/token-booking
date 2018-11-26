import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class PropertySericeService {

  clientURL = 'http://localhost:8080';
  constructor(private _http : HttpClient) { }

  getAllClientCategory() {
    return this._http.get(this.clientURL + '/properties/clientcategory');
  }

}
