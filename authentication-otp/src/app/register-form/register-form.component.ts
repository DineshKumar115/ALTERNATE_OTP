import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators,FormControl } from '@angular/forms';
import { UserService} from '../service/user.service'
import { RouterModule, Router} from '@angular/router';
@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
userRegister    : FormGroup;
showmwssage     : any =0;
successMessage  : any ;
errorMessage    : any ;
  constructor(private formBuilder:FormBuilder,private userservice :UserService,private route:Router) {
    this.userRegister =this.formBuilder.group({
                  name: '',
                  mobileno: '',
                  email: '',
    })
   }

  ngOnInit(): void {
  }
  submitForm(){
    const result = Object.assign({}, this.userRegister.value);
    if(result.name.includes(null,undefined)|| result.name==''){
  this.showmwssage=2;
   this.errorMessage="Name Is Required"
    }else if(result.mobileno.includes(null,undefined)|| result.mobileno==''){
        this.showmwssage=2;
   this.errorMessage="Mobileno Is Required"
    }else if(result.email.includes(null,undefined)|| result.email==''){
       this.showmwssage=2;
   this.errorMessage="Email Is Required" 
    }else{
      let payload={
        c_Name : result.name,
        n_Mobile : result.mobileno,
        c_Email : result.email
      }
  this.userservice.getData(payload,"/register","POST").subscribe((result: any)=>{
    if(result.staus==1){
     this.showmwssage=1;
     this.successMessage=result.message;
     this.route.navigate(['/otpgenration']);
     location.reload();
    }else{
      this.showmwssage=2;
     this.errorMessage=result.message
    }
  })
    }
   

  }
  redirect(){
    window.location.href='http://localhost:4200/otpgenration';
  }
}
