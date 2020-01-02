import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @Input() signIn: Function;
  constructor() { }

  ngOnInit() {
  }

}
