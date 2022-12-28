import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as bootstrap from 'bootstrap';
import {CutProgramService} from "../shared/_services/cut-program.service";
import {first} from "rxjs";
import {Toast} from "bootstrap";
import {HttpStatusCode} from "@angular/common/http";


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  leftoverForm: FormGroup;
  randomLeftoverForm: FormGroup;
  toolTipMessage: string = "tooltip";
  private loading: boolean = false;
  toastMessage: string;
  isAdmin: boolean;
  success: boolean;

  toasts: any[] = [];

  constructor(
    private fb: FormBuilder,
    private cutProgram: CutProgramService
  ) {

  }

  ngOnInit() {
    this.leftoverForm = this.fb.group({
      articleNumber: ['', Validators.required],
      metrage: ['', Validators.required]
    });

    this.randomLeftoverForm = this.fb.group({
      leftoverAmount: ['', Validators.required]
    })

    this.setAdmin();
  }

  setAdmin(): void {
    let jwt = localStorage.getItem('JwtToken');
    if (jwt) {
      let jwtData = jwt.split('.')[1];
      let decodedJwtJsonData = window.atob(jwtData);
      let decodedJwtData = JSON.parse(decodedJwtJsonData);
      let roles = decodedJwtData.roles;
      this.isAdmin = roles[0] == 'ROLE_ADMIN';
    }
  }

  get leftoverFormControls() {
    return this.leftoverForm.controls;
  }

  get randomLeftoverFormControls() {
    return this.randomLeftoverForm.controls
  }

  addLeftover() {
    this.loading = true;
    let metrage: number = +(this.leftoverFormControls['metrage'].value);
    this.cutProgram.addLeftover(this.leftoverFormControls['articleNumber'].value, metrage)
      .pipe(first())
      .subscribe({next: response => {
          if (response.code == "ACCEPTED") {
            this.openToast(true, response.message, 1)
          }
          else {
            this.openToast(false, response.message, 1)
          }
        },
        error: err =>  {
          console.log(err)
        }
      })
    this.loading = false;
  }

  addRandomLeftovers() {
    this.loading = true;
    this.cutProgram.addRandomLeftovers(this.randomLeftoverFormControls['leftoverAmount'].value)
      .pipe(first())
      .subscribe({next: response => {
          if (response.code == "ACCEPTED") {
            this.openToast(true, response.message, 2)
          }
          else {
            this.openToast(false, response.message, 2)
          }
        },
        error: err =>  {
          console.log(err)
        }
      })
    this.loading = false;
  }

  openToast(success:boolean, message: string, buttonId: number) {
    this.toastMessage = message;
    this.success = success;

    let toastTrigger;
      toastTrigger = document.getElementById('submitButton' + buttonId);

    const toast = document.getElementById('submitToast')
    if (toastTrigger) {
      toastTrigger.addEventListener('click', () => {
        if (toast != null) {
          const toastr = new bootstrap.Toast(toast);
          toastr.show();
          this.toasts.push(toastr)
        }
      })
    }
  }
}
