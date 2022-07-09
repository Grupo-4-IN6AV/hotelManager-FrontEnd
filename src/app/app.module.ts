import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { BodyAdminComponent } from './components/admin/body-admin/body-admin.component';
import { DashboardAdminComponent } from './components/admin/dashboard-admin/dashboard-admin.component';
import { SetComponentsAdminComponent } from './components/admin/set-components-admin/set-components-admin.component';
import { HomeAdminComponent } from './components/admin/home-admin/home-admin.component';
import { UsersAdminComponent } from './components/admin/users-admin/users-admin.component';
import { SearchUserPipe } from './pipes/userPipe/search-user.pipe';
import { HotelsAdminComponent } from './components/admin/hotels-admin/hotels-admin.component';
import { ServicesAdminComponent } from './components/admin/services-admin/services-admin.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { EventsAdminComponent } from './components/admin/events-admin/events-admin.component';
import { TypeRoomAdminComponent } from './components/admin/type-room-admin/type-room-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    RegisterComponent,
    LoginComponent,
    BodyAdminComponent,
    DashboardAdminComponent,
    SetComponentsAdminComponent,
    HomeAdminComponent,
    UsersAdminComponent,
    SearchUserPipe,
    HotelsAdminComponent,
    ServicesAdminComponent,
    NotFoundPageComponent,
    AboutUsComponent,
    ContactUsComponent,
    EventsAdminComponent,
    TypeRoomAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
