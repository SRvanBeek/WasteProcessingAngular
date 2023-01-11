import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {User} from "../../shared/_models/user";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ChangePassDialogComponent} from "../change-pass-dialog/change-pass-dialog.component";
import {DisableConfirmDialogComponent} from "../disable-confirm-dialog/disable-confirm-dialog.component";
import {UserService} from "../../shared/_services/user.service";
import {ToastService} from "../../shared/_services/toast.service";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  @Input() user: User;
  isUserAdmin: boolean = false;
  isSuperAdmin: boolean = false;

  constructor(private modelService: NgbModal, private userService: UserService, private toastService: ToastService) {

  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.user != null) {
      this.setIsUserAdmin();
      this.setIsSuperAdmin();
    }
  }

  setIsSuperAdmin() {
    this.userService.getRoles(this.user.username).subscribe({
      next: roles => {
        if (roles.filter((e: { name: string; }) => e.name === 'ROLE_SUPERADMIN').length > 0) {
          this.isSuperAdmin = true;
        } else {
          this.isSuperAdmin = false;
        }
      }
    });
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
