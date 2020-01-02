import { Component, OnInit } from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../../utils/redux/store';
import {AuthService} from '../../utils/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  loggedIn: boolean;
  userType: string;
  constructor(private ngRedux: NgRedux<AppState>, private auths: AuthService) {
    this.loggedIn = false;
  }

  ngOnInit() {
    this.ngRedux.select('loggedIn').subscribe((loggedIn: boolean) => {
      this.loggedIn = loggedIn;
      this.userType = this.ngRedux.getState().userType;
    });
  }

  logout() {
    this.auths.logout();
  }

}
