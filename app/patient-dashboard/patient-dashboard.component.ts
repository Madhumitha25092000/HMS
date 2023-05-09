import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css']
})

export class PatientDashboardComponent {
  username: string = '';
  password: string = '';
  message: string = '';
patientForm : FormGroup;
  constructor(private apiService: ApiService, private router: Router) {
this.patientForm = new FormGroup({
  uname : new FormControl(null,[Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,10}$')]),
  pname : new FormControl(null,[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
})
   }

  loginSubmit() {

    this.apiService.patientLogin(this.patientForm.value).subscribe({
      next: (res: any) => {
        this.message = res.message;
        if (res.success) {
          this.router.navigate(['patient'])
        }
        this.apiService.successToast(res.message)
        localStorage.setItem('patientId',res.id)
      },
      error: (err: any) => {
        this.apiService.errorToast(err.error.message)
      }
    })
  }
}
