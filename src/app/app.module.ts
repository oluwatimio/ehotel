import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { CbookingsComponent } from './components/cbookings/cbookings.component';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './utils/services/auth.service';
import {NgRedux, NgReduxModule} from '@angular-redux/store';
import {AppState, INITIAL_STATE, rootReducer} from './utils/redux/store';
import { HdashboardComponent } from './components/hdashboard/hdashboard.component';
import { LibrarytableComponent } from './components/librarytable/librarytable.component';
import { InfocardComponent } from './components/infocard/infocard.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { AddchainComponent } from './components/addchain/addchain.component';
import { AddhotelComponent } from './components/addhotel/addhotel.component';
import { AddroomComponent } from './components/addroom/addroom.component';
import {FormsModule} from '@angular/forms';
import {PostgreService} from './utils/services/postgre.service';
import {GuidService} from './utils/backend/guidgen/guid.service';
import { AddbookingComponent } from './components/addbooking/addbooking.component';
import { SeehotelinfoComponent } from './components/seehotelinfo/seehotelinfo.component';
import { TableComponent } from './components/table/table.component';
import { CustomernamedialogComponent } from './components/customernamedialog/customernamedialog.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { SignupemployeeComponent } from './components/signupemployee/signupemployee.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BookingComponent } from './components/booking/booking.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    CbookingsComponent,
    HdashboardComponent,
    LibrarytableComponent,
    InfocardComponent,
    AddchainComponent,
    AddhotelComponent,
    AddroomComponent,
    AddbookingComponent,
    SeehotelinfoComponent,
    TableComponent,
    CustomernamedialogComponent,
    SigninComponent,
    SignupComponent,
    SignupemployeeComponent,
    BookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    HttpClientModule,
    NgReduxModule,
    DragDropModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  providers: [AuthService, PostgreService, GuidService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<AppState>) {
    ngRedux.configureStore(rootReducer, INITIAL_STATE);
  }
}
