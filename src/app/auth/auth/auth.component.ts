import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserInfoService } from 'src/app/common-services/user-info.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private fb:FormBuilder,
              private userinfo:UserInfoService,
              private toastr: ToastrService,
              private router:Router
              ) { }

  //registerForm
  loginForm:any=this.fb.group({
  email    :['',[Validators.required,Validators.email]],
  password :['']
})


  ngOnInit(): void {
  }
  onSubmit(item:any){
    const storedData = this.userinfo.getRegistrationData();
   //const user=  this.userinfo.getRegistrationData().email === item.email && this.userinfo.getRegistrationData().password === item.password
   const user=storedData.filter((data:any)=>{
    data.email=== item.email && data.password===item.password
   })
    console.log('user',storedData.email)
    console.log('item',item.email)
   if(user){
    this.toastr.success('Login Successfull');
    this.loginForm.reset();
    this.router.navigateByUrl('dashboard/home')

   }
   else{
    this.toastr.error('User Not Found')
   }
  }
 
}
