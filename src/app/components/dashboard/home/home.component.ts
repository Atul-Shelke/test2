import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonServiceService } from 'src/app/common-services/common-service.service';
import { HttpRequestService } from 'src/app/common-services/http-request.service';
declare var $: any;
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private http:HttpRequestService,
              private fb:FormBuilder,
              private router:Router,
              private common:CommonServiceService,
              private toastr: ToastrService
             
    ) { }
  data:any=[];
  deleteConfig:any;
  parmsId:any;
  isEdit:boolean=false;

  employeeDetailsForm:any=this.fb.group({
    employee_name  :['',Validators.required],
    employee_age   :['',Validators.required],
    employee_salary:['',Validators.required]
  })
  ngOnInit(): void {
    this.getAllEmpoyees();
    this.common.data.subscribe((res:any)=>{
      if(res !== null && res !== undefined){
      this.parmsId=res.id;
      console.log('par',this.parmsId)
      }
      if(this.parmsId){
         this.getSingleData(this.parmsId);
         this.isEdit=true
      }
      else{
        this.employeeDetailsForm.reset();
        this.isEdit=false;
      }
    })
  }

  getAllEmpoyees(){
      this.http.request('get','/employees',null).subscribe((res:any)=>{
        console.log('res',res.data)
        this.data=res.data
      })
  }

  //open the modal
  openModal() {
    
    $('#addEmployeeModal').modal('show')
  }

  closeModal(){
    $('#addEmployeeModal').modal('hide')
  }
  //add employee details..
  addEmployeeDetails(){
   
    if(this.employeeDetailsForm.valid){
      if(this.parmsId){
        this.http.request('put','/update/'+this.parmsId,this.employeeDetailsForm.value).subscribe((res:any)=>{
          console.log('put',res)
          $('#addEmployeeModal').modal('hide');
          this.toastr.success('Record Updated Successfully')
        })
      }
      else{
     this.http.request('post','/create',this.employeeDetailsForm.value).subscribe((res:any)=>{
     
      this.employeeDetailsForm.reset();
      $('#addEmployeeModal').modal('hide');
      this.toastr.success('Data Added Successfully')
      

     })
    }
    }
  }

  deleteModal(id:any){
 
    this.deleteConfig=id
    $('#deleteEmployeeModal').modal('show')
  }
  closeDeleteModal(){
    $('#deleteEmployeeModal').modal('hide')
  }

  //delete record
  deleteRecord(id:any){
    this.http.request('delete','/delete/'+id,null).subscribe((res:any)=>{
      $('#deleteEmployeeModal').modal('hide');
      this.toastr.warning('Record deleted Successfully');
    })
  }

  updateModal(data:any){
    $('#addEmployeeModal').modal('show');
    this.common.data.next(data)
    this.employeeDetailsForm=this.fb.group({
      employee_name  :[data.employee_name,Validators.required],
      employee_age   :[data.employee_age],
      employee_salary:[data.employee_salary]
    })
    $('#addEmployeeModal').modal('hide');
   
  }


  getSingleData(id:string){
    this.http.request('get','/employee/'+id,null).subscribe((res:any)=>{
     
      this.employeeDetailsForm=this.fb.group({
        employee_name  :[res.employee_name,Validators.required],
        employee_age   :[res.employee_age],
        employee_salary:[res.employee_salary]
      })
    })
  }
}
