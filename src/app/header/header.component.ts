import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from '../shared/_services/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {
  screenLGSize: number = 992;
  typeHistory: string;
  typeAdmin: string;
  token: string;
  isAdmin: boolean = false;

  constructor(private authService: AuthService) {
  }


  ngOnInit() {
    this.setAdmin();
    if (window.innerWidth >= this.screenLGSize) {
      this.typeHistory = 'history';
      this.typeAdmin = 'admin';
    } else {
      this.typeHistory = 'historyOff';
      this.typeAdmin = 'adminOff';
    }
  }

  setAdmin(): void {
    let jwt = localStorage.getItem('JwtToken');
    console.log(jwt);
    if (jwt) {
      let jwtData = jwt.split('.')[1];
      let decodedJwtJsonData = window.atob(jwtData);
      let decodedJwtData = JSON.parse(decodedJwtJsonData);
      let roles = decodedJwtData.roles;
      this.isAdmin = roles[0] == 'ROLE_ADMIN';
    }
  }

  @HostListener("window:resize", []) updateHistory() {
    if (window.innerWidth >= this.screenLGSize) {
      this.typeHistory = 'history';
      this.typeAdmin = 'admin';
    } else {
      this.typeHistory = 'historyOff';
      this.typeAdmin = 'adminOff';
    }
  }

  @HostListener("document:click", ['$event.target']) clickNavbar(clickPosition: any) {
    let shownEl = document.getElementsByClassName('show');
    if (shownEl.length != 0) {
      let buttonID = shownEl[0].id + 'Button';
      let subMenu = document.getElementById(shownEl[0].id);
      if (subMenu) {
        let subMenuString = subMenu.id;
        let button = document.getElementById(buttonID);
        if (button) {
          if (!clickPosition.closest('#navBar') && !clickPosition.closest('#' + subMenuString)) {
            button.dispatchEvent(new CustomEvent('click'));
          }
        }
      }
    }
  }

  logout() {
    this.authService.logout();
  }
}
