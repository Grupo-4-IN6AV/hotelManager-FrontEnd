import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAdminComponent } from './components/admin/home-admin/home-admin.component';
import { HotelsAdminComponent } from './components/admin/hotels-admin/hotels-admin.component';
import { ServicesAdminComponent } from './components/admin/services-admin/services-admin.component';
import { SetComponentsAdminComponent } from './components/admin/set-components-admin/set-components-admin.component';
import { UsersAdminComponent } from './components/admin/users-admin/users-admin.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = 
[
  {path: '', component: LandingPageComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},

  //CONTROL DE RUTAS DE ADMIN//
  {
    path: 'admin', component: SetComponentsAdminComponent, 
    children:
    [
      { path: 'home', component: HomeAdminComponent},
      { path: 'users', component: UsersAdminComponent},
      { path: 'hotels', component: HotelsAdminComponent},
      { path: 'services', component: ServicesAdminComponent},
    ]
  },

  { path: '**', component: NotFoundPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
