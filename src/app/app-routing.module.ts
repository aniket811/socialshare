import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authenticationGuard } from './guards/authentication.guard';
import { loggedin } from './guards/loggedin.guard';

const routes: Routes = [
  {path:'',component:HomeComponent,},
  {path:'login',component:AuthenticationComponent,canActivate:[authenticationGuard]} ,
  {path:'register',component:RegisterComponent,canActivate:[authenticationGuard]},
  {path:'dashboard',component:DashboardComponent,canActivate:[authenticationGuard]},
  {path:'**',component:AuthenticationComponent,},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
