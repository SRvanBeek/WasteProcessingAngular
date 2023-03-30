import {Component, Input} from '@angular/core';
import {User} from "../../shared/_models/user";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../../shared/_services/user.service";
import {ToastService} from "../../shared/_services/toast.service";

@Component({
  selector: 'app-change-username-dialog',
  templateUrl: './change-username-dialog.component.html',
  styleUrls: ['./change-username-dialog.component.scss']
})
export class ChangeUsernameDialogComponent {
  @Input() user: User;
  hide: boolean = false;
  username: FormGroup = new FormGroup({
    username: new FormControl('')
  });


  constructor(public activeModal: NgbActiveModal, private userService: UserService, private toastService: ToastService, private formBuilder: FormBuilder) {
    this.username = this.formBuilder.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(3)
          ]
        ]


      },
    )
  }

  get f(): { [key: string]: AbstractControl } {
    return this.username.controls;
  }

  onSubmit() {
    this.user.username = this.username.value.username;
    this.userService.putUser(this.user).subscribe({
      next: value => {
        console.log("check")
        this.toastService.show("", "You've just changed the name for " + this.user.name);
        this.activeModal.close('Close click');
      }
    });
  }

}
