import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  emailsignupc: string;
  passsupc: string;
  addresssupc: string;
  firstnamesupc: string;
  lastnamesupc: string;
  dorc: string;
  emailsignupe: string;
  passsupe: string;
  hotelide: string;
  employeename: string;
  positione: string;
  constructor(private http: HttpClient) {
    this.emailsignupc = '';
    this.passsupc = '';
    this.addresssupc = '';
    this.firstnamesupc = '';
    this.lastnamesupc = '';
    this.dorc = '';
    this.emailsignupe = '';
    this.passsupe = '';
    this.hotelide = '';
    this.employeename = '';
    this.positione = '';
  }

  ngOnInit() {
  }

  signIn() {

  }

  signUpCustomer() {
    const val = {email: this.emailsignupc, pass: this.passsupc, address: this.addresssupc,
      firstname: this.firstnamesupc, lastname: this.lastnamesupc, dor: this.dorc, ssn: 1};
    console.log(val);
    this.http.post('http://localhost:8080/adduser', JSON.stringify(val),
      {headers: {'Content-Type': 'application/json'}}).subscribe((result) => {
      console.log(result);
    });
  }

  signUpEmployee() {
    const val = {email: this.emailsignupe, pass: this.passsupe, hotelid: this.hotelide,
      name: this.employeename, position: this.positione, essn: 1};
    console.log(val);
    this.http.post('http://localhost:8080/addemployee', JSON.stringify(val),
      {headers: {'Content-Type': 'application/json'}}).subscribe((result) => {
      console.log(result);
    });
  }

  addHotelChains() {
    const chain1 = {chainid: 0, name: 'Four seasons', numhotels: 1};
    const chain2 = {chainid: 1, name: 'The peninsula', numhotels: 1};
    const chain3 = {chainid: 2, name: 'The langham', numhotels: 1};
  }

}
