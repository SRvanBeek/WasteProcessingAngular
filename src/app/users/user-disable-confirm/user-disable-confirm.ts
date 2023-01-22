import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {User} from "../../shared/_models/user";

@Component({
  selector: 'app-user-disable-confirm',
  templateUrl: './user-disable-confirm.html',
  styleUrls: ['./user-disable-confirm.scss']
})
export class UserDisableConfirm {
  @Input() user: User;

  constructor(public modal: NgbActiveModal) {
  }

}
