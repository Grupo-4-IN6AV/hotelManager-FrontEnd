import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { EventsAdminComponent } from './components/admin/events-admin/events-admin.component';
import { HomeAdminComponent } from './components/admin/home-admin/home-admin.component';
import { HotelsAdminComponent } from './components/admin/hotels-admin/hotels-admin.component';
import { ServicesAdminComponent } from './components/admin/services-admin/services-admin.component';
import { SetComponentsAdminComponent } from './components/admin/set-components-admin/set-components-admin.component';
import { TypeRoomAdminComponent } from './components/admin/type-room-admin/type-room-admin.component';
import { UsersAdminComponent } from './components/admin/users-admin/users-admin.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = 
[
  {path: '', component: LandingPageComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'aboutUs', component: AboutUsComponent},
  {path: 'contactUs', component: ContactUsComponent},

  //CONTROL DE RUTAS DE ADMIN//
  {
    path: 'admin', component: SetComponentsAdminComponent, 
    children:
    [
      { path: 'home', component: HomeAdminComponent},
      { path: 'users', component: UsersAdminComponent},
      { path: 'hotels', component: HotelsAdminComponent},
      { path: 'services', component: ServicesAdminComponent},
      { path: 'events', component: EventsAdminComponent},
      { path: 'typeRoom', component: TypeRoomAdminComponent},
    ]
  },

  { path: '**', component: NotFoundPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
