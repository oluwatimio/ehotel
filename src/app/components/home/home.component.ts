import {Component, NgZone, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../utils/services/auth.service';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../../utils/redux/store';
import {add_user} from '../../utils/redux/action';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {Results} from '../../utils/classes/Results';
import {Accounts} from '../../utils/classes/Accounts';
import {User} from '../../utils/classes/User';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  email: string;
  password: string;
  address: string;
  firstname: string;
  lastname: string;
  positione: string;
  userMessage: string;
  loggedIn: boolean;
  userLoggedIn: User;

  constructor(private http: HttpClient, private ngRedux: NgRedux<AppState>, public router: Router, public authService: AuthService) {
    this.email = '';
    this.password = '';
    this.address = '';
    this.firstname = '';
    this.lastname = '';
    this.positione = '';
    this.loggedIn = false;
  }

  ngOnInit() {
    this.ngRedux.select('loggedIn').subscribe((userLoggedIn: boolean) => {
      this.loggedIn = userLoggedIn;
      this.userLoggedIn = this.ngRedux.getState().user;
    });
  }

  bookroom() {
    if (this.loggedIn === true) {
      this.router.navigateByUrl('bookingdashboard');
    } else {
      alert('You need to be signed in to view the dashboard');
    }

  }

}
