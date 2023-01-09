import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Validation from '../../shared/_Validation/validation';
import {UserService} from "../../shared/_services/user.service";
import {User} from "../../shared/_models/user";
import {ToastService} from "../../shared/_services/toast.service";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  user: FormGroup = new FormGroup({
    username: new FormControl(''),
    fullName: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    enabled: new FormControl('')
  });
  hide: boolean = true;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder,
              private userService: UserService, private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.user = this.formBuilder.group(
      {
        fullName: [
          '',
          [
            Validators.required,
            Validators.minLength(3)
          ]
        ],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(6)
          ]
        ],
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
        enabled: [true, Validators.required]
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    )
  }

  get f(): { [key: string]: AbstractControl } {
    return this.user.controls;
  }

  onSubmit(): void {
    if (this.user.get('username')?.value !== '') {
      this.userService.checkUsername(this.user.value.username).subscribe({
        next: value => {
          if (value) {
            this.user.get('username')?.setErrors({duplicate: true});
          }
          return;
        }
      })
    }
    if (this.user.invalid) {
      return;
    }
    let newUser = User.createUserWithoutId(this.user.value.fullName, this.user.value.username, this.user.value.password, this.user.value.enabled);
    this.userService.registerUser(newUser).subscribe({
      next: value => {
        this.toastService.show("", "You've just created user with username " + this.user.value.username);
        this.activeModal.close('Close click');
      }
    });
  }
}
