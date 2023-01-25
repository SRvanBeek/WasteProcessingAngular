import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Validation from "../../shared/_Validation/validation";
import {User} from "../../shared/_models/user";
import {UserService} from "../../shared/_services/user.service";
import {ToastService} from "../../shared/_services/toast.service";

/**
 * @author Dino Yang
 */
@Component({
  selector: 'app-change-pass-dialog',
  templateUrl: './change-pass-dialog.component.html',
  styleUrls: ['./change-pass-dialog.component.scss']
})
export class ChangePassDialogComponent implements OnInit {
  @Input() user: User;
  hide: boolean = true;
  password: FormGroup = new FormGroup<any>({
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  })

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private userService: UserService, private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.password = this.formBuilder.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
            Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[$@!%*?&])(?=[^A-Z]*[A-Z])/)
          ]
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    )
  }

  get f(): { [key: string]: AbstractControl } {
    return this.password.controls;
  }

  /**
   * onSubmit() checks whether there are any errors in the form. If there are none, it puts the user to API.
   */
  onSubmit() {
    if (this.password.invalid) {
      return;
    }
    this.user.password = this.password.value.password;
    this.userService.putUser(this.user).subscribe({
      next: value => {
        this.toastService.show("", "You've just changed the password for " + this.user.username);
        this.activeModal.close('Close click');
      }
    });
  }
}
