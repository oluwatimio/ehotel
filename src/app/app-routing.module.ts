import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {CbookingsComponent} from './components/cbookings/cbookings.component';
import {HdashboardComponent} from './components/hdashboard/hdashboard.component';
import {BookingComponent} from './components/booking/booking.component';

const routes: Routes = [{path: '', component: HomeComponent},
  {path: 'bookingdashboard', component: BookingComponent},
  {path: 'employeedashboard', component: HdashboardComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
