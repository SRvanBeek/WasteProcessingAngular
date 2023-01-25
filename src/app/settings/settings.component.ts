import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import * as bootstrap from 'bootstrap';
import {CutProgramService} from "../shared/_services/cut-program.service";
import {first, Observable} from "rxjs";
import {Tooltip} from "bootstrap";

/**
 * @author Stijn van Beek
 */

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  leftoverForm: FormGroup;
  randomLeftoverForm: FormGroup;
  loading: boolean = false;
  toastMessage: string;
  isAdmin: boolean;
  success: boolean;
  highDistanceView: string | null;
  static enabled: string = 'enabled'

  toasts: any[] = [];

  constructor(
    private fb: FormBuilder,
    private cutProgram: CutProgramService
  ) {

  }

  ngOnInit() {
    Array.from(document.querySelectorAll('button[data-bs-toggle="popover"]'))
      .forEach(tooltipNode => new Tooltip(tooltipNode))

    this.leftoverForm = this.fb.group({
      articleNumber: ['', [Validators.required, Validators.nullValidator]],
      metrage: ['', Validators.required, this.numberValidator]
    });

    this.randomLeftoverForm = this.fb.group({
      leftoverAmount: ['', Validators.required, this.numberValidator]
    })

    this.highDistanceView = localStorage.getItem("hdv")
    this.setAdmin();
  }

  /**
   * validates if value is a number or not
   * @param control
   */
  numberValidator(control: FormControl): Promise<any> | Observable<any> {
    return new Promise<any>((resolve) => {
      if (isNaN(control.value)) {
        resolve({isNumber: false});
      } else {
        resolve(null);
      }
    });
  };

  /**
   * checks if logged-in user is an admin
   */
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

  /**
   * submits a leftover to the database
   */
  addLeftover() {
    this.loading = true;
    let metrage: number = +(this.leftoverFormControls['metrage'].value);
    this.cutProgram.addLeftover(this.leftoverFormControls['articleNumber'].value, metrage)
      .pipe(first())
      .subscribe({
        next: response => {
          if (response.code == "ACCEPTED") {
            this.toastMessage = response.message;
            this.success = true
          } else {
            this.toastMessage = response.message;
            this.success = false
          }
        },
        error: err => {
          console.log(err)
          this.loading = false
        },
        complete: () => {
          this.openToast()
          this.loading = false
        }
      })

  }

  /**
   * adds a given amount of randomly generated leftovers to the database.
   */
  addRandomLeftovers() {
    this.loading = true;
    this.cutProgram.addRandomLeftovers(this.randomLeftoverFormControls['leftoverAmount'].value)
      .pipe(first())
      .subscribe({
        next: response => {
          if (response.code == "ACCEPTED") {
            this.toastMessage = response.message;
            this.success = true
          } else {
            this.toastMessage = response.message;
            this.success = false
          }
        },
        error: err => {
          console.log(err)
          this.loading = false
        },
        complete: () => {
          this.openToast()
          this.loading = false;
        }
      })
  }

  openToast() {
    const toast = document.getElementById('submitToast')
    if (toast) {
      const toastr = new bootstrap.Toast(toast);
      toastr.show();
      this.toasts.push(toastr)
    }
  }

  /**
   * sets high distance view settings in localstorage to enaled or false.
   */
  changeDistanceView() {
    if (localStorage.getItem("hdv") !== SettingsComponent.enabled) {
      localStorage.setItem("hdv", SettingsComponent.enabled)
    } else {
      localStorage.setItem("hdv", 'False')
    }
    this.highDistanceView = localStorage.getItem("hdv")
  }
}
