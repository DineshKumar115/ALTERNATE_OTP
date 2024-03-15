import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterFormComponent } from './register-form/register-form.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './service/user.service';
import { HttpClientModule } from '@angular/common/http';
import { OtpGenerationComponent } from './otp-generation/otp-generation.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterFormComponent,
    OtpGenerationComponent
  ],
  imports: [
    BrowserModule,
    routing,
    ReactiveFormsModule,
    FormsModule, HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
