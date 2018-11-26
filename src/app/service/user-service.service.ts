import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConstant} from "../app-constant";

@Injectable()
export class UserServiceService {
  serverURL = AppConstant.serverURL;

  constructor(private _http : HttpClient) { }

  getAllActiveClientNames() {
    return this._http.get(this.serverURL + '/clientname');
  }

  getAllSessionsByClientId(clientId,userId) {
    const url = this.serverURL + '/clients/' + clientId + '/sessions' + '?userId=' + userId;
    return this._http.get(url);
  }

  getNextAvailableTokenBySessionId(sessionId) {
    const url = this.serverURL + '/sessions/' + sessionId + '/nextAvailableToken';
    return this._http.get(url);
  }

  confirmBooking(body) {
    return this._http.post(this.serverURL + '/booktoken', body);
  }

}
