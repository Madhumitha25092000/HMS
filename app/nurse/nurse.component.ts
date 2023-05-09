import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nurse',
  templateUrl: './nurse.component.html',
  styleUrls: ['./nurse.component.css']
})
export class NurseComponent implements OnInit {

  display = false;
  billForm: FormGroup;
  patForm:FormGroup;
  patientList:Array<any> = []
  display1 = false;

  constructor(private apiService: ApiService, private router: Router) {

      this.billForm = new FormGroup({
        patientName: new FormControl(null, [Validators.required]),
        amount: new FormControl(null, [Validators.required]),
      });

      this.patForm = new FormGroup({
        patientName: new FormControl(null, [Validators.required]),
        summary: new FormControl(null, [Validators.required]),
      });

  }
  ngOnInit(): void {
    this.getAllPatients();
  }

  get billControls() {
    return this.billForm.controls
  }

  get patControls() {
    return this.patForm.controls
  }

  getAllPatients() {
    this.apiService.getPatient().subscribe({
      next: (res: any) => {
        this.patientList = res.data
      },
      error: (err: any) => this.apiService.errorToast(err.error.message)
    })
  }

  billSubmit(){
    this.apiService.generateBill(this.billForm.value).subscribe({
      next: (res: any) => {
       this.apiService.successToast(res.message)
       this.billForm.reset();
      },
      error: (err: any) => this.apiService.errorToast(err.error.message)
    })
  }

  patSumbit(){
    this.apiService.updateSummary(this.patForm.value).subscribe({
      next: (res: any) => {
       this.apiService.successToast(res.message)
       this.patForm.reset();
      },
      error: (err: any) => this.apiService.errorToast(err.error.message)
    })

  }

 

}
