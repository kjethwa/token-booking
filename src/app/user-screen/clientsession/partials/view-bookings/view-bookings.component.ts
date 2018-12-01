import { Component, OnInit } from '@angular/core';
import { Session } from '../../../../model/Session';
import { Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserServiceService } from "app/service/user-service.service";
import { NotificationService } from "ng2-notify-popup";
import { ManageBookingService } from "app/service/manage-booking.service";
import { UtilService } from "app/service/util.service";
import * as _ from 'lodash';
import { AppConstant } from '../../../../app-constant';

@Component({
  selector: 'app-view-bookings',
  templateUrl: './view-bookings.component.html',
  styleUrls: ['./view-bookings.component.css']
})
export class ViewBookingsComponent implements OnInit {
  listOfBookings = [];
  currentTabName = 'Booked';
  constructor(private _activatedRouter: ActivatedRoute,
    private _manageBookingService: ManageBookingService,
    private _notify: NotificationService,
    private _router: Router,
    private _util: UtilService) { }

  ngOnInit() {
    this.getBookingsByUserId();
  }

  getBookingsByUserId() {
    this._manageBookingService.getBookingsByUserId(AppConstant.userId).subscribe((response) => {
      _.forEach(response, (bookingInfo) => {
        this.listOfBookings.push(this._util.createSessionOfBookingInfo(bookingInfo));
      });
    })
  }

  onTabClick(tabName) {
    this.currentTabName = tabName;
  }

  onCancelClick(cancelledResponse, index) {
    this.listOfBookings[index] = this._util.createSessionOfBookingInfo(cancelledResponse);
    console.log(this.listOfBookings);
  }
}