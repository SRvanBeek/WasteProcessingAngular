import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginImagePath: string = "assets/images/Login-Image.png";
  logoImagePath: string = "assets/images/logo_dark_big.png";

  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['',Validators.required]
    })
  }


  login() {
    const value = this.form.value;

    if(value.username && value.password) {
      this.authService.login(value.username, value.password);
      console.log(value.username)
      console.log(value.password)
    }
    else {
      console.log("faied auth")

    }
  }
}
