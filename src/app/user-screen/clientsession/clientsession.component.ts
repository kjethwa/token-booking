import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";
import {UserServiceService} from "../../service/user-service.service";
import {parseHttpResponse} from "selenium-webdriver/http";
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import * as moment from 'moment';
import { Session } from "src/app/model/Session";
import * as _ from 'lodash';

@Component({
  selector: 'app-clientsession',
  templateUrl: './clientsession.component.html',
  styleUrls: ['./clientsession.component.css']
})
export class ClientsessionComponent implements OnInit {
  clientSessionDetails: any;
  currentSession = new Session();
  allActiveClientName: any;
  clientSessionForm: FormGroup;
  sessionIndex: number;
  maxSession:number;
  constructor(private _userService: UserServiceService,
              private _fb: FormBuilder){
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
      this._userService.getAllSessionsByClientId(clientId).subscribe((sessionResponse) => {
        console.log(this.clientSessionDetails);
        this.clientSessionDetails = sessionResponse;
        this.clientSessionDetails.sessions.sort((s1, s2) => this.compareSessionDate(s1, s2));
        if (this.clientSessionDetails.sessions.length > 0) {
          this.currentSession = this.createSession(this.clientSessionDetails.sessions[0]);
          this.maxSession = this.clientSessionDetails.sessions.length-1;
        }
      });
    }
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

  createSession(session: any): Session{
    let currentSession = {
      date : session.date,
      fromTime: this.getTimeInFormat(session.fromTime),
      toTime: this.getTimeInFormat(session.toTime),
      day : this.getCurrentDayOfWeek(session.date),
      availableToken: session.availableToken,
      clientName: this.clientSessionDetails.clientIdNameAddress.clientName,
      address: this.createAddress()
    }
    return currentSession;
  }

  getCurrentDayOfWeek(date) {
    debugger;
    return moment(date, 'DD-MM-YYYY').format('dddd');
  }

  getTimeInFormat(time){
    return moment(time, ["HH:mm"]).format("h:mm A");
  }

  compareSessionDate(s1, s2) {
    console.log('s1---->' + s1.date);
    let date1 = moment(s1.date, 'dd-MM-yyyy');
    let date2 = moment(s2.date, 'dd-MM-yyyy');
    console.log(date1 + '---' + date2);
    if (date1.isSame(date2)) {
      let time1 = moment(s1.fromTime, 'HH:mm');
      let time2 = moment(s2.fromTime, 'HH:mm');
      if (time1.isBefore(time2)) {
        return 1;
      }
      else if (time1.isAfter(time2)) {
        return -1;
      }
      else {
        0;
      }
    }
    else if (date1.isBefore(date2)) {
      return 1;
    }
    else {
      return -1;
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

}
