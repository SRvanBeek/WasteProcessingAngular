import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../shared/_services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {first, fromEvent, Observable, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";

/**
 * @author Stijn van Beek
 */

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy{
  loginImagePath: string = "assets/images/Login-Image.png";
  logoImagePath: string = "assets/images/logo_dark_big.png";

  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  failedAuth = false;
  isDesktop: boolean = true;
  desktopHeight: number = 600;
  desktopWidth: number = 880;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) {
    if (this.authService.tokenValue) {
      this.router.navigate(['/']);
    }
  }
  resizeObservable$: Observable<Event>
  resizeSubscription$: Subscription

  ngOnInit() {
    this.initLoginForm();
    if (window.innerWidth < this.desktopWidth || window.innerHeight < this.desktopHeight) {
      this.isDesktop = false
    }

    this.resizeObservable$ = fromEvent(window, 'resize')
    this.resizeSubscription$ = this.resizeObservable$.subscribe(evt => {
      if (this.isDesktop && (window.innerWidth < this.desktopWidth || window.innerHeight < this.desktopHeight)) {
        this.initLoginForm()
        this.isDesktop = false;
      }
      if (!this.isDesktop && (window.innerWidth >= this.desktopWidth && window.innerHeight >= this.desktopHeight)) {
        this.initLoginForm()
        this.isDesktop = true;
      }
    })
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.nullValidator]],
      password: ['', [Validators.required, Validators.nullValidator]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  /**
   * attempts to log in the user with the credentials received from the form
   */
  login() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.error = '';
    this.loading = true;
    this.failedAuth = false;
    this.authService.login(this.f['username'].value, this.f['password'].value)
      .pipe(first())
      .subscribe({
        next: () => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/wasteProc';
          this.router.navigate([returnUrl]);
        },
        error: error => {
          this.error = error;
          this.loading = false;
          this.failedAuth = true;
        }
      });
  }

  ngOnDestroy(): void {
    this.resizeSubscription$.unsubscribe()
  }
}

