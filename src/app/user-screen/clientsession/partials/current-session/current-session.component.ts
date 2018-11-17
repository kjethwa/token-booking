import { Component, OnInit } from '@angular/core';
import { Session } from '../../../../model/Session';
import { Input } from "@angular/core";

@Component({
  selector: 'app-current-session',
  templateUrl: './current-session.component.html',
  styleUrls: ['./current-session.component.css']
})
export class CurrentSessionComponent implements OnInit {
  @Input() currentSession: Session;
  constructor() { }

  ngOnInit() {
  }

}
