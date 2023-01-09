import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../shared/_models/user";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ChangePassDialogComponent} from "../change-pass-dialog/change-pass-dialog.component";
import {DisableConfirmDialogComponent} from "../disable-confirm-dialog/disable-confirm-dialog.component";
import {UserService} from "../../shared/_services/user.service";
import {ToastService} from "../../shared/_services/toast.service";

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {
  @Input() user: User;
  isUserAdmin: boolean = false;

  constructor(public activeModal: NgbActiveModal, private modelService: NgbModal, private userService: UserService, private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.setIsUserAdmin();
  }

  setIsUserAdmin() {
    this.userService.getRoles(this.user.username).subscribe({
      next: roles => {
        if (roles.filter((e: { name: string; }) => e.name === 'ROLE_ADMIN').length > 0) {
          this.isUserAdmin = true;
        } else {
          this.isUserAdmin = false;
        }
      }
    });
  }

  openChangePass() {
    const modelRef = this.modelService.open(ChangePassDialogComponent, {size: "lg"})
    modelRef.componentInstance.user = this.user;
  }

  openConfirm() {
    const modelRef = this.modelService.open(DisableConfirmDialogComponent, {size: "lg"})
    modelRef.componentInstance.user = this.user;
    modelRef.result.then((data => {
      if (data === 'Yes') {
        this.user.enabled = !this.user.enabled;
        this.userService.putUser(this.user).subscribe()
        if (this.user.enabled) {
          this.toastService.show('', "You've just enabled user " + this.user.username);
        } else {
          this.toastService.show('', "You've just disabled user " + this.user.username);
        }
      }
    }))
  }
}
