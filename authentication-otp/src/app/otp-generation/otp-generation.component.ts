import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';
import { UserService } from '../service/user.service'
@Component({
  selector: 'app-otp-generation',
  templateUrl: './otp-generation.component.html',
  styleUrls: ['./otp-generation.component.css']
})
export class OtpGenerationComponent implements OnInit {
  otpVerified   : FormGroup;
  AuthVerify    : FormGroup;
  emailSend     : FormGroup;
  formShow      : number = 1;
  email         : any;
  showbtn       : boolean = false;
  showmwssage   : any = 0
  errorMessage  : any;
  successMessage: any;
  constructor(private formBuilder: FormBuilder, private userservice: UserService) {
    this.otpVerified = this.formBuilder.group({ otp: '' })
    this.AuthVerify = this.formBuilder.group({ c_Authkey: '' })
    this.emailSend = this.formBuilder.group({ c_Email: '' })
  }

  ngOnInit(): void {
  }
  submitForm(id: any) {
    let result = Object.assign({}, this.emailSend.value);
    if (id==1) {
      var payload = {
        c_Email: result.c_Email,
      }
      if (result.c_Email != undefined || result.c_Email != null) {
        this.email = result.c_Email;
        this.userservice.getData(payload, "/sendOtp", "POST").subscribe((result: any) => {
          if (result.status == 1) {
            setTimeout(() => {
              console.log("yyuyy");
              
              this.showbtn=true;
            }, 6000);
            this.formShow=2;
            this.showmwssage = 1;
            this.successMessage = result.message;
          } else {
            this.showmwssage = 2;
            this.errorMessage = result.message;
          }
        })
      } else {
        this.showmwssage = 2;
        this.errorMessage = "Email is Empty";
      }
    }else if(id==2){
      let result1 = Object.assign({}, this.otpVerified.value);

      var data = {
        c_Email: this.email,
        n_Otp: result1.otp
      }
      this.userservice.getData(data, "/verifyOtp", "POST").subscribe((result: any) => {
        if (result.status == 1) {
          this.showmwssage = 1;
          this.successMessage = result.message;
        } else {
          this.showmwssage = 2;
          this.errorMessage = result.message;
        }
        })
    }else{
      let result2 = Object.assign({}, this.AuthVerify.value);

      var passdata = {
        c_Email: this.email,
        c_AuthKey: result2.c_Authkey
      }
      this.userservice.getData(passdata, "/verifyAuth", "POST").subscribe((result: any) => {
        if (result.status == 1) {
          this.showmwssage = 1;
          this.successMessage = result.message;
        } else {
          this.showmwssage = 2;
          this.errorMessage = result.message;
        }
        })
    }

  }
  resendOtp() {
    let payload = {
      c_Email: this.email
    }
    this.userservice.getData(payload, "/resendOtp", "POST").subscribe((result: any) => {
      if (result.status == 1) {
        this.showmwssage = 1;
        this.successMessage = result.message;
      } else {
        this.showmwssage = 2;
        this.errorMessage = result.message;
      }
    })
  }
  authKey() {
    this.formShow = 3;
  }
  tryWithOtp() {
    this.formShow = 2;
  }
}
