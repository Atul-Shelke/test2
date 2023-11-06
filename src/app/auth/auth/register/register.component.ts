import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserInfoService } from 'src/app/common-services/user-info.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private fb:FormBuilder,
              private userinfo:UserInfoService,
              private toastr: ToastrService,
              private router:Router
              ) { }

  //registerForm
registerForm:any=this.fb.group({
  firstname:['',[Validators.required]],
  lastname :['',[Validators.required]],
  email    :['',[Validators.required,Validators.email]],
  contactNo:['',[
    Validators.required,
    Validators.pattern(/^\d{10}$/), // Enforces 10 digits
  ],],
  address  :[''],
  password :['',[
    Validators.required,
    Validators.minLength(6), // Minimum length of 6 characters
    Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/), // Alphanumeric
  ]],
  rpassword:[''],
 
});
  ngOnInit(): void {
  }

  onSubmit(){
    
    const formData = this.registerForm.value;
    const pass= this.registerForm.value.password==this.registerForm.value.rpassword;
    
    if(this.registerForm.valid){
     if(pass ){
    this.userinfo.storeRegistrationData(formData);
    this.toastr.success('Account Created Successfully')
    this.registerForm.reset();
    this.router.navigateByUrl('auth')

     }
     if(pass ==false){
      this.toastr.error('Password and Confirm password Not Match')
     }
    }
    else{
      this.toastr.error('Register form is not valid')
    }
  }
}
