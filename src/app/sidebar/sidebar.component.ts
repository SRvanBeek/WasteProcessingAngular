import {Component} from '@angular/core';
import {AuthService} from "../shared/_services/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  token: string;
  isAdmin: boolean = false;

  constructor(private authService: AuthService) {
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

  logout() {
    this.authService.logout();
  }
}
