import { HomeGuard } from './guards/home.guard';
import { LoginGuard } from './guards/login.guard';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [LoginGuard] },
  { path: 'home', component: HomeComponent, canActivate: [HomeGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
