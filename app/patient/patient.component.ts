import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  bills: Array<any> = [];
  isViewBill = false;
  patForm: FormGroup;
  disp = false;
  patientList: any;
  summary: any;
  isViewSummary = false;

  constructor(private apiService: ApiService, private router: Router) {

    this.patForm = new FormGroup({
      patname: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      phnnum: new FormControl(null, [Validators.required]),
      age: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      patemail: new FormControl(null, [Validators.required]),
      patpswd: new FormControl(null, [Validators.required]),
    })
  }

  get patControls() {
    return this.patForm.controls;
  }

  ngOnInit(): void {
    this.getBills();
    this.getPatientById();
    this.getSummary();
  }

  getBills() {
    let id = Number(localStorage.getItem('patientId'))
    this.apiService.getBillById(id).subscribe({
      next: (res: any) => {
        this.bills = res
        console.log(res);
      },
      error: (err: any) => this.apiService.errorToast(err.error.message)
    })
  }

  patSubmit() {
    this.apiService.addPatient(this.patForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.success) {
          this.apiService.successToast(res.message)

        }
      }, error: (err: any) => this.apiService.errorToast(err.error.message)
    })
  }

  getPatientById() {
    let id = Number(localStorage.getItem('patientId'))
    this.apiService.getPatientById(id).subscribe({
      next: (res: any) => {
        this.patForm.patchValue({
          patname: res[0].p_name,
          address: res[0].address,
          age: res[0].age,
          gender: res[0].gender,
          phnnum: res[0].phn_no,
          patemail: res[0].email,
          patpswd: res[0].pswd
        });
        // this.patForm.get('patemail')?.disable()
      },
      error: (err: any) => this.apiService.errorToast(err.error.message)
    })
  }

  getSummary() {
    let id = Number(localStorage.getItem('patientId'))
    this.apiService.getSummaryById(id).subscribe({
      next: (res: any) => {
        this.summary = res
      },
      error: (err: any) => this.apiService.errorToast(err.error.message)
    })
  }

}
