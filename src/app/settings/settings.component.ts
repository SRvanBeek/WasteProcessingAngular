import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as bootstrap from 'bootstrap';
import {CutProgramService} from "../shared/_services/cut-program.service";
import {first} from "rxjs";


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
          console.log(response.message)
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
          console.log(response.message)
        },
        error: err =>  {
          console.log(err)
        }
      })
    this.loading = false;
  }
}
