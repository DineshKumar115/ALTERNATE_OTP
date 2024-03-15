import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterFormComponent } from './register-form/register-form.component';
import { OtpGenerationComponent } from './otp-generation/otp-generation.component';
const routes: Routes = [ { 
  path: '', 
  // canActivate: [AuthGuardService],
  children: [
    { path: '', component: RegisterFormComponent, pathMatch: 'full',data: { title: 'Registration'} },
  ]
}, { 
  path: '', 
  // canActivate: [AuthGuardService],
  children: [
    { path: 'otpgenration', component: OtpGenerationComponent, pathMatch: 'full',data: { title: 'Registration'} },
  ]
}];


export const routing = RouterModule.forRoot(routes,{
  useHash: false,
  scrollPositionRestoration: 'enabled'
});
