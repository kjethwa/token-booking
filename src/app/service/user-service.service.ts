import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConstant} from "../app-constant";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  serverURL = AppConstant.serverURL;

  constructor(private _http : HttpClient) { }

  getAllActiveClientNames() {
    return this._http.get(this.serverURL + '/clientname/');
  }

}
