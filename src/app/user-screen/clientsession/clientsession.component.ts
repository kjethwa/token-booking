import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";
import {UserServiceService} from "../../service/user-service.service";
import {parseHttpResponse} from "selenium-webdriver/http";

@Component({
  selector: 'app-clientsession',
  templateUrl: './clientsession.component.html',
  styleUrls: ['./clientsession.component.css']
})
export class ClientsessionComponent implements OnInit {

  allActiveClientName: any;

  constructor(private _userService: UserServiceService){

  }

  ngOnInit() {
      this._userService.getAllActiveClientNames().subscribe(response => {
        console.log(response);
        this.allActiveClientName = response;
    });
  }

}
