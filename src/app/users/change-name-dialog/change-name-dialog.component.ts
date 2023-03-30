import {Component, Input} from '@angular/core';
import {User} from "../../shared/_models/user";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../shared/_services/user.service";
import {ToastService} from "../../shared/_services/toast.service";


@Component({
  selector: 'app-change-name-dialog',
  templateUrl: './change-name-dialog.component.html',
  styleUrls: ['./change-name-dialog.component.scss']
})
export class ChangeNameDialogComponent {
  @Input() user: User;
  hide: boolean = false;
  name: FormGroup = new FormGroup({
    name: new FormControl('')
  });


  constructor(public activeModal: NgbActiveModal, private userService: UserService, private toastService: ToastService, private formBuilder: FormBuilder) {
    this.name = this.formBuilder.group(
      {
        name: [
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
      return this.name.controls;
    }

  onSubmit() {
    this.user.name = this.name.value.name;
    this.userService.putUser(this.user).subscribe({
      next: value => {
        this.toastService.show("", "You've just changed the name for " + this.user.username);
        this.activeModal.close('Close click');
      }
    });
  }
  }
