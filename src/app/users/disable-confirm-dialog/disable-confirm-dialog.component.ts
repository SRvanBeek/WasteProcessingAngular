import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {User} from "../../shared/_models/user";

@Component({
  selector: 'app-disable-confirm-dialog',
  templateUrl: './disable-confirm-dialog.component.html',
  styleUrls: ['./disable-confirm-dialog.component.scss']
})
export class DisableConfirmDialogComponent {
  @Input() user: User;

  constructor(public modal: NgbActiveModal) {
  }

}
