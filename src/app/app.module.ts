import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';
// import { NguiMapModule} from '@ngui/map';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { UserComponent }   from './user/user.component';
import { TableComponent }   from './table/table.component';
import { TypographyComponent }   from './typography/typography.component';
import { IconsComponent }   from './icons/icons.component';
// import { MapsComponent }   from './maps/maps.component';
import { NotificationsComponent }   from './notifications/notifications.component';
import { UpgradeComponent }   from './upgrade/upgrade.component';
import { SearchClientComponent } from "app/client-details/search-client/search-client.component";
import { AddClientComponent } from "app/client-details/add-client/add-client.component";
import { RegisterComponent } from "app/register";
import { ValidationDirective } from "app/directive/validation.directive";
import { ClientsessionComponent } from "app/user-screen/clientsession/clientsession.component";
import { CurrentSessionComponent } from "app/user-screen/clientsession/partials/current-session/current-session.component";
import { AlertService } from "app/service/alert.service";
import { AuthenticationService } from "app/service/authentication.service";
import { ClientFormServiceService } from "app/service/client-form-service.service";
import { ClientServiceService } from "app/service/client-service.service";
import { PropertySericeService } from "app/service/property-serice.service";
import { UserServiceService } from "app/service/user-service.service";
import { UserService } from "app/service/user.service";
import { TokenInfoComponent } from "app/user-screen/clientsession/partials/token-info/token-info.component";
import { NgNotifyPopup } from 'ng2-notify-popup';
import { NotificationService } from "ng2-notify-popup";
import { ViewBookingsComponent } from "app/user-screen/clientsession/partials/view-bookings/view-bookings.component";
import { ManageBookingService } from "app/service/manage-booking.service";
import { UtilService } from "app/service/util.service";
import { environment } from "environments/environment";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    TableComponent,
    TypographyComponent,
    IconsComponent,
    // MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    SearchClientComponent,
    AddClientComponent,
    RegisterComponent,
    // ValidationDirective,
    ClientsessionComponent,
    CurrentSessionComponent,
    TokenInfoComponent,
    ViewBookingsComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    // AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(AppRoutes),
    ReactiveFormsModule,
    HttpClientModule,
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedPluginModule,
    // NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'}),
    NgNotifyPopup

  ],
  providers: [
    AlertService,
    AuthenticationService,
    ClientFormServiceService,
    ClientServiceService,
    PropertySericeService,
    UserServiceService,
    UserService,
    NotificationService,
    ManageBookingService,
    UtilService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
