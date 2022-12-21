import { Component } from '@angular/core';
import {FormGroup} from "@angular/forms";
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  leftoverForm: FormGroup;
  toolTipMessage: string = "tooltip";

  ngOnInit() {

  }

}
