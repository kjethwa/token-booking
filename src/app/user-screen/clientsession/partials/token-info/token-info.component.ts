import { Component, OnInit } from '@angular/core';
import { Session } from '../../../../model/Session';
import { Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UserServiceService } from "app/service/user-service.service";

@Component({
  selector: 'app-token-info',
  templateUrl: './token-info.component.html',
  styleUrls: ['./token-info.component.css']
})
export class TokenInfoComponent implements OnInit {
  nextAvailableToken: Object;
  currentSession = {
    clientName : '',
    sessionId : ''
  };
  constructor(private _activatedRouter : ActivatedRoute,
              private _userService : UserServiceService) { }

  ngOnInit() {
    this._activatedRouter.queryParams.subscribe((query: any) => {
      console.log(query);
      this.currentSession.clientName = query.clientName;
      this.currentSession.sessionId = query.sessionId;
      this.getNextAvailableToken();
    });
  }

  getNextAvailableToken() {
    this._userService.getNextAvailableTokenBySessionId(this.currentSession.sessionId).subscribe((nextAvailableTokenResponse) => {
      this.nextAvailableToken = nextAvailableTokenResponse;
    })
  }

  onConfirmClick() {
    const requestBody = {
      sessionId : this.currentSession.sessionId,
      userId: '12',
      tokenNumber: this.nextAvailableToken
    };
    this._userService.confirmBooking(requestBody).subscribe((response) => {
      alert('Booked Successfully');
    })
  }

}
