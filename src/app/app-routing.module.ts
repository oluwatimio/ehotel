import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CbookingsComponent} from './cbookings/cbookings.component';

const routes: Routes = [{path: '', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'cbookings', component: CbookingsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
