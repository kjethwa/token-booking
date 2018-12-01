import { Component, OnInit } from '@angular/core';
import { Session } from '../../../../model/Session';
import { Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserServiceService } from "app/service/user-service.service";
import { NotificationService } from "ng2-notify-popup";
import { ManageBookingService } from "app/service/manage-booking.service";

@Component({
  selector: 'app-view-bookings',
  templateUrl: './view-bookings.component.html',
  styleUrls: ['./view-bookings.component.css']
})
export class ViewBookingsComponent implements OnInit {
    listOfBookings;
    currentTabName = 'Booked';
  constructor(private _activatedRouter : ActivatedRoute,
              private _manageBookingService : ManageBookingService,
              private _notify: NotificationService,
              private _router: Router) { }

  ngOnInit() {
    this.getBookingsByUserId();
  }

  getBookingsByUserId() {
      this._manageBookingService.getBookingsByUserId(12345).subscribe((response) => {
          this.listOfBookings = response;
          console.log(this.listOfBookings);
      })
  }

  onTabClick(tabName) {
      this.currentTabName = tabName;
  }
}