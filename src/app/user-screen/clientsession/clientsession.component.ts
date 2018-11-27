import { Component, OnInit } from '@angular/core';
import {UserServiceService} from "../../service/user-service.service";
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import * as moment from 'moment';
import { Session } from "app/model/Session";
import * as _ from 'lodash';
import { Router } from "@angular/router";
import { NotificationService } from "ng2-notify-popup";

@Component({
  selector: 'app-clientsession',
  templateUrl: './clientsession.component.html',
  styleUrls: ['./clientsession.component.css']
})
export class ClientsessionComponent implements OnInit {
  clientSessionDetails: any;
  currentSession: any;
  allActiveClientName: any;
  clientSessionForm: FormGroup;
  sessionIndex: number;
  maxSession:number;
  constructor(private _userService: UserServiceService,
              private _fb: FormBuilder,
              private _router: Router,
              private notify: NotificationService){
    this.sessionIndex = 0;
    this.maxSession = 0;
  }

  ngOnInit() {
    this.clientSessionForm = this.createClientSessionForm();
      this._userService.getAllActiveClientNames().subscribe(response => {
        console.log(response);
        this.allActiveClientName = response;
    });
  }

  createClientSessionForm() {
    return this._fb.group({
      clientId : ['']
    })
  }

  onClientNameChange(clientId) {
    if (clientId) {
      this._userService.getAllSessionsByClientId(clientId,12).subscribe((sessionResponse) => {
        this.clientSessionDetails = sessionResponse;
        this.clientSessionDetails.sessions.sort((s1, s2) => this.compareSessionDate(s1, s2));
        if (this.clientSessionDetails.sessions.length > 0) {
          this.currentSession = this.createSession(this.clientSessionDetails.sessions[0]);
          this.maxSession = this.clientSessionDetails.sessions.length-1;
        }
      });
    }
    else{
      this.reset();
    }
  }

  reset() {
    this.clientSessionDetails = '';
    this.currentSession = undefined;
    this.maxSession = 0;
    this.sessionIndex = 0;
  }

  nextSession(){
    this.sessionIndex++;
    if(this.sessionIndex <= this.maxSession){
      this.currentSession = this.createSession(this.clientSessionDetails.sessions[this.sessionIndex]);
    }
    else{
      --this.sessionIndex;
    }
  }

  previousSession(){
    this.sessionIndex--;
    if (this.sessionIndex >= 0) {
      this.currentSession = this.createSession(this.clientSessionDetails.sessions[this.sessionIndex]);
    }
    else {
      this.sessionIndex++;
    }
  }

  bookToken(){

  }

  createSession(session: any): Session{
    let currentSession = {
      date : session.date,
      fromTime: this.getTimeInFormat(session.fromTime),
      toTime: this.getTimeInFormat(session.toTime),
      day : this.getCurrentDayOfWeek(session.date),
      availableToken: session.availableToken,
      clientName: this.clientSessionDetails.clientIdNameAddress.clientName,
      address: this.createAddress(),
      sessionId: session.sessionId
    }
    return currentSession;
  }

  getCurrentDayOfWeek(date) {
    return moment(date, 'DD-MM-YYYY').format('dddd');
  }

  getTimeInFormat(time){
    return moment(time, ["HH:mm"]).format("h:mm A");
  }

  compareSessionDate(s1, s2) {
    let date1 = moment(s1.date, 'DD-MM-YYYY');
    let date2 = moment(s2.date, 'DD-MM-YYYY');
    if (date1.isSame(date2)) {
      let time1 = moment(s1.fromTime, 'HH:mm');
      let time2 = moment(s2.fromTime, 'HH:mm');
      if (time1.isBefore(time2)) {
        return -1;
      }
      else if (time1.isAfter(time2)) {
        return 1;
      }
      else {
        0;
      }
    }
    else if (date1.isBefore(date2)) {
      return -1;
    }
    else {
      return 1;
    }
  }

  createAddress() {
    const object = _.cloneDeep(this.clientSessionDetails.clientIdNameAddress);
    delete object['clientId'];
    delete object['clientName'];
    let address: string = '';
    Object.keys(object).forEach((key) => {
      var val = object[key];
      if (val) {
        address =  address + val + ',';
      }

    });
    return address.substring(0,address.length-1);
  }

  onBookClick() {
    this.show('Token Booked successfully', 'success');
    this._router.navigate(['/book'], {queryParams : {clientName : this.currentSession.clientName, sessionId : this.currentSession.sessionId}});
  }

  show(text: string, type: string): void {
    this.notify.show(text, { position:'bottom', duration:'2000', type: 'success' });
  }

}
