import { Component } from '@angular/core';
import {AuthService} from './utils/services/auth.service';
import * as firebase from 'firebase';
import {Results} from './utils/classes/Results';
import {Accounts} from './utils/classes/Accounts';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ehotel';

  constructor(private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) {
    this.authService.user.subscribe((user: firebase.User) => {
      this.authService.setUserState(user);
    });
  }

  signIn = (email: string, password: string) => {
    this.authService.login(email, password).then((response: any) => {
      if (response.result === Results.OK) {
        $('#signInModal').modal('hide');
        this._snackBar.open('Welcome back', 'Dismiss', {
          duration: 5000,
        });
        if (response.payload.userType === Accounts.EMPLOYEE) {
          this.router.navigateByUrl('employeedashboard');
        } else {
          this.router.navigateByUrl('bookingdashboard');
        }
      } else if (response.result === Results.TOKEN_INCORRECT) {
        // alert('Invalid login request');
        this._snackBar.open('Invalid Login Request', 'Dismiss', {
          duration: 5000,
        });
      }
    });
  }

  signUp = (email: string, password: string, firstname: string, lastname: string) => {
    this.authService.createUser(email, password, firstname, lastname, Accounts.REGULAR).then((response: any) => {
      if (response.result === Results.OK) {
        $('#signUpModal').modal('hide');
        this._snackBar.open('Welcome to E-hotels', 'Dismiss', {
          duration: 5000,
        });
        this.router.navigateByUrl('bookingdashboard');
      } else if (response.result === Results.TOKEN_INCORRECT) {
        // alert('Invalid login request');
        this._snackBar.open('Invalid Login Request', 'Dismiss', {
          duration: 5000,
        });
      }
    });
  }

  signUpEmployee = (email: string, password: string, fullname: string, positione: string) => {
    this.authService.createUser(email, password, fullname, '', Accounts.EMPLOYEE, positione).then((response: any) => {
      if (response.result === Results.OK) {
        $('#signUpModalE').modal('hide');
        this.router.navigateByUrl('employeedashboard').then(() => {
          this._snackBar.open('Welcome to your E-hotels dashboard', 'Dismiss', {
            duration: 5000,
          });
        });
      } else if (response.result === Results.TOKEN_INCORRECT) {
        // alert('Invalid login request');
        this._snackBar.open('Invalid Login Request', 'Dismiss', {
          duration: 5000,
        });
      }
    });
  }
}
