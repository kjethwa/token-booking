import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConstant} from "../app-constant";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  serverURL = AppConstant.serverURL;

  constructor(private _http : HttpClient) { }

  registerUser(data) {
    return this._http.post(this.serverURL  + '/user', data);
  }
}
