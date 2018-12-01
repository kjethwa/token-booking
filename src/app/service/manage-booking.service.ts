import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConstant} from "../app-constant";

@Injectable()
export class ManageBookingService {
  serverURL = AppConstant.serverURL;

  constructor(private _http : HttpClient) { }

  getBookingsByUserId(userId) {
      const url = this.serverURL + '/users/'+ userId +'/bookings';
      return this._http.get(url);
  }

  cancelBooking(bookingId) {
    const url = this.serverURL + '/cancelBooking/' + bookingId;
    return this._http.put(url, null);
  }

}
