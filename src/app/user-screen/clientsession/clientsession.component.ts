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
  constructor(private _userService: UserServiceService,
              private _fb: FormBuilder){

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
        this.currentSession = this.createSession(this.clientSessionDetails.sessions[0]);
        this.clientSessionDetails.sessions.forEach(element => {
        // let currentDow = this.getCurrentDayOfWeek(element.date);
        // element['daysOfWeek'] = currentDow;
        });
        
        
      });
    }
  }

  createSession(session: any): Session{
    let currentSession = {
      date : session.date,
      fromTime: session.fromTime,
      toTime: session.toTime,
      day : this.getCurrentDayOfWeek(session.date),
      availableToken: session.availableToken,
      clientName: this.clientSessionDetails.clientIdNameAddress.clientName,
      address: this.createAddress()
    }
    return currentSession;
  }

  getCurrentDayOfWeek(date) {
    return moment(date, 'dd-MM-yyyy').format('dddd');
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

  // getClientNameFromId(clientId) {
  //   _.find(this.allActiveClientName, (o) => {
  //     o.clientId === clientId;
  //   })
  // }

}
