import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {HttpClient} from '@angular/common/http';
import {Accounts} from '../classes/Accounts';
import {NgRedux} from '@angular-redux/store';
import {AppState, INITIAL_STATE} from '../redux/store';
import {add_user, login_user, logout} from '../redux/action';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {API_BASE} from '../backend/api-v1/routes';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userObj: any;
  API_LINK = API_BASE();
  private currentUser = new BehaviorSubject(null);
  user = this.currentUser.asObservable();
  constructor(private http: HttpClient, private ngRedux: NgRedux<AppState>, private router: Router, private _snackBar: MatSnackBar) {
    this.userObj = {};
    this.observeUser();
  }

  observeUser() {
    firebase.auth().onAuthStateChanged((user) => {
      try {
        this.currentUser.next(user);
      } catch (e) {
      }
    });
  }

  createUser(email: string, password: string, firstName: string, lastName: string, type: string, position: string = ''): Promise<any> {
      return new Promise(resolve => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential: firebase.auth.UserCredential) => {
          userCredential.user.getIdToken().then((idToken) => {

            const userObject = type === Accounts.REGULAR ? {email: email, pass: password,
              firstname: firstName, lastname: lastName, ssn: userCredential.user.uid, token: idToken} : {email: email, pass: password,
              name: firstName, position: position, essn: userCredential.user.uid, token: idToken};

            const queryString = type === Accounts.REGULAR ? this.API_LINK + '/user/add' : this.API_LINK + '/user/employee/add';
            this.http.post(queryString, JSON.stringify(userObject),
              {headers: {'Content-Type': 'application/json'}}).subscribe((result: any) => {

                this.ngRedux.dispatch({
                  type: add_user,
                  userObj: {
                    ...result.payload,
                    fireAuth: userCredential,
                    userType: type,
                    idToken: idToken
                  }
                });

                resolve(result);
            });
          });
        }).catch((error) => {
          this._snackBar.open(error.message, 'Dismiss', {
            duration: 5000,
          });
        });
      });
  }
  setUserState(userCredential: firebase.User) {
    return new Promise(resolve => {
      if (userCredential) {
        userCredential.getIdToken().then((idToken) => {
          const userObject = {email: userCredential.email, token: idToken, ssn: userCredential.uid};
          const queryString = this.API_LINK + '/user';
          this.http.post(queryString, JSON.stringify(userObject), {headers: {'Content-Type': 'application/json'}}).subscribe( // make it a GET request
            (result: any) => {
              this.ngRedux.dispatch({
                type: login_user,
                userObj: {
                  ...result.payload,
                  fireAuth: userCredential,
                  userType: result.payload.userType,
                  idToken: idToken
                }
              });
              resolve(result);
            });
        });
      }
    });
  }

  login(email: string, password: string) {
    return new Promise(resolve => {
      firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential: firebase.auth.UserCredential) => {
        this.setUserState(userCredential.user).then((result) => {
          resolve(result);
        });
      }).catch((error) => {
        this._snackBar.open(error.message, 'Dismiss', {
          duration: 5000,
        });
      });
    });
  }

  logout() {
    firebase.auth().signOut().then(() => {
      this.ngRedux.dispatch({type: logout, resetState: INITIAL_STATE});
      this.router.navigateByUrl('/');
    });
  }
}
