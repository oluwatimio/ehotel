import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-signupemployee',
  templateUrl: './signupemployee.component.html',
  styleUrls: ['./signupemployee.component.css']
})
export class SignupemployeeComponent implements OnInit {
  @Input() signUp: Function;
  constructor() { }

  ngOnInit() {
  }

}
