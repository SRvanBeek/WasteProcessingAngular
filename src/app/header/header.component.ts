import {Component, OnInit} from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import {OffcanvasComponent} from "./offcanvas/offcanvas.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {
  token: string;
  isAdmin: boolean = false;

  constructor(private offcanvasService: NgbOffcanvas) {}

  open() {
    const offcanvasRef = this.offcanvasService.open(OffcanvasComponent,  { position: 'end' });
    offcanvasRef.componentInstance.name = 'World';
  }
  ngOnInit() {
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
}

