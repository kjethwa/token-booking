import { Injectable } from '@angular/core';
// import { Session } from "app/model/Session";
import * as moment from 'moment';
import * as _ from 'lodash';

@Injectable()
export class UtilService {
  constructor() { }
  createSession(session: any, clientSessionDetails): any {
    let currentSession = {
      date: session.date,
      fromTime: this.getTimeInFormat(session.fromTime),
      toTime: this.getTimeInFormat(session.toTime),
      day: this.getCurrentDayOfWeek(session.date),
      availableToken: session.availableToken,
      clientName: clientSessionDetails.clientIdNameAddress.clientName,
      address: this.createAddress(clientSessionDetails),
      sessionId: session.sessionId,
      isBookAllowed: !session.booked,
      tokenNumber: session.tokenNumber
    }
    return currentSession;
  }

  createSessionOfBookingInfo(bookingInfo: any): any {
    let currentSession = {
      date: bookingInfo.date,
      fromTime: this.getTimeInFormat(bookingInfo.fromTime),
      toTime: this.getTimeInFormat(bookingInfo.toTime),
      day: this.getCurrentDayOfWeek(bookingInfo.date),
      clientName: bookingInfo.clientName,
      // sessionId: bookingInfo.sessionId,
      tokenNumber: bookingInfo.tokenNumber,
      status: bookingInfo.status,
      bookingId: bookingInfo.bookingId
    }
    return currentSession;
  }

  getCurrentDayOfWeek(date) {
    console.log(date);
    console.log(moment(date, 'DD-MM-YYYY').format('dddd'));
    return moment(date, 'DD-MM-YYYY').format('dddd');
  }

  getTimeInFormat(time) {
    return moment(time, ["HH:mm"]).format("h:mm A");
  }

  createAddress(clientSessionDetails) {
    const object = _.cloneDeep(clientSessionDetails.clientIdNameAddress);
    delete object['clientId'];
    delete object['clientName'];
    let address: string = '';
    Object.keys(object).forEach((key) => {
      var val = object[key];
      if (val) {
        address = address + val + ',';
      }

    });
    return address.substring(0, address.length - 1);
  }
  
}