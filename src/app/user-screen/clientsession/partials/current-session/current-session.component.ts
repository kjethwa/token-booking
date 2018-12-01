import { Component, OnInit } from '@angular/core';
import { Session } from '../../../../model/Session';
import { Input, Output, EventEmitter } from "@angular/core";
import { ManageBookingService } from "app/service/manage-booking.service";
import { NotificationService } from "ng2-notify-popup";
import { UtilService } from "app/service/util.service";

@Component({
  selector: 'app-current-session',
  templateUrl: './current-session.component.html',
  styleUrls: ['./current-session.component.css']
})
export class CurrentSessionComponent implements OnInit {
  @Input() currentSession: any;
  @Output() cancelledBooking: EventEmitter<any> = new EventEmitter();
  constructor(private _bookingService: ManageBookingService,
              private _notify: NotificationService,
              private _util: UtilService) { }

  ngOnInit() {
  }

  onCancelBookingClick(bookingId) {
    this._bookingService.cancelBooking(bookingId).subscribe((cancelResponse: any) => {
      this._notify.show('Booking Cancelled successfully for ' + cancelResponse.clientName + '', {position: 'bottom', type: 'success', duration: 2000});
      this.cancelledBooking.emit(cancelResponse);
    })
  }
}
