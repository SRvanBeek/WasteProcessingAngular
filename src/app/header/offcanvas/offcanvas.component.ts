import {Component, OnInit} from '@angular/core';
import {NgbActiveOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import {AuthService} from "../../shared/_services/auth.service";

@Component({
  selector: 'app-offcanvas',
  templateUrl: './offcanvas.component.html',
  styleUrls: ['./offcanvas.component.scss']
})
export class OffcanvasComponent implements OnInit{
  token: string;
  isAdmin: boolean = false;

  constructor(public activeOffcanvas: NgbActiveOffcanvas, private authService: AuthService) {}

  ngOnInit(): void {
    this.setAdmin();
  }

  setAdmin(): void {
    let jwt = localStorage.getItem('JwtToken');
    if (jwt) {
      let jwtData = jwt.split('.')[1];
      let decodedJwtJsonData = window.atob(jwtData);
      let decodedJwtData = JSON.parse(decodedJwtJsonData);
      let roles = decodedJwtData.roles;
      this.isAdmin = roles[0] == 'ROLE_ADMIN';
    }
  }

  logout() {
    this.authService.logout();
  }
}
